import NEW from "../../assets/icons/new.svg";

export default function Header(content, onNew) {
  const header = document.createElement("header");
  header.classList.add("unit__header");

  header.innerHTML = `
    ${content}
    <button class="unit__new"><img src="${NEW}"></button>`;

  header.querySelector(".unit__new").addEventListener("click", onNew);

  return header;
}
