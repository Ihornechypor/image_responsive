const {
	src,
	dest,
	parallel,
	series,
} = require('gulp');

const responsive = require("gulp-responsive");


const respImages = () => {
	return src('src/images/**/*.{jpg,png}')
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
					quality: 75,
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
					quality: 75,
					rename: {
						suffix: '@2x'
					},
					format: ['webp', 'png']
				}, {
					width: "50%",
					quality: 75,
					format: ['webp', 'png']
				}]
			}, {
				errorOnEnlargement: false,
				skipOnEnlargement: true,
				errorOnUnusedConfig: false,
				errorOnUnusedImage: false
			})
		)
		.pipe(dest('dist/images'));
};



exports.default = series(parallel(respImages));