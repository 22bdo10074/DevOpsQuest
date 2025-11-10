// gitQuiz.js — Git MCQ Level 4
import { updateProgress } from "./progression.js";

document.addEventListener("DOMContentLoaded", () => {
  const questionBox = document.getElementById("questionBox");
  const optionsBox = document.getElementById("optionsBox");
  const nextBtn = document.getElementById("nextBtn");
  const result = document.getElementById("result");

  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");

  let current = 0;
  let score = 0;
  let xp = parseInt(localStorage.getItem("xp") || "0", 10);

  const questions = [
    {
      q: "1️⃣ What command initializes a new Git repository?",
      options: ["git start", "git init", "git new", "git repo"],
      answer: "git init"
    },
    {
      q: "2️⃣ Which command stages files for commit?",
      options: ["git add .", "git push", "git stage", "git store"],
      answer: "git add ."
    },
    {
      q: "3️⃣ What command records staged changes permanently?",
      options: ["git log", "git commit", "git save", "git apply"],
      answer: "git commit"
    },
    {
      q: "4️⃣ Which command shows commit history?",
      options: ["git history", "git log", "git commits", "git list"],
      answer: "git log"
    },
    {
      q: "5️⃣ Which command uploads local changes to GitHub?",
      options: ["git send", "git upload", "git push", "git merge"],
      answer: "git push"
    }
  ];

  function loadQuestion() {
    result.textContent = "";
    const q = questions[current];
    questionBox.textContent = q.q;
    optionsBox.innerHTML = "";
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => selectAnswer(opt);
      optionsBox.appendChild(btn);
    });
  }

  function selectAnswer(selected) {
    const correct = questions[current].answer;
    if (selected === correct) {
      score++;
      correctSound.play();
      result.textContent = "✅ Correct!";
      result.className = "correct";
    } else {
      wrongSound.play();
      result.textContent = "❌ Wrong!";
      result.className = "wrong";
    }
  }

  nextBtn.addEventListener("click", () => {
    if (current < questions.length - 1) {
      current++;
      loadQuestion();
    } else {
      finishQuiz();
    }
  });

  function finishQuiz() {
    const earnedXP = score * 40;
    xp += earnedXP;
    localStorage.setItem("xp", xp);
    updateProgress(xp);
    result.innerHTML = `🎉 Quiz Complete! You scored ${score}/5.<br>+${earnedXP} XP earned!`;
    setTimeout(() => {
      alert("🎯 Git Quest Complete!  unlocked: Docker Quest ⚙️");
      window.location.href = "dkerQuest.html";
    }, 1800);
  }

  loadQuestion();
});
