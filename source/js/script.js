'use strict';

const countItems = () => {
  const itemsList = document.querySelectorAll('.places__item');

  if (itemsList.length % 3 == 2) {
    const lastItem = itemsList.length - 1;

    itemsList[lastItem].style.marginLeft = 60 + 'px';
  }
}

countItems();
