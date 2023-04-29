import Core from "./core/core";
import Unit from "./components/unit";

const nolay = new Core();

const webdev = nolay.createProject("Webdev", "🌐");
const cp = nolay.createProject("Competitive Programming", "💻");
const star = nolay.createProject("Star", "🌠");
const spanish = nolay.createProject("Spanish", "🇪🇸");

const task1 = nolay.createDayTask(
  0,
  "complete HTML of Todo List project",
  `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi minus
  veniam sit dolorum libero quo doloremque dolorem amet tempora! Doloremque
  aliquid omnis laboriosam accusantium ducimus!`,
  webdev,
);

const task2 = nolay.createDayTask(
  0,
  "understand the Fenwick tree and practice 1 problem",
  "",
  cp,
);

const task3 = nolay.createDayTask(
  0,
  "reach for the stars",
  "The essence of Nolay.",
  star,
);

const goal1 = nolay.createWeekGoal(
  0,
  "complete 5 20-minute Ouino sessions",
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus
  provident aliquid beatae sint quidem tempore voluptas nam soluta eos fuga
  quae numquam, reprehenderit sapiente nulla esse in maxime, laudantium
  dignissimos incidunt facere consequatur assumenda ex. Praesentium sunt
  cumque obcaecati hic, aperiam sint non voluptate corporis error quibusdam
  provident molestiae tempora.`,
  spanish,
);

const unit1 = Unit("Day 1", "Sat Jan 1", [task1, task2, task3]);
const unit2 = Unit("Week 1", "Jan 1 to Jan 7", [goal1]);

const main = document.querySelector("main");

export default function load() {
  main.appendChild(unit1);
  main.appendChild(unit2);
}
