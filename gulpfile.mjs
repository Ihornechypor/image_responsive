import gulp from 'gulp';
const {series, task, src, dest} = gulp;


import {config} from './config/config.mjs';

import sharpResponsive from "gulp-sharp-responsive";
import {deleteAsync} from 'del';


const delDist = (done) => {
    deleteAsync(config.distDel);
    done();
}


const img = () => src(config.srcFiles)
  .pipe(sharpResponsive({
    formats: [ 
      { width: (metadata) => Math.round(metadata.width * 0.05), format: "webp", rename: { suffix: "-ph" }, webpOptions: config.webpOptions},
      { width: (metadata) => metadata.width, format: "webp", rename: { suffix: "@2x" }, webpOptions: config.webpOptions},
      { width: (metadata) => metadata.width, rename: { suffix: "@2x" }, pngOptions: config.pngOptions, jpegOptions: config.jpegOptions},
      { width: (metadata) => metadata.width * 0.5, format: "webp",webpOptions: config.webpOptions},
      { width: (metadata) => metadata.width * 0.5, pngOptions: config.pngOptions, jpegOptions: config.jpegOptions}
    ]
  }))
  .pipe(dest(config.dist));


task('default', series(delDist, img));