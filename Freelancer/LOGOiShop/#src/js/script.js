// import Swiper from './../vendor/swiper/js/swiper';
import * as app from './modules/app';
// import './../layout/s-header/burger';
// import './../layout/s-features/b-menu-features/menu-features';
// import './../layout/s-offers/offers';
import {
  sliderInit
} from './modules/slider';

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // =========================================
  app.inspectUserAgent();
  app.testWebP();
  app.backgroundImage();
  app.elemReplace();
  // =========================================
  sliderInit();
});