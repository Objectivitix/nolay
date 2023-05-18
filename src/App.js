import ProjectTab from "./components/ProjectTab";
import NewProjectModal from "./components/modals/NewProjectModal";
import NewTargetModal from "./components/modals/NewTargetModal";
import DayUnit from "./components/units/DayUnit";
import MonthUnit from "./components/units/MonthUnit";
import Target from "./components/units/Target";
import WeekUnit from "./components/units/WeekUnit";
import Core from "./core/Core";
import { getThisWeekNumBounded, getTodayNumBounded } from "./lib/dates";
import range from "./lib/range";

const HOME = document.querySelector("[data-current]");
const MAIN = document.querySelector("main");
const PROJ = document.querySelector(".projects__tabs");

export default class App {
  constructor() {
    this.$ = new Core();
    this.activeMenuButton = HOME;
  }

  initialize() {
    this.createExamples();
    this.loadProjectTabs();
    this.bindSidebar();
    this.loadCurrent();
  }

  loadCurrent() {
    MAIN.innerHTML = "";

    MAIN.appendChild(this.createDayUnit(getTodayNumBounded()));
    MAIN.appendChild(this.createWeekUnit(getThisWeekNumBounded()));
  }

  loadThisWeek() {
    MAIN.innerHTML = "";
    this.loadWeek(getThisWeekNumBounded());
  }

  loadThisMonth(project) {
    MAIN.innerHTML = "";
    MAIN.appendChild(this.createMonthUnit(project));

    for (const week of range(1, 5)) {
      this.loadWeek(week, project);
    }
  }

  loadWeek(num, project) {
    const start = num * 7 - 6;
    const stop = start + 7;

    MAIN.appendChild(this.createWeekUnit(num, project));

    for (const day of range(start, stop)) {
      MAIN.appendChild(this.createDayUnit(day, project));
    }
  }

  loadProjectTabs() {
    this.$.getProjects().forEach((project) =>
      PROJ.appendChild(this.createProjectTab(project)),
    );
  }

  bindSidebar() {
    const buttons = document.querySelectorAll(".menu__button");

    buttons.forEach((button) =>
      button.addEventListener("click", (evt) => this.onMenuButtonClick(evt)),
    );

    App.bindMainMenuButton("current", () => this.loadCurrent());
    App.bindMainMenuButton("week", () => this.loadThisWeek());
    App.bindMainMenuButton("month", () => this.loadThisMonth());

    document
      .querySelector(".projects__new")
      .addEventListener("click", () => this.onNewProject());
  }

  static bindMainMenuButton(dataAttr, listener) {
    document
      .querySelector(".menu")
      .querySelector(`[data-${dataAttr}]`)
      .addEventListener("click", listener);
  }

  createMonthUnit(project) {
    return MonthUnit(
      (project ?? this.$).getMonthGoals(),
      this.onNewTarget(
        "Create a new Goal for this month",
        this.$.createMonthGoal,
      ),
      App.onTargetComplete,
      App.onTargetDelete,
    );
  }

  createWeekUnit(num, project) {
    return WeekUnit(
      num,
      (project ?? this.$).getWeekGoals(num),
      this.onNewTarget(
        `Create a new Goal for Week ${num}`,
        this.$.createWeekGoal,
        num,
      ),
      App.onTargetComplete,
      App.onTargetDelete,
    );
  }

  createDayUnit(num, project) {
    return DayUnit(
      num,
      (project ?? this.$).getDayTasks(num),
      this.onNewTarget(
        `Create a new Task for Day ${num}`,
        this.$.createDayTask,
        num,
      ),
      App.onTargetComplete,
      App.onTargetDelete,
    );
  }

  createProjectTab(project) {
    return ProjectTab(
      project,
      () => this.loadThisMonth(project),
      (evt) => {
        const li = evt.target.closest(".project");

        this.$.removeProject(project);
        li.remove();
      },
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

  static makeModalHandler(createModal) {
    return (parentEvent) => {
      const modal = createModal(parentEvent);

      MAIN.appendChild(modal);
      modal.showModal();
    };
  }

  onMenuButtonClick(evt) {
    this.activeMenuButton.classList.remove("menu__button--active");
    evt.target.classList.add("menu__button--active");

    this.activeMenuButton = evt.target;
  }

  onNewTarget(modalTitle, createTarget, num = -1) {
    return App.makeModalHandler((parentEvent) =>
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

        const target = createTarget.bind(this.$)(...args);

        const unit = parentEvent.target.closest(".unit");
        let ul = unit.querySelector(".targets");

        if (!ul) {
          ul = document.createElement("ul");
          ul.classList.add("targets");
          unit.appendChild(ul);
        }

        ul.appendChild(
          Target(
            target,
            App.onTargetComplete(target),
            App.onTargetDelete(target),
          ),
        );
      }),
    );
  }

  onNewProject() {
    const modal = NewProjectModal((evt) => {
      const data = new FormData(evt.target);

      const project = this.$.createProject(
        data.get("title"),
        data.get("emoji"),
      );

      const li = this.createProjectTab(project);

      li.querySelector(".menu__button").addEventListener("click", (e) =>
        this.onMenuButtonClick(e),
      );

      PROJ.appendChild(li);
    });

    MAIN.appendChild(modal);
    modal.showModal();
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
