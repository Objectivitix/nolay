import DefaultProject from "../../core/DefaultProject";

import BaseModal from "./BaseModal";

function ProjectOption(project, index) {
  const option = document.createElement("option");

  option.innerHTML = project instanceof DefaultProject ? "None" : project.title;
  option.value = String(index);

  return option;
}

export default function NewTargetModal(title, projects, onSubmit) {
  const modal = BaseModal("new-target", title, onSubmit);
  const form = modal.querySelector(".form");

  form.insertAdjacentHTML(
    "beforeend",
    `
    <label class="form__container name">
      <p class="form__label name__label">Name</p>
      <input
        name="name"
        class="form__control name__control"
        type="text"
        maxlength="70"
        placeholder="e.g. make Nolay responsive"
        required
      >
    </label>
    <label class="form__container desc">
      <p class="form__label desc__label">Description</p>
      <textarea
        name="desc"
        class="form__control desc__control"
        maxlength="500"
      ></textarea>
    </label>
    <label class="form__container proj">
      <p class="form__label proj__label">Project</p>
      <select
        name="proj"
        class="form__control proj__control"
      ></select>
    </label>`,
  );

  const select = form.querySelector(".proj__control");

  projects.forEach((project, index) =>
    select.appendChild(ProjectOption(project, index)),
  );

  return modal;
}
