// Switch between views of a component (for example Desktop / Tablet / Mobile).
// Buttons carry data-view-target, panels carry data-view. Without JavaScript every panel stays visible.
const toggleButtons = document.querySelectorAll('[data-view-target]');
const panels = document.querySelectorAll('[data-view]');
const frames = document.querySelectorAll('[data-frame]');
const widths = { desktop: '936px', tablet: '810px', mobile: '416px' };

function showView(name) {
  panels.forEach(p => { p.hidden = p.dataset.view !== name; });
  toggleButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.viewTarget === name)));
  frames.forEach(f => { f.style.maxWidth = widths[name]; });
}

toggleButtons.forEach(b => b.addEventListener('click', () => showView(b.dataset.viewTarget)));
if (toggleButtons.length) showView('desktop');
