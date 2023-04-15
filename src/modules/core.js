import { addWeeks, lastDayOfMonth, startOfMonth } from "date-fns";
import PubSub from "pubsub-js";

import { DEFAULT_PROJECT, Events, PubSubHelper } from "./helpers";
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
    const dueDate = lastDayOfMonth(Core.today);
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

  removeProject(project) {
    this.projects.splice(this.projects.indexOf(project), 1);
  }

  static get today() {
    return new Date();
  }

  configurePubSub() {
    PubSub.subscribe(Events.projectCreate,
      PubSubHelper.simple(this.addProject, this));

    PubSub.subscribe(Events.projectDelete,
      PubSubHelper.simple(this.removeProject, this));
  }
}