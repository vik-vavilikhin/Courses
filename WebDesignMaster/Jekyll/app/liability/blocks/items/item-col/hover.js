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