const buttons = {
startBtn: document.querySelector('[data-start]'),
stopBtn: document.querySelector('[data-stop]'),
};

let colorSwitchIntervalId = null;
let currentColor = null;

setControlsState(false);

buttons.startBtn.addEventListener('click', startColorSwitchInterval);
buttons.stopBtn.addEventListener('click', stopColorSwitchInterval);

function startColorSwitchInterval() {
setControlsState(true);

colorSwitchIntervalId = setInterval(() => {
currentColor = getRandomHexColor();
setBodyBgColor(currentColor);
}, 1000);
}

function stopColorSwitchInterval() {
setControlsState(false);

clearInterval(colorSwitchIntervalId);
if (currentColor) setBodyBgColor(currentColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function setBodyBgColor(color) {
document.body.style.backgroundColor = color;
}

function setControlsState(state) {
buttons.startBtn.disabled = state;
buttons.stopBtn.disabled = !state;
}

export { buttons, startColorSwitchInterval, stopColorSwitchInterval };