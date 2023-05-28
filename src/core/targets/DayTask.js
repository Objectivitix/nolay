import Target from "./Target";

export default class DayTask extends Target {
  constructor(dayNum, name, desc, dueDate, project) {
    super("day", name, desc, dueDate, project);
    this.dayNum = dayNum;
  }
}
