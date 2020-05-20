'use strict';

$(document).ready(function () {
  $('.list-item:first').hover(function() {
    $(this).toggleClass('active');
  });

  $('.list-item:eq(1)').on('click', function() {
    $('.img:even').fadeToggle('slow');
  });

  $('.list-item:last').on('click', function() {
    $('.img:odd').animate(
      {
        opacity: 'toggle',
        height: 'toggle'
      }, 3000
    );
  });
});