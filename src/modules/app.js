import Core from "./core";

export default function loadHomePage() {
  const c = counter();
  const core = new Core();

  document.querySelector(".create-project")
    .addEventListener("click", () => doTheCoolStuff(core, c.next().value));

  document.querySelector(".see-projects")
    .addEventListener("click", () => console.log(core.projects));
}

function doTheCoolStuff(core, num) {
  const c = counter();
  const proj = core.createProject(`Project ${num}`);

  const see = document.createElement("button");
  see.textContent = `See ${proj.title}`;
  see.addEventListener("click", () => console.log(proj));

  const addM = document.createElement("button");
  addM.textContent = `Add MG to ${proj.title}`;
  addM.addEventListener("click", () => {
    core.createMonthGoal(`MG ${c.next().value}`, "hi", proj);
  });

  document.querySelector("body").appendChild(see);
  document.querySelector("body").appendChild(addM);
}

function* counter() {
  let i = 0;
  while (true) {
    yield i;
    i += 1;
  }
}
