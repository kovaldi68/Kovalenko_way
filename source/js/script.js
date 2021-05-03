'use strict';

const mediaDesktop = window.matchMedia('(min-width: 1024px)');
const buyTourForm = document.querySelector('.form--buy');
const buyTourModal = document.querySelector('.modal--buy');
const successModal = document.querySelector('.modal--success');
const questionForm = document.querySelector('.form--question');
const buyTourButtons = document.querySelectorAll('.buy-button');
const closeModalButtons = document.querySelectorAll('.button--close');
const userNumber = buyTourModal.querySelector('[name = user-tel]');
const userMail = buyTourModal.querySelector('[name = user-email]');

let isStorageSupport = true;
let storageNumber = '';
let storageMail = '';

try {
  storageNumber = localStorage.getItem('userNumber');
  storageMail = localStorage.getItem('userMail');
} catch (err) {
  isStorageSupport = false;
}

const storageData = () => {
  if (storageNumber && storageMail) {
    userNumber.value = storageNumber;
    userMail.value = storageMail;
  }
}

const forSubmitHandler = (evt) => {
  evt.preventDefault();
  buyTourModalHandler();
  showUpSuccessModal();

  if (isStorageSupport) {
    localStorage.setItem('userNumber', userNumber.value);
    localStorage.setItem('userMail', userMail.value);
  }
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' ||  'Esc');
};

const successModalHandler = () => {
  successModal.classList.remove('modal--opened');

  document.removeEventListener('keydown', onSuccessEscHandler);
  document.removeEventListener('click', onSuccessClickHandler);
}

const buyTourModalHandler = () => {
  buyTourModal.classList.remove('modal--opened');

  document.removeEventListener('keydown', onBuyTourEscHandler);
  document.removeEventListener('click', onBuyTourClickHandler);
}

const onSuccessClickHandler = (evt) => {
  if (evt.target == document.querySelector('.modal')) {
    successModalHandler();
  }
}

const onBuyTourClickHandler = (evt) => {
  if (evt.target == document.querySelector('.modal')) {
    buyTourModalHandler();
  }
}

const onSuccessEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successModalHandler()
  }
}

const onBuyTourEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    buyTourModalHandler()
  }
}

const countItems = () => {
  const itemsList = document.querySelectorAll('.places__item');
  const lastItem = itemsList.length - 1;

  if (mediaDesktop.matches) {
    if (itemsList.length % 3 == 2) {

      itemsList[lastItem].style.marginLeft = 60 + 'px';
    }
  } else {
    itemsList[lastItem].style.marginLeft = 0;
  }
}

const buyTourButtonHandler = () => {
  for (let button of buyTourButtons) {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      showUpBuyTourModal();
    })
  }
}

const closeButtonHandler = () => {
  for (let button of closeModalButtons) {
    button.addEventListener('click', () => {
      button.closest('.modal').classList.remove('modal--opened')
    })
  }
}

const showUpBuyTourModal = () => {
  buyTourModal.classList.add('modal--opened');
  storageData();
  userNumber.focus();

  document.addEventListener('keydown', onBuyTourEscHandler);
  document.addEventListener('click', onBuyTourClickHandler);
}

const showUpSuccessModal = () => {
  successModal.classList.add('modal--opened');

  document.addEventListener('keydown', onSuccessEscHandler);
  document.addEventListener('click', onSuccessClickHandler)
}

window.addEventListener('resize', () => {
  countItems();
});


buyTourForm.addEventListener('submit', forSubmitHandler)
countItems();
buyTourButtonHandler();
closeButtonHandler();
