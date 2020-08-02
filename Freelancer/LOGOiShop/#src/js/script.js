import * as app from './modules/app';
import './../layout/s-header/burger';

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // =========================================
  app.inspectUserAgent();
  app.testWebP();
  app.backgroundImage();
  app.elemReplace();
  // =========================================
});