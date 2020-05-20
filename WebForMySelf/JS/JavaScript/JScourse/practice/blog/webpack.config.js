// Подключаем плагин для работы с HTML
const HTMLPlugin = require('html-webpack-plugin')

// 
module.exports = {
  // Входные параметры
  entry: [
    '@babel/polyfill',                          // Подключение babel
    './src/index.js'                            // Путь до файла
  ],
  // Выходные параметры
  output: {
    path: __dirname + '/dist',                  // Папка начзначения
    filename: 'bundle.js'                       // Файл скриптов 
  },
  // Конфигурация сервера
  devServer: {
    contentBase: __dirname + '/dist'            // Папка где запускается Сервер 
  },
  // Плагины
  plugins: [
    new HTMLPlugin({                            // Конфигурация плагина
      filename: 'index.html',                   // Имя конечного файла
      template: './src/index.html',             // Папка назначения
      minify: {                                 // Настройка минификации
        collapseWhitespace: true,               // Удалить пробелы
        removeComments: true,                   // Убрать комментарии HTML
        removeRedundantAttributes: false,        // Удалить избыточные атрибуты
        removeScriptTypeAttributes: true,       // Удалить type="text/javascript" из script-тегов
        removeStyleLinkTypeAttributes: true,    // Удалить type="text/css" из style и link-тегов
        useShortDoctype: true                   // Использовать короткий Doctype (HTML5)
      }
    })
  ],
  // Подключение модулей
  resolve: {
    extensions: ['.js']                         // Подключать все файлы с расширением .js
  },
  // Настройка babel
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader'
      }
    ]
  }
}