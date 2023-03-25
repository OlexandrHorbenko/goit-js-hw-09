const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
};

let colorSwitchIntervalId = null;
let currentColor = null;

setColorSwitchState(false);

refs.startBtnEl.addEventListener('click', startColorSwitch);
refs.stopBtnEl.addEventListener('click', stopColorSwitch);

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

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function setBodyBgColor(color) {
  document.body.style.backgroundColor = color;
}

function setColorSwitchState(state) {
  refs.startBtnEl.disabled = state;
  refs.stopBtnEl.disabled = !state;
}

export { refs, startColorSwitch, stopColorSwitch };
