document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.char-card');
  const preview = document.getElementById('preview');
  const previewImg = document.getElementById('previewImg');
  const previewName = document.getElementById('previewName');
  const playerName = document.getElementById('playerName');
  const confirmBtn = document.getElementById('confirmBtn');
  const backBtn = document.getElementById('backBtn');
  const bgm = document.getElementById('bgm');
  const sfxClick = document.getElementById('sfxClick');
  const sfxSelect = document.getElementById('sfxSelect');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const ctx = confettiCanvas.getContext('2d');

  confettiCanvas.width = innerWidth;
  confettiCanvas.height = innerHeight;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      playSound(sfxClick);
      previewImg.src = card.querySelector('img').src;
      previewName.textContent = card.querySelector('strong').textContent;
      preview.hidden = false;
      playSound(sfxSelect);
      spawnConfetti();
    });
  });

  backBtn.addEventListener('click', () => {
    preview.hidden = true;
  });

 confirmBtn.addEventListener('click', () => {
  playSound(sfxSelect);
  setTimeout(() => {
    window.location.href = "world.html";
  }, 1000);
});

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  function spawnConfetti() {
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: innerWidth / 2,
        y: innerHeight / 2,
        color: ['#14f2ff', '#facc15', '#7cf57b'][Math.floor(Math.random() * 3)],
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 8,
        size: 5 + Math.random() * 5
      });
    }

    function animate() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.dy += 0.2;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
});
