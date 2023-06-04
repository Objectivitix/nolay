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
    this.$ = Core.fromStorage();
    this.activeMenuButton = HOME;
  }

  initialize() {
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
    this.$.projects.forEach((project) =>
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
        project,
      ),
      this.onTargetComplete.bind(this),
      this.onTargetDelete.bind(this),
    );
  }

  createWeekUnit(num, project) {
    return WeekUnit(
      num,
      (project ?? this.$).getWeekGoals(num),
      this.onNewTarget(
        `Create a new Goal for Week ${num}`,
        this.$.createWeekGoal,
        project,
        num,
      ),
      this.onTargetComplete.bind(this),
      this.onTargetDelete.bind(this),
    );
  }

  createDayUnit(num, project) {
    return DayUnit(
      num,
      (project ?? this.$).getDayTasks(num),
      this.onNewTarget(
        `Create a new Task for Day ${num}`,
        this.$.createDayTask,
        project,
        num,
      ),
      this.onTargetComplete.bind(this),
      this.onTargetDelete.bind(this),
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

  onNewTarget(modalTitle, createTarget, project, num = -1) {
    return App.makeModalHandler((parentEvent) => {
      const options = project ? [project] : this.$.getAllProjects();

      return NewTargetModal(modalTitle, options, (evt) => {
        const data = new FormData(evt.target);

        const args = [
          data.get("name"),
          data.get("desc"),
          options[data.get("proj")],
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
            this.onTargetComplete(target),
            this.onTargetDelete(target),
          ),
        );
      });
    });
  }

  onNewProject() {
    const modal = NewProjectModal((evt) => {
      const data = new FormData(evt.target);
      const project = this.$.createProject(data.get("title"));
      const li = this.createProjectTab(project);

      li.querySelector(".menu__button").addEventListener("click", (e) =>
        this.onMenuButtonClick(e),
      );

      PROJ.appendChild(li);
    });

    MAIN.appendChild(modal);
    modal.showModal();
  }

  onTargetComplete(target) {
    return (evt) => {
      this.$.toggleCompletion(target);
      evt.currentTarget.classList.toggle("target__complete--active");
    };
  }

  onTargetDelete(target) {
    return (evt) => {
      const li = evt.target.closest(".target");
      this.$.removeTarget(target);
      li.remove();
    };
  }
}
