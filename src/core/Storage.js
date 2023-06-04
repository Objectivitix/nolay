import DefaultProject from "./DefaultProject";
import Project from "./Project";
import DayTask from "./targets/DayTask";
import MonthGoal from "./targets/MonthGoal";
import Target from "./targets/Target";
import WeekGoal from "./targets/WeekGoal";

const CONSTRUCTORS = new Map([
  ["month", MonthGoal],
  ["week", WeekGoal],
  ["day", DayTask],
]);

const TYPES = new Map([
  [MonthGoal, "month"],
  [WeekGoal, "week"],
  [DayTask, "day"],
]);

function targetReplacer(key, value) {
  if (!(value instanceof Target)) {
    return value;
  }

  // information survives cloning
  const { constructor } = value;

  const copy = structuredClone(value);

  // prevent circular reference
  delete copy.project;

  // information survives serialization
  copy.type = TYPES.get(constructor);

  return copy;
}

function revive(constructor, deserialized, additionalProcessing) {
  const instance = Object.assign(new constructor(), deserialized);

  if (additionalProcessing) {
    additionalProcessing(instance);
  }

  return instance;
}

export default class Storage {
  static save(core) {
    localStorage.setItem("core", JSON.stringify(core, targetReplacer));
  }

  static load() {
    const raw = localStorage.getItem("core");

    if (raw == null) {
      return {};
    }

    const data = JSON.parse(raw);

    data.defaultProj = revive(DefaultProject, data.defaultProj);

    data.projects = data.projects.map((project) => revive(Project, project));

    [data.defaultProj, ...data.projects].forEach((project) => {
      project.targets = project.targets.map((target) =>
        revive(CONSTRUCTORS.get(target.type), target, (instance) => {
          instance.project = project;
        }),
      );
    });

    return data;
  }
}
