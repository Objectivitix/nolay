import PubSub from "pubsub-js";
import { subDays } from "date-fns";
import { DEFAULT_PROJECT, Events, PubSubHelper } from "./helpers";

class Target {
  constructor(name, desc, dueDate, project) {
    this.name = name;
    this.desc = desc;
    this.dueDate = dueDate;
    this.project = project;
    this.completed = false;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }

  unlinkProject() {
    this.project = DEFAULT_PROJECT;
  }

  configurePubSub() {
    PubSub.publish(Events.targetCreate, this);

    PubSub.subscribe(Events.projectDelete,
      PubSubHelper.equalArg(this.unlinkProject, this, "project"));
  }
}

export class MonthGoal extends Target {
  constructor(name, desc, dueDate, project) {
    super(name, desc, dueDate, project);

    this.configurePubSub();
  }
}

export class WeekGoal extends Target {
  constructor(weekIndex, name, desc, dueDate, project) {
    super(name, desc, dueDate, project);

    this.weekIndex = weekIndex;
    this.startDate = subDays(dueDate, 7);

    this.configurePubSub();
  }
}

export class DayTask extends Target {
  constructor(dayIndex, name, desc, dueDate, project) {
    super(name, desc, dueDate, project);

    this.dayIndex = dayIndex;

    this.configurePubSub();
  }
}
