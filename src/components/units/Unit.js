import Target from "./Target";

export default function Unit(
  header,
  targets,
  onCompleteFactory,
  onDeleteFactory,
) {
  const article = document.createElement("article");
  article.classList.add("unit");

  article.appendChild(header);

  if (!targets.length) {
    return article;
  }

  const ul = document.createElement("ul");
  ul.classList.add("targets");

  targets.forEach((target) =>
    ul.appendChild(
      Target(target, onCompleteFactory(target), onDeleteFactory(target)),
    ),
  );

  article.appendChild(ul);

  return article;
}
