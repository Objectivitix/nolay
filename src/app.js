import Core from "./core/Core";
import Unit from "./components/Unit";
import range from "./lib/range";
import {
  formatDay,
  formatWeek,
  getThisWeekNum,
  getTodayNum,
} from "./lib/dates";
import ProjectTab from "./components/ProjectTab";
import BaseModal from "./components/modals/BaseModal";

const main = document.querySelector("main");
const projectsList = document.querySelector(".projects__list");

const nolay = new Core();

const webdev = nolay.createProject("Webdev", "🌐");
const cp = nolay.createProject("Competitive Programming", "💻");
const star = nolay.createProject("Star", "🌠");
const spanish = nolay.createProject("Spanish", "🇪🇸");

nolay.createDayTask(
  12,
  "complete HTML of Todo List project",
  `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi minus
  veniam sit dolorum libero quo doloremque dolorem amet tempora! Doloremque
  aliquid omnis laboriosam accusantium ducimus!`,
  webdev,
);

nolay.createDayTask(
  12,
  "understand the Fenwick tree and practice 1 problem",
  "",
  cp,
);

nolay.createDayTask(12, "reach for the stars", "The essence of Nolay.", star);

nolay.createWeekGoal(
  2,
  "complete 5 20-minute Ouino sessions",
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus
  provident aliquid beatae sint quidem tempore voluptas nam soluta eos fuga
  quae numquam, reprehenderit sapiente nulla esse in maxime, laudantium
  dignissimos incidunt facere consequatur assumenda ex. Praesentium sunt
  cumque obcaecati hic, aperiam sint non voluptate corporis error quibusdam
  provident molestiae tempora.`,
  spanish,
);

function onSubmitFactory(form) {
  return () => console.log(form);
}

const modal = BaseModal("subject", "title", onSubmitFactory);

export function initModals() {
  main.append(modal);
}

export function loadProjectsList() {
  nolay
    .getProjects()
    .forEach((project) => projectsList.appendChild(ProjectTab(project)));
}

function onNewFactory(title) {
  return () => modal.showModal();
}

function onCompleteFactory(target) {
  function onComplete(evt) {
    target.toggleCompletion();
    evt.target.classList.add("on");

    console.log(target);
  }

  return onComplete;
}

function onDeleteFactory(target) {
  function onDelete(evt) {
    target.remove();

    const li = evt.target.closest(".target");
    li.remove();

    console.log(nolay.getDayTasks(4));
  }

  return onDelete;
}

export function loadCurrent() {
  const dNum = getTodayNum() > 28 ? 28 : getTodayNum();
  const wNum = getThisWeekNum() > 4 ? 4 : getThisWeekNum();

  const todayUnit = Unit(
    `Day ${dNum}`,
    formatDay(dNum),
    nolay.getDayTasks(dNum),
    onNewFactory,
    onCompleteFactory,
    onDeleteFactory,
  );

  const thisWeekUnit = Unit(
    `Week ${wNum}`,
    formatWeek(wNum),
    nolay.getWeekGoals(wNum),
    onNewFactory,
    onCompleteFactory,
    onDeleteFactory,
  );

  main.appendChild(todayUnit);
  main.appendChild(thisWeekUnit);
}

export function loadThisWeek() {
  const wNum = getThisWeekNum() > 4 ? 4 : getThisWeekNum();

  const thisWeekUnit = Unit(
    `Week ${wNum}`,
    formatWeek(wNum),
    nolay.getWeekGoals(wNum),
    onNewFactory,
    onCompleteFactory,
    onDeleteFactory,
  );

  main.appendChild(thisWeekUnit);

  const start = wNum * 7 - 6;
  const stop = start + 7;

  for (const dNum of range(start, stop)) {
    main.appendChild(
      Unit(
        `Day ${dNum}`,
        formatDay(dNum),
        nolay.getDayTasks(dNum),
        onNewFactory,
        onCompleteFactory,
        onDeleteFactory,
      ),
    );
  }
}
