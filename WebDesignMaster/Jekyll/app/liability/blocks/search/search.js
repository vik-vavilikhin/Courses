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