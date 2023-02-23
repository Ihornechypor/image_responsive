const {
    series,
    task,
    src,
    dest,
    watch
} = require('gulp'); 

const config = require('./configImg.js'); 
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

const img = (done) => {
    delDist();
    src(config.srcFiles, {allowEmpty: true}).pipe(sharpResponsive({formats: config.imgArray})).pipe(dest(config.dist));
    done();
}

const watcher = watch(config.srcFiles);

watcher.on('add', function (imgPath) {
    src(imgPath, {base: path.dirname(imgPath)}).pipe(sharpResponsive({formats: config.imgArray})).pipe(dest(destPath(config.dist, config.src, imgPath)))
});


process.argv.slice(2)[0] === "build" && watcher.close();

module.exports = watcher;
module.exports = imageResponsive;
