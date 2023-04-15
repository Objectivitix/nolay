import PubSub from "pubsub-js";
import { DayTask, MonthGoal, WeekGoal } from "./targets";
import { Events, PubSubHelper } from "./helpers";

const MIN_WEEKS_IN_MONTH = 4;
const MIN_DAYS_IN_MONTH = 28;

export default class Project {
  constructor(title, emoji = "") {
    this.title = title;
    this.emoji = emoji;
    this.targets = [];
    this.notes = [];

    this.configurePubSub();
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

  getWeekGoals(weekIndexDirty) {
    const maxIndex = MIN_WEEKS_IN_MONTH - 1;
    const weekIndex = weekIndexDirty > maxIndex ? maxIndex : weekIndexDirty;

    return this.targets.filter(
      target => target instanceof WeekGoal && target.weekIndex === weekIndex);
  }

  getDayTasks(dayIndexDirty) {
    const maxIndex = MIN_DAYS_IN_MONTH - 1;
    const dayIndex = dayIndexDirty > maxIndex ? maxIndex : dayIndexDirty;

    return this.targets.filter(
      target => target instanceof DayTask && target.dayIndex === dayIndex);
  }

  removeTarget(target) {
    this.targets.splice(this.targets.indexOf(target), 1);
  }

  removeNote(note) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }

  configurePubSub() {
    PubSub.publish(Events.projectCreate, this);

    PubSub.subscribe(Events.targetCreate,
      PubSubHelper.equalSelf(this.addTarget, this, "project"));

    PubSub.subscribe(Events.noteCreate,
      PubSubHelper.equalSelf(this.addNote, this, "project"));
  }
}
