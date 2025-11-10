import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

document.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  const portalSound = document.getElementById("portalSound");
  const form = document.getElementById("loginForm");
  const googleBtn = document.querySelector(".social.google");
  const githubBtn = document.querySelector(".social.github");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // 🎵 Background Music
  bgm.volume = 0.2;
  bgm.play().catch(() => {
    document.body.addEventListener("click", () => bgm.play(), { once: true });
  });

  // 🧠 Supabase Setup (Use your keys here)
  const SUPABASE_URL = "https://fqadhqcbhvioyflahslh.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxYWRocWNiaHZpb3lmbGFoc2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MTU0NjIsImV4cCI6MjA3ODI5MTQ2Mn0.GUjD-8fH47zBoZiJsB01olkypMU3OND61t0wqLvjO5c";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // ✉️ Email Login / Auto Signup
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    portalSound.play();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        const { data: signup, error: signupError } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        });
        if (!signupError) {
          alert("🆕 Account created successfully!");
          portalTransition();
        } else {
          alert("❌ " + signupError.message);
        }
      } else {
        alert("❌ " + error.message);
      }
    } else {
      portalTransition();
    }
  });

  // 🌐 Google Login
  googleBtn.addEventListener("click", async () => {
    portalSound.play();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/character.html",
      },
    });
    if (error) alert("❌ Google login failed: " + error.message);
  });

  // 🐙 GitHub Login
  githubBtn.addEventListener("click", async () => {
    portalSound.play();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin + "/character.html",
      },
    });
    if (error) alert("❌ GitHub login failed: " + error.message);
  });

  // 💫 Portal Transition Effect
  function portalTransition() {
    document.body.style.transition = "all 2s ease-in-out";
    document.body.style.filter = "brightness(3)";
    document.querySelector(".portal-container").style.transform = "scale(1.05)";
    setTimeout(() => (window.location.href = "character.html"), 1500);
  }
});
