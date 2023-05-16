import DELETE from "../../assets/icons/delete.svg";
import DefaultProject from "../../core/DefaultProject";

export default function Target(target, onComplete, onDelete) {
  const li = document.createElement("li");
  li.classList.add("target");

  const projectHTML = `
    <p class="target__project" data-emoji="${target.project.emoji}">
      ${target.project.title}
    </p>`;

  li.innerHTML = `
    <hgroup class="target__header">
      <h3 class="target__name">${target.name}</h3>
      ${target.project instanceof DefaultProject ? "" : projectHTML}
    </hgroup>
    ${
      /\S/.test(target.desc) ? `<p class="target__desc">${target.desc}</p>` : ""
    }
    <button class="target__complete"></button>
    <button class="target__delete"><img src="${DELETE}"></button>`;

  li.querySelector(".target__complete").addEventListener("click", onComplete);
  li.querySelector(".target__delete").addEventListener("click", onDelete);

  return li;
}
