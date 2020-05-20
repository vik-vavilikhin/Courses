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