import {
  addDays,
  addMonths,
  addWeeks,
  format,
  startOfMonth,
  startOfToday,
} from "date-fns";

function getToday() {
  return startOfToday();
}

function getThisMonth() {
  return startOfMonth(getToday());
}

function getTodayNum() {
  return getToday().getDate();
}

function getThisWeekNum() {
  return Math.ceil(getTodayNum() / 7);
}

export function getTodayNumBounded() {
  return getTodayNum() > 28 ? 28 : getTodayNum();
}

export function getThisWeekNumBounded() {
  return getThisWeekNum() > 4 ? 4 : getThisWeekNum();
}

export function getNextMonth() {
  return addMonths(getThisMonth(), 1);
}

export function getNextWeek(weekNum) {
  return addWeeks(getThisMonth(), weekNum);
}

export function getNextDay(dayNum) {
  return addDays(getThisMonth(), dayNum);
}

export function formatThisMonth() {
  return format(getThisMonth(), "MMMM");
}

export function formatWeek(weekNum) {
  const firstDay = addWeeks(getThisMonth(), weekNum - 1);
  const lastDay = addDays(firstDay, 6);

  return `${format(firstDay, "MMM d")}
    to ${format(lastDay, "MMM d")}`;
}

export function formatDay(dayNum) {
  const day = addDays(getThisMonth(), dayNum - 1);

  return format(day, "EEEE");
}
