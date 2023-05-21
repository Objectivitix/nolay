import DELETE from "../assets/icons/delete.svg";

export default function ProjectTab(project, onClick, onDelete) {
  const li = document.createElement("li");
  li.classList.add("project");

  li.innerHTML = `
    <button class="menu__button menu__button--project">
      ${project.title}
    </button>
    <button class="project__delete"><img src="${DELETE}"></button>`;

  li.querySelector(".menu__button").addEventListener("click", onClick);
  li.querySelector(".project__delete").addEventListener("click", onDelete);

  return li;
}
