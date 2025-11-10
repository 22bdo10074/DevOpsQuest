// gitPuzzle.js — Level 3: Git Puzzle Challenge
// Redirects to gitQuiz.html (Level 4) after success
import { updateProgress } from "./progression.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get HTML elements
  const bank = document.getElementById("bank");
  const drop = document.getElementById("drop");
  const checkBtn = document.getElementById("checkBtn");
  const hintBtn = document.getElementById("hintBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const resetBtn = document.getElementById("resetBtn");
  const resultEl = document.getElementById("result");
  const sfxSuccess = document.getElementById("sfxSuccess");
  const sfxFail = document.getElementById("sfxFail");

  // ✅ Define Git commands (correct order)
  const commandsData = [
    { id: "c1", text: "git init" },
    { id: "c2", text: "git add ." },
    { id: "c3", text: 'git commit -m "message"' },
  ];
  const correctOrder = commandsData.map((c) => c.text);

  let dragged = null;
  let xp = parseInt(localStorage.getItem("xp") || "0", 10);

  // 🔁 Shuffle utility
  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // 🧱 Render draggable command buttons
  function renderBank(list) {
    bank.innerHTML = "";
    list.forEach((item) => {
      const cmd = document.createElement("div");
      cmd.className = "cmd";
      cmd.draggable = true;
      cmd.dataset.id = item.id;
      cmd.textContent = item.text;
      cmd.setAttribute("tabindex", "0");
      bank.appendChild(cmd);

      // 🎯 Drag events
      cmd.addEventListener("dragstart", (e) => {
        dragged = cmd;
        cmd.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });
      cmd.addEventListener("dragend", () => {
        cmd.classList.remove("dragging");
        dragged = null;
      });

      // Keyboard drag support
      cmd.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          drop.appendChild(cmd);
        }
      });
    });
  }

  // 🧩 Drop zone logic
  drop.addEventListener("dragover", (e) => e.preventDefault());
  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    if (dragged) {
      drop.appendChild(dragged);
      resultEl.textContent = "";
      drop.classList.remove("shake");
    }
  });

  // 🧮 Function: check current order
  checkBtn.addEventListener("click", () => {
    const items = Array.from(drop.children).filter((el) =>
      el.classList.contains("cmd")
    );
    const dropped = items.map((i) => i.textContent.trim());

    if (dropped.length !== correctOrder.length) {
      showResult("⚠️ Drop all commands before checking!", "error");
      return;
    }

    const correct = JSON.stringify(dropped) === JSON.stringify(correctOrder);

    if (correct) {
      // ✅ Correct order
      playSound(sfxSuccess);
      showResult("🎉 Correct! Git workflow mastered! +150 XP", "success");

      // Update XP & Level
      xp += 150;
      localStorage.setItem("xp", xp);
      updateProgress(xp);

      // Add a small celebration delay
      setTimeout(() => {
        alert("🎯 Level Up! You reached Level 3! Next: Git MCQ Challenge ⚔️");
        window.location.href = "gitQuiz.html"; // redirect to MCQ page
      }, 1800);
    } else {
      // ❌ Incorrect
      playSound(sfxFail);
      showResult("❌ Incorrect order! Try again.", "error");
      drop.classList.add("shake");
      setTimeout(() => drop.classList.remove("shake"), 600);
    }
  });

  // 💡 Hint button
  hintBtn.addEventListener("click", () => {
    showResult(
      "💡 Hint: First initialize the repo, then stage files, then commit.",
      "error"
    );
  });

  // 🔀 Shuffle
  shuffleBtn.addEventListener("click", () => {
    renderBank(shuffled(commandsData));
    resetDrop();
    showResult("🔀 Commands shuffled. Try again!", "error");
  });

  // ♻ Reset
  resetBtn.addEventListener("click", () => {
    renderBank(commandsData);
    resetDrop();
    showResult("♻ Reset to original order.", "error");
  });

  // 🎧 Helper: play sound
  function playSound(sound) {
    try {
      sound.currentTime = 0;
      sound.play();
    } catch (e) {}
  }

  // 🪄 Helper: show result
  function showResult(text, type) {
    resultEl.textContent = text;
    resultEl.className = type === "success" ? "success" : "error";
  }

  // 🧼 Helper: reset drop zone
  function resetDrop() {
    Array.from(drop.children).forEach((ch) => {
      if (ch.classList.contains("cmd")) bank.appendChild(ch);
    });
  }

  // Render puzzle initially
  renderBank(shuffled(commandsData));
});
