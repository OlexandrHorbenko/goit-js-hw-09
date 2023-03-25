import Notiflix from 'notiflix';

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const { delay, step, amount } = getFormValues(formElement);
  processPromises(delay, step, amount);
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

async function processPromises(delay, step, amount) {
  for (let i = 1; i <= amount; i += 1) {
    try {
      const result = await createPromise(i, delay + (i - 1) * step);
      onPromiseSuccess(result);
    } catch (error) {
      onPromiseError(error);
    }
  }
}

function onPromiseSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onPromiseError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
