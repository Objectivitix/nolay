import { getNextDay, getNextMonth, getNextWeek } from "../lib/dates";
import DefaultProject from "./DefaultProject";
import Note from "./Note";
import Project from "./Project";
import Storage from "./Storage";
import DayTask from "./targets/DayTask";
import MonthGoal from "./targets/MonthGoal";
import WeekGoal from "./targets/WeekGoal";

export default class Core {
  constructor() {
    this.defaultProj = new DefaultProject();
    this.projects = [];
  }

  static fromStorage() {
    return Object.assign(new Core(), Storage.load());
  }

  save() {
    Storage.save(this);
  }

  createProject(title) {
    const project = new Project(title);

    this.projects.push(project);
    this.save();
    return project;
  }

  createMonthGoal(name, desc, project = this.defaultProj) {
    const dueDate = getNextMonth();
    const monthGoal = new MonthGoal(name, desc, dueDate, project);

    project.addTarget(monthGoal);
    this.save();
    return monthGoal;
  }

  createWeekGoal(weekNum, name, desc, project = this.defaultProj) {
    const dueDate = getNextWeek(weekNum);
    const weekGoal = new WeekGoal(weekNum, name, desc, dueDate, project);

    project.addTarget(weekGoal);
    this.save();
    return weekGoal;
  }

  createDayTask(dayNum, name, desc, project = this.defaultProj) {
    const dueDate = getNextDay(dayNum);
    const dayTask = new DayTask(dayNum, name, desc, dueDate, project);

    project.addTarget(dayTask);
    this.save();
    return dayTask;
  }

  createNote(title, details, project = this.defaultProj) {
    const note = new Note(title, details, project);

    project.addNote(note);
    this.save();
    return note;
  }

  getAllProjects() {
    return [this.defaultProj, ...this.projects];
  }

  getMonthGoals() {
    return this.getAllProjects()
      .map((proj) => proj.getMonthGoals())
      .flat();
  }

  getWeekGoals(weekNum) {
    return this.getAllProjects()
      .map((proj) => proj.getWeekGoals(weekNum))
      .flat();
  }

  getDayTasks(dayNum) {
    return this.getAllProjects()
      .map((proj) => proj.getDayTasks(dayNum))
      .flat();
  }

  getNotes() {
    return this.getAllProjects()
      .map((proj) => proj.notes)
      .flat();
  }

  removeProject(project) {
    project.targets.forEach(this.unlinkItem, this);
    project.notes.forEach(this.unlinkItem, this);

    project.targets.forEach((t) => this.defaultProj.addTarget(t));
    project.notes.forEach((n) => this.defaultProj.addNote(n));

    this.projects.splice(this.projects.indexOf(project), 1);

    this.save();
  }

  removeTarget(target) {
    target.remove();
    this.save();
  }

  removeNote(note) {
    note.remove();
    this.save();
  }

  toggleCompletion(target) {
    target.toggleCompletion();
    this.save();
  }

  unlinkItem(item) {
    item.changeProject(this.defaultProj);
  }
}
