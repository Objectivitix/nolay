import BaseModal from "./BaseModal";

function ProjectOption(title, index) {
  const option = document.createElement("option");

  option.textContent = index === 0 ? "None" : title;
  option.value = String(index);

  return option;
}

export default function NewTargetModal(title, projects, onSubmit) {
  const modal = BaseModal("new-target", title, onSubmit);
  const form = modal.querySelector(".form");

  form.insertAdjacentHTML(
    "beforeend",
    `
    <label class="new-target__container new-target__container--name">
      <p class="new-target__label new-target__label--name">Name</p>
      <input
        name="name"
        class="new-target__control new-target__control--name"
        type="text"
        maxlength="70"
        placeholder="e.g. complete modal logic for Todo List project"
        required
      >
    </label>
    <label class="new-target__container new-target__container--desc">
      <p class="new-target__label new-target__label--desc">Description</p>
      <textarea
        name="desc"
        class="new-target__control new-target__control--desc"
        maxlength="500"
      ></textarea>
    </label>
    <label class="new-target__container new-target__container--proj">
      <p class="new-target__label new-target__label--proj">Project</p>
      <select
        name="proj"
        class="new-target__control new-target__control--proj"
      ></select>
    </label>`,
  );

  const select = form.querySelector(".new-target__control--proj");

  projects.forEach((project, index) =>
    select.appendChild(ProjectOption(project.title, index)),
  );

  return modal;
}
