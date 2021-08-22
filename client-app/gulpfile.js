var gulp = require('gulp');

gulp.task('moveJquery' , function(){
    return gulp.src('node_modules/jquery/*/*')
    .pipe(gulp.dest('public/libs/jquery'));
});


gulp.task('moveBootstrap' , function(){
    return gulp.src('node_modules/bootstrap/*/*/*')
    .pipe(gulp.dest('public/libs/bootstrap/'));
});

// gulp.task('moveBootstrap' ,gulp.series('moveJquery','moveBootstrap') ,  function(){
//     return gulp.src('node_modules/bootstrap/*/*/*')
//     .pipe(gulp.dest('public/libs/bootstrap/'));
// });
