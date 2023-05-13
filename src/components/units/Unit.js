import DELETE from "../../assets/icons/delete.svg";

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
  header,
  targets,
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

  article.appendChild(header);
  article.appendChild(ul);

  return article;
}
