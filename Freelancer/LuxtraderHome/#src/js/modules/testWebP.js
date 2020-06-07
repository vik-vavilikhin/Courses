// ====== testWebP =========================
const testWebP = () => {
  const webP = new Image();
  const cb = (support) => {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    }
    //  else {
    //   document.querySelector('body').classList.add('no-webp');
    // }
  };

  webP.onload = webP.onerror = () => {
    cb(webP.height == 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};
// =========================================