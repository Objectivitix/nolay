export default class Note {
  constructor(title, details, project) {
    this.title = title;
    this.details = details;
    this.project = project;
  }

  changeProject(newProject) {
    this.project = newProject;
  }

  remove() {
    this.project.removeTarget(this);
  }
}
