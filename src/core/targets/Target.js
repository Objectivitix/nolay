export default class Target {
  constructor(type, name, desc, dueDate, project) {
    this.type = type;
    this.name = name;
    this.desc = desc;
    this.dueDate = dueDate;
    this.project = project;
    this.completed = false;
  }

  changeProject(newProject) {
    this.project = newProject;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }

  remove() {
    this.project.removeTarget(this);
  }
}
