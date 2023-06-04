import { parse, stringify } from "flatted";

import DefaultProject from "./DefaultProject";
import Project from "./Project";
import DayTask from "./targets/DayTask";
import MonthGoal from "./targets/MonthGoal";
import WeekGoal from "./targets/WeekGoal";

const CONSTRUCTORS = {
  month: MonthGoal,
  week: WeekGoal,
  day: DayTask,
};

export default class Storage {
  static save(core) {
    localStorage.setItem("core", stringify(core));
  }

  static load() {
    const raw = localStorage.getItem("core");

    if (raw == null) {
      return {};
    }

    const data = parse(raw);

    data.defaultProj = Object.assign(new DefaultProject(), data.defaultProj);

    data.projects = data.projects.map((project) =>
      Object.assign(new Project(), project),
    );

    [data.defaultProj, ...data.projects].forEach((project) => {
      project.targets = project.targets.map((target) => {
        const base = Object.assign(new CONSTRUCTORS[target.type](), target);
        base.project = project;
        return base;
      });
    });

    return data;
  }
}
