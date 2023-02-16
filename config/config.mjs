export const distFolder = "dist";

export const config  = {
    dist: distFolder,
    srcFiles: 'src/**/*.{jpg,png}',
    distDel: `${distFolder}/**/*`,
    webpOptions: { quality: 50 },
    jpegOptions: { quality: 60, progressive: true },
    pngOptions: { quality: 55 }
}