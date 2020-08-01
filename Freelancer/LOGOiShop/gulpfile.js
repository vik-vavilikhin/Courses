'use strict';
/*
  https://www.youtube.com/watch?v=stFOy0Noahg
*/

const projectFolder = require('path').basename(__dirname); // 'dist';
const sourceFolder = '#src';
const fs = require('fs');

const path = {
  build: {
    html: `${projectFolder}/`,
    css: `${projectFolder}/css/`,
    js: `${projectFolder}/js/`,
    img: `${projectFolder}/img/`,
    fonts: `${projectFolder}/fonts/`,
  },
  src: {
    html: [`${sourceFolder}/*.html`, `!${sourceFolder}/_*.html`],
    css: `${sourceFolder}/scss/style.scss`,
    js: `${sourceFolder}/js/script.js`,
    img: `${sourceFolder}/img/**/*.+(png|jpg|gif|ico|svg|webp)`,
    fonts: `${sourceFolder}/fonts/*.ttf`,
  },
  watch: {
    html: `${sourceFolder}/**/*.html`,
    css: `${sourceFolder}/**/*.scss`,
    js: `${sourceFolder}/**/*.js`,
    img: `${sourceFolder}/img/**/*.+(png|jpg|gif|ico|svg|webp)`,
  },
  clean: `./${projectFolder}/`
};

const {
  src,
  dest,
  watch,
  parallel,
  series

} = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const webpack = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpcss = require('gulp-webpcss');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
// const pug = require('gulp-pug');

let isDev = true; //
let isProd = !isDev;

let webPackConfig = {
  output: {
    filename: 'script.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }]
  },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval-source-map' : 'none'
};

function browserSync() {
  browsersync.init({
    server: {
      baseDir: `./${projectFolder}/`
    },
    port: 3000,
    notify: false
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webpHTML())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(gcmq())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 version"],
        cascade: true
      })
    )
    .pipe(webpcss())
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(webpack(webPackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function fonts() {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
}

gulp.task('otf2ttf', function name() {
  return gulp.src([`${sourceFolder}/fonts/*.otf`])
    .pipe(fonter({
      format: ['ttf']
    }))
    .pipe(dest(`${sourceFolder}/fonts/`));

});

gulp.task('svgSprite', function name() {
  return gulp.src([`${sourceFolder}/img/iconsprite/*.svg`])
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../icons/icons.svg',
            //example: true
          }
        }
      })
    )
    .pipe(dest(path.build.img));
});

function fontsStyle(params) {
  let fileContent = fs.readFileSync(`${sourceFolder}/scss/_fonts.scss`);
  if (fileContent == '') {
    fs.writeFile(`${sourceFolder}/scss/_fonts.scss`, '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let cFontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (cFontname != fontname) {
            fs.appendFile(
              `${sourceFolder}/scss/_fonts.scss`,
              `@include font("${fontname}", "${fontname}", "400", "normal");\r\n`,
              cb
            );
          }
          cFontname = fontname;
        }
      }
    });
  }
}

function cb() {}

function watchFiles() {
  watch([path.watch.html], html);
  watch([path.watch.css], css).on('change', browsersync.reload);
  // watch([path.watch.css], css);
  watch([path.watch.js], js);
  watch([path.watch.img], images);
}

function clean() {
  return del(path.clean);
}

const build = series(
  clean,
  parallel(
    html,
    css,
    js,
    images,
    fonts
  ),
  fontsStyle
);

const startWatch = parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.startWatch = startWatch;
exports.default = startWatch;