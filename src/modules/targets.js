import { subDays } from "date-fns";
import { DEFAULT_PROJECT } from "./constants";

class Target {
  constructor(name, desc, dueDate, project) {
    this.name = name;
    this.desc = desc;
    this.dueDate = dueDate;
    this.project = project;
    this.completed = false;

    project.addTarget(this);
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }

  unlinkProject() {
    this.project = DEFAULT_PROJECT;
  }
}

export class MonthGoal extends Target {

}

export class WeekGoal extends Target {
  constructor(weekIndex, name, desc, dueDate, project) {
    this.weekIndex = weekIndex;
    this.startDate = subDays(dueDate, 7);
    super(name, desc, dueDate, project);
  }
}

export class DayTask extends Target {
  constructor(dayIndex, name, desc, dueDate, project) {
    this.dayIndex = dayIndex;
    super(name, desc, dueDate, project);
  }
}
