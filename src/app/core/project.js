import { DayTask, MonthGoal, WeekGoal } from "./targets";

const MIN_WEEKS_IN_MONTH = 4;
const MIN_DAYS_IN_MONTH = 28;

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
    return this.targets.filter(target => target instanceof MonthGoal);
  }

  getWeekGoals(weekNumDirty) {
    const maxNum = MIN_WEEKS_IN_MONTH;
    const weekNum = weekNumDirty > maxNum ? maxNum : weekNumDirty;

    return this.targets.filter(
      target => target instanceof WeekGoal && target.weekNum === weekNum);
  }

  getDayTasks(dayNumDirty) {
    const maxNum = MIN_DAYS_IN_MONTH;
    const dayNum = dayNumDirty > maxNum ? maxNum : dayNumDirty;

    return this.targets.filter(
      target => target instanceof DayTask && target.dayNum === dayNum);
  }

  removeTarget(target) {
    this.targets.splice(this.targets.indexOf(target), 1);
  }

  removeNote(note) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }
}
