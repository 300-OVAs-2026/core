export const disableGroup = (groupName: string) => {
  const inputs = document.querySelectorAll(
    `section:not([aria-hidden="true"]) input[type="radio"][name="${groupName}"][data-input="svg"]`
  );
  inputs.forEach((el) => ((el as HTMLInputElement).disabled = true));
};

export const enableAndClearGroup = (groupName: string) => {
  const inputs = document.querySelectorAll(
    `section:not([aria-hidden="true"]) input[type="radio"][name="${groupName}"][data-input="svg"]`
  );
  inputs.forEach((el) => {
    const input = el as HTMLInputElement;
    input.disabled = false;
    input.checked = false;
    input.setAttribute('data-state', '');
  });
};

export const setGroupStateAttr = (groupName: string, value: string) => {
  const inputs = document.querySelectorAll(
    `section:not([aria-hidden="true"]) input[type="radio"][name="${groupName}"][data-input="svg"]`
  );
  inputs.forEach((el) => el.setAttribute('data-state', value));
};
