'use strict';

function timer() {
  // ============== TIMER =============
  let deadLine = '2019-05-09';

  function getTimeRemaining(endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)));
    /* let hours = Math.floor((t / 1000 / 60 / 60) % 24);
    let days = Math.floor((t / 1000 / 60 / 60 / 24)); */

    if (hours < 10) { hours = `0${hours}`; }
    if (minutes < 10) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }

    if (t < 0) { seconds = minutes = hours = '00'; }

    return {
      'total': t,
      hours,
      minutes,
      seconds
    };
  }

  function setClock(id, endTime) {
    let timer = document.getElementById(id);
    let hours = timer.querySelector('.hours');
    let minutes = timer.querySelector('.minutes');
    let seconds = timer.querySelector('.seconds');

    function updateClock() {
      let t = getTimeRemaining(endTime);
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total < 0) {
        clearInterval(timeInterval);
      }
    }

    let timeInterval = setInterval(updateClock, 1000);

  } setClock('timer', deadLine);
}

module.exports = timer;