import CLOSE from "../../assets/icons/close.svg";

function isOutside(evt, element) {
  const dimensions = element.getBoundingClientRect();

  return (
    evt.clientX < dimensions.left ||
    evt.clientX > dimensions.right ||
    evt.clientY < dimensions.top ||
    evt.clientY > dimensions.bottom
  );
}

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

  dialog.addEventListener("mousedown", (evt) => {
    if (isOutside(evt, dialog)) {
      dialog.dataset.mousedownOutside = "";
    }
  });

  dialog.addEventListener("mouseup", (evt) => {
    if (dialog.dataset.mousedownOutside != null) {
      if (isOutside(evt, dialog)) {
        dialog.close();
      } else {
        delete dialog.dataset.mousedownOutside;
      }
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
