const MESSAGE = 'The form is checked in the browser only. Nothing was sent — the server connection comes later.';

function showStatus(node, text, type) {
  node.hidden = false;
  node.textContent = text;
  node.classList.remove('is-info', 'is-error');
  node.classList.add(type === 'error' ? 'is-error' : 'is-info');
}

function bindForm(form) {
  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    form.querySelectorAll('[data-field]').forEach((field) => {
      const input = field.querySelector('input, textarea');
      const error = field.querySelector('[data-error]');
      const value = input.value.trim();
      let message = '';

      if (input.required && !value) {
        message = 'This field is required.';
      } else if (input.type === 'email' && value && !input.checkValidity()) {
        message = 'Enter a valid email address.';
      }

      field.classList.toggle('is-invalid', Boolean(message));
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (error) error.textContent = message;
      if (message) valid = false;
    });

    if (!valid) {
      showStatus(status, 'Check the highlighted fields and try again.', 'error');
      const firstInvalid = form.querySelector('.is-invalid input, .is-invalid textarea');
      firstInvalid?.focus();
      return;
    }

    showStatus(status, MESSAGE, 'info');
  });
}

function initForms() {
  document.querySelectorAll('[data-form]').forEach(bindForm);
}
