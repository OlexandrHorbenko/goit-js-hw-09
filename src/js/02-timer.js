import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

export const countdown = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startButtonEl: document.querySelector('[data-start]'),
  dateTimePickerEl: document.querySelector('#datetime-picker'),
  countdownInterval: null,
  startDate: null,
};

export const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    onDateSelected(selectedDate);
  },
};

countdown.startButtonEl.disabled = true;
flatpickr(countdown.dateTimePickerEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateCountdown(remainingMs) {
  const { days, hours, minutes, seconds } = convertMs(remainingMs);

  countdown.secondsEl.textContent = seconds.toString().padStart(2, '0');
  countdown.minutesEl.textContent = minutes.toString().padStart(2, '0');
  countdown.hoursEl.textContent = hours.toString().padStart(2, '0');
  countdown.daysEl.textContent = days.toString().padStart(2, '0');
}

function startCountdown(selectedDate) {
  const timeUntilSelectedDate = selectedDate.getTime() - countdown.startDate;

  countdown.countdownInterval = setInterval(() => {
    const timeLeft = timeUntilSelectedDate - (Date.now() - countdown.startDate);

    if (timeLeft <= 0) {
      clearInterval(countdown.countdownInterval);
      updateCountdown(0);
      return;
    }

    updateCountdown(timeLeft);
  }, 1000);
}

function onDateSelected(selectedDate) {
  const isOnPast = selectedDate < options.defaultDate;
  if (isOnPast) {
    Notiflix.Report.warning(
      'Warning',
      'Please choose a date in the future',
      'OK'
    );
    countdown.startButtonEl.disabled = true;
    return;
  }

  countdown.startButtonEl.disabled = false;
  countdown.startButtonEl.addEventListener('click', () => {
    countdown.startDate = Date.now();
    countdown.startButtonEl.disabled = true;
    startCountdown(selectedDate);
  });
}

countdown.dateTimePickerEl.addEventListener('change', (e) => {
  const selectedDate = e.target._flatpickr.selectedDates[0];
  onDateSelected(selectedDate);
});

