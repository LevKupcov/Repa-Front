function initMenu() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const toggle = header.querySelector('[data-menu-toggle]');
  const menu = header.querySelector('[data-menu]');
  if (!toggle || !menu) return;

  const label = toggle.querySelector('.visually-hidden');

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
    label.textContent = open ? 'Close menu' : 'Open menu';
  };

  toggle.addEventListener('click', () => {
    setOpen(!header.classList.contains('is-open'));
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setOpen(false);
  });
}
