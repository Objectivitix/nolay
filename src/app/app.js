import Core from "./core/core";
import Unit from "./components/unit";
import { Dates } from "./core/utils";

const main = document.querySelector("main");

const nolay = new Core();

const webdev = nolay.createProject("Webdev", "🌐");
const cp = nolay.createProject("Competitive Programming", "💻");
const star = nolay.createProject("Star", "🌠");
const spanish = nolay.createProject("Spanish", "🇪🇸");

const task1 = nolay.createDayTask(
  28,
  "complete HTML of Todo List project",
  `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi minus
  veniam sit dolorum libero quo doloremque dolorem amet tempora! Doloremque
  aliquid omnis laboriosam accusantium ducimus!`,
  webdev,
);

const task2 = nolay.createDayTask(
  28,
  "understand the Fenwick tree and practice 1 problem",
  "",
  cp,
);

const task3 = nolay.createDayTask(
  28,
  "reach for the stars",
  "The essence of Nolay.",
  star,
);

const goal1 = nolay.createWeekGoal(
  4,
  "complete 5 20-minute Ouino sessions",
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus
  provident aliquid beatae sint quidem tempore voluptas nam soluta eos fuga
  quae numquam, reprehenderit sapiente nulla esse in maxime, laudantium
  dignissimos incidunt facere consequatur assumenda ex. Praesentium sunt
  cumque obcaecati hic, aperiam sint non voluptate corporis error quibusdam
  provident molestiae tempora.`,
  spanish,
);

export function loadCurrent() {
  const todayNum = Dates.todayNum > 28 ? 28 : Dates.todayNum;
  const thisWeekNum = Dates.thisWeekNum > 4 ? 4 : Dates.thisWeekNum;

  const todayUnit = Unit(`Day ${todayNum}`, Dates.formatDay(todayNum), nolay.getTodayTasks());
  const thisWeekUnit = Unit(`Week ${thisWeekNum}`, Dates.formatWeek(thisWeekNum), nolay.getThisWeekGoals());

  main.appendChild(todayUnit);
  main.appendChild(thisWeekUnit);
}
