import DELETE from "../assets/icons/delete.svg";

export default function ProjectTab(project, onDelete) {
  const li = document.createElement("li");
  li.classList.add("project");

  li.innerHTML = `
    <button
      class="menu__button menu__button--project"
      data-emoji="${project.emoji}"
    >${project.title}</button>
    <button class="project__delete"><img src="${DELETE}"></button>`;

  li.querySelector(".project__delete").addEventListener("click", onDelete);

  return li;
}
