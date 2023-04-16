import { addDays, addWeeks, lastDayOfMonth, startOfMonth } from "date-fns";

import { range } from "./helpers";
import Project from "./project";
import { DayTask, MonthGoal, WeekGoal } from "./targets";
import Note from "./note";

export default class Core {
  constructor() {
    this.defaultProj = new Project("");

    this.projects = [];
    this.projects.push(this.defaultProj);
  }

  addProject(project) {
    this.projects.push(project);
  }

  createProject(title, emoji = "") {
    const project = new Project(title, emoji);

    this.addProject(project);
    return project;
  }

  createMonthGoal(name, desc, project = this.defaultProj) {
    const dueDate = addDays(lastDayOfMonth(Core.today), 1);
    const monthGoal = new MonthGoal(name, desc, dueDate, project);

    project.addTarget(monthGoal);
    return monthGoal;
  }

  createWeekGoal(weekIndex, name, desc, project = this.defaultProj) {
    const dueDate = addWeeks(startOfMonth(Core.today), weekIndex + 1);
    const weekGoal = new WeekGoal(weekIndex, name, desc, dueDate, project);

    project.addTarget(weekGoal);
    return weekGoal;
  }

  createDayTask(dayIndex, name, desc, project = this.defaultProj) {
    const dueDate = addDays(startOfMonth(Core.today), dayIndex + 1);
    const dayTask = new DayTask(dayIndex, name, desc, dueDate, project);

    project.addTarget(dayTask);
    return dayTask;
  }

  createNote(title, details, project = this.defaultProj) {
    const note = new Note(title, details, project);

    project.addNote(note);
    return note;
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

    return Array.from(range(start, stop), this.getDayTasks, this);
  }

  getThisWeekGoals() {
    return this.getWeekGoals(Math.floor(Core.todayIndex / 7));
  }

  getTodayTasks() {
    return this.getDayTasks(Core.todayIndex);
  }

  removeProject(project) {
    project.targets.forEach(this.unlinkItem, this);
    project.notes.forEach(this.unlinkItem, this);

    project.targets.forEach(t => this.defaultProj.addTarget(t));
    project.notes.forEach(n => this.defaultProj.addNote(n));

    this.projects.splice(this.projects.indexOf(project), 1);
  }

  removeTarget(target) {
    target.project.removeTarget(target);
  }

  removeNote(note) {
    note.project.removeNote(note);
  }

  unlinkItem(item) {
    item.changeProject(this.defaultProj);
  }

  static get today() {
    return new Date();
  }

  static get todayIndex() {
    return Core.today.getDate() - 1;
  }
}