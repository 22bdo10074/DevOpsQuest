// 🌟 DevOpsQuest — Character Selection Script
document.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  const sfxSelect = document.getElementById("sfxSelect");
  const sfxClick = document.getElementById("sfxClick");
  const cards = document.querySelectorAll(".char-card");
  const startBtn = document.getElementById("startBtn");
  const energyPulse = document.querySelector(".energy-pulse");
  const body = document.body;
  let selectedHero = null;
  let bgmWasPlaying = false;

  // 🎵 Play background music
  if (bgm) {
    bgm.volume = 0.3;
    bgm.play().then(() => (bgmWasPlaying = true)).catch(() => {});
  }

  // 💾 Hero Image Map (must match your actual assets)
  const heroImages = {
    "Git Guardian": "assets/hero_git.png",
    "Docker Knight": "assets/hero_docker.png",
    "Kubernetes Sage": "assets/hero_kubernetes.png"
  };

  // 💫 Character selection
  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Play sound
      sfxSelect.currentTime = 0;
      sfxSelect.play().catch(() => {});

      // Highlight selected hero
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      // Store hero info
      selectedHero = card.dataset.hero;
      const heroImgPath = heroImages[selectedHero] || "assets/hero_default.png";

      localStorage.setItem("hero", selectedHero);
      localStorage.setItem("heroImage", heroImgPath);

      console.log(`✅ Hero selected: ${selectedHero} (${heroImgPath})`);

      // Cool visual effect
      energyPulse.style.animationPlayState = "paused";
      body.style.filter = "brightness(0.8)";
      setTimeout(() => {
        energyPulse.style.animationPlayState = "running";
        body.style.filter = "brightness(1)";
      }, 800);

      // Activate Enter button
      startBtn.classList.add("active");
      startBtn.disabled = false;
    });
  });

  // 🚀 Enter World button
  startBtn.addEventListener("click", () => {
    if (!selectedHero) {
      alert("⚠️ Please select a hero before continuing!");
      return;
    }

    sfxClick.play().catch(() => {});
    startBtn.textContent = "⚡ Entering DevOps Realm...";

    body.style.transition = "filter 1s ease-in-out";
    body.style.filter = "brightness(2)";

    setTimeout(() => {
      window.location.href = "world.html";
    }, 1500);
  });
});
