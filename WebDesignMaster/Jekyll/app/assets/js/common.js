$("body").prognroll({
	height: 2,
	color: "#ec1c1c",
	custom: false
});
// Обработка нажатия на кнопкю МЕНЮ
$(function() {
	// Добавляем елемент в конец блока '.top-line'
	$('.top-line .container-fluid').after('<div class="mobile-menu d-lg-none">');
	// $('.top-line').after('<div class="mobile-menu d-lg-none">');

	// Клонируем '.top-menu' во вновь созданный елемент
	// с классом '.mobile-menu'
	$('.top-menu').clone().appendTo('.mobile-menu');

	// По клику по '.mobile-menu-button'
	$('.mobile-menu-button').click(function() {
		// Раскрываем/скрываем '.mobile-menu'
		$('.mobile-menu').stop().slideToggle();
	});
});
// Обработка .logo-litera
$(function () {
	// Пройти по всем Логотипам на странице
	$('.logo-litera').each(function () {
		// В переменную записываем значение всего Логотипа
		var ths = $(this);

		// Выделить букву 'O' из всего содержимого Логотипа
		// и изменить её на '<span class="logo__accent-litera">O</span>'
		ths.html(ths.html().replace('O', '<span class="logo__accent-litera">O</span>'));
	});
});

// Обработка нажатия на кнопку поиска в шапке сайта
$(function() {
	// при клике по селектору '.search-wrap__btn' 
	// запустить функцию
	$('.search-wrap__btn').click(function() {
		// для селектора '.search-wrap__field'
		// и добавить событие .slideToggle()
		
		// Функцию .stop() добавляем для ограничения
		// действий события .slideToggle() 
		// при многократном клике по кнопке поиска
		$('.search-wrap__field').stop().slideToggle();
		
		// Поле ввода после открытия формы поиска
		// получает фокус
		$('.search-wrap__field .google-search-form__input_placeholder').focus();
	});

	// при нажатии кнопки Esc (код=27)
	// закрывать форму поиска
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.search-wrap__field').slideUp();
		}
	// при клике вне формы
	// закрывать форму поиска
	}).click(function() {
		$('.search-wrap__field').slideUp();
	});

	// при клике внутри формы
	// останавливать событие закрытия
	$('.search-wrap').click(function(e) {
		e.stopPropagation();
	});
});
// Обработка класса .hover
$(function () {
	$('.item-col').hover(function () {
		ths = $(this);
		lnk = ths.closest('.item-col').find('.item-col__link');
		lnk.addClass('hover');
	}, function () {
		lnk.removeClass('hover');
	});
});