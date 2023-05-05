export default function* range(...args) {
  let start, stop, step;

  switch (args.length) {
    case 1:
      [stop] = args;
      start = 0;
      step = 1;
      break;
    case 2:
      [start, stop] = args;
      step = 1;
      break;
    default:
      [start, stop, step] = args;
  }

  let i = start;

  while (step > 0 ? i < stop : i > stop) {
    yield i;
    i += step;
  }
}
