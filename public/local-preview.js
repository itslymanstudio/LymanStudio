// Keep the original form styling, but never send preview submissions to the source site's owner.
document.addEventListener('submit', event => {
  event.preventDefault();
  event.stopImmediatePropagation();
  const form = event.target;
  let message = form.querySelector('[data-local-message]');
  if (!message) {
    message = document.createElement('p');
    message.dataset.localMessage = '';
    message.setAttribute('role', 'status');
    message.style.cssText = 'font:14px sans-serif;line-height:1.5;padding:12px 0;';
    form.append(message);
  }
  message.textContent = 'Local preview: connect your own form service to receive submissions.';
}, true);
