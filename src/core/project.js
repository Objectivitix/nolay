import { DayTask, MonthGoal, WeekGoal } from "./targets";

export default class Project {
  constructor(title, emoji) {
    this.title = title;
    this.emoji = emoji;
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
