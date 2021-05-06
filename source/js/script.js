'use strict';

const mediaDesktop = window.matchMedia('(min-width: 1024px)');
const buyTourForm = document.querySelector('.form--buy');
const buyTourModal = document.querySelector('.modal--buy');
const successModal = document.querySelector('.modal--success');
const questionForm = document.querySelector('.form--question');
const buyTourButtons = document.querySelectorAll('.buy-button');
const closeModalButtons = document.querySelectorAll('.button--close');
const userBuyNumber = buyTourModal.querySelector('[name = user-tel]');
const userBuyMail = buyTourModal.querySelector('[name = user-email]');
const userQuestionNumber = questionForm.querySelector('[name = user-tel]');
const userQuestionMail = questionForm.querySelector('[name = user-email]');
const tabs = document.querySelectorAll('.tab-list__link');
const tabContentBlocks = document.querySelectorAll('.country-info');
const placeCardLinks = document.querySelectorAll('.place-card__link-more');
const menuToggle = document.querySelector('.page-header__toggle');
const header = document.querySelector('.page-header');


//header

header.classList.remove('page-header--nojs');

const onMenuHandler = (evt) => {
  evt.preventDefault();
  const headerHeight = header.offsetHeight;

  if (header.classList.contains('page-header--opened')) {
    header.classList.remove('page-header--opened')
    document.body.style.paddingTop = 0;
  } else {
    header.classList.add('page-header--opened')
    document.body.style.paddingTop = `${headerHeight}px`;
  }
};

const closeHeader = () => {
  if (mediaDesktop.matches) {
    document.body.style.paddingTop = 0;
    header.classList.remove("page-header--opened");
  }
}

//tabs

const onTabClickHandler = () => {
  tabs.forEach(element => {
    element.addEventListener('click', selectCountryTab)
  })
}

const selectCountryTab = (evt) => {
  evt.preventDefault();
  if (evt.target) {
    tabs.forEach(element => {
      element.classList.remove('tab-list__link--active');
    })
    evt.target.classList.add('tab-list__link--active');
    let tabName = evt.target.dataset.countryName;
    selectTabContent(tabName);
  }
}

const selectTabContent = (tabName) => {
  tabContentBlocks.forEach(element => {
    if (element.id === tabName) {
      element.classList.add('country-info--active');
    } else {
      element.classList.remove('country-info--active');
    }
  })
}

const onCardLinkHandler = () => {
  placeCardLinks.forEach(element => {
    element.addEventListener('click', goToCountry)
  })
}

const goToCountry = (evt) => {
  let linkName = evt.target.getAttribute('href').substr(1);

  tabs.forEach(element => {
    element.classList.remove('tab-list__link--active');
    if (linkName == element.id) {
      element.classList.add('tab-list__link--active');
    }
  })
  let tabName = evt.target.dataset.countryName;
  selectTabContent(tabName);
}

//localstoage

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
    userBuyNumber.value = storageNumber;
    userBuyMail.value = storageMail;
  }
}

//forms

const buyFormSubmitHandler = (evt) => {
  evt.preventDefault();
  buyTourModalHandler();
  showUpSuccessModal();

  if (isStorageSupport) {
    localStorage.setItem('userNumber', userBuyNumber.value);
    localStorage.setItem('userMail', userBuyMail.value);
  }
}

const questionFormSubmitHandler = (evt) => {
  evt.preventDefault();
  showUpSuccessModal();

  if (isStorageSupport) {
    localStorage.setItem('userNumber', userQuestionNumber.value);
    localStorage.setItem('userMail', userQuestionMail.value);
  }
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
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
  if (evt.target === document.querySelector('.modal--success')) {
    successModalHandler();
  }
}

const onBuyTourClickHandler = (evt) => {
  if (evt.target === document.querySelector('.modal--buy')) {
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
  userBuyNumber.focus();

  document.addEventListener('keydown', onBuyTourEscHandler);
  document.addEventListener('click', onBuyTourClickHandler);
}

const showUpSuccessModal = () => {
  successModal.classList.add('modal--opened');

  document.addEventListener('keydown', onSuccessEscHandler);
  document.addEventListener('click', onSuccessClickHandler)
}

//padding for place-cards

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

window.addEventListener('resize', () => {
  countItems();
});


buyTourForm.addEventListener('submit', buyFormSubmitHandler);
questionForm.addEventListener('submit', questionFormSubmitHandler);
menuToggle.addEventListener('click', onMenuHandler);
countItems();
buyTourButtonHandler();
closeButtonHandler();
onTabClickHandler();
onCardLinkHandler();
closeHeader();
