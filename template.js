'use strict';
exports.description = 'Create a project dependent module';

exports.notes = '';

exports.after = ''

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

	init
			.process(
					{
						type : 'DEMO'
					},
					[
					// Prompt for these values.
					init.prompt('name'), 
							init.prompt('licenses', 'MIT'),
							init.prompt('author_name'),
							init.prompt('author_email','none'),
							init.prompt('jquery_version', '*'),
							init.prompt('bootstrap_version', '*'),
							init.prompt('angularjs_version', '*'), ],
					function(err, props) {
						props.keywords = [];
						if (props.jquery_version == 'n'
								|| props.jquery_version == 'N') {
							delete props.jquery_version;
						}
						if (props.bootstrap_version == 'n'
								|| props.bootstrap_version == 'N') {
							delete props.bootstrap_version;
						}
						if (props.angularjs_version == 'n'
								|| props.angularjs_version == 'N') {
							delete props.angularjs_version;
						}
						props.devDependencies = {
							'bower' : '~1.4.1',
							'grunt-bower-task' : '~0.4.0',
							'grunt-contrib-uglify' : '~0.9.1',
							'grunt-contrib-jshint' : '~0.11.1',
							'grunt-contrib-concat' : '~0.5.1',
							'grunt-contrib-cssmin' : '~0.12.2',
							'grunt-contrib-less' : '~1.0.1',
							'grunt-contrib-sass' : '~0.9.2',
							'grunt-contrib-clean' : '~0.6.0',
							'grunt-contrib-qunit' : '~0.7.0',
							'grunt-contrib-watch' : '~0.6.1',
							'grunt-contrib-csslint' : '~0.4.0',
							'grunt-contrib-copy' : '~0.8.0',
							'grunt-csscomb' : '~3.0.0',
							'grunt-autoprefixer' : '~3.0.0'
						};

						// Files to copy (and process).
						var files = init.filesToCopy(props);

						// Add properly-named license files.
						init.addLicenseFiles(files, props.licenses);

						// Actually copy (and process) files.
						init.copyAndProcess(files, props);
						// Generate package.json file.
						init.writePackageJSON('package.json', props);

						var bowerDependencies = {};
						var genBowerJson = false;
						if (props.jquery_version) {
							bowerDependencies.jquery = props.jquery_version == '*' ? props.jquery_version
									: '~' + props.jquery_version;
							genBowerJson = true;
						}
						if (props.bootstrap_version) {
							bowerDependencies.bootstrap = props.bootstrap_version == '*' ? props.bootstrap_version
									: '~' + props.bootstrap_version;
							genBowerJson = true;
						}
						if (props.angularjs_version) {
							bowerDependencies.angularjs = props.angularjs_version == '*' ? props.angularjs_version
									: '~' + props.angularjs_version;
							genBowerJson = true;
						}
						if (genBowerJson) {
							init.writePackageJSON('bower.json', {
								name : props.name,
								version : props.version,
								dependencies : bowerDependencies
							});
						}

						done();

					});

};
