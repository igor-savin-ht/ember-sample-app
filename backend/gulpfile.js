const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const del = require('del');
const mkdirp = require('mkdirp-promise');
const zip = require('gulp-zip');
const swaggerCombine = require('swagger-combine');
const fs = require('fs');
const {BUILT_SWAGGER_DIR, PATH_TO_BUILT_SWAGGER, PATH_TO_SOURCE_SWAGGER} = require('./src/config/constants');
const logger = require('./src/helpers/logging.helper').mainLogger;

gulp.task('clean', () => del(['build/*']));

gulp.task('compress', () => gulp.src(['src/**',
	'app.js',
	'server.js',
	'gulpfile.js',
	'package.json',
	'db/**',
	'config/**',
	'swagger/**',
	'build/swagger/**',
	'node_modules/**',
	'!/**/test/**',
	'!/**/test/'],
{base: './', dot: true})
	.pipe(zip('blog-service.zip'))
	.pipe(gulp.dest('build')));

gulp.task('migrate', () => {
	const sequelizeHelper = require('./src/repositories/sequelize.helper');
	const umzug = require('./db/db.helper').migrationHelper;
	return umzug.up().then(() =>
		sequelizeHelper.close()
	);
});

gulp.task('seed', () => {
	const sequelizeHelper = require('./src/repositories/sequelize.helper');
	const umzug = require('./db/db.helper').seedingHelper;
	return umzug.up().then(() =>
		sequelizeHelper.close()
	);
});

gulp.task('combineSwagger', (cb) => {
	mkdirp(BUILT_SWAGGER_DIR)
		.then(() => swaggerCombine(PATH_TO_SOURCE_SWAGGER)
			.then((combinedSchema) => fs.writeFileSync(PATH_TO_BUILT_SWAGGER, JSON.stringify(combinedSchema)))
			.then(cb)
			.catch((err) => {
				logger.error(err);
				process.exit(1);
			}))
		.catch(logger.error);
});

gulp.task('build', gulpSequence('clean', 'combineSwagger', 'compress'));
