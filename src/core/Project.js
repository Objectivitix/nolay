import DayTask from "./targets/DayTask";
import MonthGoal from "./targets/MonthGoal";
import WeekGoal from "./targets/WeekGoal";

export default class Project {
  constructor(title) {
    this.title = title;
    this.targets = [];
    this.notes = [];
  }

  addTarget(target) {
    this.targets.push(target);
  }

  addNote(note) {
    this.notes.push(note);
  }

  getMonthGoals() {
    return this.targets.filter((target) => target instanceof MonthGoal);
  }

  getWeekGoals(weekNum) {
    return this.targets.filter(
      (target) => target instanceof WeekGoal && target.weekNum === weekNum,
    );
  }

  getDayTasks(dayNum) {
    return this.targets.filter(
      (target) => target instanceof DayTask && target.dayNum === dayNum,
    );
  }

  removeTarget(target) {
    this.targets.splice(this.targets.indexOf(target), 1);
  }

  removeNote(note) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }
}
