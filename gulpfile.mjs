import gulp from 'gulp';
const {series, task, src, dest} = gulp;


import {config} from './config/config.mjs';

import sharpResponsive from "gulp-sharp-responsive";
import {deleteAsync} from 'del';


const delDist = (done) => {
    deleteAsync(config.distDel);
    done();
}

const someTask = () => {
    return src(config.srcFiles)
    .pipe(dest(config.dist))
} 



const imgJpg = () => src(config.srcJpgFiles)
  .pipe(sharpResponsive({
    formats: [
      { width: (metadata) => Math.round(metadata.width * 0.05), format: "webp", rename: { suffix: "-ph" }},
      { width: (metadata) => metadata.width, format: "webp", rename: { suffix: "@2x" }},
      { width: (metadata) => metadata.width, rename: { suffix: "@2x" }},
      { width: (metadata) => metadata.width * 0.5, format: "webp"},
      { width: (metadata) => metadata.width, format: "jpeg"}
    ]
  }))
  .pipe(dest(config.dist));

  const imgPng = () => src(config.srcPngFiles)
  .pipe(sharpResponsive({
    formats: [
      { width: (metadata) => Math.round(metadata.width * 0.05), format: "webp", rename: { suffix: "-ph" }},
      { width: (metadata) => metadata.width, format: "webp", rename: { suffix: "@2x" }},
      { width: (metadata) => metadata.width, rename: { suffix: "@2x" }},
      { width: (metadata) => metadata.width * 0.5, format: "webp"},
      { width: (metadata) => metadata.width, format: "png"}
    ]
  }))
  .pipe(dest(config.dist));


task('default', series(delDist, imgJpg, imgPng));