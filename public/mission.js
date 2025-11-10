// 🌟 mission.js — Multi-Stage Quest Flow (Level 14)
import { updateProgress } from "./progression.js";

document.addEventListener("DOMContentLoaded", () => {
  const terminalOutput = document.getElementById("terminalOutput");
  const userInput = document.getElementById("userInput");
  const submitBtn = document.getElementById("submitBtn");
  const hintBtn = document.getElementById("hintBtn");
  const nextBtn = document.getElementById("nextBtn");
  const exitBtn = document.getElementById("exitBtn");

  const currentQuest = localStorage.getItem("selectedQuest") || "Git Quest";
  document.getElementById("missionTitle").textContent = `⚔️ Mission: ${currentQuest}`;

  const sfxCorrect = document.getElementById("sfxCorrect");
  const sfxWrong = document.getElementById("sfxWrong");

  let xp = parseInt(localStorage.getItem("xp") || "0", 10);
  updateProgress(xp);

  // =====================
  // 💡 QUESTION STAGES
  // =====================
  const missionBank = {
    "Git Quest": [
      { q: "🧙 Command to initialize a Git repository?", a: ["git init"], hint: "Start your repo." },
      { q: "📂 Command to check Git status?", a: ["git status"], hint: "See changes before committing." },
      { q: "💾 Command to commit changes?", a: ["git commit -m 'message'"], hint: "Write your commit message." }
    ],
    "Docker Quest": [
      { q: "🐳 Command to build Docker image?", a: ["docker build -t myimage ."], hint: "Use docker build -t." },
      { q: "🚀 Command to run a Docker container?", a: ["docker run -d -p 8080:80 myimage"], hint: "Run your container in detached mode." },
      { q: "🧱 Command to list containers?", a: ["docker ps", "docker container ls"], hint: "Use ps to see running containers." }
    ]
  };

  // =====================
  // 🧩 PUZZLE STAGES
  // =====================
  const puzzles = {
    "Git Quest": {
      question: "🧩 Arrange these Git commands in the correct order:\n[A] git add .\n[B] git commit -m 'msg'\n[C] git init",
      answer: "cab",
      hint: "Think initialization → add → commit"
    },
    "Docker Quest": {
      question: "🧩 Arrange Docker lifecycle commands:\n[A] docker build\n[B] docker run\n[C] docker ps",
      answer: "abc",
      hint: "Build → Run → Check"
    }
  };

  let questionIndex = 0;
  let stage = "MCQ"; // can be "MCQ" → "Puzzle" → "Complete"
  const questions = missionBank[currentQuest];

  printToTerminal(`🧩 ${questions[questionIndex].q}`);

  // =====================
  // 💬 TERMINAL OUTPUT
  // =====================
  function printToTerminal(text, type = "normal") {
    const line = document.createElement("p");
    line.textContent = text;
    line.style.color = type === "error" ? "#ff4d4d" : type === "success" ? "#00ffcc" : "#fff";
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // =====================
  // 🎮 CHECK ANSWERS
  // =====================
  function handleAnswer(input) {
    if (stage === "MCQ") {
      const correctAnswers = questions[questionIndex].a.map(a => a.toLowerCase());
      if (correctAnswers.includes(input)) {
        sfxCorrect.play().catch(() => {});
        xp += 40;
        localStorage.setItem("xp", xp);
        updateProgress(xp);
        printToTerminal("✅ Correct!", "success");
        questionIndex++;

        if (questionIndex < questions.length) {
          printToTerminal(`🧩 ${questions[questionIndex].q}`);
        } else {
          printToTerminal("🎯 All CLI Game completed. Unlocking puzzle stage...");
          stage = "Puzzle";
          setTimeout(() => startPuzzleStage(), 2000);
        }
      } else {
        sfxWrong.play().catch(() => {});
        printToTerminal("❌ Wrong! Try again...", "error");
      }
    } else if (stage === "Puzzle") {
      if (input === puzzles[currentQuest].answer) {
        printToTerminal("🧠 Puzzle solved! +100 XP bonus!", "success");
        xp += 100;
        localStorage.setItem("xp", xp);
        updateProgress(xp);
        stage = "Complete";
        setTimeout(() => missionComplete(), 2000);
      } else {
        printToTerminal("🌀 Try again! Hint: " + puzzles[currentQuest].hint, "error");
      }
    }
  }

  // =====================
  // 🧩 PUZZLE STAGE
  // =====================
  function startPuzzleStage() {
    const puzzle = puzzles[currentQuest];
    printToTerminal(puzzle.question);
  }

  // =====================
  // 🏁 COMPLETE MISSION
  // =====================
  function missionComplete() {
    printToTerminal("🎉 Mission Complete! Level Up!", "success");

    // Unlock next quest
    let unlocked = JSON.parse(localStorage.getItem("unlockedQuests") || "[]");
    if (currentQuest === "Git Quest" && !unlocked.includes("Docker Quest")) unlocked.push("Docker Quest");
    else if (currentQuest === "Docker Quest" && !unlocked.includes("Kubernetes Quest")) unlocked.push("Kubernetes Quest");
    localStorage.setItem("unlockedQuests", JSON.stringify(unlocked));

    nextBtn.hidden = false;
  }

  // =====================
  // 🎮 EVENT HANDLERS
  // =====================
  submitBtn.addEventListener("click", () => {
    const input = userInput.value.trim().toLowerCase();
    if (input) handleAnswer(input);
    userInput.value = "";
  });

  hintBtn.addEventListener("click", () => {
    if (stage === "MCQ") printToTerminal("💡 " + questions[questionIndex].hint);
    else if (stage === "Puzzle") printToTerminal("💡 " + puzzles[currentQuest].hint);
  });

  nextBtn.addEventListener("click", () => {
  alert("🎉 Level Up! You reached Level 2!");
  setTimeout(() => {
    window.location.href = "gitPuzzle.html";
  }, 1000);
});

  exitBtn.addEventListener("click", () => window.location.href = "world.html");
});
setTimeout(() => {
  window.location.href = "dockerPuzzle.html";
}, 3000);
