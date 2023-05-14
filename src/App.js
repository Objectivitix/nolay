import range from "./lib/range";
import { getThisWeekNum, getTodayNum } from "./lib/dates";
import Core from "./core/Core";
import ProjectTab from "./components/ProjectTab";
import MonthUnit from "./components/units/MonthUnit";
import WeekUnit from "./components/units/WeekUnit";
import DayUnit from "./components/units/DayUnit";
import NewTargetModal from "./components/modals/NewTargetModal";
import BaseModal from "./components/modals/BaseModal";

const MAIN = document.querySelector("main");
const PROJ = document.querySelector(".projects__tabs");

export default class App {
  constructor() {
    this.$ = new Core();
  }

  initialize() {
    this.createExamples();
    this.loadProjectTabs();
    this.loadThisWeek();
  }

  loadCurrent() {
    const day = getTodayNum() > 28 ? 28 : getTodayNum();
    const week = getThisWeekNum() > 4 ? 4 : getThisWeekNum();

    MAIN.appendChild(this.createDayUnit(day));
    MAIN.appendChild(this.createWeekUnit(week));
  }

  loadThisWeek() {
    const week = getThisWeekNum() > 4 ? 4 : getThisWeekNum();

    const start = week * 7 - 6;
    const stop = start + 7;

    MAIN.appendChild(this.createWeekUnit(week));

    for (const day of range(start, stop)) {
      MAIN.appendChild(this.createDayUnit(day));
    }
  }

  loadProjectTabs() {
    this.$.getProjects().forEach((project) =>
      PROJ.appendChild(
        ProjectTab(project, (evt) => {
          const li = evt.target.closest(".project");

          this.$.removeProject(project);
          li.remove();
        }),
      ),
    );
  }

  createMonthUnit() {
    return MonthUnit(
      this.$.getMonthGoals(),
      this.onUnitNew(
        "Create a new Goal for this month",
        this.$.createMonthGoal,
      ),
      App.onTargetComplete,
      App.onTargetDelete,
    );
  }

  createWeekUnit(num) {
    return WeekUnit(
      num,
      this.$.getWeekGoals(num),
      this.onUnitNew(
        `Create a new Goal for Week ${num}`,
        this.$.createWeekGoal,
        num,
      ),
      App.onTargetComplete,
      App.onTargetDelete,
    );
  }

  createDayUnit(num) {
    return DayUnit(
      num,
      this.$.getDayTasks(num),
      this.onUnitNew(
        `Create a new Task for Day ${num}`,
        this.$.createDayTask,
        num,
      ),
      App.onTargetComplete,
      App.onTargetDelete,
    );
  }

  createExamples() {
    const webdev = this.$.createProject("Webdev", "🌐");
    const cp = this.$.createProject("Competitive Programming", "💻");
    const star = this.$.createProject("Star", "🌠");
    const spanish = this.$.createProject("Spanish", "🇪🇸");

    this.$.createDayTask(
      13,
      "complete HTML of Todo List project",
      `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi minus
      veniam sit dolorum libero quo doloremque dolorem amet tempora! Doloremque
      aliquid omnis laboriosam accusantium ducimus!`,
      webdev,
    );

    this.$.createDayTask(
      13,
      "understand the Fenwick tree and practice 1 problem",
      "",
      cp,
    );

    this.$.createDayTask(
      13,
      "reach for the stars",
      "The essence of Nolay.",
      star,
    );

    this.$.createWeekGoal(
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
  }

  onUnitNew(modalTitle, createTarget, num = -1) {
    return App.makeModalHandler(() =>
      NewTargetModal(modalTitle, this.$.projects, (evt) => {
        const data = new FormData(evt.target);

        const args = [
          data.get("name"),
          data.get("desc"),
          this.$.projects[data.get("proj")],
        ];

        if (num !== -1) {
          args.unshift(num);
        }

        createTarget.bind(this.$)(...args);

        MAIN.innerHTML = "";
        this.loadThisWeek();
      }),
    );
  }

  static makeModalHandler(createModal) {
    return () => {
      const modal = createModal();

      MAIN.appendChild(modal);
      modal.showModal();
    };
  }

  static onTargetComplete(target) {
    return (evt) => {
      target.toggleCompletion();
      evt.target.classList.add("on");
    };
  }

  static onTargetDelete(target) {
    return (evt) => {
      const li = evt.target.closest(".target");

      target.remove();
      li.remove();
    };
  }
}
