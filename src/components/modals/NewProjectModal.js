import BaseModal from "./BaseModal";

export default function NewProjectModal(onSubmit) {
  const modal = BaseModal("new-project", "Create a new Project", onSubmit);
  const form = modal.querySelector(".form");

  form.insertAdjacentHTML(
    "beforeend",
    `
    <label class="form__container title">
      <p class="form__label title__label">Title</p>
      <input
        name="title"
        class="form__control title__control"
        type="text"
        maxlength="30"
        placeholder="e.g. Webdev"
        required
      >
    </label>
    <label class="form__container emoji">
      <p class="form__label emoji__label">Give it an emoji!</p>
      <select
        name="emoji"
        class="form__control emoji__control"
      >
        <option>😎</option>
      </select>
    </label>`,
  );

  return modal;
}
