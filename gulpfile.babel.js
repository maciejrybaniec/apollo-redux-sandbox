const gulp = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const path = require('path');

import createShell from './utils/createShell';

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
 * Inject webpack plugin with app configuration.
 * @param {object} config Webpack configuration.
 */
const injectConfig = (config) => {
    if (!config.plugins) config.plugins = [];
    config.plugins.push(
        new webpack.DefinePlugin({
            'window.config': {
                apiUrl: JSON.stringify('apiUrl'),
            }
        })
    );
}

/**
 * Map models schema to immutable records.
 */
gulp.task('create-models', () => {
  process.env.BABEL_ENV = 'process';
  return gulp.src('src/Types/**/*.js')
    .pipe(babel(config.createModels.babel))
    .pipe(gulp.dest(paths.models));

    delete process.env.BABEL_ENV;
});

/**
 * Create application shell structure.
 */
gulp.task('create-shell', function () {
    createShell();
});

/**
 * Run development server.
 */
gulp.task('development', () => {
    process.env.BABEL_ENV = 'development';
    const webpackConfig = require('./webpack.config');
    injectConfig(webpackConfig);

    const server = new WebpackDevServer(webpack(webpackConfig), {
        hot: true,
        historyApiFallback: true
    });

    server.listen(3000, 'localhost', function (error, result) {
      if (error) {
        return console.log(err);
      }

      console.log('Listening at http://localhost:3000/');
    });
});

/**
 * Run production build.
 */
gulp.task('build-production', (callback) => {
    const webpackConfig = require('./webpack.config');
    process.env.BABEL_ENV = 'production';

    webpack(webpackConfig, function(err, stats) {
        delete process.env.BABEL_ENV;
        callback();
    });
});
