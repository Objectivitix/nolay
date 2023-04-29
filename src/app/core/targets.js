import { subDays } from "date-fns";

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

  changeProject(newProject) {
    this.project = newProject;
  }
}

export class MonthGoal extends Target {
}

export class WeekGoal extends Target {
  constructor(weekNum, name, desc, dueDate, project) {
    super(name, desc, dueDate, project);
    this.weekNum = weekNum;
    this.startDate = subDays(dueDate, 7);
  }
}

export class DayTask extends Target {
  constructor(dayNum, name, desc, dueDate, project) {
    super(name, desc, dueDate, project);
    this.dayNum = dayNum;
  }
}
