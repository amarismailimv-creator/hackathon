// ---------- Flags: each one is a small SVG drawn from simple shapes ----------
const svg = body => "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">${body}</svg>`);
const rect = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
const circle = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
const polygon = (points, fill) => `<polygon points="${points}" fill="${fill}"/>`;
const full = fill => rect(0, 0, 30, 20, fill);
const rows = (...colors) => colors.map((c, i) => rect(0, i * 20 / colors.length, 30, 20 / colors.length + .02, c)).join("");
const cols = (...colors) => colors.map((c, i) => rect(i * 30 / colors.length, 0, 30 / colors.length + .02, 20, c)).join("");
const nordic = (bg, cross) => full(bg) + rect(8, 0, 3, 20, cross) + rect(0, 8.5, 30, 3, cross);

function star(cx, cy, size, fill) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? size * 0.4 : size;
    points.push((cx + radius * Math.cos(angle)).toFixed(2) + "," + (cy + radius * Math.sin(angle)).toFixed(2));
  }
  return polygon(points.join(" "), fill);
}

const wing = "M14.5 8.5L9.5 4.5L7.5 6L8.6 7L6.3 8.6L8.4 9.6L7.6 11.2L10.3 11.6L11.4 13.2L14.5 12.5Z";
const eagle = `<g fill="#000"><path d="${wing}"/><path d="${wing}" transform="translate(30 0) scale(-1 1)"/>
  <ellipse cx="15" cy="11" rx="2.3" ry="3.6"/><rect x="13.2" y="6.4" width="3.6" height="3"/>
  <circle cx="13.6" cy="6.4" r="1.1"/><circle cx="16.4" cy="6.4" r="1.1"/>
  <polygon points="12.6,6 11,6.9 12.6,7.3"/><polygon points="17.4,6 19,6.9 17.4,7.3"/>
  <polygon points="13.4,14 16.6,14 17.2,16.8 15,16 12.8,16.8"/></g>`;

let chakra = "";
for (let i = 0; i < 24; i++) {                       // the 24 spokes of India's wheel
  const a = i * Math.PI / 12;
  chakra += `<line x1="15" y1="10" x2="${(15 + 2.5 * Math.cos(a)).toFixed(3)}" y2="${(10 + 2.5 * Math.sin(a)).toFixed(3)}"/>`;
}

// [country name, flag drawing]
const countryList = [
  ["France", cols("#0055A4", "#fff", "#EF4135")],
  ["Germany", rows("#000", "#DD0000", "#FFCE00")],
  ["Italy", cols("#009246", "#fff", "#CE2B37")],
  ["Ireland", cols("#169B62", "#fff", "#FF883E")],
  ["Netherlands", rows("#AE1C28", "#fff", "#21468B")],
  ["Belgium", cols("#000", "#FAE042", "#ED2939")],
  ["Austria", rows("#ED2939", "#fff", "#ED2939")],
  ["Poland", rows("#fff", "#DC143C")],
  ["Ukraine", rows("#0057B7", "#FFD700")],
  ["Romania", cols("#002B7F", "#FCD116", "#CE1126")],
  ["Hungary", rows("#CE2939", "#fff", "#477050")],
  ["Russia", rows("#fff", "#0039A6", "#D52B1E")],
  ["Colombia", rect(0, 0, 30, 10, "#FCD116") + rect(0, 10, 30, 5, "#003893") + rect(0, 15, 30, 5, "#CE1126")],
  ["Japan", full("#fff") + circle(15, 10, 6, "#BC002D")],
  ["Switzerland", full("#DA291C") + rect(13, 4, 4, 12, "#fff") + rect(9, 8, 12, 4, "#fff")],
  ["Sweden", nordic("#006AA7", "#FECC02")],
  ["Denmark", nordic("#C8102E", "#fff")],
  ["Finland", nordic("#fff", "#003580")],
  ["Norway", full("#BA0C2F") + rect(7, 0, 6, 20, "#fff") + rect(0, 7, 30, 6, "#fff") + rect(8.5, 0, 3, 20, "#00205B") + rect(0, 8.5, 30, 3, "#00205B")],
  ["Greece", rows(...[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => i % 2 ? "#fff" : "#0D5EAF")) + rect(0, 0, 11.12, 11.12, "#0D5EAF") + rect(4.56, 0, 2, 11.12, "#fff") + rect(0, 4.56, 11.12, 2, "#fff")],
  ["Brazil", full("#009C3B") + polygon("15,2 27,10 15,18 3,10", "#FFDF00") + circle(15, 10, 4.2, "#002776")],
  ["India", rows("#FF9933", "#fff", "#138808") + `<g stroke="#000080" fill="none" stroke-width=".18"><circle cx="15" cy="10" r="2.5" stroke-width=".3"/><circle cx="15" cy="10" r=".35" fill="#000080"/>${chakra}</g>`],
  ["Turkey", full("#E30A17") + circle(11, 10, 5, "#fff") + circle(12.5, 10, 4, "#E30A17") + polygon("17,7.8 17.6,9.4 19.3,9.4 17.9,10.4 18.5,12 17,11 15.5,12 16.1,10.4 14.7,9.4 16.4,9.4", "#fff")],
  ["Nigeria", cols("#008751", "#fff", "#008751")],
  ["Indonesia", rows("#CE1126", "#fff")],
  ["Peru", cols("#D91023", "#fff", "#D91023")],
  ["Bulgaria", rows("#fff", "#00966E", "#D62612")],
  ["Lithuania", rows("#FDB913", "#006A44", "#C1272D")],
  ["Estonia", rows("#0072CE", "#000", "#fff")],
  ["Latvia", full("#9E3039") + rect(0, 8, 30, 4, "#fff")],
  ["Mali", cols("#14B53A", "#FCD116", "#CE1126")],
  ["Armenia", rows("#D90012", "#0033A0", "#F2A800")],
  ["Gabon", rows("#009E60", "#FCD116", "#3A75C4")],
  ["Thailand", full("#A51931") + rect(0, 3.33, 30, 13.34, "#fff") + rect(0, 6.67, 30, 6.66, "#2D2A4A")],
  ["Bolivia", rows("#D52B1E", "#F9E300", "#007934")],
  ["Mauritius", rows("#EA2839", "#1A206D", "#FFD500", "#00A551")],
  ["Czech Republic", rect(0, 0, 30, 10, "#fff") + rect(0, 10, 30, 10, "#D7141A") + polygon("0,0 15,10 0,20", "#11457E")],
  ["Benin", rect(0, 0, 12, 20, "#008751") + rect(12, 0, 18, 10, "#FCD116") + rect(12, 10, 18, 10, "#E8112D")],
  ["Iceland", full("#02529C") + rect(7, 0, 5, 20, "#fff") + rect(0, 7.5, 30, 5, "#fff") + rect(8.25, 0, 2.5, 20, "#DC1E35") + rect(0, 8.75, 30, 2.5, "#DC1E35")],
  ["Yemen", rows("#CE1126", "#fff", "#000")],
  ["Sierra Leone", rows("#1EB53A", "#fff", "#0072C6")]
];
const countries = countryList.map(([name, body]) => ({ name, flag: svg(body) }));

// ---------- Settings ----------
const LEVELS = {
  easy:   { label: "Easy",   rounds: 8,  choices: 2, seconds: 15, desc: "8 flags, 2 choices, 15 seconds for the full speed bonus" },
  medium: { label: "Medium", rounds: 10, choices: 4, seconds: 10, desc: "10 flags, 4 choices, 10 seconds for the full speed bonus" },
  hard:   { label: "Hard",   rounds: 12, choices: 4, seconds: 5,  desc: "12 flags, 4 choices, 5 seconds for the full speed bonus" }
};
const BASE_POINTS = 100, MAX_SPEED_POINTS = 50, STREAK_STEP = 20, MAX_STREAK_STEPS = 5, HINT_COST = 100;
const flame = "🔥";
const streakLabel = () => `${flame} ${game.streak}<small>best ${Math.max(stats.bestStreakEver, game.streak)}</small>`;

// ---------- Helpers ----------
const app = document.getElementById("app");
const $ = selector => app.querySelector(selector);

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Streak badge color level: 0 gray, 1 blue, 2 orange, 4 purple, 5 gold
function streakTier(streak) {
  if (streak >= 10) return 5;
  if (streak >= 7) return 4;
  if (streak >= 3) return 2;
  return streak >= 1 ? 1 : 0;
}

// ---------- XP and player levels ----------
const XP_PER_LEVEL = 250;
function getTotalXP() {
  try { return Number(localStorage.getItem("flagquiz-total-xp")) || 0; }
  catch (e) { return 0; }
}
function addXP(amount) {
  const total = getTotalXP() + amount;
  try { localStorage.setItem("flagquiz-total-xp", String(total)); } catch (e) {}
  stats.lifetimeXP += amount;
  saveStats();
  checkLevelUp();
  return total;
}
function playerLevel(xp = getTotalXP()) { return Math.floor(xp / XP_PER_LEVEL) + 1; }
function playerProgress(xp = getTotalXP()) { return xp % XP_PER_LEVEL; }
function playerCard() {
  const progress = playerProgress();
  return `<section class="player-card" aria-label="Player level">
    <div class="player-top">Lvl ${playerLevel()}${prestigeBadge()}<span class="player-title">${currentTitle()}</span></div>
    <div class="xp-track"><i style="width:${progress / XP_PER_LEVEL * 100}%"></i></div>
  </section>`;
}

let recordBroken = false;
function saveBestScore(points) {
  recordBroken = false;
  const key = "flagquiz-best-" + level.label;
  let best = 0;
  try { best = Number(localStorage.getItem(key)) || 0; } catch (e) {}
  if (points > best) {
    recordBroken = best > 0;
    best = points;
    try { localStorage.setItem(key, String(points)); } catch (e) {}
  }
  return best;
}

// ---------- Continent and flag fact for every country ----------
const COUNTRY_INFO = {
  "France":         { continent: "Europe",        fact: "The blue, white and red tricolor was adopted during the French Revolution." },
  "Germany":        { continent: "Europe",        fact: "Black, red and gold trace back to the 1800s movement for a united Germany." },
  "Italy":          { continent: "Europe",        fact: "Its green, white and red were inspired by the French tricolor." },
  "Ireland":        { continent: "Europe",        fact: "Green and orange stand for two traditions, and the white between them stands for peace." },
  "Netherlands":    { continent: "Europe",        fact: "It is one of the oldest tricolors still in use. Orange was once used in place of the red." },
  "Belgium":        { continent: "Europe",        fact: "Its black, yellow and red come from the coat of arms of the Duchy of Brabant." },
  "Austria":        { continent: "Europe",        fact: "Its red-white-red design is said to be one of the oldest national flags in the world." },
  "Poland":         { continent: "Europe",        fact: "It has just two stripes, white and red, which are the colors of Poland's coat of arms." },
  "Ukraine":        { continent: "Europe",        fact: "The blue and yellow are often said to stand for the sky above fields of wheat." },
  "Romania":        { continent: "Europe",        fact: "Its flag is almost identical to the flag of Chad." },
  "Hungary":        { continent: "Europe",        fact: "Its red, white and green also appear in Hungary's coat of arms." },
  "Russia":         { continent: "Europe",        fact: "The white, blue and red tricolor goes back to the time of Peter the Great." },
  "Colombia":       { continent: "South America", fact: "The yellow stripe is twice as tall as the blue and the red ones." },
  "Japan":          { continent: "Asia",          fact: "The red circle stands for the sun. Japan is known as the Land of the Rising Sun." },
  "Switzerland":    { continent: "Europe",        fact: "Switzerland and Vatican City are the only countries with square national flags." },
  "Sweden":         { continent: "Europe",        fact: "Its cross is a Nordic cross, set off-center toward the pole." },
  "Denmark":        { continent: "Europe",        fact: "The Danish flag is often called the oldest national flag still in use." },
  "Finland":        { continent: "Europe",        fact: "The blue cross on white is often said to stand for Finland's lakes and snow." },
  "Norway":         { continent: "Europe",        fact: "Its blue cross sits inside a white cross, a design shared with other Nordic flags." },
  "Greece":         { continent: "Europe",        fact: "Its nine stripes are often said to match the nine syllables of a Greek freedom motto." },
  "Brazil":         { continent: "South America", fact: "The real flag has stars on the blue circle showing the sky over Rio on the day the republic began." },
  "India":          { continent: "Asia",          fact: "The blue wheel in the middle is the Ashoka Chakra, and it has 24 spokes." },
  "Turkey":         { continent: "Asia",          fact: "The crescent and star are a symbol linked to the Ottoman era." },
  "Nigeria":        { continent: "Africa",        fact: "Green stands for farmland and white stands for peace." },
  "Indonesia":      { continent: "Asia",          fact: "It looks like Poland's flag but upside down and with different proportions." },
  "Peru":           { continent: "South America", fact: "Its red and white vertical stripes date from the independence era in the 1820s." },
  "Bulgaria":       { continent: "Europe",        fact: "White, green and red are often said to stand for peace, farmland and courage." },
  "Lithuania":      { continent: "Europe",        fact: "Yellow, green and red are often said to stand for the sun, nature and sacrifice." },
  "Estonia":        { continent: "Europe",        fact: "Blue, black and white are linked to the sky, the soil and hope." },
  "Latvia":         { continent: "Europe",        fact: "Its deep red is known as Latvian red, split by a thin white stripe." },
  "Mali":           { continent: "Africa",        fact: "Green, yellow and red are the Pan-African colors." },
  "Armenia":        { continent: "Asia",          fact: "Its red, blue and orange tricolor was used in 1918 and brought back in 1990." },
  "Gabon":          { continent: "Africa",        fact: "The green, yellow and blue stripes stand for the forests, the equator and the sea." },
  "Thailand":       { continent: "Asia",          fact: "The blue stripe in the middle stands for the monarchy." },
  "Bolivia":        { continent: "South America", fact: "Its red, yellow and green stripes are often said to stand for bravery, minerals and nature." },
  "Mauritius":      { continent: "Africa",        fact: "It has four horizontal stripes: red, blue, yellow and green." },
  "Czech Republic": { continent: "Europe",        fact: "The blue triangle helps tell it apart from Poland's white and red flag." },
  "Benin":          { continent: "Africa",        fact: "Its green, yellow and red are Pan-African colors." },
  "Iceland":        { continent: "Europe",        fact: "Red, white and blue are often said to stand for fire, ice and the ocean." },
  "Yemen":          { continent: "Asia",          fact: "Its red, white and black stripes are Pan-Arab colors." },
  "Sierra Leone":   { continent: "Africa",        fact: "The blue stripe is often said to stand for the harbor of Freetown." }
};

// ---------- Saved stats and achievements ----------
function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
}
let stats = { answers: 0, continents: [], unlocked: {}, bestLevel: 1, prestige: 0, theme: "classic", correct: 0, lifetimeXP: 0, bestStreakEver: 0, gamesPlayed: 0, records: { speedrun: 0, endless: 0 }, title: "rookie", customTitle: "", ...loadJSON("flagquiz-stats", {}) };
const saveStats = () => { try { localStorage.setItem("flagquiz-stats", JSON.stringify(stats)); } catch (e) {} };
const unlockedCount = () => Object.keys(stats.unlocked).length;

const ACHIEVEMENTS = [
  { id: "first_correct", name: "First Steps",     xp: 25,  desc: "Get your first flag right." },
  { id: "streak5",       name: "On Fire",         xp: 50,  desc: "Get 5 flags right in a row." },
  { id: "streak10",      name: "Unstoppable",     xp: 100, desc: "Get 10 flags right in a row." },
  { id: "speedy",        name: "Speed Demon",     xp: 50,  desc: "Answer correctly in under 2 seconds." },
  { id: "perfect",       name: "Perfect Test",    xp: 100, desc: "Get every flag right in an Easy, Medium or Hard test." },
  { id: "hard_hero",     name: "Hard Mode Hero",  xp: 100, desc: "Get 9 or more right on Hard." },
  { id: "endless10",     name: "Marathon Runner", xp: 75,  desc: "Guess 10 flags in Endless Mode." },
  { id: "scholar",       name: "Flag Scholar",    xp: 50,  desc: "Answer 25 questions and read the flag facts." },
  { id: "traveler",      name: "World Traveler",  xp: 75,  desc: "Name a flag from Europe, Asia, Africa and South America." },
  { id: "speedrun20",     name: "Lightning Round", xp: 75,  desc: "Answer 20 flags in one Speedrun." },
  { id: "lvl2",          name: "Rising Student",  xp: 25,  level: 2,  desc: "Reach player Level 2." },
  { id: "lvl5",          name: "Class Star",      xp: 50,  level: 5,  desc: "Reach player Level 5." },
  { id: "lvl10",         name: "Top of the Class", xp: 100, level: 10, desc: "Reach player Level 10." },
  { id: "lvl20",         name: "Flag Master",     xp: 200, level: 20, desc: "Reach player Level 20." }
];

// Unlock an achievement once: save it, give the XP reward and show a banner
function unlock(id) {
  if (stats.unlocked[id]) return;
  stats.unlocked[id] = true;
  saveStats();
  const a = ACHIEVEMENTS.find(item => item.id === id);
  addXP(a.xp);
  game.xpEarned += a.xp;
  game.newAchievements.push(a);
  const toasts = app.querySelector(".toasts");
  if (toasts) toasts.insertAdjacentHTML("beforeend", `<p class="toast">🏆 Achievement unlocked: <b>${a.name}</b> (+${a.xp} XP)</p>`);
  checkLevelAchievements();   // the reward XP might lift you to a new level
}

// Unlock the level achievements you have reached
function checkLevelAchievements() {
  ACHIEVEMENTS.filter(a => a.level && playerLevel() >= a.level).forEach(a => unlock(a.id));
}

// Called after every answer
function checkAnswerAchievements(answer, isCorrect, secondsTaken) {
  stats.answers++;
  if (isCorrect) {
    stats.correct++;
    stats.bestStreakEver = Math.max(stats.bestStreakEver, game.streak);
  }
  const continent = COUNTRY_INFO[answer.name].continent;
  if (isCorrect && !stats.continents.includes(continent)) stats.continents.push(continent);
  saveStats();

  if (isCorrect) {
    unlock("first_correct");
    if (game.streak >= 5) unlock("streak5");
    if (game.streak >= 10) unlock("streak10");
    if (secondsTaken < 2) unlock("speedy");
    if (level.endless && game.correct >= 10) unlock("endless10");
  }
  if (stats.answers >= 25) unlock("scholar");
  if (stats.continents.length >= 4) unlock("traveler");
}

function newAchievementsHtml() {
  if (!game.newAchievements.length) return "";
  const items = game.newAchievements.map(a => `<li>🏆 <b>${a.name}</b> (+${a.xp} XP)</li>`).join("");
  return `<div class="new-ach"><b>New achievements</b><ul>${items}</ul></div>`;
}

function showAchievements() {
  const rows = ACHIEVEMENTS.map(a => {
    const done = stats.unlocked[a.id];
    return `<li class="ach${done ? " done" : ""}"><span class="ach-icon">${done ? "🏆" : "🔒"}</span>
      <div><b>${a.name}</b><span>${a.desc} Reward: +${a.xp} XP</span></div></li>`;
  }).join("");
  app.innerHTML = `
    ${playerCard()}
    <header><h1>Achievements</h1></header>
    <p class="sub">${unlockedCount()} of ${ACHIEVEMENTS.length} unlocked</p>
    <ul class="ach-list scroll-area">${rows}</ul>
    <button class="next">Back</button>`;
  $(".next").onclick = showMenu;
}

// ---------- Hints ----------
function useHint(button, answer) {
  if (game.answered || button.disabled) return;
  const info = COUNTRY_INFO[answer.name];
  const text = `Continent: ${info.continent}`;
  game.hintsUsed++;
  game.hintPenalty += HINT_COST;
  button.disabled = true;
  $(".hint-text").insertAdjacentHTML("beforeend", `<span>${text}</span>`);
  $(".score").textContent = totalPoints() + " pts";
}

// ---------- Themes, level-up animation and prestige ----------
const PRESTIGE_LEVEL = 10;

const THEMES = [
  { id: "classic",  name: "Classic Chalkboard", board: "#2c4a3e", paper: "#fffdf5", accent: "#0b5fa5", level: 1 },
  { id: "ocean",    name: "Ocean Blue",         board: "#1f4e6b", paper: "#f3fbff", accent: "#0a6e9e", level: 3 },
  { id: "sunset",   name: "Sunset",             board: "#7a3b2e", paper: "#fff6ec", accent: "#b5441f", level: 5 },
  { id: "midnight", name: "Midnight",           board: "#1b1f3b", paper: "#eef0ff", accent: "#4457c9", level: 8 },
  { id: "royal",    name: "Royal Purple",       board: "#43295f", paper: "#faf3ff", accent: "#7a3fc4", prestige: 1 },
  { id: "gold",     name: "Golden Prestige",    board: "#4a3a10", paper: "#fffbea", accent: "#a87a00", prestige: 2 }
];

const themeUnlocked = t => (t.level && stats.bestLevel >= t.level) || (t.prestige && stats.prestige >= t.prestige);
const themeLockText = t => t.level ? `Reach Level ${t.level}` : `Reach Prestige ${t.prestige}`;

function applyTheme() {
  const t = THEMES.find(x => x.id === stats.theme && themeUnlocked(x)) || THEMES[0];
  const style = document.body.style;
  style.setProperty("--board", t.board);
  style.setProperty("--theme-paper", t.paper);
  style.setProperty("--theme-accent", t.accent);
}

function prestigeBadge(n = stats.prestige) {
  return n < 1 ? "" : `<span class="prestige-badge" data-tier="${Math.min(n, 4)}">★ ${n}</span>`;
}

// Full-screen celebration used for level-ups and prestige
function showCelebration(ringText, title, lines = []) {
  const overlay = document.createElement("div");
  overlay.className = "levelup";
  const sparks = Array.from({ length: 16 }, (_, i) => `<i style="--angle:${i * 22.5}deg"></i>`).join("");
  overlay.innerHTML = `<div class="levelup-card"><div class="sparks">${sparks}</div>
    <div class="levelup-ring">${ringText}</div><h2>${title}</h2>${lines.map(l => `<p>${l}</p>`).join("")}</div>`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 3200);
}

// ---------- Level-up animation ----------
let shownLevel = null;
function checkLevelUp() {
  const now = playerLevel();
  if (shownLevel === null) shownLevel = now;
  const previousBest = stats.bestLevel;
  if (now > stats.bestLevel) { stats.bestLevel = now; saveStats(); }
  if (now > shownLevel) {
    const newThemes = THEMES.filter(t => t.level > previousBest && t.level <= now);
    const lines = newThemes.map(t => `🎨 New theme unlocked: ${t.name}`);
    showCelebration(now, "LEVEL UP!", lines);
    shownLevel = now;
  }
}

function showThemes() {
  const cards = THEMES.map(t => {
    const open = themeUnlocked(t);
    const selected = stats.theme === t.id;
    return `<button class="theme-card${selected ? " selected" : ""}" data-theme-id="${t.id}"${open ? "" : " disabled"}>
      <span class="swatch" style="background:${t.board}"><i style="background:${t.paper}"></i></span>
      <b>${t.name}</b><span>${open ? (selected ? "In use" : "Tap to use") : "🔒 " + themeLockText(t)}</span></button>`;
  }).join("");
  app.innerHTML = `
    ${playerCard()}
    <header><h1>Themes</h1></header>
    <p class="sub">Unlock new colors as you level up.</p>
    <div class="theme-grid scroll-area">${cards}</div>
    <button class="next">Back</button>`;
  app.querySelectorAll(".theme-card").forEach(b => b.onclick = () => {
    stats.theme = b.dataset.themeId;
    saveStats();
    applyTheme();
    showThemes();
  });
  $(".next").onclick = showMenu;
}

function showPrestige() {
  app.innerHTML = `
    ${playerCard()}
    <header><h1>Prestige</h1></header>
    <p class="sub">Restart at Level 1 and earn a special badge. You keep your achievements and unlocked themes.</p>
    <p class="prestige-next">You will become Prestige ${stats.prestige + 1} ${prestigeBadge(stats.prestige + 1)}</p>
    <button class="next prestige-go">⭐ Prestige now</button>
    <button class="ach-btn alt back">Not yet</button>`;
  $(".prestige-go").onclick = doPrestige;
  $(".back").onclick = showMenu;
}

function doPrestige() {
  stats.prestige++;
  try { localStorage.setItem("flagquiz-total-xp", "0"); } catch (e) {}
  saveStats();
  shownLevel = 1;
  const newThemes = THEMES.filter(t => t.prestige === stats.prestige);
  showCelebration("★" + stats.prestige, "PRESTIGE " + stats.prestige + "!", newThemes.map(t => `🎨 New theme unlocked: ${t.name}`));
  showMenu();
}

// ---------- Speedrun ----------
const SPEEDRUN_SECONDS = 60;

function speedrunTimerHtml() {
  const left = Math.max(0, game.endsAt - Date.now());
  return `<div class="timer"><i style="width:${left / (SPEEDRUN_SECONDS * 1000) * 100}%"></i><span class="time-left">${Math.ceil(left / 1000)}s</span></div>`;
}

function tickSpeedrun() {
  const left = Math.max(0, game.endsAt - Date.now());
  const label = app.querySelector(".time-left");
  const bar = app.querySelector(".timer i");
  if (label) label.textContent = Math.ceil(left / 1000) + "s";
  if (bar) bar.style.width = (left / (SPEEDRUN_SECONDS * 1000) * 100) + "%";
  if (left <= 0) showResults();
}

function advanceSpeedrun() {
  if (game.finished) return;
  game.lastFlag = game.flags[game.round];
  game.round++;
  showQuestion();
}

function summaryText() {
  if (level.speedrun) return `Speedrun: ${game.correct} flags in ${SPEEDRUN_SECONDS} seconds`;
  if (level.endless) return `Endless Mode: ${game.correct} flags guessed`;
  return `${level.label}: ${game.correct} of ${level.rounds} correct`;
}

// ---------- Smooth transitions: replay a fade-in whenever the screen changes ----------
function animateIn() {
  app.classList.remove("enter");
  void app.offsetWidth;
  app.classList.add("enter");
}

// ---------- Statistics and personal bests ----------
function readBest(label) {
  try { return Number(localStorage.getItem("flagquiz-best-" + label)) || 0; } catch (e) { return 0; }
}

function showStats() {
  const accuracy = stats.answers ? Math.round(stats.correct / stats.answers * 100) + "%" : "-";
  const row = (name, value) => `<tr><td>${name}</td><td>${value}</td></tr>`;
  app.innerHTML = `
    ${playerCard()}
    <header><h1>Statistics</h1></header>
    <div class="scroll-area">
    <table class="sum">
      ${row("Total correct answers", stats.correct)}
      ${row("Questions answered", stats.answers)}
      ${row("Accuracy", accuracy)}
      ${row("Games played", stats.gamesPlayed)}
      ${row("Longest streak record", stats.bestStreakEver)}
      ${row("Player level", playerLevel() + (stats.prestige ? ` (Prestige ${stats.prestige})` : ""))}
      ${row("Total XP (this prestige)", getTotalXP())}
      ${row("Lifetime XP", stats.lifetimeXP)}
      ${row("Achievements", `${unlockedCount()} of ${ACHIEVEMENTS.length}`)}
    </table>
    <h3 class="stat-title">Personal bests</h3>
    <table class="sum">
      ${row("Easy", readBest("Easy") + " pts")}
      ${row("Medium", readBest("Medium") + " pts")}
      ${row("Hard", readBest("Hard") + " pts")}
      ${row("Endless", readBest("Endless") + " pts")}
      ${row("Endless longest run", stats.records.endless + " flags")}
      ${row("Speedrun", readBest("Speedrun") + " pts")}
      ${row("Speedrun most flags", stats.records.speedrun + " in 60s")}
    </table>
    </div>
    <button class="next">Back</button>`;
  $(".next").onclick = showMenu;
}

// ---------- Player titles ----------
const TITLES = [
  { id: "rookie",       name: "Rookie",       hint: "Everyone starts here",      have: () => true },
  { id: "flag_fan",     name: "Flag Fan",     hint: "Reach Level 3",             have: () => stats.bestLevel >= 3 },
  { id: "speedster",    name: "Speedster",    hint: "Unlock Speed Demon",        have: () => stats.unlocked.speedy },
  { id: "marathoner",   name: "Marathoner",   hint: "Unlock Marathon Runner",    have: () => stats.unlocked.endless10 },
  { id: "professor",    name: "Professor",    hint: "Unlock Flag Scholar",       have: () => stats.unlocked.scholar },
  { id: "globetrotter", name: "Globetrotter", hint: "Unlock World Traveler",     have: () => stats.unlocked.traveler },
  { id: "cartographer", name: "Cartographer", hint: "Reach Level 8",             have: () => stats.bestLevel >= 8 },
  { id: "lightning",    name: "Lightning",    hint: "Unlock Lightning Round",    have: () => stats.unlocked.speedrun20 },
  { id: "flag_master",  name: "Flag Master",  hint: "Reach Level 10",            have: () => stats.bestLevel >= 10 },
  { id: "legend",       name: "Legend",       hint: "Reach Prestige 1",          have: () => stats.prestige >= 1 }
];

const escapeHtml = text => text.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

function currentTitle() {
  if (stats.customTitle) return escapeHtml(stats.customTitle);
  const chosen = TITLES.find(t => t.id === stats.title && t.have());
  return chosen ? chosen.name : "Rookie";
}

function showTitles() {
  const rows = TITLES.map(t => {
    const open = t.have();
    const selected = !stats.customTitle && stats.title === t.id;
    return `<button class="title-row${selected ? " selected" : ""}" data-title="${t.id}"${open ? "" : " disabled"}>
      <b>${t.name}</b><span>${open ? (selected ? "In use" : "Tap to use") : "🔒 " + t.hint}</span></button>`;
  }).join("");
  app.innerHTML = `
    ${playerCard()}
    <header><h1>Titles</h1></header>
    <p class="sub">Pick a title to show next to your level, or write your own.</p>
    <div class="title-list scroll-area">${rows}</div>
    <label class="custom-title">Your own title
      <input id="custom-title" maxlength="18" placeholder="Type a title" value="${escapeHtml(stats.customTitle)}">
    </label>
    <button class="ach-btn alt" id="save-title">Save my title</button>
    <button class="next">Back</button>`;
  app.querySelectorAll(".title-row").forEach(b => b.onclick = () => {
    stats.title = b.dataset.title;
    stats.customTitle = "";
    saveStats();
    showTitles();
  });
  $("#save-title").onclick = () => {
    stats.customTitle = $("#custom-title").value.trim().slice(0, 18);
    saveStats();
    showTitles();
  };
  $(".next").onclick = showMenu;
}

// ---------- Game state ----------
let level, game;
const totalPoints = () => Math.max(0, game.correct * BASE_POINTS + game.speedPoints + game.streakPoints - game.hintPenalty);
const statusLine = () => (level.endless || level.speedrun)
  ? `Flag ${game.round + 1} · ${game.correct} correct`
  : `Question ${game.round + 1} of ${level.rounds}, ${game.correct} correct`;

// ---------- Screens ----------
function showMenu() {
  const buttons = Object.entries(LEVELS).map(([key, l]) =>
    `<button class="lvl" data-level="${key}"><b>${l.label}</b><span>${l.desc}</span></button>`).join("");
  app.innerHTML = `
    ${playerCard()}
    <header><h1>Flag Test</h1></header>
    <p class="sub">Pick a difficulty to begin.</p>
    ${buttons}
    <button class="lvl endless-choice" data-level="endless"><b>♾️ Endless Mode</b><span>Keep guessing flags. One wrong answer ends your run!</span></button>
    <button class="lvl speedrun-choice" data-level="speedrun"><b>⚡ Speedrun</b><span>Answer as many flags as you can in 60 seconds.</span></button>
    <div class="menu-row">
      <button class="mini" data-go="achievements">🏆 Achievements (${unlockedCount()}/${ACHIEVEMENTS.length})</button>
      <button class="mini" data-go="stats">📊 Statistics</button>
      <button class="mini" data-go="titles">🎖️ Titles</button>
    </div>
    ${playerLevel() >= PRESTIGE_LEVEL
      ? `<button class="ach-btn prestige-btn">⭐ Prestige: restart at Level 1 with a special badge</button>`
      : `<p class="sub">⭐ Prestige unlocks at Level ${PRESTIGE_LEVEL}.</p>`}
    <div class="corner-actions">
      <button class="themes-corner">🎨 Themes</button>
      <button class="custom-corner">🛠️ Create Test</button>
    </div>`;
  app.querySelectorAll(".lvl[data-level]").forEach(b => b.onclick = () => startGame(b.dataset.level));
  $(".custom-corner").onclick = showCustomBuilder;
  const goTo = { achievements: showAchievements, stats: showStats, titles: showTitles };
  app.querySelectorAll("[data-go]").forEach(b => b.onclick = goTo[b.dataset.go]);
  $(".themes-corner").onclick = showThemes;
  if (playerLevel() >= PRESTIGE_LEVEL) $(".prestige-btn").onclick = showPrestige;
}

function startGame(levelKey) {
  level = levelKey === "endless"
    ? { label: "Endless", rounds: Infinity, choices: 4, seconds: 10, endless: true }
    : levelKey === "speedrun"
    ? { label: "Speedrun", rounds: Infinity, choices: 4, seconds: 5, endless: false, speedrun: true }
    : { ...LEVELS[levelKey], endless: false };
  game = {
    flags: shuffle(countries), // Endless mode deals from a shuffled deck without repeats
    round: 0, correct: 0, streak: 0, bestStreak: 0,
    speedPoints: 0, streakPoints: 0, xpEarned: 0, hintPenalty: 0, hintsUsed: 0, newAchievements: [], answered: false, shownAt: 0,
    ended: false, lastFlag: null, finished: false, timer: null, endsAt: 0, recordBefore: stats.bestStreakEver
  };
  if (level.speedrun) {
    game.endsAt = Date.now() + SPEEDRUN_SECONDS * 1000;
    game.timer = setInterval(tickSpeedrun, 100);
  }
  showQuestion();
}

function showQuestion() {
  if (game.ended || game.round >= level.rounds) return showResults();
  if ((level.endless || level.speedrun) && game.round >= game.flags.length) {
    const nextDeck = shuffle(countries.filter(c => c !== game.lastFlag));
    game.flags.push(...nextDeck);
  }
  const answer = game.flags[game.round];
  const wrongOnes = shuffle(countries.filter(c => c !== answer)).slice(0, level.choices - 1);
  const options = shuffle([answer, ...wrongOnes]);
  game.answered = false;
  game.shownAt = Date.now();

  app.innerHTML = `
    ${playerCard()}
    <div class="streak" data-tier="${streakTier(game.streak)}" title="Answers correct in a row">${streakLabel()}</div>
    <header><h1>Flag Test</h1><span class="score">${totalPoints()} pts</span></header>
    <p class="sub">${statusLine()}</p>
    ${level.speedrun ? speedrunTimerHtml() : level.endless ? `<p class="endless-note">♾️ Endless run · one mistake ends the game</p>` : `<div class="bar"><i style="width:${game.round / level.rounds * 100}%"></i></div>`}
    <div class="flag"><img src="${answer.flag}" alt="A country flag"></div>
    <p class="q">Which country does this flag belong to?</p>
    <div class="opts">${options.map(o => `<button class="opt" data-name="${o.name}">${o.name}</button>`).join("")}</div>
    <div class="hints"${level.speedrun ? " hidden" : ""}>
      <button class="hint-btn" data-hint="continent">🌍 Continent (−${HINT_COST})</button>
    </div>
    <p class="hint-text"></p>
    <p class="msg"></p>
    <p class="fact" hidden></p>
    <div class="toasts"></div>
    <button class="next" hidden>${level.endless ? "Next flag" : game.round === level.rounds - 1 ? "See results" : "Next flag"}</button>`;

  app.querySelectorAll(".opt").forEach(b => b.onclick = () => answerQuestion(b, answer));
  app.querySelectorAll(".hint-btn").forEach(b => b.onclick = () => useHint(b, answer));
  $(".next").onclick = () => {
    if (game.ended || (!level.endless && game.round === level.rounds - 1)) return showResults();
    game.lastFlag = game.flags[game.round];
    game.round++;
    showQuestion();
  };
}

function answerQuestion(button, answer) {
  if (game.answered) return;
  game.answered = true;
  const isCorrect = button.dataset.name === answer.name;
  let gained = 0;

  if (isCorrect) {
    const secondsTaken = (Date.now() - game.shownAt) / 1000;
    const speed = Math.max(0, Math.round(MAX_SPEED_POINTS * (1 - secondsTaken / level.seconds)));
    game.correct++;
    game.streak++;
    game.bestStreak = Math.max(game.bestStreak, game.streak);
    const streakBonus = Math.min(game.streak - 1, MAX_STREAK_STEPS) * STREAK_STEP;
    game.speedPoints += speed;
    game.streakPoints += streakBonus;
    const xpGain = 25 + (game.streak > 0 && game.streak % 5 === 0 ? 25 : 0);
    game.xpEarned += xpGain;
    addXP(xpGain);
    checkLevelAchievements();
    gained = BASE_POINTS + speed + streakBonus;
    checkAnswerAchievements(answer, true, secondsTaken);
  } else {
    game.streak = 0;
    if (level.endless) game.ended = true;
    checkAnswerAchievements(answer, false, 0);
  }

  app.querySelectorAll(".opt").forEach(b => {
    b.disabled = true;
    if (b.dataset.name === answer.name) b.classList.add("good");
  });
  if (!isCorrect) button.classList.add("bad");

  $(".score").textContent = totalPoints() + " pts";
  $(".sub").textContent = statusLine();
  $(".streak").innerHTML = streakLabel();
  $(".streak").dataset.tier = streakTier(game.streak);

  app.querySelectorAll(".hint-btn").forEach(b => b.disabled = true);
  const fact = $(".fact");
  fact.hidden = false;
  fact.innerHTML = `<b>Flag fact:</b> ${COUNTRY_INFO[answer.name].fact}`;

  const message = $(".msg");
  message.textContent = isCorrect ? `Correct! +${gained} points · +${25 + (game.streak % 5 === 0 ? 25 : 0)} XP` : `Not quite. It was ${answer.name}.${level.endless ? " Your endless run is over!" : " Streak reset."}`;
  message.style.color = isCorrect ? "var(--good)" : "var(--bad)";
  $(".next").textContent = level.endless && !isCorrect ? "See results" : (!level.endless && game.round === level.rounds - 1 ? "See results" : "Next flag");
  if (level.speedrun) { setTimeout(advanceSpeedrun, 650); return; }   // Speedrun moves on by itself
  $(".next").hidden = false;
  $(".next").focus();
}

function showResults() {
  if (game.finished) return;
  game.finished = true;
  clearInterval(game.timer);
  stats.gamesPlayed++;
  if (level.speedrun) {
    stats.records.speedrun = Math.max(stats.records.speedrun, game.correct);
    if (game.correct >= 20) unlock("speedrun20");
  }
  if (level.endless) stats.records.endless = Math.max(stats.records.endless, game.correct);
  saveStats();
  if (!level.endless && game.correct === level.rounds) unlock("perfect");
  if (level.label === "Hard" && game.correct >= 9) unlock("hard_hero");
  const points = totalPoints();
  const best = saveBestScore(points);
  const note = level.speedrun ? (game.correct >= 20 ? "Lightning fast!" : "Nice pace. Go again!") : level.endless ? (game.correct >= 10 ? "Amazing run!" : "Nice try. Keep practicing!") : game.correct === level.rounds ? "Perfect score!" : game.correct >= 7 ? "Great work." : game.correct >= 4 ? "Good start. Try again?" : "Keep practicing.";

  app.innerHTML = `<div class="final">
    <h1>Test complete</h1>
    <div class="big">${points} pts</div>
    <table class="sum">
      <tr><td>Correct answers (${game.correct} x ${BASE_POINTS})</td><td>${game.correct * BASE_POINTS}</td></tr>
      <tr><td>Speed bonus</td><td>${game.speedPoints}</td></tr>
      <tr><td>Streak bonus</td><td>${game.streakPoints}</td></tr>
      ${game.hintPenalty ? `<tr><td>Hints used (${game.hintsUsed})</td><td>−${game.hintPenalty}</td></tr>` : ""}
      <tr class="tot"><td>Total</td><td>${points}</td></tr>
    </table>
    <p class="sub">${summaryText()}, best streak ${game.bestStreak}</p>
    ${playerCard()}
    ${recordBroken && points > 0 ? `<p class="record">🏅 New personal best!</p>` : ""}
    ${game.bestStreak >= 3 && game.bestStreak > game.recordBefore ? `<p class="record">🔥 New longest streak: ${game.bestStreak}!</p>` : ""}
    ${newAchievementsHtml()}
    <p class="sub">${note} Your best total: ${best} pts</p>
    <button class="next">Play again</button></div>`;
  $(".next").onclick = showMenu;
}


// ---------- Custom flag test ----------
let specialTest = null;

function startSpecialTest(chosen = [], settings = {}) {
  specialTest = {
    questions: shuffle(chosen),
    index: 0,
    score: 0,
    answered: false,
    title: settings.title || "My Custom Flag Test",
    seconds: Number(settings.seconds) || 0,
    timeLeft: Number(settings.seconds) || 0,
    timer: null
  };
  showSpecialQuestion();
}

function showSpecialQuestion() {
  clearInterval(specialTest.timer);
  if (specialTest.index >= specialTest.questions.length) return showSpecialResults();

  const q = specialTest.questions[specialTest.index];
  specialTest.answered = false;
  specialTest.timeLeft = specialTest.seconds;
  const choices = shuffle(q.options);

  app.innerHTML = `${playerCard()}<header><h1 id="custom-test-title"></h1><span class="score">${specialTest.score} / ${specialTest.questions.length}</span></header>
    <p class="sub">Question ${specialTest.index + 1} of ${specialTest.questions.length}</p>
    ${specialTest.seconds ? `<p class="custom-timer">Time left: <b id="custom-time">${specialTest.timeLeft}</b>s</p>` : ""}
    <div class="special-clue">${q.clue}</div><p class="q">Which country is this?</p>
    <div class="opts">${choices.map(x => `<button class="opt"></button>`).join("")}</div>
    <p class="msg"></p><button class="next" hidden>Next</button>`;
  $("#custom-test-title").textContent = `🛠️ ${specialTest.title}`;
  app.querySelectorAll(".opt").forEach((button, i) => {
    button.textContent = choices[i];
    button.onclick = () => finishSpecialAnswer(q.answer, button, false);
  });

  $(".next").onclick = () => {
    specialTest.index++;
    showSpecialQuestion();
  };

  if (specialTest.seconds) {
    specialTest.timer = setInterval(() => {
      if (specialTest.answered) return clearInterval(specialTest.timer);
      specialTest.timeLeft--;
      const display = $("#custom-time");
      if (display) display.textContent = specialTest.timeLeft;
      if (specialTest.timeLeft <= 0) finishSpecialAnswer(q.answer, null, true);
    }, 1000);
  }
}

function finishSpecialAnswer(correctAnswer, selectedButton, timedOut) {
  if (specialTest.answered) return;
  specialTest.answered = true;
  clearInterval(specialTest.timer);

  const correct = selectedButton && selectedButton.textContent === correctAnswer;
  if (correct) specialTest.score++;

  app.querySelectorAll(".opt").forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) button.classList.add("good");
  });
  if (selectedButton && !correct) selectedButton.classList.add("bad");

  $(".msg").textContent = timedOut
    ? `Time's up! The answer was ${correctAnswer}.`
    : correct ? "Correct!" : `The answer was ${correctAnswer}.`;
  $(".next").hidden = false;
  $(".next").textContent = specialTest.index === specialTest.questions.length - 1 ? "See results" : "Next";
}

function showSpecialResults() {
  clearInterval(specialTest.timer);
  const score = specialTest.score, total = specialTest.questions.length;
  app.innerHTML = `${playerCard()}<div class="final"><h1 id="custom-result-title"></h1><div class="big">${score} / ${total}</div>
    <p class="sub">You got ${Math.round(score / total * 100)}% correct.</p><button class="next">Back to menu</button></div>`;
  $("#custom-result-title").textContent = `${specialTest.title} complete!`;
  $(".next").onclick = showMenu;
}

function showCustomBuilder() {
  app.innerHTML = `${playerCard()}<header><h1>🛠️ Build Your Own Test</h1></header>
    <p class="sub">Choose your own quiz settings and flags.</p>
    <label class="builder-label">Test name
      <input id="custom-name" class="builder-input" maxlength="32" value="My Custom Flag Test">
    </label>
    <div class="builder-settings">
      <label class="builder-label">Questions
        <select id="custom-count" class="builder-input">
          <option value="5">5</option><option value="10" selected>10</option>
          <option value="15">15</option><option value="20">20</option><option value="all">All selected</option>
        </select>
      </label>
      <label class="builder-label">Answer choices
        <select id="custom-choices" class="builder-input">
          <option value="2">2</option><option value="3">3</option><option value="4" selected>4</option>
          <option value="5">5</option><option value="6">6</option>
        </select>
      </label>
      <label class="builder-label">Timer
        <select id="custom-seconds" class="builder-input">
          <option value="0" selected>Off</option><option value="5">5 sec</option>
          <option value="10">10 sec</option><option value="15">15 sec</option><option value="20">20 sec</option>
        </select>
      </label>
    </div>
    <div class="builder-pick-row"><b>Pick your countries</b><span id="selected-count">${countries.length} selected</span></div>
    <input id="country-search" class="builder-input" placeholder="Search countries...">
    <div class="builder-tools">
      <button class="mini" id="select-all" type="button">Select all</button>
      <button class="mini" id="select-none" type="button">Select none</button>
    </div>
    <div class="custom-flags">${countries.map(c => `<label data-country="${c.name.toLowerCase()}"><input type="checkbox" value="${c.name}" checked> ${c.name}</label>`).join("")}</div>
    <p class="sub" id="builder-note">Select at least 2 countries. The number of questions will be adjusted if you select fewer.</p>
    <button class="next" id="make-custom">Create and start</button>
    <button class="mini" id="custom-back">Back</button>`;

  const checked = () => [...app.querySelectorAll(".custom-flags input:checked")];
  const updateCount = () => { $("#selected-count").textContent = `${checked().length} selected`; };

  $("#custom-back").onclick = showMenu;
  $("#select-all").onclick = () => {
    app.querySelectorAll(".custom-flags input").forEach(input => input.checked = true);
    updateCount();
  };
  $("#select-none").onclick = () => {
    app.querySelectorAll(".custom-flags input").forEach(input => input.checked = false);
    updateCount();
  };
  app.querySelectorAll(".custom-flags input").forEach(input => input.onchange = updateCount);

  $("#country-search").oninput = event => {
    const query = event.target.value.trim().toLowerCase();
    app.querySelectorAll(".custom-flags label").forEach(label => {
      label.hidden = !label.dataset.country.includes(query);
    });
  };

  $("#make-custom").onclick = () => {
    const selected = checked().map(input => countries.find(c => c.name === input.value));
    if (selected.length < 2) return alert("Please select at least 2 countries.");

    const requested = $("#custom-count").value;
    const count = requested === "all" ? selected.length : Math.min(Number(requested), selected.length);
    const choiceCount = Number($("#custom-choices").value);
    const questions = shuffle(selected).slice(0, count).map(answer => ({
      clue: `<img src="${answer.flag}" alt="Flag" class="custom-flag">`,
      answer: answer.name,
      options: shuffle([
        answer.name,
        ...shuffle(countries.filter(c => c.name !== answer.name)).slice(0, choiceCount - 1).map(c => c.name)
      ])
    }));

    startSpecialTest(questions, {
      title: $("#custom-name").value.trim().slice(0, 32) || "My Custom Flag Test",
      seconds: Number($("#custom-seconds").value)
    });
  };
}

if (typeof MutationObserver !== "undefined") new MutationObserver(animateIn).observe(app, { childList: true });
shownLevel = playerLevel();
if (shownLevel > stats.bestLevel) { stats.bestLevel = shownLevel; saveStats(); }
stats.lifetimeXP = Math.max(stats.lifetimeXP, getTotalXP());
applyTheme();
showMenu();
