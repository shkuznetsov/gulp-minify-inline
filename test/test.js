var	gulp = require('gulp'),
	through = require('through2'),
	expect = require('chai').expect,
	uglifyInline = require('../');

describe('gulp-minify-html', function ( )
{
	var fixture = __dirname + '/fixture/index.html';

	it('should use default options', function ( done )
	{
		gulp.src(fixture)
			.pipe(uglifyInline())
			.pipe(through.obj(function ( file, e, c ) {
				var contents = file.contents.toString();
				expect(contents).to.match(/a=1/);
				expect(contents).not.to.match(/Comment/);
				done();
			}));
	});

	it('should use provided options', function ( done )
	{
		gulp.src(fixture)
			.pipe(uglifyInline({output: {comments: true}}))
			.pipe(through.obj(function ( file, e, c ) {
				var contents = file.contents.toString();
				expect(contents).to.match(/a=1/);
				expect(contents).to.match(/Comment/);
				done();
			}));
	});
});