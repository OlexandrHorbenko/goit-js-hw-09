import Notiflix from 'notiflix';

const formElement = document.querySelector('.form');
formElement.addEventListener('submit', (event) => {
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
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay + (i - 1) * step)
      .then((result) => handlePromiseSuccess(result))
      .catch((error) => handlePromiseError(error));
  }
}

function handlePromiseSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function handlePromiseError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function createPromise(position, delay) {
  // console.log(`Creating promise ${position} with delay ${delay}ms`);
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