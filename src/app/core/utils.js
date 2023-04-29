import { addDays, addWeeks, format, startOfMonth } from "date-fns";

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

export class Dates {
  static get today() {
    return new Date();
  }

  static get todayNum() {
    return this.today.getDate();
  }

  static get thisWeekNum() {
    return Math.ceil(this.todayNum / 7);
  }

  static get thisMonth() {
    return startOfMonth(this.today);
  }

  static get nextMonth() {
    return addMonths(this.thisMonth, 1);
  }

  static nextWeek(weekNum) {
    return addWeeks(this.thisMonth, weekNum);
  }

  static nextDay(dayNum) {
    return addDays(this.thisMonth, dayNum);
  }

  static formatWeek(weekNum) {
    const firstDay = addWeeks(this.thisMonth, weekNum - 1);
    const lastDay = addDays(firstDay, 6);

    return `${format(firstDay, "MMM d")}
      to ${format(lastDay, "MMM d")}`;
  }

  static formatDay(dayNum) {
    const day = addDays(this.thisMonth, dayNum - 1);

    return `${format(day, "E MMM d")}`
  }
}
