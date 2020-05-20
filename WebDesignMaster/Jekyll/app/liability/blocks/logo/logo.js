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
