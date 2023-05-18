import CLOSE from "../../assets/icons/close.svg";

export default function BaseModal(subject, title, onSubmit) {
  const dialog = document.createElement("dialog");
  dialog.classList.add("modal");

  dialog.innerHTML = `
    <div class="modal__wrapper">
      <h3 class="modal__heading">${title}</h3>
      <form class="form form--${subject}" method="dialog">
        <button class="modal__close" type="reset"><img src="${CLOSE}"></button>
        <button class="form__submit">Submit</button>
      </form>
    </div>`;

  dialog.addEventListener("click", (evt) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      evt.clientX < dialogDimensions.left ||
      evt.clientX > dialogDimensions.right ||
      evt.clientY < dialogDimensions.top ||
      evt.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });

  dialog
    .querySelector(".modal__close")
    .addEventListener("click", () => dialog.close());

  dialog.addEventListener("close", () => dialog.remove());

  const form = dialog.querySelector(".form");
  form.addEventListener("submit", onSubmit);

  return dialog;
}
