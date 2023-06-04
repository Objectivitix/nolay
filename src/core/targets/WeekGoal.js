import Target from "./Target";

export default class WeekGoal extends Target {
  constructor(weekNum, name, desc, dueDate, project) {
    super(name, desc, dueDate, project);
    this.weekNum = weekNum;
  }
}
