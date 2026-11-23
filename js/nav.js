// Dropdown navigation: click to toggle, click elsewhere or Escape to close
const btns = document.querySelectorAll('.nav-btn');
const closeAll = () => btns.forEach(b => b.setAttribute('aria-expanded', 'false'));
btns.forEach(b => b.addEventListener('click', e => {
  e.stopPropagation();
  const open = b.getAttribute('aria-expanded') === 'true';
  closeAll();
  b.setAttribute('aria-expanded', String(!open));
}));
document.addEventListener('click', closeAll);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const o = document.querySelector('.nav-btn[aria-expanded="true"]');
    closeAll();
    if (o) o.focus();
  }
});
