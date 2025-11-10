document.addEventListener("DOMContentLoaded", ()=>{
  // scenes can be extended
  const scenes = [
    {title:"Jenkins Tower", text:"The ancient CI/CD tower hums... new pipelines awaken."},
    {title:"Docker Dungeon", text:"Containers murmur as your Docker Knight enters."},
    {title:"Git Forest", text:"Branches rustle—conflicts lurk between trees."}
  ];
  let idx = 0;
  const el = document.getElementById("storyScreen");
  function show(){ el.innerHTML = `<h1>${scenes[idx].title}</h1><p>${scenes[idx].text}</p>`; }
  show();
  document.getElementById("nextBtn").addEventListener("click", ()=>{
    idx++;
    if(idx < scenes.length) show(); else window.location.href = "world.html";
  });
});
