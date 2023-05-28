import Target from "./Target";

export default class MonthGoal extends Target {
  constructor(name, desc, dueDate, project) {
    super("month", name, desc, dueDate, project);
  }
}
