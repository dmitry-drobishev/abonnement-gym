class CountdownTimer {
  startDate = null;
  stopDate = null;
  intervalId = null;
  onTimerUpdate = () => {};
  onTimerStop = () => {};
  onTimerStart = () => {};
  counter = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    remain: 0
  };

  constructor(seconds = 0) {
    this.startDate = this.getCurrentSeconds();
    this.stopDate = this.getCurrentSeconds() + seconds;
    this.calculateCounter(this.startDate);
  }

  getCounter() {
    return this.counter;
  }

  setOnTimerUpdate(callback) {
    if(typeof callback !== 'function') {
      throw new Error("Not callable");
    }

    this.onTimerUpdate = callback;
  }

  setOnTimerStart(callback) {
    if(typeof callback !== 'function') {
      throw new Error("Not callable");
    }

    this.onTimerStart = callback;
  }

  setOnTimerStop(callback) {
    if(typeof callback !== 'function') {
      throw new Error("Not callable");
    }

    this.onTimerStop = callback;
  }

  getCurrentSeconds() {
    return parseInt(Date.now() / 1000);
  }

  startTimer() {
    let interval = 1000;

    this.intervalId = setInterval(() => {
      let currentDate = this.getCurrentSeconds();
      this.calculateCounter(currentDate);

      this.onTimerUpdate(this.counter);

      if(this.isTimerEnd(currentDate)) {
        this.stop();
        return;
      }
    }, interval);

  }

  start() {
    this.startTimer();
    this.onTimerStart(this.counter);
  }

  isTimerEnd(currentDate) {
    return currentDate >= this.stopDate;
  }

  calculateCounter(startDate = null) {
    let remain = this.stopDate - (startDate ?? this.getCurrentSeconds());
    let seconds = remain;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    let counter = {
      seconds: seconds % 60,
      minutes: minutes % 60,
      hours: hours % 24,
      remain: remain
    };

    this.counter = {...this.counter, ... counter};
  }

  stop() {
    clearInterval(this.intervalId);
    this.onTimerStop();
  }
}


export { CountdownTimer };
