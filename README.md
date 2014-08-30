# gulp-uglify-inline [![NPM version](https://badge.fury.io/js/gulp-uglify-inline.svg)](http://badge.fury.io/js/gulp-uglify-inline) [![Build Status](https://travis-ci.org/shkuznetsov/gulp-uglify-inline.svg?branch=master)](https://travis-ci.org/shkuznetsov/gulp-uglify-inline)

gulp-uglify-inline is a [gulp](https://github.com/wearefractal/gulp) plugin to uglify inline scripts.

Uses [cheerio](https://github.com/cheeriojs/cheerio) to parse HTML and [UglifyJS](https://github.com/mishoo/UglifyJS) to uglify JS code.

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-uglify-inline`

## Usage

```javascript
var uglifyInline = require('gulp-uglify-inline');

var options = {
	output: {
		comments: true
	}
};

gulp.task('uglify-inline', function() {
  gulp.src('./*.html')
    .pipe(uglifyInline(options))
    .pipe(gulp.dest('dist'))
});
```

Options object will be passed directly to uglify's ``minify()`` function, so you can use any options described [here](https://github.com/mishoo/UglifyJS2#api-reference).

## LICENSE

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
