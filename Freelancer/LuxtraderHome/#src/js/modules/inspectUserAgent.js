// ====== inspectUserAgent =================
/*
  Определение браузера пользователя и ОС
*/
const inspectUserAgent = () => {
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf('MSIE ');
  let isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        this.Android() ||
        this.BlackBerry() ||
        this.iOS() ||
        this.Opera() ||
        this.Windows());
    }
  };

  const isIE = () => {
    ua = navigator.userAgent;
    let isie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isie;
  };

  if (isIE()) {
    document.querySelector('body').classList.add('ie');
  }
  if (isMobile.any()) {
    document.querySelector('body').classList.add('touch');
  }
};
// ---------------------------------------------