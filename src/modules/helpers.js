import Project from "./project";

export function* range(...args) {
  let start, stop, step;

  switch (args.length) {
    case 1:
      start = 0;
      stop = args[0];
      step = 1;
      break;
    case 2:
      start = args[0];
      stop = args[1];
      step = 1;
      break;
    default:
      [ start, stop, step ] = args;
  }

  let i = start;

  while (step > 0 ? i < stop : i > stop) {
    yield i;
    i += step;
  }
}

export const Events = Object.freeze({
  targetCreate: Symbol("targetCreate"),
  noteCreate: Symbol("noteCreate"),
  projectCreate: Symbol("projectCreate"),
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
