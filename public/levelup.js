document.addEventListener("DOMContentLoaded", ()=>{
  const level = parseInt(localStorage.getItem("level") || "1", 10);
  const levelNames = ["Git Guardian","Docker Knight","Kubernetes Sage","Jenkins Master","Cloud Lord"];
  document.getElementById("levelText").textContent = `⚡ LEVEL ${level} UNLOCKED!`;
  document.getElementById("levelDesc").textContent = `You are now: ${levelNames[level-1] || "DevOps Legend"}`;
  document.getElementById("continueBtn").addEventListener("click", ()=> {
    window.location.href = "story.html";
  });
});
