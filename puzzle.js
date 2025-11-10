document.addEventListener("DOMContentLoaded", () => {
  console.log("🧩 Puzzle Arena Loaded");

  const dropZone = document.getElementById("dropZone");
  const commands = document.querySelectorAll(".draggable");
  const bugDialogue = document.getElementById("bugDialogue");
  const sfxSuccess = document.getElementById("sfxSuccess");
  const sfxFail = document.getElementById("sfxFail");
  const checkBtn = document.getElementById("checkBtn");
  const hintBtn = document.getElementById("hintBtn");
  const backWorldBtn = document.getElementById("backWorldBtn");

  // XP INIT
  let xp = parseInt(localStorage.getItem("xp") || "0");

  // Make commands draggable
  commands.forEach(cmd => {
    cmd.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", cmd.dataset.step);
      cmd.classList.add("dragging");
    });
    cmd.addEventListener("dragend", () => cmd.classList.remove("dragging"));
  });

  // Allow drop
  dropZone.addEventListener("dragover", e => e.preventDefault());
  dropZone.addEventListener("drop", e => {
    e.preventDefault();
    const step = e.dataTransfer.getData("text/plain");
    const dragged = document.querySelector(`[data-step='${step}']`);
    if (!dropZone.contains(dragged)) {
      dropZone.appendChild(dragged);
      bugDialogue.textContent = "🤔 Interesting… but is that right?";
    }
  });

  // Check Order
  checkBtn.addEventListener("click", () => {
    const order = [...dropZone.querySelectorAll(".draggable")].map(i => i.dataset.step);
    const correct = ["1", "2", "3", "4"];

    if (JSON.stringify(order) === JSON.stringify(correct)) {
      sfxSuccess.play();
      bugDialogue.textContent = "🎉 You fixed the pipeline! Jenkins is proud.";
      xp += 150;
      localStorage.setItem("xp", xp);

      checkBtn.textContent = "🏆 Mission Complete!";
      dropZone.style.borderColor = "#00ff90";

      setTimeout(() => {
        window.location.href = "world.html";
      }, 3000);
    } else {
      sfxFail.play();
      const funny = [
        "🐍 Syntax snake appears!",
        "😂 Jenkins spilled his coffee again!",
        "😅 Wrong order, commander!",
        "💀 You deployed before building!"
      ];
      bugDialogue.textContent = funny[Math.floor(Math.random() * funny.length)];
    }
  });

  hintBtn.addEventListener("click", () => {
    bugDialogue.textContent = "💡 Hint: Clone → Build → Deploy → Verify.";
  });

  backWorldBtn.addEventListener("click", () => {
    window.location.href = "world.html";
  });
});
