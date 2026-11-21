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

const kosovoMap = polygon("9.5,10.5 10.5,9 12.2,8.4 13.6,7.4 15.2,7.3 16.4,8.3 18.2,8.8 19.6,10 19,11.6 17.3,12.3 15.8,13.2 14,12.8 12.3,13.4 10.6,12.6", "#D0A650");
const kosovoStars = [[9, 5.6], [11.4, 4.6], [13.8, 4.2], [16.2, 4.2], [18.6, 4.6], [21, 5.6]].map(([x, y]) => star(x, y, 1.1, "#fff")).join("");

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
  ["Albania", full("#E41E20") + eagle],
  ["Kosovo", full("#244AA5") + kosovoMap + kosovoStars],
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
const BASE_POINTS = 100, MAX_SPEED_POINTS = 50, STREAK_STEP = 20, MAX_STREAK_STEPS = 5;

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

function saveBestScore(points) {
  const key = "flagquiz-best-" + level.label;
  let best = 0;
  try { best = Number(localStorage.getItem(key)) || 0; } catch (e) {}
  if (points > best) {
    best = points;
    try { localStorage.setItem(key, String(points)); } catch (e) {}
  }
  return best;
}

// ---------- Game state ----------
let level, game;
const totalPoints = () => game.correct * BASE_POINTS + game.speedPoints + game.streakPoints;
const statusLine = () => `Question ${game.round + 1} of ${level.rounds}, ${game.correct} correct`;

// ---------- Screens ----------
function showMenu() {
  const buttons = Object.entries(LEVELS).map(([key, l]) =>
    `<button class="lvl" data-level="${key}"><b>${l.label}</b><span>${l.desc}</span></button>`).join("");
  app.innerHTML = `
    <header><h1>Flag Test</h1></header>
    <p class="sub">Pick a difficulty to begin.</p>
    ${buttons}`;
  app.querySelectorAll(".lvl").forEach(b => b.onclick = () => startGame(b.dataset.level));
}

function startGame(levelKey) {
  level = LEVELS[levelKey];
  game = {
    flags: shuffle(countries).slice(0, level.rounds),   // random, no repeats
    round: 0, correct: 0, streak: 0, bestStreak: 0,
    speedPoints: 0, streakPoints: 0, answered: false, shownAt: 0
  };
  showQuestion();
}

function showQuestion() {
  if (game.round >= level.rounds) return showResults();
  const answer = game.flags[game.round];
  const wrongOnes = shuffle(countries.filter(c => c !== answer)).slice(0, level.choices - 1);
  const options = shuffle([answer, ...wrongOnes]);
  game.answered = false;
  game.shownAt = Date.now();

  app.innerHTML = `
    <div class="streak" data-tier="${streakTier(game.streak)}" title="Answers correct in a row">${flame} ${game.streak}</div>
    <header><h1>Flag Test</h1><span class="score">${totalPoints()} pts</span></header>
    <p class="sub">${statusLine()}</p>
    <div class="bar"><i style="width:${game.round / level.rounds * 100}%"></i></div>
    <div class="flag"><img src="${answer.flag}" alt="A country flag"></div>
    <p class="q">Which country does this flag belong to?</p>
    <div class="opts">${options.map(o => `<button class="opt" data-name="${o.name}">${o.name}</button>`).join("")}</div>
    <p class="msg"></p>
    <button class="next" hidden>${game.round === level.rounds - 1 ? "See results" : "Next flag"}</button>`;

  app.querySelectorAll(".opt").forEach(b => b.onclick = () => answerQuestion(b, answer));
  $(".next").onclick = () => { game.round++; showQuestion(); };
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
    gained = BASE_POINTS + speed + streakBonus;
  } else {
    game.streak = 0;
  }

  app.querySelectorAll(".opt").forEach(b => {
    b.disabled = true;
    if (b.dataset.name === answer.name) b.classList.add("good");
  });
  if (!isCorrect) button.classList.add("bad");

  $(".score").textContent = totalPoints() + " pts";
  $(".sub").textContent = statusLine();
  $(".streak").innerHTML = `${flame} ${game.streak}`;
  $(".streak").dataset.tier = streakTier(game.streak);

  const message = $(".msg");
  message.textContent = isCorrect ? `Correct! +${gained} points` : `Not quite. It was ${answer.name}. Streak reset.`;
  message.style.color = isCorrect ? "var(--good)" : "var(--bad)";
  $(".next").hidden = false;
  $(".next").focus();
}

function showResults() {
  const points = totalPoints();
  const best = saveBestScore(points);
  const note = game.correct === level.rounds ? "Perfect score!" : game.correct >= 7 ? "Great work." : game.correct >= 4 ? "Good start. Try again?" : "Keep practicing.";

  app.innerHTML = `<div class="final">
    <h1>Test complete</h1>
    <div class="big">${points} pts</div>
    <table class="sum">
      <tr><td>Correct answers (${game.correct} x ${BASE_POINTS})</td><td>${game.correct * BASE_POINTS}</td></tr>
      <tr><td>Speed bonus</td><td>${game.speedPoints}</td></tr>
      <tr><td>Streak bonus</td><td>${game.streakPoints}</td></tr>
      <tr class="tot"><td>Total</td><td>${points}</td></tr>
    </table>
    <p class="sub">${level.label}: ${game.correct} of ${level.rounds} correct, best streak ${game.bestStreak}</p>
    <p class="sub">${note} Your best total: ${best} pts</p>
    <button class="next">Play again</button></div>`;
  $(".next").onclick = showMenu;
}

showMenu();
