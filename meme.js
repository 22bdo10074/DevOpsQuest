document.addEventListener("DOMContentLoaded", () => {
  console.log("😂 Meme Zone Loaded Successfully");

  // Elements
  const memeImg = document.getElementById("memeImg");
  const memeQuestion = document.getElementById("memeQuestion");
  const memeOptions = document.getElementById("memeOptions");
  const memeFeedback = document.getElementById("memeFeedback");
  const nextMeme = document.getElementById("nextMeme");
  const exitWorld = document.getElementById("exitWorld");

  const sfxCorrect = document.getElementById("sfxCorrect");
  const sfxWrong = document.getElementById("sfxWrong");

  // Player XP
  let xp = parseInt(localStorage.getItem("xp") || "0");
  let currentIndex = 0;

  // 🧩 Meme Data
  const memes = [
    {
      img: "assets/meme1.png",
      question: "When someone does `git push --force` on main 😱",
      options: ["Totally fine 😎", "They fixed everything 🔥", "PANIC! They rewrote history 🚨"],
      correct: 2,
      reaction: "🤣 Jenkins fainted. Correct answer!"
    },
    {
      img: "assets/meme2.png",
      question: "Docker keeps rebuilding because…?",
      options: ["Cache was invalidated 🤯", "You forgot Dockerfile 🫣", "Because you love waiting 🕐"],
      correct: 0,
      reaction: "🐳 You’re right! Caching betrayed you!"
    },
    {
      img: "assets/meme3.png",
      question: "Kubernetes shows 'CrashLoopBackOff' 😅",
      options: ["Everything’s fine 🌈", "Pod is panicking 💀", "Network cable unplugged? 🧠"],
      correct: 1,
      reaction: "☸️ Great debugging! Pods respect you now!"
    }
  ];

  // Load Meme
  function loadMeme() {
    const meme = memes[currentIndex];
    memeImg.src = meme.img;
    memeQuestion.textContent = meme.question;
    memeOptions.innerHTML = "";
    memeFeedback.textContent = "";
    nextMeme.hidden = true;

    meme.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.classList.add("meme-option-btn");
      btn.addEventListener("click", () => checkAnswer(i));
      memeOptions.appendChild(btn);
    });
  }

  // Check Answer
  function checkAnswer(index) {
    const meme = memes[currentIndex];
    if (index === meme.correct) {
      memeFeedback.textContent = meme.reaction;
      memeFeedback.className = "meme-feedback correct";
      sfxCorrect.play().catch(() => {});
      xp += 50;
      localStorage.setItem("xp", xp);
      nextMeme.hidden = false;
    } else {
      memeFeedback.textContent = "💀 Jenkins disapproves. Try again.";
      memeFeedback.className = "meme-feedback wrong";
      sfxWrong.play().catch(() => {});
    }
  }

  // Next Meme
  nextMeme.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < memes.length) {
      loadMeme();
    } else {
      memeFeedback.textContent = "🏆 All memes done! +150 XP earned!";
      localStorage.setItem("xp", xp + 150);
      setTimeout(() => {
        window.location.href = "meme.html";
      }, 3000);
    }
  });

  // Exit
  exitWorld.addEventListener("click", () => {
    window.location.href = "world.html";
  });

  // Initialize
  loadMeme();
});
