import Notiflix from 'notiflix';

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', event => {
  event.preventDefault();
  const { delay, step, amount } = getFormValues(formElement);
  handlePromises(delay, step, amount);
});

function getFormValues(form) {
  const delayInput = form.querySelector('input[name="delay"]');
  const stepInput = form.querySelector('input[name="step"]');
  const amountInput = form.querySelector('input[name="amount"]');
  return {
    delay: parseInt(delayInput.value),
    step: parseInt(stepInput.value),
    amount: parseInt(amountInput.value),
  };
}

function handlePromises(delay, step, amount) {
  let lastPromiseCreated = false;
  const firstPromiseDelay = delay;
  createPromise(1, firstPromiseDelay)
    .then(result => handlePromiseSuccess(result))
    .catch(error => handlePromiseError(error));

  let i = 2;
  const intervalId = setInterval(() => {
    if (i <= amount) {
      createPromise(i, delay + (i - 1) * step)
        .then(result => handlePromiseSuccess(result))
        .catch(error => handlePromiseError(error));
      i += 1;
      if (i > amount) {
        lastPromiseCreated = true;
      }
    } else {
      clearInterval(intervalId);
    }
  }, step);

  const lastPromiseDelay = delay + (amount - 1) * step;
  setTimeout(() => {
    if (!lastPromiseCreated) {
      createPromise(amount, delay + (amount - 1) * step)
        .then(result => handlePromiseSuccess(result))
        .catch(error => handlePromiseError(error));
      lastPromiseCreated = true;
    }
  }, lastPromiseDelay);
}

function handlePromiseSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function handlePromiseError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function createPromise(position, delay, step) {
  // console.log(`Creating promise ${position} with delay ${delay}ms`);
return new Promise((resolve, reject) => {
    const startTime = performance.now();
    function checkTime() {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      if (elapsed >= delay) {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      } else {
        requestAnimationFrame(checkTime);
      }
    }
    checkTime();
  });
}
