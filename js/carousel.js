// Image carousel: scroll-snap track with previous/next buttons and dot buttons.
// No autoplay. Works with the keyboard (arrow keys on the track) and announces the current slide.
document.querySelectorAll('[data-carousel]').forEach(root => {
  const track = root.querySelector('.carousel__viewport');
  const slides = [...root.querySelectorAll('.carousel__slide')];
  const prev = root.querySelector('[data-carousel-prev]');
  const next = root.querySelector('[data-carousel-next]');
  const dots = [...root.querySelectorAll('.carousel__dot')];
  const status = root.querySelector('[data-carousel-status]');
  let current = -1;

  const step = () => slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : slides[0].offsetWidth;
  const maxScroll = () => track.scrollWidth - track.clientWidth;

  function indexFromScroll() {
    if (track.scrollLeft >= maxScroll() - 2) return slides.length - 1;
    return Math.round(track.scrollLeft / step());
  }

  function update() {
    const i = Math.max(0, Math.min(slides.length - 1, indexFromScroll()));
    prev.setAttribute('aria-disabled', String(i === 0));
    next.setAttribute('aria-disabled', String(track.scrollLeft >= maxScroll() - 2));
    dots.forEach((d, n) => d.toggleAttribute('aria-current', n === i));
    dots.forEach((d, n) => { if (n === i) d.setAttribute('aria-current', 'true'); });
    if (i !== current) {
      current = i;
      if (status) status.textContent = 'Slide ' + (i + 1) + ' of ' + slides.length;
    }
  }

  function goTo(i) {
    const n = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: slides[n].offsetLeft - slides[0].offsetLeft });
  }

  // Move by one slide from where the track really is. Near the end the track can't scroll as far as the
  // last slides' start edges, so working from the scroll position (not the dot index) keeps "previous" moving.
  const left = n => slides[n].offsetLeft - slides[0].offsetLeft;
  function goPrev() {
    let n = 0;
    slides.forEach((s, i) => { if (left(i) < track.scrollLeft - 2) n = i; });
    goTo(n);
  }
  function goNext() {
    const n = slides.findIndex((s, i) => left(i) > track.scrollLeft + 2);
    goTo(n === -1 ? slides.length - 1 : n);
  }

  prev.addEventListener('click', () => { if (prev.getAttribute('aria-disabled') !== 'true') goPrev(); });
  next.addEventListener('click', () => { if (next.getAttribute('aria-disabled') !== 'true') goNext(); });
  dots.forEach((d, n) => d.addEventListener('click', () => goTo(n)));
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
  });
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);
  update();
});
