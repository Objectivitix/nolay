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

export function getTodayNum() {
  return getToday().getDate();
}

export function getThisWeekNum() {
  return Math.ceil(getTodayNum() / 7);
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

export function formatWeek(weekNum) {
  const firstDay = addWeeks(getThisMonth(), weekNum - 1);
  const lastDay = addDays(firstDay, 6);

  return `${format(firstDay, "MMM d")}
    to ${format(lastDay, "MMM d")}`;
}

export function formatDay(dayNum) {
  const day = addDays(getThisMonth(), dayNum - 1);

  return `${format(day, "EEEE")}`;
}
