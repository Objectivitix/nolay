import { subDays } from "date-fns";

import Target from "./Target";

export default class WeekGoal extends Target {
  constructor(weekNum, name, desc, dueDate, project) {
    super(name, desc, dueDate, project);
    this.weekNum = weekNum;
    this.startDate = subDays(dueDate, 7);
  }
}
