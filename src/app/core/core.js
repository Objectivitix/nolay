import { Dates, range } from "./utils";
import Project from "./project";
import { DayTask, MonthGoal, WeekGoal } from "./targets";
import Note from "./note";

export default class Core {
  constructor() {
    this.defaultProj = new Project("");

    this.projects = [];
    this.projects.push(this.defaultProj);
  }

  createProject(title, emoji) {
    const project = new Project(title, emoji);

    this.projects.push(project);
    return project;
  }

  createMonthGoal(name, desc, project = this.defaultProj) {
    const dueDate = Dates.nextMonth;
    const monthGoal = new MonthGoal(name, desc, dueDate, project);

    project.addTarget(monthGoal);
    return monthGoal;
  }

  createWeekGoal(weekNum, name, desc, project = this.defaultProj) {
    const dueDate = Dates.nextWeek(weekNum);
    const weekGoal = new WeekGoal(weekNum, name, desc, dueDate, project);

    project.addTarget(weekGoal);
    return weekGoal;
  }

  createDayTask(dayNum, name, desc, project = this.defaultProj) {
    const dueDate = Dates.nextDay(dayNum);
    const dayTask = new DayTask(dayNum, name, desc, dueDate, project);

    project.addTarget(dayTask);
    return dayTask;
  }

  createNote(title, details, project = this.defaultProj) {
    const note = new Note(title, details, project);

    project.addNote(note);
    return note;
  }

  getMonthGoals() {
    return this.projects.map((proj) => proj.getMonthGoals()).flat();
  }

  getWeekGoals(weekNum) {
    return this.projects.map((proj) => proj.getWeekGoals(weekNum)).flat();
  }

  getDayTasks(dayNum) {
    return this.projects.map((proj) => proj.getDayTasks(dayNum)).flat();
  }

  getNotes() {
    return this.projects.map((proj) => proj.notes).flat();
  }

  removeProject(project) {
    project.targets.forEach(this.unlinkItem, this);
    project.notes.forEach(this.unlinkItem, this);

    project.targets.forEach((t) => this.defaultProj.addTarget(t));
    project.notes.forEach((n) => this.defaultProj.addNote(n));

    this.projects.splice(this.projects.indexOf(project), 1);
  }

  unlinkItem(item) {
    item.changeProject(this.defaultProj);
  }
}
