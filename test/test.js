var	gulp = require('gulp'),
	through = require('through2'),
	expect = require('chai').expect,
	minifyInline = require('../');

describe('gulp-minify-html', function ( )
{
	var fixture = __dirname + '/fixture/index.html';

	it('should use default options', function ( done )
	{
		gulp.src(fixture)
			.pipe(minifyInline())
			.pipe(through.obj(function ( file, e, c ) {
				var contents = file.contents.toString();
				expect(contents).to.match(/a=1/);
				expect(contents).to.match(/body{/);
				expect(contents).not.to.match(/JSComment/);
				expect(contents).to.match(/CSSComment/);
				done();
			}));
	});

	it('should use uglify options', function ( done )
	{
		gulp.src(fixture)
			.pipe(minifyInline({js: {output: {comments: true}}}))
			.pipe(through.obj(function ( file, e, c ) {
				var contents = file.contents.toString();
				expect(contents).to.match(/a=1/);
				expect(contents).to.match(/JSComment/);
				done();
			}));
	});

	it('should be possible to disable uglify', function ( done )
	{
		gulp.src(fixture)
			.pipe(minifyInline({js: false}))
			.pipe(through.obj(function ( file, e, c ) {
				var contents = file.contents.toString();
				expect(contents).to.match(/a = 1/);
				done();
			}));
	});

	it('should use clean-css options', function ( done )
	{
		gulp.src(fixture)
			.pipe(minifyInline({css: {keepSpecialComments: 0}}))
			.pipe(through.obj(function ( file, e, c ) {
				var contents = file.contents.toString();
				expect(contents).to.match(/body{/);
				expect(contents).not.to.match(/CSSComment/);
				done();
			}));
	});

	it('should be possible to disable clean-css', function ( done )
	{
		gulp.src(fixture)
			.pipe(minifyInline({css: false}))
			.pipe(through.obj(function ( file, e, c ) {
				var contents = file.contents.toString();
				expect(contents).to.match(/body {/);
				done();
			}));
	});
});