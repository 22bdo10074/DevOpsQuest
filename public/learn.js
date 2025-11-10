document.addEventListener("DOMContentLoaded", () => {
  const learnTitle = document.getElementById("learnTitle");
  const lessonTitle = document.getElementById("lessonTitle");
  const lessonDesc = document.getElementById("lessonDesc");
  const startMission = document.getElementById("startMission");
  const backWorld = document.getElementById("backWorld");
  const sfxClick = document.getElementById("sfxClick");

  const currentQuest = localStorage.getItem("selectedQuest") || "Git Quest";

  const lessons = {
    "Git Quest": {
      title: "Learn Git Basics",
      desc: `
      Git is a version control system that tracks code changes.
      - Initialize with \`git init\`
      - Add files using \`git add .\`
      - Commit with \`git commit -m "message"\`
      - View logs with \`git log\`
      `
    },
    "Docker Quest": {
      title: "Learn Docker Fundamentals",
      desc: `
      Docker is used to build and run containers.
      - Build image: \`docker build -t app .\`
      - Run container: \`docker run -d -p 8080:80 app\`
      - List containers: \`docker ps\`
      `
    },
    "Kubernetes Quest": {
      title: "Learn Kubernetes Essentials",
      desc: `
      Kubernetes orchestrates your containers.
      - Get pods: \`kubectl get pods\`
      - Deploy apps: \`kubectl apply -f app.yaml\`
      - View services: \`kubectl get svc\`
      `
    }
  };

  const data = lessons[currentQuest];
  learnTitle.textContent = `📘 ${currentQuest}`;
  lessonTitle.textContent = data.title;
  lessonDesc.innerHTML = data.desc;

  startMission.addEventListener("click", () => {
    sfxClick.play().catch(() => {});
    window.location.href = "mission.html";
  });

  backWorld.addEventListener("click", () => {
    window.location.href = "world.html";
  });
});
