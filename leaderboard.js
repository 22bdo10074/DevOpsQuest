document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Leaderboard loaded");

  const sfxClick = document.getElementById("sfxClick");
  const backToWorld = document.getElementById("backToWorld");
  const leaderboardBody = document.getElementById("leaderboardBody");

  // Fetch player data
  const hero = localStorage.getItem("hero") || "Unknown Hero";
  const xp = parseInt(localStorage.getItem("xp") || "0");
  const level = parseInt(localStorage.getItem("level") || "1");

  // Get leaderboard data
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

  // Update or add player
  const existing = leaderboard.find((p) => p.hero === hero);
  if (existing) {
    existing.xp = xp;
    existing.level = level;
  } else {
    leaderboard.push({ hero, xp, level });
  }

  // Sort leaderboard by XP
  leaderboard.sort((a, b) => b.xp - a.xp);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  // Clear previous content
  leaderboardBody.innerHTML = "";

  // Populate leaderboard with animation
  leaderboard.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${localStorage.getItem("heroImage") || 'assets/hero.png'}" class="hero-icon"> ${p.hero}</td>

      <td>#${i + 1}</td>
      <td>${p.hero}</td>
      <td>${p.xp}</td>
      <td>${p.level}</td>
    `;

    // 🥇🥈🥉 Add top 3 colors
    if (i === 0) row.classList.add("gold");
    else if (i === 1) row.classList.add("silver");
    else if (i === 2) row.classList.add("bronze");

    // 🎞️ Slide-in animation delay per row
    row.style.animationDelay = `${i * 0.15}s`;

    leaderboardBody.appendChild(row);
  });

  // 🎵 Back button
  backToWorld.addEventListener("click", () => {
    sfxClick.play().catch(() => {});
    window.location.href = "world.html";
  });
});
