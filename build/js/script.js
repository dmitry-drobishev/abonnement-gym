import {CountdownTimer} from "./timer.js"

// Получает массив объектов с сервера
const getData = () => {
  fetch('https://t-pay.iqfit.app/subscribe/list-test')
    .then((response) => response.json())
    .then((list) => {
      createAbonnementsList(list);
      createPopupAbonnements(list);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Открывает попап
function openPopup() {
  document.querySelector(".popup").classList.add("popup--visible");

  document.querySelector(".popup__close-button").addEventListener("click", () => {
    document.querySelector(".popup").classList.remove("popup--visible");
  });
};

// убирает скидку
function removeDiscount() {
  const items = document.querySelectorAll(".abonnements__item");
  for (let item of items) {
    let oldPrice = item.querySelector(".abonnements__item-old-price-value");
    let price = item.querySelector(".abonnements__item-price-value");
    item.querySelector(".abonnements__item-price-wrapper").classList.add("abonnements__item-price-wrapper--hidden");
    setTimeout(() => item.querySelector(".abonnements__item-price-value").textContent = oldPrice.textContent, 2000)
    setTimeout(() => item.querySelector(".abonnements__item-old-price").classList.add("abonnements__item-old-price--hidden"), 2100)
    setTimeout(() => item.querySelector(".abonnements__item-price-wrapper").classList.remove("abonnements__item-price-wrapper--hidden"), 2500)
    item.querySelector(".abonnements__item-sale").remove();
  }
};

// заполняет блок абоннементов
function createAbonnementsList(list) {
  const abonnementsListContainer = document.querySelector('.abonnements__list');
  const abonnement = document.querySelector('#abonnement-item-ispopular').content;
  const abonnementTemplate = abonnement.querySelector(".abonnements__item");
  const abonnementFragment = document.createDocumentFragment();

  for (let element of list) {
    if (element.isPopular !== true) {
      continue;
    }
    const newAbonnement = abonnementTemplate.cloneNode(true);
    newAbonnement.querySelector('input').setAttribute("id", element.id);
    newAbonnement.querySelector('label').setAttribute("for", element.id);
    newAbonnement.querySelector('input').setAttribute("value", element.id);
    newAbonnement.querySelector(".abonnements__item-title").textContent = element.name;
    newAbonnement.querySelector(".abonnements__item-price-value").textContent = element.price;
    newAbonnement.querySelector(".abonnements__item-old-price-value").textContent = element.price * 2;

    abonnementFragment.appendChild(newAbonnement);
  }
  abonnementsListContainer.appendChild(abonnementFragment);
};

// заполняет попап
function createPopupAbonnements(list) {
  const abonnementsListContainer = document.querySelector('.popup__abonnements-list');
  const abonnement = document.querySelector('#abonnement-item-popup').content;
  const abonnementTemplate = abonnement.querySelector(".popup__abonnements-item");
  const abonnementFragment = document.createDocumentFragment();

  for (let element of list) {
    if (element.isDiscount !== true) {
      continue;
    }
    const newAbonnement = abonnementTemplate.cloneNode(true);
    newAbonnement.querySelector('input').setAttribute("id", element.id);
    newAbonnement.querySelector('label').setAttribute("for", element.id);
    newAbonnement.querySelector('input').setAttribute("value", element.id);
    newAbonnement.querySelector(".popup__abonnements-item-title").textContent = element.name;
    newAbonnement.querySelector(".popup__abonnements-item-price-value").textContent = element.price;
    newAbonnement.querySelector(".popup__abonnements-item-old-price-value").textContent = element.price * 2;

    abonnementFragment.appendChild(newAbonnement);
  }
  abonnementsListContainer.appendChild(abonnementFragment);
};


let time = 120;
let timer = new CountdownTimer(time);

function formatTime(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

timer.setOnTimerStart((counter) => {
  document.querySelector(".counter__minutes .counter__numbers").textContent = formatTime(counter.minutes);
  document.querySelector(".counter__seconds .counter__numbers").textContent = formatTime(counter.seconds);
});

timer.setOnTimerStop(() => {
  document.querySelector(".counter__separator").classList.remove("counter__separator--animation")
  document.querySelector(".counter__minutes .counter__numbers").classList.remove("counter__numbers--time-is-over-animation");
  document.querySelector(".counter__seconds .counter__numbers").classList.remove("counter__numbers--time-is-over-animation");
  document.querySelector(".counter__minutes .counter__numbers").textContent = "00";
  document.querySelector(".counter__seconds .counter__numbers").textContent = "00";
  document.querySelector(".abonnements__item-sale").classList.remove("abonnements__item-sale--animation");

  removeDiscount();
  setTimeout(openPopup, 7000)
  // console.log("Bye, timer end");
});

timer.setOnTimerUpdate((counter) => {
  document.querySelector(".counter__minutes .counter__numbers").textContent = formatTime(counter.minutes);
  document.querySelector(".counter__seconds .counter__numbers").textContent = formatTime(counter.seconds);

  if (counter.remain < 20) {
    document.querySelector(".counter__minutes .counter__numbers").classList.add("counter__numbers--time-is-over", "counter__numbers--time-is-over-animation");
    document.querySelector(".counter__seconds .counter__numbers").classList.add("counter__numbers--time-is-over", "counter__numbers--time-is-over-animation");
    document.querySelector(".counter__separator").classList.add("counter__separator--time-is-over")

    const items = document.querySelectorAll(".abonnements__item");
    for (let item of items) {
      item.querySelector(".abonnements__item-sale").classList.add("abonnements__item-sale--animation");
    }
  }
  // console.log("Wow, timer update", counter);
});

getData();

timer.start();
