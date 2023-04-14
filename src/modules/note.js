export default class Note {
  constructor(title, details, project) {
    this.title = title;
    this.details = details;
    this.project = project;

    project.addNote(this);
  }

  unlinkProject() {
    this.project = DEFAULT_PROJECT;
  }
}
