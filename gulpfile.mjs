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

const convertToInt = (width, ratio) => Math.trunc(width * ratio) ? Math.trunc(width * ratio) : 1;

const configArray = [
    {
        width: (metadata) => convertToInt(metadata.width, 0.05),
        format: "webp",
        rename: {
            suffix: "-ph"
        },
        webpOptions: config.webpOptions
    },
    {
        width: (metadata) => metadata.width,
        format: "webp",
        rename: {
            suffix: "@2x"
        },
        webpOptions: config.webpOptions
    },
    {
        width: (metadata) => metadata.width,
        rename: {
            suffix: "@2x"
        },
        pngOptions: config.pngOptions,
        jpegOptions: config.jpegOptions
    },
    {
        width: (metadata) => convertToInt(metadata.width, 0.5),
        format: "webp",
        webpOptions: config.webpOptions
    }, {
        width: (metadata) => convertToInt(metadata.width, 0.5),
        pngOptions: config.pngOptions,
        jpegOptions: config.jpegOptions
    } 
]

const img = () => src(config.srcFiles).pipe(sharpResponsive({formats: configArray})).pipe(dest(config.dist));


const watcher = watch(config.srcFiles);

watcher.on('add', function (path) {
    src(path).pipe(sharpResponsive({formats: configArray})).pipe(dest(config.dist))
    console.log(1);
});

process.argv.slice(2)[0] === "build" && watcher.close();

task('watch', series(img));
task('build', series(delDist, img));