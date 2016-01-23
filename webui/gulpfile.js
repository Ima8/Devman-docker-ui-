var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');
var gls = require('gulp-live-server');
var nodemon = require('gulp-nodemon');

// สร้าง task ชื่อว่า "sass" ขึ้นมา พร้อมกับระบุงานที่จะให้ task นี้ทำ
gulp.task('css', function() {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
});

// gulp.task('html', function() {
//   console.log("Hey html");
//   return gulp.src(['./src/html/*.html'])
//     .pipe(htmlmin({
//       collapseWhitespace: true
//     }))
//     .pipe(gulp.dest('./public/'));
// });

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: './bin/www'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        basedir: ["./public"],
        port: 7000,
	});
});

gulp.task('default', ['css', 'browser-sync'], function() {
  gulp.watch('./src/scss/**/*.scss', ['css']);
  // gulp.watch('./src/html/*.html', ['html']);
  // gulp.watch(['./src/html/*.html'], browserSync.reload);
  gulp.watch(['./public/css/**/*.css'], browserSync.reload);
  // server.start(['bin/www']);
});
