const starsContainer = document.querySelector('.stars');
const envelopeWrap = document.getElementById('envelopeWrap');
const note = document.querySelector('.note');
const bgMusic = document.getElementById('bgMusic');
const wishStars = document.querySelectorAll('.wish-star');
const wishReveal = document.getElementById('wishReveal');
const birthdayFlame = document.getElementById('birthdayFlame');
const candleMessage = document.getElementById('candleMessage');
const candleStars = document.querySelector('.candle-stars');

const tryPlayMusic = async () => {
  if (!bgMusic) return;

  try {
    await bgMusic.play();
  } catch (error) {
    // Browsers often block autoplay until the user interacts with the page.
  }
};

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
  const toggleEnvelope = () => {
    const wasOpen = envelopeWrap.classList.contains('opened');
    envelopeWrap.classList.toggle('opened');
    const isOpen = envelopeWrap.classList.contains('opened');
    note.textContent = isOpen ? 'click to close' : 'click to open';

    if (bgMusic) {
      if (isOpen && !wasOpen) {
        tryPlayMusic();
      } else if (!isOpen && wasOpen) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      }
    }
  };

  envelopeWrap.addEventListener('click', toggleEnvelope);

  envelopeWrap.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleEnvelope();
    }
  });
}

if (wishStars.length && wishReveal) {
  wishStars.forEach((star) => {
    star.addEventListener('click', () => {
      const wish = star.dataset.wish || 'A wish for your beautiful year ahead.';
      wishReveal.textContent = wish;
      wishReveal.classList.add('visible');

      wishStars.forEach((item) => item.classList.remove('active'));
      star.classList.add('active');
    });
  });
}

if (birthdayFlame && candleMessage && candleStars) {
  birthdayFlame.addEventListener('click', () => {
    if (birthdayFlame.classList.contains('blown')) return;

    birthdayFlame.classList.add('blown');
    birthdayFlame.setAttribute('aria-label', 'Candle blown out');
    candleMessage.textContent = 'May this year bring you all the love, peace, and dreams your heart is waiting for.';

    for (let i = 0; i < 18; i += 1) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.setProperty('--x', `${(Math.random() * 90 + 5).toFixed(2)}%`);
      sparkle.style.setProperty('--y', `${(Math.random() * 70 + 10).toFixed(2)}%`);
      sparkle.style.setProperty('--delay', `${(Math.random() * 0.5).toFixed(2)}s`);
      candleStars.appendChild(sparkle);
    }
  });
}

if (bgMusic) {
  window.addEventListener('load', () => {
    tryPlayMusic();
  });

  document.addEventListener('pointerdown', tryPlayMusic, { once: true });
  document.addEventListener('keydown', tryPlayMusic, { once: true });
}
