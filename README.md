# gulp-minify-inline [![NPM version](https://badge.fury.io/js/gulp-minify-inline.svg)](http://badge.fury.io/js/gulp-minify-inline) [![Build Status](https://travis-ci.org/shkuznetsov/gulp-minify-inline.svg?branch=master)](https://travis-ci.org/shkuznetsov/gulp-minify-inline)

gulp-minify-inline is a [gulp](https://github.com/wearefractal/gulp) plugin that minifies inline JS and CSS. Works best with [gulp-minify-html](https://www.npmjs.org/package/gulp-minify-html).

Uses [cheerio](https://github.com/cheeriojs/cheerio) to parse HTML, [terser](https://github.com/fabiosantoscode/terser) to minify JS and [clean-css](https://github.com/jakubpawlowicz/clean-css) to minify CSS.

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
  jsSelector: 'script[type!="text/x-handlebars-template"]',
  css: {
    level: {1: {specialComments: 0}}
  },
  cssSelector: 'style[data-do-not-minify!="true"]'
};

gulp.task('minify-inline', function() {
  gulp.src('src/*.html')
    .pipe(minifyInline(options))
    .pipe(gulp.dest('dist/'))
});
```

### Options

Right now the following options are supported:

* `js` contains parameters to pass to `terser.minify()` (for documetation refer to [the project homepage](https://github.com/fabiosantoscode/terser)). Set it to `false` to disable JS minification globally. *Please note that the plugin defaults `js.output.inline_script` to `true` in order to combat XSS (contributed by @TimothyGu). This is quite useful in general but you might want to re-set it to `false` explicitly in (an extremely rare) case it breaks things for you*.
* `jsSelector` is passed to cheerio as a selector for script tags. This allows you to avoid minification of certain script tags (e.g. ones containing templates or other non-JS payload). Default: `'script'`.
* `css` contains parameters to pass to clean-css (for documetation refer to [the project homepage](https://github.com/jakubpawlowicz/clean-css)). Set it to `false` to disable CSS minification globally.
* `cssSelector` is passed to cheerio as a selector for style tags. This allows you to avoid minification of certain style tags. Default: `'style'`.

## LICENSE

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
