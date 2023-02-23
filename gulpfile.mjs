import gulp from 'gulp';
const {
    series,
    task,
    src,
    dest,
    watch
} = gulp;

import {config} from './config/config.mjs';
import {destPath} from './helpers/destPath.mjs';
import sharpResponsive from "gulp-sharp-responsive";
import {deleteAsync} from 'del';
import path from 'path';

const delDist = (done) => {
    deleteAsync(config.distDel);
    done();
}

const img = () => src(config.srcFiles, {allowEmpty: true}).pipe(sharpResponsive({formats: config.imgArray})).pipe(dest(config.dist));

const watcher = watch(config.srcFiles);

watcher.on('add', function (imgPath) {
    src(imgPath, {base: path.dirname(imgPath)}).pipe(sharpResponsive({formats: config.imgArray})).pipe(dest(destPath(config.dist,config.src, imgPath)))
    console.log('create complited');
});


process.argv.slice(2)[0] === "build" && watcher.close();

task('watch', series(img));
task('build', series(delDist, img));
