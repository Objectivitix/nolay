import CLOSE from "../../assets/icons/close.svg";

export default function BaseModal(subject, title, onSubmitFactory) {
  const dialog = document.createElement("dialog");
  dialog.classList.add("modal");
  dialog.classList.add(`modal--${subject}`);

  dialog.innerHTML = `
    <div class="modal__wrapper">
      <h3 class="modal__heading">${title}</h3>
      <form class="form" method="dialog">
        <button class="modal__close"><img src="${CLOSE}"></button>
        <button class="form__submit">Submit</button>
      </form>
    </div>`;

  const form = dialog.querySelector(".form");

  dialog
    .querySelector(".modal__close")
    .addEventListener("click", () => form.reset());

  dialog
    .querySelector(".form__submit")
    .addEventListener("click", onSubmitFactory(form));

  return dialog;
}
