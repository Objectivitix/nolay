import PubSub from "pubsub-js";
import { PROJECT_CREATE } from "./constants";
import { DayTask, MonthGoal, WeekGoal } from "./targets";

export default class Project {
  constructor(title, emoji = "") {
    this.title = title;
    this.emoji = emoji;
    this.targets = [];
    this.notes = [];

    PubSub.publish(PROJECT_CREATE, this);
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

  getWeekGoals(weekIndex) {
    return this.targets.filter(
      target => target instanceof WeekGoal && target.weekIndex === weekIndex);
  }

  getDayTasks(dayIndex) {
    return this.targets.filter(
      target => target instanceof DayTask && target.dayIndex === dayIndex);
  }

  removeTarget(target) {
    this.targets.splice(this.targets.indexOf(target), 1);
  }

  removeNote(note) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }
}
