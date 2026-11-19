function initSlider() {
  const root = document.querySelector('[data-slider]');
  if (!root) return;

  const viewport = root.querySelector('[data-slider-viewport]');
  const track = root.querySelector('[data-slider-track]');
  const slides = [...track.children];
  const prev = root.querySelector('[data-slider-prev]');
  const next = root.querySelector('[data-slider-next]');
  const dotsWrap = root.querySelector('[data-slider-dots]');
  let index = 0;

  const dots = slides.map((_, slideIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'slider__dot';
    button.setAttribute('aria-label', `Testimonial ${slideIndex + 1}`);
    button.innerHTML = `<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0.4 8.1 5.2 13.2 7 8.1 8.8 7 13.6 5.9 8.8 0.8 7 5.9 5.2Z"/></svg>`;
    button.addEventListener('click', () => {
      index = slideIndex;
      render();
    });
    dotsWrap.append(button);
    return button;
  });

  const render = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const styles = getComputedStyle(viewport);
    const visible = viewport.clientWidth;
    const offset = Math.max(0, (visible - slideWidth) / 2);
    track.style.transform = `translateX(${offset - index * slideWidth}px)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
    dots.forEach((dot, dotIndex) => {
      const current = dotIndex === index;
      dot.classList.toggle('is-current', current);
      if (current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  };

  prev.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    render();
  });

  next.addEventListener('click', () => {
    index = Math.min(slides.length - 1, index + 1);
    render();
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') next.click();
    if (event.key === 'ArrowLeft') prev.click();
  });

  window.addEventListener('resize', render);
  render();
}
