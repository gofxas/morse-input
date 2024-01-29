let audioCtx, oscillator, gainNode; //音量连接扬声器
let started = false,
  curretnTime = 0,
  content = localStorage.getItem("saved-content") || "新年快乐",
  placeholder = "",
  spaceTimer;
let context = document.querySelector("#context");
let place = document.querySelector("#place");
let btn = document.querySelector(".btn");
let morsetext = document.querySelector(".morse-code");
let timer = document.querySelector("#timer");
let kbd = document.querySelector("#kbd");
let spaceTimeout = localStorage.getItem("spaceTimeout") || 350,
  shortcutKey = localStorage.getItem("shortcutKey") || "Space";

context.innerText += content;

renderMorseText();
renderShortsSelection();
renderTimer();

function renderMorseText() {
  morsetext.innerText = encode_morse_zh(content);
}
function renderShortsSelection() {
  const keys = [
    "Space",
    "KeyA",
    "KeyB",
    "KeyC",
    "KeyD",
    "KeyE",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyI",
    "KeyJ",
    "KeyK",
    "KeyL",
    "KeyM",
    "KeyN",
    "KeyO",
    "KeyP",
    "KeyQ",
    "KeyR",
    "KeyS",
    "KeyT",
    "KeyU",
    "KeyV",
    "KeyW",
    "KeyX",
    "KeyY",
    "KeyZ",
  ];
  const frag = document.createDocumentFragment();
  keys.forEach((item) => {
    let option = document.createElement("option");
    option.value = item;
    option.innerText = item;
    frag.appendChild(option);
  });
  kbd.append(frag);
  kbd.value = shortcutKey;
}

function renderTimer() {
  timer.value = spaceTimeout;
}

function createCtx() {
  audioCtx = new AudioContext();
  oscillator = audioCtx.createOscillator();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.2;
  oscillator.type = "sine";
  oscillator.frequency.value = 450;
  oscillator.connect(gainNode); // 发生源振荡器连接音量
  gainNode.connect(audioCtx.destination);
}

function pressHandler() {
  clearAddSpace();
  createCtx();
  started = true;
  curretnTime = new Date().getTime();
  oscillator.start();
}
function pressUpHandler() {
  started = false;
  let now = new Date().getTime();
  if (now - curretnTime > 200) {
    placeholder += "-";
  } else {
    placeholder += "·";
  }
  place.innerText = placeholder;
  addSpace();
  oscillator.stop(audioCtx.currentTime);
  (audioCtx = null), (oscillator = null), (gainNode = null);
}

function addSpace() {
  spaceTimer = setTimeout(() => {
    context.innerText += decode_morse_zh(placeholder);
    content += decode_morse_zh(placeholder);
    renderMorseText();
    localStorage.setItem("saved-content", content);
    placeholder = "";
    place.innerText = placeholder;
  }, spaceTimeout);
}

function clearAddSpace() {
  if (spaceTimer) {
    clearTimeout(spaceTimer);
    spaceTimer = null;
  }
}

function clearInput() {
  console.log("clear");
  content = "";
  context.innerText = content;
  renderMorseText();
  localStorage.setItem("saved-content", content);
}

window.addEventListener("keydown", (e) => {
  if (!started && e.code == shortcutKey) {
    pressHandler();
  }
  if (content && e.code == "Backspace") {
    content = content.substring(0, content.length - 1);
    context.innerText = content;
    localStorage.setItem("saved-content", content);
    renderMorseText();
  }
});
window.addEventListener("keyup", (e) => {
  if (started && e.code == shortcutKey) {
    pressUpHandler();
  }
});
timer.addEventListener("keydown", (e) => {
  e.stopPropagation();
});
timer.addEventListener("keyup", (e) => {
  e.stopPropagation();
});

timer.addEventListener("change", (e) => {
  let v =
    e.target.value < 350 ? 350 : e.target.value > 2000 ? 2000 : e.target.value;
  localStorage.setItem("spaceTimeout", v);
  location.reload();
});

kbd.addEventListener("change", (e) => {
  e.stopPropagation();
  console.log(e.target.value);
  localStorage.setItem("shortcutKey", e.target.value);
  location.reload();
});

btn.addEventListener("touchstart", (e) => {
  pressHandler();
});
btn.addEventListener("touchend", (e) => {
  pressUpHandler();
});

document.body.onblur = function () {
  if (started) {
    started = false;
    oscillator.stop(audioCtx.currentTime);
  }
};

if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  btn.hidden = false;
} else if (/(Android)/i.test(navigator.userAgent)) {
  btn.hidden = false;
}
