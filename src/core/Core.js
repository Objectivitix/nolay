import Project from "./Project";
import DayTask from "./targets/DayTask";
import MonthGoal from "./targets/MonthGoal";
import WeekGoal from "./targets/WeekGoal";
import Note from "./Note";
import { getNextDay, getNextMonth, getNextWeek } from "../lib/dates";

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
    const dueDate = getNextMonth();
    const monthGoal = new MonthGoal(name, desc, dueDate, project);

    project.addTarget(monthGoal);
    return monthGoal;
  }

  createWeekGoal(weekNum, name, desc, project = this.defaultProj) {
    const dueDate = getNextWeek();
    const weekGoal = new WeekGoal(weekNum, name, desc, dueDate, project);

    project.addTarget(weekGoal);
    return weekGoal;
  }

  createDayTask(dayNum, name, desc, project = this.defaultProj) {
    const dueDate = getNextDay();
    const dayTask = new DayTask(dayNum, name, desc, dueDate, project);

    project.addTarget(dayTask);
    return dayTask;
  }

  createNote(title, details, project = this.defaultProj) {
    const note = new Note(title, details, project);

    project.addNote(note);
    return note;
  }

  getProjects() {
    return this.projects.filter((proj) => proj !== this.defaultProj);
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
