/**
 * Created by user on 2017/12/12.
 */
var gulp = require('gulp');
var rev = require('gulp-rev');//给每个文件添加版本号hash码
var revReplace = require('gulp-rev-replace');//将文件中引用文件改为新的文件名，如index.html中引用main.js改为main.hash.js
var useref = require('gulp-useref');//通过注释写一些设置，如告诉gulp合并一些文件及合并方式。如index.html中的combined
var filter = require('gulp-filter');//筛选并放回流中
var uglify = require('gulp-uglify');//压缩JS
var csso = require('gulp-csso');//压缩CSS

gulp.task('default', function(){
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], {restore: true});

    return gulp.src('src/index.html')
        .pipe(useref())//分析index.html是否有（要求合并）注释
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)//将上一步的操作再放回流中
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)//排除首页外再打版本号(rev用来打版本号)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));//文件流最后放入的目录
});
