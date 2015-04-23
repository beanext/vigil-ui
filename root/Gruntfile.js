module.exports = function(grunt) {
	'use strict';
	grunt.util.linefeed = '\n';
	grunt
			.initConfig({
				pkg : grunt.file.readJSON('package.json'),
				banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - '
						+ '<%= grunt.template.today("yyyy-mm-dd") %>\n'
						+ '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
						+ '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
						+ ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
				bower : {
					install : {
						options : {
							targetDir : './plugins',
							layout : 'byType'
						}
					}
				},
				less : {
					compile : {
						src : [ 'assets/css/*.less' ],
						dest : 'dist/css/<%= pkg.name %>-less.css'
					}
				},
				sass : {
					compileSass : {
						src : [ 'assets/css/*.sass' ],
						dest : 'dist/css/<%= pkg.name %>-sass.css'
					},
					compileScss : {
						src : [ 'assets/css/*.scss' ],
						dest : 'dist/css/<%= pkg.name %>-scss.css'
					}
				},
				autoprefixer : {
					options : {
						browsers : [ 'Android 2.3', 'Android >= 4',
								'Chrome >= 20', 'Firefox >= 24',
								'Explorer >= 8', 'iOS >= 6', 'Opera >= 12',
								'Safari >= 6' ]
					},
					build : {
						expand : true,
						cwd : 'dist/css/',
						src : [ '*.css' ]
					}
				},
				csscomb : {
					options : {
						config : '.csscomb.json'
					},
					build : {
						expand : true,
						cwd : 'dist/css/',
						src : [ '*.css', '!*.min.css' ],
						dest : 'dist/css/'
					}
				},
				csslint : {
					options : {
						csslintrc : '.csslintrc'
					},
					build : {
						expand : true,
						cwd : 'dist/css/',
						src : [ '*.css', '!*.min.css' ],
						dest : 'dist/css/'
					}
				},
				cssmin : {
					build : {
						expand : true,
						cwd : 'dist/css/',
						src : [ '*.css', '!*.min.css' ],
						dest : 'dist/css/<%= pkg.name %>.min.css'
					}
				},
				copy : {
					init : {
						files : [ {
							src : [ 'style/*.css' ],
							dest : 'dest/css',
							filter : 'isFile'
						}, {
							src : [ 'plugin/**' ],
							dest : 'dest/'
						} ]
					}
				},
				concat : {
					options : {
						banner : '<%= banner %>',
						stripBanners : true
					},
					build : {
						src : [ 'lib/**/*.js', 'lib/*.js' ],
						dest : 'dist/js/<%= pkg.name %>.js'
					}
				},
				uglify : {
					options : {
						banner : '<%= banner %>'
					},
					compile : {
						src : '<%= concat.build.dest %>',
						dest : 'dist/js/<%= pkg.name %>.min.js'
					}
				},
				clean : {
					files : [ 'dist', 'style/<%= pkg.name %>-sass.css',
							'style/<%= pkg.name %>-less.css' ]
				},
				qunit : {
					files : [ 'test/**/*.html' ]
				},
				jshint : {
					options : {
						jshintrc : true
					/** 检查分号缺失 */
					// ,'-W033': true
					},
					gruntfile : {
						src : 'Gruntfile.js'
					},
					lib : {
						src : [ 'lib/**/*.js', 'lib/*.js' ]
					},
					test : {
						src : [ 'test/**/*.js' ]
					}
				},
				watch : {
					gruntfile : {
						files : '<%= jshint.gruntfile.src %>',
						tasks : [ 'jshint:gruntfile' ]
					},
					lib : {
						files : '<%= jshint.lib.src %>',
						tasks : [ 'jshint:lib', 'qunit' ]
					},
					test : {
						files : '<%= jshint.test.src %>',
						tasks : [ 'jshint:test', 'qunit' ]
					},
					autoprefixer : {
						files : [ 'dist/css/*.css' ],
						tasks : [ 'autoprefixer' ]
					},
					less : {
						files : [ 'assets/css/*.less' ],
						tasks : [ 'less' ]
					},
					sass : {
						files : [ 'assets/css/*.sass' ],
						tasks : [ 'sass' ]
					}
				}
			});
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-csscomb');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', [ 'less', 'sass', 'jshint', 'qunit', 'clean',
			'copy', 'concat', 'uglify', 'autoprefixer', 'csscomb', 'csslint',
			'cssmin' ]);
};
