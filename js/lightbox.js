// Click an image to see it full size.
// Every image inside the page content is wrapped in a button that opens a <dialog>.
// The dialog gives focus handling and Esc to close; focus returns to the image that opened it.
// The hero image (.cs-cover) is left alone.
(function () {
  const targets = document.querySelectorAll(
    '.image-grid__item img, .carousel__media img, .persona-card__media img, .cs-wide img'
  );
  if (!targets.length || typeof HTMLDialogElement === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Full size image');
  dialog.innerHTML =
    '<button type="button" class="lightbox__close" aria-label="Close full size image"><span aria-hidden="true">&times;</span></button>' +
    '<figure class="lightbox__figure"><img class="lightbox__img" alt=""><figcaption class="lightbox__caption"></figcaption></figure>';
  document.body.appendChild(dialog);

  const full = dialog.querySelector('.lightbox__img');
  const caption = dialog.querySelector('.lightbox__caption');
  const close = dialog.querySelector('.lightbox__close');

  function open(img) {
    full.src = img.currentSrc || img.src;
    full.alt = img.alt;
    caption.textContent = img.alt;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }

  targets.forEach(img => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'zoom-btn';
    btn.setAttribute('aria-label', 'View full size: ' + img.alt);
    img.parentNode.insertBefore(btn, img);
    btn.appendChild(img);
    btn.addEventListener('click', () => open(img));
  });

  function reset() {
    if (dialog.open) return;   // a late "close" event must not undo a newly opened image
    document.body.style.overflow = '';
    full.removeAttribute('src');
  }
  function shut() { if (dialog.open) dialog.close(); reset(); }

  close.addEventListener('click', shut);
  // Click on the dark area (not the picture) closes it
  dialog.addEventListener('click', e => { if (e.target === dialog) shut(); });
  // Esc closes the dialog natively; this also resets the page scroll lock
  dialog.addEventListener('close', reset);
  dialog.addEventListener('cancel', () => setTimeout(reset, 0));
})();
