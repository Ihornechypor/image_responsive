import {convertToInt} from '../helpers/convertToInt.mjs'

const distFolder = "dist";
const webpOptions = {
    quality: 50
}
const jpegOptions = {
    quality: 60,
    progressive: true
}
const pngOptions = {
    quality: 55
} 

export const config = {
    dist: distFolder,
    srcFiles: 'src/**/*.{jpg,png}',
    distDel: `${distFolder}/**/*`,
    imgArray: [
        {
            width: (metadata) => convertToInt(metadata.width, 0.05),
            format: "webp",
            rename: {
                suffix: "-ph"
            },
            webpOptions: webpOptions
        },
        {
            width: (metadata) => metadata.width,
            format: "webp",
            rename: {
                suffix: "@2x"
            },
            webpOptions: webpOptions
        },
        {
            width: (metadata) => metadata.width,
            rename: {
                suffix: "@2x"
            },
            pngOptions: pngOptions,
            jpegOptions: jpegOptions
        },
        {
            width: (metadata) => convertToInt(metadata.width, 0.5),
            format: "webp",
            webpOptions: webpOptions
        }, {
            width: (metadata) => convertToInt(metadata.width, 0.5),
            pngOptions: pngOptions,
            jpegOptions: jpegOptions
        }
    ]
}
