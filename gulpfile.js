const gulp = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

const path = require('path');

const paths = {
    models: path.join('src', 'SDK')
};

const config = {
    createModels: {
        babel: {
            "plugins": [
                "babel-plugin-syntax-flow",
                'babel-plugin-syntax-decorators',
                'babel-plugin-syntax-class-properties',
                "babel-plugin-immutable-record"
            ]
        }
    }

};

/**
 * Map models schema to immutable records.
 */
gulp.task('create-models', function () {
  return gulp.src('src/Types/**/*.js')
    .pipe(babel(config.createModels.babel))
    .pipe(gulp.dest(paths.models));
});
