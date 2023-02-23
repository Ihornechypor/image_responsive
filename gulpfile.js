const {
    series,
    task,
    src,
    dest,
    watch
} = require('gulp');

const config = require('./config/config.js');
const sharpResponsive = require("gulp-sharp-responsive");
const deleteAsync = require('del');
const path = require('path');

const destPath = (dest, src, imgPath) => path.parse(path.normalize(`${
    dest
}/${
    path.relative(src, imgPath)
}`)).dir

const delDist = (done) => {
    deleteAsync(config.distDel);
    done();
}

const img = () => src(config.srcFiles, {allowEmpty: true}).pipe(sharpResponsive({formats: config.imgArray})).pipe(dest(config.dist));

const watcher = watch(config.srcFiles);

watcher.on('add', function (imgPath) {
    src(imgPath, {base: path.dirname(imgPath)}).pipe(sharpResponsive({formats: config.imgArray})).pipe(dest(destPath(config.dist, config.src, imgPath)))
    console.log('create complited');
});


process.argv.slice(2)[0] === "build" && watcher.close();

task('watch', series(img));
task('build', series(delDist, img));
module.exports = watcher;
