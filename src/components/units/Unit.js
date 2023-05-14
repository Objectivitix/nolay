import Target from "./Target";

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
