const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
// const imagemin = require('gulp-imagemin');
// const uglify = require('gulp-uglify');
// const concat = reqiure('gulp-concat');

// Compile Sass and Inject Into Browser
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
  .pipe(sass().on('error',sass.logError))
  .pipe(gulp.dest("src/css"))
  .pipe(browserSync.stream());
});

// Move JS Files to scr/js
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest("src/js"))
  .pipe(browserSync.stream());
});

// Watch Sass and Server
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/**/*.scss'],['sass']);
  gulp.watch("src/**/*.html").on('change',browserSync.reload);
  gulp.watch("src/**/*.js").on('change',browserSync.reload);
  gulp.watch("src/**/*.scss").on('change',browserSync.reload);
});

//Move Fonts Folder To src/fonts
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("src/fonts"));
})

//Move Fonts Awesome To src/css
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("src/css"));
});

// Other tasks
// Copy All HTML files
gulp.task('copyHTML', function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imagemin', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

/// Scripts combine and minify
gulp.task('concatjs', function(){
  gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
});

// Gulp Watch
gulp.task('watch', function(){
  gulp.watch('src/js/*.js',['concatjs']);
  gulp.watch('src/images/*',['imagemin']);
  gulp.watch('src/sass/*.scss',['sass']);
  gulp.watch('src/*.html',['copyHTML']);
});

gulp.task('default',['js','serve','fa','fonts']);
