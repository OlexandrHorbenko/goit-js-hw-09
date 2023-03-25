import { refs } from './01-color-switcher';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

export function setBodyBgColor(color) {
  document.body.style.backgroundColor = color;
}

export function setColorSwitchState(state) {
  refs.startBtn.disabled = state;
  refs.stopBtn.disabled = !state;
}

export const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let colorSwitchIntervalId = null;
let currentColor = null;

setColorSwitchState(false);

refs.startBtn.addEventListener('click', startColorSwitch);
refs.stopBtn.addEventListener('click', stopColorSwitch);

function startColorSwitch() {
  setColorSwitchState(true);

  colorSwitchIntervalId = setInterval(() => {
    currentColor = getRandomHexColor();
    setBodyBgColor(currentColor);
  }, 1000);
}

function stopColorSwitch() {
  setColorSwitchState(false);

  clearInterval(colorSwitchIntervalId);
  if (currentColor) setBodyBgColor(currentColor);
}
