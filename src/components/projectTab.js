import DELETE from "../assets/icons/delete.svg";

export default function ProjectTab(project, onDeleteFactory) {
  const li = document.createElement("li");

  li.innerHTML = `
    <button
      class="menu__button menu__button--project"
      data-emoji="${project.emoji}">${project.title}</button>`;

  return li;
}
