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
  constructor(weekIndex, name, desc, dueDate, project) {
    super(name, desc, dueDate, project);
    this.weekIndex = weekIndex;
    this.startDate = subDays(dueDate, 7);
  }
}

export class DayTask extends Target {
  constructor(dayIndex, name, desc, dueDate, project) {
    super(name, desc, dueDate, project);
    this.dayIndex = dayIndex;
  }
}
