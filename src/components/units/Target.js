import CHECK from "../../assets/icons/check.svg";
import DELETE from "../../assets/icons/delete.svg";
import DefaultProject from "../../core/DefaultProject";

export default function Target(target, onComplete, onDelete) {
  const li = document.createElement("li");
  li.classList.add("target");

  const projectHTML = `
    <p class="target__project">${target.project.title}</p>`;

  li.innerHTML = `
    <hgroup class="target__header">
      <h3 class="target__name">${target.name}</h3>
      ${target.project instanceof DefaultProject ? "" : projectHTML}
    </hgroup>
    ${
      /\S/.test(target.desc) ? `<p class="target__desc">${target.desc}</p>` : ""
    }
    <button class="target__complete ${
      target.completed ? "target__complete--active" : ""
    }">
      <img class="target__check" src="${CHECK}">
    </button>
    <button class="target__delete"><img src="${DELETE}"></button>`;

  li.querySelector(".target__complete").addEventListener("click", onComplete);
  li.querySelector(".target__delete").addEventListener("click", onDelete);

  return li;
}
