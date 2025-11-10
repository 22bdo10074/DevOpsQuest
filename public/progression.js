// progression.js
// XP / Leveling system for DevOpsQuest (Level 13-ready)
// Exports: updateProgress, addXP, getXP, getLevel, resetProgress, onLevelUp
// Usage: import { updateProgress, addXP } from './progression.js';

const STORAGE_XP_KEY = "xp";
const STORAGE_LEVEL_KEY = "level";
const STORAGE_UNLOCKED_KEY = "unlockedQuests";

// UI element ids (update these if your HTML uses different ids)
const ID_XP_FILL = "xpFill";
const ID_XP_VALUE = "xpValue";
const ID_LEVEL = "levelDisplay";
const ID_HERO_XP = "heroXP";
const LEVEL_UP_CLASS = "level-up"; // CSS class for level up animation

let levelUpCallbacks = [];

/* -----------------------------
   Leveling math
   -----------------------------
   We use a progressive XP requirement:
   nextLevelXP(level) = base * level
   where base = 200 (easy to tune).
   So:
     Level 1 -> need 200 XP to reach level 2
     Level 2 -> need 400 XP to reach level 3
     ...
   This is simple and grows linearly.
   ----------------------------- */

const BASE_XP_PER_LEVEL = 200;

function nextLevelXP(level) {
  // XP required to reach the next level from level 'level'
  return BASE_XP_PER_LEVEL * level;
}

function computeLevelFromXP(totalXP) {
  // derive level from xp by subtracting levels until xp left less than required
  let lvl = 1;
  let remaining = Number(totalXP) || 0;
  while (remaining >= nextLevelXP(lvl)) {
    remaining -= nextLevelXP(lvl);
    lvl++;
    // safety: prevent runaway loops
    if (lvl > 9999) break;
  }
  return { level: lvl, xpIntoLevel: remaining, xpForNext: nextLevelXP(lvl) };
}

/* -----------------------------
   Storage helpers
   ----------------------------- */
function getXP() {
  return parseInt(localStorage.getItem(STORAGE_XP_KEY) || "0", 10);
}

function getLevel() {
  return parseInt(localStorage.getItem(STORAGE_LEVEL_KEY) || "1", 10);
}

function saveXP(xp) {
  localStorage.setItem(STORAGE_XP_KEY, String(xp));
}

function saveLevel(level) {
  localStorage.setItem(STORAGE_LEVEL_KEY, String(level));
}

/* -----------------------------
   DOM helpers
   ----------------------------- */
function $(id) {
  return document.getElementById(id);
}

function setTextIfExists(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function setWidthIfExists(id, pct) {
  const el = $(id);
  if (el) el.style && (el.style.width = pct + "%");
}

/* -----------------------------
   Visual update
   ----------------------------- */
export function updateProgress(totalXP) {
  // ensure numeric
  totalXP = parseInt(totalXP || 0, 10);
  if (isNaN(totalXP)) totalXP = 0;

  // determine computed level & progress
  const { level, xpIntoLevel, xpForNext } = computeLevelFromXP(totalXP);

  // persist if changed
  saveXP(totalXP);
  saveLevel(level);

  // update UI
  setTextIfExists(ID_XP_VALUE, `${totalXP}`);
  setTextIfExists(ID_LEVEL, `Level ${level}`);
  setTextIfExists(ID_HERO_XP, `${totalXP}`);

  // percent within current level (0 - 100)
  const percent = Math.min(100, Math.round((xpIntoLevel / xpForNext) * 100));
  setWidthIfExists(ID_XP_FILL, percent);

  // small glow animation on xp value
  const xpEl = $(ID_XP_VALUE);
  if (xpEl) {
    xpEl.classList.add("xp-glow");
    setTimeout(() => xpEl.classList.remove("xp-glow"), 700);
  }

  return { totalXP, level, xpIntoLevel, xpForNext, percent };
}

/* -----------------------------
   Add XP and Level Up
   ----------------------------- */
export function addXP(amount, { reason } = {}) {
  amount = parseInt(amount || 0, 10);
  if (!amount || isNaN(amount)) return null;

  const oldXP = getXP();
  const newXP = oldXP + amount;

  // compute old/new levels
  const oldLevel = computeLevelFromXP(oldXP).level;
  const { level: newLevel } = computeLevelFromXP(newXP);

  // save and update UI
  saveXP(newXP);
  updateProgress(newXP);

  // if leveled up, trigger callbacks & visual
  if (newLevel > oldLevel) {
    saveLevel(newLevel);
    fireLevelUp(newLevel, { gainedXP: amount, reason });
  }

  return { newXP, newLevel, oldLevel };
}

function fireLevelUp(newLevel, meta = {}) {
  console.log(`🎉 Level Up! Reached level ${newLevel}`, meta);

  // add a class to the level display element to animate
  const lvlEl = $(ID_LEVEL);
  if (lvlEl) {
    lvlEl.classList.add(LEVEL_UP_CLASS);
    setTimeout(() => lvlEl.classList.remove(LEVEL_UP_CLASS), 1400);
  }

  // call registered callbacks
  for (const cb of levelUpCallbacks) {
    try { cb(newLevel, meta); } catch (e) { console.error(e); }
  }
}

/* allow other modules to listen for level ups */
export function onLevelUp(cb) {
  if (typeof cb === "function") levelUpCallbacks.push(cb);
  return () => {
    const i = levelUpCallbacks.indexOf(cb);
    if (i > -1) levelUpCallbacks.splice(i, 1);
  };
}

/* -----------------------------
   Reset / Utilities
   ----------------------------- */
export function resetProgress() {
  localStorage.setItem(STORAGE_XP_KEY, "0");
  localStorage.setItem(STORAGE_LEVEL_KEY, "1");
  localStorage.setItem(STORAGE_UNLOCKED_KEY, JSON.stringify(["Git Quest"]));
  updateProgress(0);
}

/* -----------------------------
   Cross-tab sync
   ----------------------------- */
window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_XP_KEY || e.key === STORAGE_LEVEL_KEY) {
    const xp = getXP();
    updateProgress(xp);
  }
});

/* -----------------------------
   Initialization: ensure keys exist & update UI on load
   ----------------------------- */
(function init() {
  if (!localStorage.getItem(STORAGE_XP_KEY)) localStorage.setItem(STORAGE_XP_KEY, "0");
  if (!localStorage.getItem(STORAGE_LEVEL_KEY)) localStorage.setItem(STORAGE_LEVEL_KEY, "1");
  if (!localStorage.getItem(STORAGE_UNLOCKED_KEY)) localStorage.setItem(STORAGE_UNLOCKED_KEY, JSON.stringify(["Git Quest"]));

  // initial UI refresh after DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => updateProgress(getXP()));
  } else {
    updateProgress(getXP());
  }
})();

/* -----------------------------
   Export small helpers
   ----------------------------- */
export { getXP, getLevel };

/* -----------------------------
   Example CSS classes (put in your style.css)
   -----------------------------
.xp-glow { transition: box-shadow .25s ease; box-shadow: 0 0 8px rgba(0,255,200,.6); }
.level-up { animation: levelUpPulse 1.2s ease; }
@keyframes levelUpPulse {
  0% { transform: scale(1); text-shadow: 0 0 0 rgba(255,255,255,0); }
  30% { transform: scale(1.08); text-shadow: 0 0 14px rgba(255,200,60,0.9); }
  100% { transform: scale(1); text-shadow: none; }
}
   ----------------------------- */

