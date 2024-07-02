function square(number) {
  console.log(number * number);
}

square(10);


console.log(101);
console.log(102);
console.log(103);


// на сколько минут ставим таймер
var count = 5;
// запущен таймер или нет
// started = false;

// запуск таймера по кнопке
function start() {
  // если таймер уже запущен — выходим из функции
  // if (started) {return};
  // запоминаем время нажатия
  var start_time = new Date();
  // получаем время окончания таймера
  var stop_time = start_time.setMinutes(start_time.getMinutes() + count);

  // запускаем ежесекундный отсчёт
  var countdown = setInterval(function() {
    // текущее время
    var now = new Date().getTime();
    // сколько времени осталось до конца таймера
    var remain = stop_time - now;
    // переводим миллисекунды в минуты и секунды
    var min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
    var sec = Math.floor( (remain % (1000 * 60)) / 1000 );
    // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
    sec = sec < 10 ? "0" + sec : sec;
    // отправляем значение таймера на страницу в нужный раздел
    document.querySelector(".counter__minutes .counter__numbers").textContent = min;
    document.querySelector(".counter__seconds .counter__numbers").textContent = sec;
    // document.getElementById("timer").innerHTML = min + ":" + sec;
    // если время вышло
    if (remain < 0) {
      // останавливаем отсчёт
      clearInterval(countdown);
      // пишем текст вместо цифр
      document.getElementById("timer").innerHTML = "Всё!";
     }
  }, 1000);
  // помечаем, что таймер уже запущен
  // started = true;
}

start();
