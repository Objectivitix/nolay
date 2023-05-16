import Target from "./Target";
import { subDays } from "date-fns";

export default class WeekGoal extends Target {
  constructor(weekNum, name, desc, dueDate, project) {
    super(name, desc, dueDate, project);
    this.weekNum = weekNum;
    this.startDate = subDays(dueDate, 7);
  }
}
