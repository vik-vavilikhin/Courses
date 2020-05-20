'use sctipt';

// ======================================================
const exCheckBox = document.querySelector('.exCheckBox');
const exRadio = document.querySelector('.exRadio');
const exSelect = document.querySelector('.exSelect');
const exRange = document.querySelector('.exRange');

const myChBox = document.getElementById('myChBox');
const mySelect = document.getElementById('mySelect');
const myRange = document.getElementById('myRange');

const outputRange = document.getElementById('outputRange');
const widthDivRange = document.getElementById('widthDivRange');

// ======================================================
const spanCheckBox = document.createElement('span');
myChBox.addEventListener('change', () => {
  spanCheckBox.remove();
  exCheckBox.appendChild(spanCheckBox).className = 'condition';
  
  if (myChBox.checked) {
    spanCheckBox.textContent = 'Выбран';
  } else {
    spanCheckBox.textContent = 'Не выбран';
  }
})

const spanRadio = document.createElement('span');
exRadio.addEventListener('click', () => {
  spanRadio.remove();
  exRadio.appendChild(spanRadio).className = 'condition';
  
  const rad = document.getElementsByName('r1');
  for (let i = 0; i < rad.length; i++) {
    if (rad[i].checked) {
      spanRadio.textContent = 'Выбран ' + i + ' элемент';
    }
  }
});

const spanSelect = document.createElement('span');
mySelect.addEventListener('change', () => {
  const sel = document.getElementById('mySelect').selectedIndex;
  const opt = document.getElementById('mySelect').options;
  
  spanSelect.remove();
  exSelect.appendChild(spanSelect).className = 'condition'
  spanSelect.textContent = 'Выбран элемент со значением: ' + opt[sel].text;
})

myRange.addEventListener('input', () => {
  outputRange.value = myRange.value;

  widthDivRange.style.width = myRange.value + 'px';
  if (myRange.value == 0) {
    widthDivRange.style.border = 'none';
  } else {
    widthDivRange.style.border = '1px solid #000';
  }
})

// ======================================================
document.getElementById('generator').addEventListener('input', () => {
  const rtl = document.getElementById('rtl').value;
  const ttl = document.getElementById('ttl');
  
  const rtr = document.getElementById('rtr').value;
  const ttr = document.getElementById('ttr');
  
  const rbr = document.getElementById('rbr').value;
  const tbr = document.getElementById('tbr');
  
  const rbl = document.getElementById('rbl').value;
  const tbl = document.getElementById('tbl');
  
  const generatorResult = document.getElementById('generatorResult');
  
  ttl.value = rtl;
  ttr.value = rtr;
  tbr.value = rbr;
  tbl.value = rbl;
  
  generatorResult.style.borderRadius = 
  rtl + 'px ' + 
  rtr + 'px ' + 
  rbr + 'px ' +
  rbl + 'px ' 
})

// ===============================================
document.getElementById('nav').onmouseover = function (event) {
  const target = event.target;
  if (target.className == 'menu-item') {
    const subMenu = target.getElementsByClassName('submenu');
    closeMenu();
    subMenu[0].style.display = 'block';
  }
};

document.onmouseover = function (event) {
  const target = event.target;
  // console.log(event.target);
  
  if (target.className != 'menu-item' && target.className != 'submenu-item') {
    closeMenu();
  }
}

function closeMenu() {
  const subMenu = document.getElementsByClassName('submenu');
  for (let i = 0; i < subMenu.length; i++) {
    subMenu[i].style.display = 'none';
  }
}
// ======================================================
let tab;
let tabContent;

window.onload = function () {
  tabContent = document.getElementsByClassName('tabContent');
  tab = document.getElementsByClassName('tab');
  hideTabsContent(1);
}

function hideTabsContent(a) {
  for (let i = a; i < tabContent.length; i++) {
    tabContent[i].classList.remove('show');
    tabContent[i].classList.add('hide');
    tab[i].classList.remove('whiteBorder');
  }
}

document.getElementById('tabs').onclick = function (event) {
  let target = event.target;
  console.log(event.target);
  if (target.className === 'tab') {
    for (let i = 0; i < tab.length; i++) {
      if (target === tab[i]) {
        showTabsContent(i);
        break;
      }
    }
  }
}

function showTabsContent(b) {
  if (tabContent[b].classList.contains('hide')) {
    hideTabsContent(0);
    tab[b].classList.add('whiteBorder');
    tabContent[b].classList.remove('hide');
    tabContent[b].classList.add('show');
  }
}
// ======================================================
const modal = document.getElementById('myModal');
const modalClose = document.getElementsByClassName('modalClose')[0];

document.getElementById('myButton').onclick = () => {
  myModal.style.display = 'block';
};

modalClose.addEventListener('click', closeModal);

window.onclick = (event) => {
  if(event.target == myModal) {
    closeModal();
  }
}

function closeModal() {
  myModal.style.display = 'none';
}