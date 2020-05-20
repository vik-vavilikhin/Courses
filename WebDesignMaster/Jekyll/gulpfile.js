/*========================= TASK (ЗАДАЧИ) =====================================
gulp.task('mytask', function() {       // Создаем задачу
 return gulp.src('source-filse')       // Объявляем ресурс для работы (с чем работаем)
                                       // !          - исключить
                                       // [...]        - массив
                                       // .+(scss|sass)  - несколько расширений
   .pipe(plugin())                     // Запускаем плагин для обработки ресурса
   .pipe(gulp.dest('folder'))          // Выводим результат обработки в папку
});
=============================================================================*/
'use strict';

/* Подключение плагинов: */
var gulp 			= require('gulp'),                         // Gulp

	browserSync 	= require('browser-sync').create(),        // Подключение Browsersync
	reload = browserSync.reload,

	// gWatch 			= require('gulp-watch'),                   // Вотчер
	plumber 			= require('gulp-plumber'),                 // Обработка ошибок
	concat 			= require('gulp-concat'),                  // Объединение файлов
	rename 			= require('gulp-rename'),                  // Переименование файлов
	del 				= require('del'),                          // Удаление папок и файлов

	pug 				= require('gulp-pug'),                     // Pug
	sass 				= require('gulp-sass'),                    // Sass
	smartgrid 		= require('smart-grid'),                   // Smart-grid

	autoprefixer 	= require('gulp-autoprefixer'),            // Добавление вендорных префиксов
	pxtorem 			= require('gulp-pxtorem'),                 // Преобразование px и em в rem
	gcmq 				= require('gulp-group-css-media-queries'), // Группировка медиа-запросов
	csso 				= require('gulp-csso'),                    // Минификация CSS-файлов от Яндекс
	cleanCSS 		= require('gulp-clean-css'),               // Минификация CSS-файлов
	sourcemaps 		= require('gulp-sourcemaps'),              // Карта CSS-файла
	uncss 			= require('gulp-uncss'),                   // Удаление неиспользуемых CSS-свойств

	uglify 			= require('gulp-uglify'),                  // Минификация JS-файлов

	imagemin 		= require('gulp-imagemin'),                // Оптимизация изображений
	pngquant 		= require('imagemin-pngquant'),            // Оптимизация PNG-изображений

	ttf2eot 			= require('gulp-ttf2eot'),                 // Преобразование шрифтов .ttf в eot
	ttf2woff 		= require('gulp-ttf2woff'),                // Преобразование шрифтов .ttf в woff
	ttf2woff2 		= require('gulp-ttf2woff2'),               // Преобразование шрифтов .ttf в woff2
	ttf2svg 			= require('gulp-ttf-svg'),                 // Преобразование шрифтов .ttf в svg

	gutil 			= require('gulp-util'),
	notify 			= require("gulp-notify"),
	rsync 			= require('gulp-rsync');

/* Задание путей к используемым файлам и папкам: */
var paths = {
	dir: {
		app:			'./app',
		dist: 		'./dist'
	},
	/*=============*/
	watch: {
		html:			'./app/liability/**/*.pug',
		css:			'./app/liability/**/*.scss',
		js:			'./app/liability/**/*.js',
		grid:			'./app/vendor/smartgrid/_smartgrid-options.js'
	},
	/*=============*/
	app: {
		html: {
			src: [
						'./app/liability/pages/*.pug',
						'!./app/liability/pages/template.pug',
			],
			dest: 	'./app/assets'
		},

		common: {
			css: {	/* Файлы указываем по порядку подключения */
				src: [
						'./app/liability/config/*.scss',       // Основные настройки и переменные
						'./app/liability/layout/**/*.scss',    // Основные настройки и переменные
						'./app/liability/blocks/**/*.scss'     // Основные настройки и переменные
				],
				dest: './app/assets/css'
			},

			js: {
				src:	'./app/liability/**/*.js',
				dest:	'./app/assets/js'
			},

			fonts: {
				src:	'./app/assets/fonts/**/*.ttf',
				dest:	'./app/assets/fonts'
			}
		},

		vendor: {
			css: {	/* Файлы внешних библиотек */
				src: [
						'./app/vendor/font-awesome/css/font-awesome.css',
						// './app/vendor/likely/likely.css',
						// '!./app/vendor/fontello/css/fontello.css',
						// '!./app/vendor/normalize.css/normalize.css',
						// '!./app/vendor/bootstrap/dist/css/bootstrap.min.css',
						// '!./app/vendor/font-awesome/web-fonts-with-css/css/fontawesome.min.css',
						// '!./app/vendor/OwlCarousel/owl.carousel.min.css',
						/* ^ Исключение из обработки ^ */
				],
				dest:	'./app/assets/css'
			},

			js: {
				src: [
						'./app/vendor/jquery/dist/jquery.min.js',
						'./app/vendor/likely/likely.js',
						'./app/vendor/read-progress/prognroll/prognroll.js',
						// '!./app/vendor/bootstrap/dist/js/bootstrap.min.js',
						// '!./app/vendor/OwlCarousel/owl.carousel.min.js',
						/* ^ Исключение из обработки ^ */
				],
				dest: './app/assets/js'
			},

			fonts: {
				src: [
						'./app/vendor/font-awesome/fonts/*.*',
						// '!./app/vendor/fontello/font/**/*.*',
						/* ^ Исключение из обработки ^ */
				],
				dest: [
						'./app/assets/fonts',
						// '!./app/assets/fonts/fontello',
				]
			},

			grid: {
				src: 	'./app/vendor/smartgrid/_smartgrid-options.js',
				dest:	'./app/vendor/smartgrid'
			}
		}
	},
	/*=============*/
	img: {
		src:			'./app/assets/images/**/*.*',
		dest:			'./dist/images'
	},
	/*=============*/
	dist: {
		html: {
			src:		'./app/assets/*.html',
			dest: 	'./dist'
		},

		css: {
			src:		'./app/assets/css/*.min.css',
			dest:		'./dist/css'
		},

		js: {
			src:		'./app/assets/js/*.min.js',
			dest:		'./dist/js'
		},

		fonts: {
			src:		'./app/assets/fonts/**/*.*',
			dest:		'./dist/fonts'
		}
	}
}

/* Таск для работы Browsersync, автообновление браузера: */
gulp.task('watch', function() {
	browserSync.init({
		server: paths.app.html.dest,
		notify: false
	});
	gulp.watch(paths.watch.grid, gulp.series('grid'));
  gulp.watch(paths.watch.html, gulp.series('html'));
  gulp.watch(paths.watch.css,  gulp.series('cssCommon'));
  gulp.watch(paths.watch.js,   gulp.series('jsCommon'));
	gulp.watch('*.html').on('change', reload);
});

/* Компиляция smart-grid */
gulp.task('grid', function () {
	delete require.cache[require.resolve(paths.app.vendor.grid.src)];
	let options = require(paths.app.vendor.grid.src);
	smartgrid(paths.app.vendor.grid.dest, options);
});

/* Таск для работы Pug, преобразование Pug в HTML: */
gulp.task('html', function () {
   return gulp.src(paths.app.html.src)
      .pipe(plumber())
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest(paths.app.html.dest))
      .pipe(browserSync.stream());
});

/* Таск для преобразования Sass-файлов в CSS: */
gulp.task('cssCommon', function() {
	var pxtoremOptions = { replace: true };
	var postcssOptions = { map:     false };

   return gulp.src(paths.app.common.css.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
      .pipe(concat('common.scss'))
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(pxtorem(pxtoremOptions, postcssOptions))
		.pipe(gcmq())
		.pipe(cleanCSS({
			level: 2,
			format: 'beautify'
		}))
		.pipe(gulp.dest(paths.app.common.css.dest))
		.pipe(rename({ suffix: '.min' }))
		.pipe(csso())
		// .pipe(cleanCSS({level: 2}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.app.common.css.dest))
		.pipe(browserSync.stream());
});

/* Таск для объединения и минификации пользовательских JS-файлов: */
gulp.task('jsCommon', function() {
	return gulp.src(paths.app.common.js.src)
		.pipe(plumber())
		.pipe(concat('common.js'))
		.pipe(gulp.dest(paths.app.common.js.dest))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(paths.app.common.js.dest))
		.pipe(browserSync.stream());
});

/* Таск для объединения и минификации CSS-файлов внешних библиотек: */
gulp.task('cssVendor', function () {
	return gulp.src(paths.app.vendor.css.src)
		.pipe(concat('vendor.min.css'))
		.pipe(csso())
		.pipe(gulp.dest(paths.app.vendor.css.dest));
});

/* Таск для объединения и минификации JS-файлов внешних библиотек: */
gulp.task('jsVendor', function () {
	return gulp.src(paths.app.vendor.js.src)
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.app.vendor.js.dest));
});

/* Таск для объединения папок fonts внешних библиотек: */
gulp.task('fontsVendor', function () {
	return gulp.src(paths.app.vendor.fonts.src)
		.pipe(gulp.dest(paths.app.vendor.fonts.dest));
});

/* Таск для предварительной очистки (удаления) production-папки: */
gulp.task('clean', function() {
   return del(paths.dir.dist);
});

/* Таск для обработки изображений: */
gulp.task('img', function() {
	return gulp.src(paths.img.src)
		.pipe(imagemin({ use: [pngquant()] }))
		.pipe(gulp.dest(paths.img.dest));
});

/* Таск для формирования production-папки: */
gulp.task('dist', function () {
	var htmlDist = gulp.src(paths.dist.html.src)
		.pipe(gulp.dest(paths.dist.html.dest));      // Перенос HTML

	var cssDist = gulp.src(paths.dist.css.src)
		// .pipe(uncss({html: ['app/index.html']}))     // Удалить неиспользуемые стили
		.pipe(gulp.dest(paths.dist.css.dest));       // Перенос CSS

	var jsDist = gulp.src(paths.dist.js.src)
		.pipe(gulp.dest(paths.dist.js.dest));        // Перенос JS

	var fontsDist = gulp.src(paths.dist.fonts.src)
		.pipe(gulp.dest(paths.dist.fonts.dest));     //Перенос шрифтов

	return htmlDist, cssDist, jsDist, fontsDist;
});

/* Таск для преобразования шрифтов *.ttf в шрифты *.eot: */
gulp.task('fontsEot', function () {
	return gulp.src(paths.app.common.fonts.src)
		.pipe(ttf2eot())   // преобразование .ttf => eot
		.pipe(gulp.dest(paths.app.common.fonts.dest));
});

/* Таск для преобразования шрифтов *.ttf в шрифты *.woff: */
gulp.task('fontsWoff', function () {
	return gulp.src(paths.app.common.fonts.src)
		.pipe(ttf2woff())  // преобразование .ttf => woff
		.pipe(gulp.dest(paths.app.common.fonts.dest));
});

/* Таск для преобразования шрифтов *.ttf в шрифты *.woff2: */
gulp.task('fontsWoff2', function () {
	return gulp.src(paths.app.common.fonts.src)
		.pipe(ttf2woff2())   // преобразование .ttf => woff2
		.pipe(gulp.dest(paths.app.common.fonts.dest));
});

/* Таск для преобразования шрифтов *.ttf в шрифты *.svg: */
gulp.task('fontsSvg', function () {
	return gulp.src(paths.app.common.fonts.src)
		.pipe(ttf2svg())  // преобразование .ttf => svg
		.pipe(gulp.dest(paths.app.common.fonts.dest));
});


gulp.task('rsync', function () {
	return gulp.src('app/**')
		.pipe(rsync({
			root: 'app/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			// include: ['*.htaccess'], // Includes files to deploy
			exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
});

/* Таск для преобразования шрифтов: */
gulp.task('fonts', gulp.series('fontsEot', 'fontsWoff', 'fontsWoff2', 'fontsSvg'));

/* Таск для сборки: */
gulp.task('build',
   gulp.parallel(
		'html',
		'cssCommon',
		'jsCommon',
		'cssVendor',
		'jsVendor',
		'fontsVendor'
   )
);

/* Таск для разработки: */
gulp.task('default', gulp.series('build', 'watch'));

/* Таск для production: */
gulp.task('public', gulp.series('clean', 'img', 'fonts', 'dist'));
