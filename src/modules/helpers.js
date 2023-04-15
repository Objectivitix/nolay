import Project from "./project";

export const Events = Object.freeze({
  targetCreate: Symbol("targetCreate"),
  noteCreate: Symbol("noteCreate"),
  projectCreate: Symbol("projectCreate"),

  targetDelete: Symbol("targetDelete"),
  noteDelete: Symbol("noteDelete"),
  projectDelete: Symbol("projectDelete"),
});

export class PubSubHelper {
  static simple(method, context) {
    return (_, arg) => method.bind(context)(arg);
  }

  static equalSelf(method, context, prop) {
    return (_, arg) => {
      if (arg[prop] === context) {
        method.bind(context)(arg);
      }
    };
  }

  static equalArg(method, context, prop) {
    return (_, arg) => {
      if (context[prop] === arg) {
        method.bind(context)(arg);
      }
    };
  }
}

export const DEFAULT_PROJECT = new Project("");
