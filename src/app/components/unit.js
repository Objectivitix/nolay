import NEW from "../../assets/icons/new.svg";
import DELETE from "../../assets/icons/delete.svg";

function Header(title, date, onNew) {
  const header = document.createElement("header");
  header.classList.add("unit__header");

  header.innerHTML = `
    <h2 class="unit__title">${title}</h2>
    <p class="unit__date">${date}</p>
    <button class="unit__new"><img src="${NEW}"></button>`;

  header.querySelector(".unit__new").addEventListener("click", onNew);

  return header;
}

function Target(target, onComplete, onDelete) {
  const li = document.createElement("li");
  li.classList.add("target");

  li.innerHTML = `
    <hgroup class="target__header">
      <h3 class="target__name">${target.name}</h3>
      <p class="target__project" data-emoji="${target.project.emoji}">
        ${target.project.title}
      </p>
    </hgroup>
    ${target.desc ? `<p class="target__desc">${target.desc}</p>` : ""}
    <button class="target__complete"></button>
    <button class="target__delete"><img src="${DELETE}"></button>`;

  li.querySelector(".target__complete").addEventListener("click", onComplete);
  li.querySelector(".target__delete").addEventListener("click", onDelete);

  return li;
}

export default function Unit(
  title,
  date,
  targets,
  onNewFactory,
  onCompleteFactory,
  onDeleteFactory,
) {
  const article = document.createElement("article");
  article.classList.add("unit");

  const ul = document.createElement("ul");
  ul.classList.add("targets");

  targets.forEach((target) =>
    ul.appendChild(
      Target(target, onCompleteFactory(target), onDeleteFactory(target)),
    ),
  );

  article.appendChild(Header(title, date, onNewFactory(title)));
  article.appendChild(ul);

  return article;
}
