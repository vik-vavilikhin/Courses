document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ===============================================
  /*              Элементы страницы               */
  // ===============================================
  const btnOpenModal = document.getElementById('btnOpenModal');
  const modalBlock = document.getElementById('modalBlock');
  const headerQuestion = document.getElementById('question');
  const formAnswers = document.getElementById('formAnswers');
  const modalDialog = document.querySelector('.modal-dialog');
  const modalTitle = document.querySelector('.modal-title');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  const btnSend = document.getElementById('send');
  const btnBurger = document.getElementById('burger');

  // ===============================================
  /*              Настройки FireBase              */
  // ===============================================
  const firebaseConfig = {
    apiKey: "AIzaSyAx_FbBm6fdviyX9QL9SKBhipKNe2xNG-M",
    authDomain: "gloacademy-intensive-quiz.firebaseapp.com",
    databaseURL: "https://gloacademy-intensive-quiz.firebaseio.com",
    projectId: "gloacademy-intensive-quiz",
    storageBucket: "gloacademy-intensive-quiz.appspot.com",
    messagingSenderId: "248513712566",
    appId: "1:248513712566:web:5ca5950a1c04c29f47b117",
    measurementId: "G-VPHZJ9DR6B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // ===============================================
  /*    Получение данных из внешнего источника    */
  // ===============================================
  const getData = () => {
    formAnswers.textContent = 'LOAD';

    btnNext.classList.add('d-none');
    btnPrev.classList.add('d-none');

    setTimeout(() => {
      firebase.database().ref().child('questions').once('value')
        .then(snap => playTest(snap.val()));
    }, 500);
  };

  // ===============================================
  /*                   Переменные                 */
  // ===============================================
  // Ширина документа
  let clientWidth = document.documentElement.clientWidth;
  // Счетчик
  let count = -100;
  // Расположение модального окна за верхней границей экрана
  modalDialog.style.top = `${count}%`;

  // ===============================================
  /*            Анимация вывода опросника         */
  // ===============================================
  const animateModal = () => {
    modalDialog.style.top = `${count}%`;
    count += 5;

    if (count < 0) {
      requestAnimationFrame(animateModal);
    } else {
      count = -100;
    }
  };

  // ===============================================
  /*          Функция начала тестирования         */
  // ===============================================
  const playTest = (questions) => {
    const finalAnswers = [];
    const obj = {};
    let indexQuestion = 0;
    modalTitle.textContent = 'Ответь на вопрос:';

    // ===============================================
    /*     Отрисовка содержиния модального окна     */
    // ===============================================
    const renderQuestion = () => {
      // Перед каждым открытием модального окна очистка содержимого
      formAnswers.textContent = '';

      if (indexQuestion >= 0 && indexQuestion <= questions.length - 1) {
        headerQuestion.textContent = questions[indexQuestion].question;

        // Через цикл выводим карточки из массива
        questions[indexQuestion].answers.forEach(({
          url,
          title,
        }) => {
          // Создать элемент DIV на странице
          const answerItem = document.createElement('div');
          // Добавить классы новому элементу
          answerItem.classList.add(
            'answers-item',
            'd-flex',
            'justify-content-center'
          );

          // Создать верстку нового элемента
          answerItem.insertAdjacentHTML('afterbegin', `
          <input 
            type="${questions[indexQuestion].type}" 
            id="${title}" 
            name="answer" 
            class="d-none" 
            value="${title}"
          >
          <label
          for = "${title}"
          class = "d-flex flex-column  justify-content-between" >
            <img class="answerImg" src="${url}" alt="burger">
            <span>${title}</span>
          </label>
        `);

          // Добавить новый элемент с версткой в существующую форму
          formAnswers.insertAdjacentElement('afterbegin', answerItem);
        });

        btnNext.classList.remove('d-none');
        btnPrev.classList.remove('d-none');
        btnSend.classList.add('d-none');
      }

      switch (true) {
        case (indexQuestion === 0):
          btnPrev.classList.add('d-none');
          break;

        case (indexQuestion === questions.length):
          headerQuestion.textContent = '';
          modalTitle.textContent = '';
          btnNext.classList.add('d-none');
          btnPrev.classList.add('d-none');
          btnSend.classList.remove('d-none');

          formAnswers.innerHTML = `
            <div class="form-group">
              <label for="exampleInputPassword1">Enter your phone number</label>
              <input 
                type="text" 
                class="form-control" 
                id="numberPhone"
              >
            </div>
          `;
          const numberPhone = document.getElementById('numberPhone');
          numberPhone.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^0-9+-]/, '');
          });

          break;

        case (indexQuestion === questions.length + 1):
          formAnswers.textContent = 'СПАСИБО!!!';
          btnSend.classList.add('d-none');

          for (let key in obj) {
            let newObj = {};
            newObj[key] = obj[key];
            finalAnswers.push(newObj);
          }

          setTimeout(() => {
            modalBlock.classList.remove('d-block');
          }, 3000);
          break;

        default:
          break;
      }
    };
    renderQuestion();

    // ===============================================
    /*                                              */
    // ===============================================
    const checkAnswer = () => {

      const inputs = [...formAnswers.elements].filter((input) =>
        input.checked || input.id === 'numberPhone');

      inputs.forEach((input, index) => {
        if (indexQuestion >= 0 && indexQuestion <= questions.length - 1) {
          obj[`${index}_${questions[indexQuestion].question}`] = input.value;
        }
        if (indexQuestion === questions.length) {
          obj[`Номер телефона: `] = input.value;
        }
      });
    };

    btnPrev.onclick = () => {
      indexQuestion--;
      renderQuestion(indexQuestion);
    };

    btnNext.onclick = () => {
      checkAnswer();
      indexQuestion++;
      renderQuestion(indexQuestion);
    };

    btnSend.onclick = () => {
      checkAnswer();
      indexQuestion++;
      renderQuestion(indexQuestion);
      firebase
        .database()
        .ref()
        .child('contacts')
        .push(finalAnswers);
      // console.log('finalAnswers: ', finalAnswers);
    };
  };

  // ===============================================
  /*           Открыть модальное окно             */
  // ===============================================
  btnOpenModal.addEventListener('click', () => {
    requestAnimationFrame(animateModal);
    modalBlock.classList.add('d-block');
    getData();
  });

  btnBurger.addEventListener('click', () => {
    requestAnimationFrame(animateModal);
    btnBurger.classList.add('active');
    modalBlock.classList.add('d-block');
    getData();
  });
  // ===============================================
  /* Отслеживание клика в модальном окне и 
     делегирование события этого клика элементу,
     на который был произведен клик.              */
  // ===============================================
  modalBlock.addEventListener('click', (e) => {
    const target = e.target;
    const closeModal = target.closest('#closeModal');

    /* ...если клик произведен по кнопке закрыть Х */
    /* ИЛИ по подложке модального окна             */
    if (closeModal || target === modalBlock) {
      btnBurger.classList.remove('active');
      modalBlock.classList.remove('d-block');
    }
  });

  // ===============================================
  /* Вывод на экран кнопки BURGER через проверку 
     ширины экрана                                */
  // ===============================================
  (clientWidth < 768) ? btnBurger.style.display = 'flex':
    btnBurger.style.display = 'none';

  window.addEventListener('resize', () => {
    clientWidth = document.documentElement.clientWidth;
    (clientWidth < 768) ? btnBurger.style.display = 'flex':
      btnBurger.style.display = 'none';
  });
});