const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require('gulp-concat');            
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));            
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css'); 
const imagemin = require("gulp-imagemin");

function browsersync() {
    browserSync.init({
      server: { baseDir: "src/" }
    });
}

function startwatch() {
  gulp.watch(["src/js/*.js", "!src/**/*.min.js"], scripts);
  gulp.watch("src/css/*.scss", styles);
  gulp.watch("src/index.html").on("change", browserSync.reload);
  gulp.watch("src/images/**/*", images);
}

function scripts() {
  return gulp
    .src(["node_modules/jquery/dist/jquery.min.js", "node_modules/bootstrap/dist/js/bootstrap.js", "src/js/script.js"])
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return gulp
    .src(["node_modules/bootstrap/dist/css/bootstrap.css", "src/css/*.scss"])
    .pipe(sass())
    .pipe(concat("styles.min.css"))
    .pipe(autoprefixer({ grid: true }))
    .pipe(cleancss())
    .pipe(gulp.dest("src/css/"))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src("src/images/*").pipe(imagemin()).pipe(gulp.dest("src/img"));
}

function build() {
  return gulp
    .src(
      [
        "src/js/*.min.js",
        "src/css/*.min.css",
        "src/img/**.*",
        "src/index.html"
      ],
      {
        base: "src"
      }
    )
    .pipe(gulp.dest("dist"));
}


exports.default = gulp.parallel(
  scripts,
  styles,
  images,
  browsersync,
  startwatch
);

exports.browsersync = browsersync;

exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.build = gulp.series(scripts, styles, images, build);