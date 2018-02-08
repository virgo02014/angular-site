var gulp = require('gulp');
var sass = require('gulp-sass'); // sass 编译成 css [语句块注释会被编译成css 单行注释不会]
var less = require('gulp-less');
var concat = require('gulp-concat'); // 合并文件，减少网络请求
var cssminify = require('gulp-minify-css'); // 压缩css文件，减小文件大小
var uglify = require('gulp-uglify'); // 压缩js文件，减小文件大小
var sourcemaps = require('gulp-sourcemaps'); // 除错工具将直接显示原始代码
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber'); // 捕获任务中错误
var babel = require("gulp-babel"); // es6 -> es5

// myPower product
gulp.task('style', function(){
    return gulp.src('./style/main.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(cssminify({
            advanced: false,  // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',  // 保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,  // 类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'  // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('./dest'));
});

gulp.task('module', function(){
    return gulp.src('./script/module/*.js')
        .pipe(babel({compact: false}))
        .pipe(concat('module.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest('./dest'));
});

gulp.task('common', function(){
    return gulp.src('./script/common/*.js')
        .pipe(babel({compact: false}))
        .pipe(concat('common.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest('./dest'));
});

gulp.task('default', ['style', 'module', 'common'], function(){
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: false
    });
    gulp.watch('style/*.scss', ['style']);
    gulp.watch('script/module/*.js', ['module']);
    gulp.watch('script/common/*.js', ['common']);
});

// myPower dev
gulp.task('style:dev', function(){
    return gulp.src('./style/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dest'));
});

gulp.task('less', function(){
    return gulp.src('./style/test.less')
        .pipe(less())
        .pipe(gulp.dest('./dest'));
});

gulp.task('bem', function(){
    return gulp.src('./style/bem.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dest'));
});

gulp.task('module:dev', function(){
    return gulp.src('./script/module/*.js')
        .pipe(plumber())
        .pipe(babel({compact: false}))
        .pipe(sourcemaps.init())
        .pipe(concat('module.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dest'));
});

gulp.task('common:dev', function(){
    return gulp.src('./script/common/*.js')
        .pipe(plumber())
        .pipe(babel({compact: false}))
        .pipe(sourcemaps.init())
        .pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dest'));
});

gulp.task('default:dev', ['style:dev', 'module:dev', 'common:dev'], function(){
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: false
    });
    gulp.watch('style/*.scss', ['style:dev']);
    gulp.watch('script/module/*.js', ['module:dev']);
    gulp.watch('script/common/*.js', ['common:dev']);
});
