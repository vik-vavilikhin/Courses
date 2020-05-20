module.exports = {
   filename   : "_smart-grid",      // Имя файла
   outputStyle: 'scss',             // Расширение файла less || scss || sass || styl
   columns    : 12,                 // Количество столбцов сетки
   offset     : '20px',             // Двухсторонние отступы px || %
   mobileFirst: false,              // mobileFirst 'min-width' : 'max-width'

   container  : {
      maxWidth: '1170px',           // max-width для больших мониторов
      fields  : '20px'              // Отступы
   },

   breakPoints: {
      xl      : {width : '1200px'}, // -> @media (max-width: 1200px) // Extra large screen / wide desktop
      lg      : {width : '992px'},  // -> @media (max-width : 992px) // Large screen / desktop
      md      : {width : '768px'},  // -> @media (max-width : 767px) // Medium screen / tablet
      sm      : {width : '544px'},  // -> @media (max-width : 544px) // Small screen / phone
      xs      : {width : '480px'},  // -> @media (max-width : 480px) // Extra small screen / phone
      xx      : {width : '420px'},  // -> @media (max-width : 420px) // Extra small screen / phone
      retina  : {width : '320px'}   // -> @media (max-width : 320px) // Custom, iPhone Retina

      /*
      Можно создать любое количество точек останова.

      some_name: {
         width:   'Npx',
         fields:  'N(px|%|rem)',
         offset:  'N(px|%|rem)'
      }
      */
   }
};
