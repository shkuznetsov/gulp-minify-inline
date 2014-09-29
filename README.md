# gulp-minify-inline [![NPM version](https://badge.fury.io/js/gulp-minify-inline.svg)](http://badge.fury.io/js/gulp-minify-inline) [![Build Status](https://travis-ci.org/shkuznetsov/gulp-minify-inline.svg?branch=master)](https://travis-ci.org/shkuznetsov/gulp-minify-inline)

gulp-minify-inline is a [gulp](https://github.com/wearefractal/gulp) plugin to uglify inline scripts and minify inline styles. Works best with [gulp-minify-html](https://www.npmjs.org/package/gulp-minify-html).

Uses [cheerio](https://github.com/cheeriojs/cheerio) to parse HTML, [UglifyJS2](https://github.com/mishoo/UglifyJS2) to uglify JS code and [clean-css](https://github.com/jakubpawlowicz/clean-css) to minify CSS code.

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-minify-inline`

## Usage

Straightforward way:

```javascript
var minifyInline = require('gulp-minify-inline');

gulp.task('minify-inline', function() {
  gulp.src('src/*.html')
    .pipe(minifyInline())
    .pipe(gulp.dest('dist/'))
});
```

Need a bit more control?

```javascript
var minifyInline = require('gulp-minify-inline');

var options = {
	js: {
		output: {
			comments: true
		}
	},
	css: {
		keepSpecialComments: 1
	}
};

gulp.task('minify-inline', function() {
  gulp.src('src/*.html')
    .pipe(minifyInline(options))
    .pipe(gulp.dest('dist/'))
});
```

### Options

Use `options.minifyInline` to pass arguments directly to the `gulp-minify-inline` task.

Right now the following options are supported:

* `options.minifyInline.jsSelector [default:'script']`: If included, this is passed to cheerio as the primary selector for determining which inline tags are processed as JS.
* `options.minifyInline.cssSelector [default:'style']`: If included, this is passed to cheerio as the primary selector for determining which inline tags are processed as CSS.

Use `options.js` to pass parameters to UglifyJS2 (for documetation refer to [the project homepage](https://github.com/mishoo/UglifyJS2)) or set it to `false` to disable JS uglification.

Use `options.css` to pass parameters to clean-css (for documetation refer to [the project homepage](https://github.com/jakubpawlowicz/clean-css)) or set it to `false` to disable CSS minification.

## LICENSE

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
