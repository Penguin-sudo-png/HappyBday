const starsContainer = document.querySelector('.stars');
const envelopeWrap = document.getElementById('envelopeWrap');
const note = document.querySelector('.note');

if (starsContainer && starsContainer.children.length === 0) {
  for (let i = 0; i < 160; i += 1) {
    const star = document.createElement('span');
    const size = (Math.random() * 3 + 2).toFixed(2);
    const left = (Math.random() * 100).toFixed(2);
    const top = (Math.random() * 100).toFixed(2);
    const duration = (Math.random() * 3 + 2.5).toFixed(2);
    const delay = (Math.random() * 2.2).toFixed(2);

    star.className = 'star';
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;
    star.style.setProperty('--dur', `${duration}s`);
    star.style.animationDelay = `${delay}s`;
    starsContainer.appendChild(star);
  }
}

if (envelopeWrap && note) {
  envelopeWrap.addEventListener('click', () => {
    envelopeWrap.classList.toggle('opened');
    const isOpen = envelopeWrap.classList.contains('opened');
    note.textContent = isOpen ? 'click to close' : 'click to open';
  });

  envelopeWrap.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      envelopeWrap.click();
    }
  });
}
