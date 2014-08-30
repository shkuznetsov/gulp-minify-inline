var through = require('through2'),
	cheerio = require('cheerio'),
	uglify = require('uglify-js'),
	gutil = require('gulp-util');

const PLUGIN_NAME = 'gulp-uglify-inline';

module.exports = function ( opt )
{
	opt = opt || {};

	opt.fromString = true;

	function minimize ( file, encoding, callback )
	{
		if (file.isNull())
		{
			return callback(null, file);
		}

		if (file.isStream())
		{
			return callback(new gutil.PluginError('gulp-uglify-inline', 'doesn\'t support Streams'));
		}

		var $ = cheerio.load(file.contents.toString());

		var has_done_nothing = true;

		$('script').each(function ( )
		{
			var $this = $(this),
				script_orig = $this.text().trim();

			if (script_orig !== '')
			{
				var script_min = uglify.minify(script_orig, opt);

				$this.text(script_min.code);

				has_done_nothing = false;
			}
		});

		if (!has_done_nothing) file.contents = new Buffer($.html());

		callback(null, file);
	}

	return through.obj(minimize);
}
