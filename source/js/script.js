
let time = 12000;

// let timerMinutes = document.querySelector(".counter__minutes .counter__numbers")

setInterval( function () {
  time--
  if (time = 0) {
    timerMinutes.textContent = "0"
  }
  // timerMinutes.textContent = time;
  console.log(time);
}, 1000)

