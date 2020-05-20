let btn = document.querySelector('button');
let txt = document.querySelector('p');

function updateBtn() {
  if (btn.textContent === 'Завести машину') {
    btn.textContent = 'Заглушить машину';
    txt.textContent = 'Машина заведена';
  } else {
    btn.textContent = 'Завести машину';
    txt.textContent = 'Машина заглушена';
  }
}

btn.addEventListener('click', updateBtn);
