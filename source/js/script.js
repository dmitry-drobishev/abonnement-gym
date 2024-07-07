// import { initModals } from "./init-modals";

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
    item.querySelector(".abonnements__item-price-value").textContent = oldPrice.textContent
    item.querySelector(".abonnements__item-old-price").textContent= "";
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

getData();

const count = 1;

function start() {
  const start_time = new Date();
  // получаем время окончания таймера
  const stop_time = start_time.setMinutes(start_time.getMinutes() + count);
  const countdown = setInterval(function() {
    // текущее время
    const now = new Date().getTime();
    // сколько времени осталось до конца таймера
    const remain = stop_time - now;
    // переводим миллисекунды в минуты и секунды
    let min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
    let sec = Math.floor( (remain % (1000 * 60)) / 1000 );
    // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    document.querySelector(".counter__minutes .counter__numbers").textContent = min;
    document.querySelector(".counter__seconds .counter__numbers").textContent = sec;

    if (remain < 20000) {
      document.querySelector(".counter__minutes .counter__numbers").classList.add("counter__numbers--time-is-over", "counter__numbers--time-is-over-animation");
      document.querySelector(".counter__seconds .counter__numbers").classList.add("counter__numbers--time-is-over", "counter__numbers--time-is-over-animation");
      document.querySelector(".counter__separator").classList.add("counter__separator--time-is-over")
    }

    if (remain < 0) {
      document.querySelector(".counter__separator").classList.remove("counter__separator--animation")
      document.querySelector(".counter__minutes .counter__numbers").classList.remove("counter__numbers--time-is-over-animation");
      document.querySelector(".counter__seconds .counter__numbers").classList.remove("counter__numbers--time-is-over-animation");
      document.querySelector(".counter__minutes .counter__numbers").textContent = "00";
      document.querySelector(".counter__seconds .counter__numbers").textContent = "00";

      removeDiscount();
      setTimeout(openPopup, 1000);
      // initModals();
      clearInterval(countdown);
     }
  }, 1000);
}

start();

// window.addEventListener('load', () => {
//   initModals();
// });
