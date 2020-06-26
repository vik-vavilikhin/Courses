// ====== Window Resize ====================
/*  
?  Функция для работы с изменением размера экрана
?  Динамически определяет размер окна браузера
?  'whatDo' - аргумент, внешняя функция для выполнения
?  'breakPoint' - размер экрана для изменения контента

?  PS. Надо доработать для универсальности, в случае
?  обработки нескольких 'breakPoint'
*/
function windowResize(whatDo, breakPoint) {
  // Определить текущую ширину открытого документа
  let clientWidth = document.documentElement.clientWidth;
  // В зависимости от размера документа переносить элемент
  window.addEventListener('resize', () => {
    // Динамическое определение ширины документа
    clientWidth = document.documentElement.clientWidth;

    // Если ширина меньше breakPoint
    if (clientWidth <= breakPoint) {
      whatDo;
    } else {

    }
  });
};