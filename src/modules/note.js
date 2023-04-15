import PubSub from "pubsub-js";
import { Events, PubSubHelper } from "./helpers";

export default class Note {
  constructor(title, details, project) {
    this.title = title;
    this.details = details;
    this.project = project;

    this.configurePubSub();
  }

  unlinkProject() {
    this.project = DEFAULT_PROJECT;
  }

  configurePubSub() {
    PubSub.publish(Events.noteCreate, this);

    PubSub.subscribe(Events.projectDelete,
      PubSubHelper.equalArg(this.unlinkProject, this, "project"));
  }
}
