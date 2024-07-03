
//  Функция получает массив объектов с сервера

const getData = () => {
  // fetch('https://24.javascript.pages.academy/kekstagram/data')
  fetch('https://t-pay.iqfit.app/subscribe/list-test')
    .then((response) => response.json())
    .then((list) => {
      // onSuccess(posts);
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



  list.forEach((element) => {
    const newAbonnement = abonnementTemplate.cloneNode(true);
    newAbonnement.getElementsByTagName('input').id = element.price;
    newAbonnement.getElementsByTagName('label').for = element.price;
    newAbonnement.querySelector(".abonnements__item-title").textContent = element.name;
    newAbonnement.querySelector(".abonnements__item-price").textContent = element.price;

    abonnementFragment.appendChild(newAbonnement);
  });

  abonnementsListContainer.appendChild(abonnementFragment);
};

getData();
