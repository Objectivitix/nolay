import { addDays, addWeeks, lastDayOfMonth, startOfMonth } from "date-fns";
import PubSub from "pubsub-js";

import { DEFAULT_PROJECT, Events, PubSubHelper, range } from "./helpers";
import Project from "./project";
import { DayTask, MonthGoal, WeekGoal } from "./targets";
import Note from "./note";

export default class Core {
  constructor() {
    this.projects = [];
    this.projects.push(DEFAULT_PROJECT);

    this.configurePubSub();
  }

  addProject(project) {
    this.projects.push(project);
  }

  createProject(title, emoji = "") {
    return new Project(title, emoji);
  }

  createMonthGoal(name, desc, project = DEFAULT_PROJECT) {
    const dueDate = addDays(lastDayOfMonth(Core.today), 1);
    return new MonthGoal(name, desc, dueDate, project);
  }

  createWeekGoal(weekIndex, name, desc, project = DEFAULT_PROJECT) {
    const dueDate = addWeeks(startOfMonth(Core.today), weekIndex);
    return new WeekGoal(weekIndex, name, desc, dueDate, project);
  }

  createDayTask(dayIndex, name, desc, project = DEFAULT_PROJECT) {
    const dueDate = addDays(startOfMonth(Core.today), dayIndex);
    return new DayTask(dayIndex, name, desc, dueDate, project);
  }

  createNote(title, details, project = DEFAULT_PROJECT) {
    return new Note(title, details, project);
  }

  getMonthGoals() {
    return this.projects
      .map(proj => proj.getMonthGoals())
      .flat();
  }

  getWeekGoals(weekIndex) {
    return this.projects
      .map(proj => proj.getWeekGoals(weekIndex))
      .flat();
  }

  getDayTasks(dayIndex) {
    return this.projects
      .map(proj => proj.getDayTasks(dayIndex))
      .flat();
  }

  getNotes() {
    return this.projects.map(proj => proj.notes).flat();
  }

  getDayTasksOfWeek(weekIndex) {
    const start = weekIndex * 7;
    const stop = start + 7;

    return Array.from(range(start, stop), this.getDayTasks);
  }

  getThisWeekGoals() {
    return this.getWeekGoals(Math.floor(Core.todayIndex / 7));
  }

  getTodayTasks() {
    return this.getDayTasks(Core.todayIndex);
  }

  removeProject(project) {
    this.projects.splice(this.projects.indexOf(project), 1);
    PubSub.publish(Events.projectDelete, project);
  }

  removeTarget(target) {
    target.project.removeTarget(target);
  }

  removeNote(note) {
    note.project.removeNote(note);
  }

  static get today() {
    return new Date();
  }

  static get todayIndex() {
    return Core.today.getDate() - 1;
  }

  configurePubSub() {
    PubSub.subscribe(Events.projectCreate,
      PubSubHelper.simple(this.addProject, this));

    PubSub.subscribe(Events.projectDelete,
      PubSubHelper.simple(this.removeProject, this));
  }
}