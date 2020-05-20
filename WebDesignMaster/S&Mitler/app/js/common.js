$(function() {
  // Плагин `mmenu`
  $('#myMenu').mmenu({
    extensions: [
      'theme-black',
      'effect-menu-slide',
      'pagedim-black',
      'position-right'
    ],
    navbar: {
      title: '<img src="img/logo-1.svg" alt="Салон красоты S&Mitler">'
    }
  });

  var api = $('#myMenu').data('mmenu');
  api.bind('open:finish', function () {
    $('.hamburger').addClass('is-active');
  });
  api.bind('close:finish', function () {
    $('.hamburger').removeClass('is-active');
  });
});
