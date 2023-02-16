import gulp from 'gulp';
const {
    series,
    task,
    src,
    dest,
    watch
} = gulp;

import {config} from './config/config.mjs';
import sharpResponsive from "gulp-sharp-responsive";
import {deleteAsync} from 'del';


const delDist = (done) => {
    deleteAsync(config.distDel);
    done();
}

const img = () => src(config.srcFiles).pipe(sharpResponsive({formats: config.imgArray})).pipe(dest(config.dist));


const watcher = watch(config.srcFiles);

watcher.on('add', function (path) {
    src(path).pipe(sharpResponsive({formats: config.imgArray})).pipe(dest(config.dist))
});

process.argv.slice(2)[0] === "build" && watcher.close();

task('watch', series(img));
task('build', series(delDist, img));