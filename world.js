// 🌍 DevOpsQuest – world.js
import { updateProgress } from "./progression.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ world.js loaded");

  // DOM Elements
  const questModal = document.getElementById("questModal");
  const questTitle = document.getElementById("questTitle");
  const questDesc = document.getElementById("questDesc");
  const startQuest = document.getElementById("startQuest");
  const closeModal = document.getElementById("closeModal");
  const quests = document.querySelectorAll(".quest");
  const bgm = document.getElementById("bgmWorld");
  const xpFill = document.getElementById("xpFill");
  const xpValue = document.getElementById("xpValue");
  const levelDisplay = document.getElementById("levelDisplay");
  const leaderboardBtn = document.getElementById("leaderboardBtn");
  const backBtn = document.getElementById("backBtn");

  // XP & Level Initialization
  let xp = parseInt(localStorage.getItem("xp") || "0");
  let level = parseInt(localStorage.getItem("level") || "1");
  updateProgress(xp);
  xpValue.textContent = xp;
  levelDisplay.textContent = `Level ${level}`;

  // Background Music 🎵
  if (bgm) {
    bgm.volume = 0.3;
    bgm.play().catch(() => {});
  }

  // Quest Descriptions
  const questDetails = {
    "Git Quest": "Learn Git fundamentals — commits, branches, merges, teamwork 🧠",
    "Docker Quest": "Master Docker — build, ship, and run containers 🐳",
    "Kubernetes Quest": "Orchestrate containers at scale using K8s ☸️",
  };

  // Handle Quest Click
  quests.forEach((quest) => {
    quest.addEventListener("click", () => {
      questTitle.textContent = quest.dataset.quest;
      questDesc.textContent = questDetails[quest.dataset.quest];
      questModal.style.display = "flex";
    });
  });

  // Close Modal
  closeModal.addEventListener("click", () => {
    questModal.style.display = "none";
  });

  // Start Quest
  startQuest.addEventListener("click", () => {
    const quest = questTitle.textContent;
    questModal.style.display = "none";

    // Fade out BGM smoothly before transition
    if (bgm && !bgm.paused) {
      let fade = setInterval(() => {
        if (bgm.volume > 0.05) bgm.volume -= 0.05;
        else {
          bgm.pause();
          bgm.volume = 0.3;
          clearInterval(fade);
        }
      }, 60);
    }

    let nextPage = "learn.html";
    if (quest === "Docker Quest") nextPage = "dockerCli.html";
    if (quest === "Kubernetes Quest") nextPage = "kubernetesQuest.html";

    setTimeout(() => (window.location.href = nextPage), 800);
  });

  // 🏆 Leaderboard Button (FIXED)
  leaderboardBtn.addEventListener("click", () => {
    console.log("🏆 Opening Leaderboard...");

    // Fade out background music for smooth transition
    if (bgm && !bgm.paused) {
      let fade = setInterval(() => {
        if (bgm.volume > 0.05) bgm.volume -= 0.05;
        else {
          bgm.pause();
          bgm.volume = 0.3;
          clearInterval(fade);
        }
      }, 60);
    }

    // Redirect to leaderboard page
    setTimeout(() => {
      window.location.href = "leaderboard.html";
    }, 700);
  });

  // 🔙 Back Button
  backBtn.addEventListener("click", () => {
    console.log("🔙 Going back to Character screen...");
    window.location.href = "character.html";
  });

  // 🎊 Confetti Celebration + Level-Up Transition
  function showLevelUpPopup(newLevel, nextQuestName) {
    const popup = document.createElement("div");
    popup.className = "levelup-popup";
    popup.innerHTML = `
      <div class="popup-content">
        <h2>🎉 Level Up!</h2>
        <p>You reached <strong>Level ${newLevel}</strong>!</p>
        <p style="color:#00ffc8;font-size:1.1em;">Proceed to ${nextQuestName} 🚀</p>
        <button id="startNextQuest" class="primary">Start Quest</button>
      </div>
    `;
    Object.assign(popup.style, {
      position: "fixed",
      top: "0", left: "0", right: "0", bottom: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,20,0.85)",
      zIndex: "99999"
    });
    document.body.appendChild(popup);
    launchConfetti();

    document.getElementById("startNextQuest").addEventListener("click", () => {
      popup.remove();
      openNextQuest(nextQuestName);
    });
  }

  function openNextQuest(questName) {
    questTitle.textContent = questName;
    questDesc.textContent = questDetails[questName] || "Continue your DevOps journey!";
    questModal.style.display = "flex";
  }

  // 🎊 Confetti Animation
  function launchConfetti() {
    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
      pointerEvents: "none", zIndex: "100000"
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const confetti = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      size: Math.random() * 6 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      speed: Math.random() * 3 + 2,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speed;
        if (p.y > window.innerHeight) p.y = -10;
      });
      requestAnimationFrame(draw);
    }
    draw();
    setTimeout(() => canvas.remove(), 3000);
  }

  
});
