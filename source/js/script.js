
//  Функция получает массив объектов с сервера

const getData = () => {
  // fetch('https://24.javascript.pages.academy/kekstagram/data')
  fetch('https://t-pay.iqfit.app/subscribe/list-test')
    .then((response) => response.json())
    .then((list) => {
      console.log(list);
      createAbonnementsList(list);
    })
    .catch(() => {
      // onFail('Не удалось загрузить данные c сервера.');
      console.log('Не удалось загрузить данные c сервера.')
    });
};

function createAbonnementsList(list) {

  const abonnementsListContainer = document.querySelector('.abonnements__list');
  const abonnement = document.querySelector('#abonnement-item-ispopular').content;
  const abonnementTemplate = abonnement.querySelector(".abonnements__item");
  const abonnementFragment = document.createDocumentFragment();

  console.log(list);


  for (let i = 0; i < list.length; i++) {
    if (element.isPopular = true) {
      const newAbonnement = abonnementTemplate.cloneNode(true);
      newAbonnement.getElementsByTagName('input').id = element.price;
      newAbonnement.getElementsByTagName('label').for = element.price;
      newAbonnement.querySelector(".abonnements__item-title").textContent = element.name;
      newAbonnement.querySelector(".abonnements__item-price").textContent = element.price;

      abonnementFragment.appendChild(newAbonnement);
    }
  }
  abonnementsListContainer.appendChild(abonnementFragment);
};

getData();


const count = 1;

function start() {
  var start_time = new Date();
  // получаем время окончания таймера
  var stop_time = start_time.setMinutes(start_time.getMinutes() + count);


  var countdown = setInterval(function() {
    // текущее время
    var now = new Date().getTime();
    // сколько времени осталось до конца таймера
    var remain = stop_time - now;
    // переводим миллисекунды в минуты и секунды
    var min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
    var sec = Math.floor( (remain % (1000 * 60)) / 1000 );
    // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    document.querySelector(".counter__minutes .counter__numbers").textContent = min;
    document.querySelector(".counter__seconds .counter__numbers").textContent = sec;

    if(remain < 20000) {
      document.querySelector(".counter__minutes .counter__numbers").classList.add("counter__numbers--time-is-over", "counter__numbers--time-is-over-animation");
      document.querySelector(".counter__seconds .counter__numbers").classList.add("counter__numbers--time-is-over");
      document.querySelector(".counter__separator").classList.add("counter__separator--time-is-over")
    }

    if (remain < 0) {
      document.querySelector(".popup").classList.add("popup--visible");
      clearInterval(countdown);
      document.querySelector(".counter__minutes .counter__numbers").textContent = "00";
      document.querySelector(".counter__seconds .counter__numbers").textContent = "00";


      document.querySelector(".popup__close-button").addEventListener("click", () => {
        document.querySelector(".popup").classList.remove("popup--visible");
      });
     }
  }, 1000);
}

start();
