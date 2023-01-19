const {
	src,
	dest,
	parallel,
	series,
} = require('gulp');

const responsive = require("gulp-responsive");
const clean = require('gulp-clean');

const delDist = () => {
	console.log(1);
	return src('dist/**/*', {read: false}).pipe(clean())
}


const respImages = () => {
	return src('src/**/*.{jpg,png}')
		.pipe(
			responsive({
				'**/*.jpg': [{
					width: "10%",
					blur: 1.2,
					rename: {
						suffix: '-ph'
					},
					format: ['webp', 'jpg']
				}, {
					width: "100%",
					rename: {
						suffix: '@2x'
					},
					format: ['webp', 'jpg']
				}, {
					width: "50%",
					quality: 75,
					format: ['webp', 'jpg']
				}],
				'**/*.png': [{
					width: "10%",
					blur: 1.2,
					rename: {
						suffix: '-ph'
					},
					format: ['webp', 'png']
				}, {
					width: "100%",
					rename: {
						suffix: '@2x'
					},
					format: ['webp', 'png']
				}, {
					width: "50%",
					format: ['webp', 'png']
				}]
			}, {
				errorOnEnlargement: false,
				skipOnEnlargement: true,
				errorOnUnusedConfig: false,
				errorOnUnusedImage: false
			})
		)
		.pipe(dest('dist'));
};



exports.default = series(delDist, parallel(respImages));
