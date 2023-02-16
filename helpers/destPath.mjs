import path from 'path';

export const destPath = (dest, src, imgPath) => path.parse(path.normalize(`${
    dest
}/${
    path.relative(src, imgPath)
}`)).dir