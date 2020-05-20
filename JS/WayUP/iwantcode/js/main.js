$(function () {
	$('.offer-content a').click(function () {
		$('.triangles').css('width','300px');
	});
	$('.logo').click(function () {
		$('.offer-content h1').css('font-size','10px');
	});
	$('.menu li a').click(function () {
		$(this).toggleClass('active');
	});
});