// audioManager.js
let bgm;

export function startBGM() {
  if (!bgm) {
    bgm = new Audio("assets/bgm.mp3");
    bgm.loop = true;
    bgm.volume = 0.5;
    bgm.play().catch(() => {
      console.log("BGM autoplay blocked until user interacts.");
    });
  }
}

export function playClick() {
  const sfx = new Audio("assets/sfx_click.mp3");
  sfx.volume = 0.7;
  sfx.play();
}
