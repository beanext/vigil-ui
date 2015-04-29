module.exports = function (grunt) {
    'use strict';
    grunt.util.linefeed = '\n';
    grunt
        .initConfig({
            pkg: grunt.file.readJSON('package.json'),
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '
            + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
            + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
            + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
            + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
            bower: {
                install: {
                    options: {
                        targetDir: 'plugins',
                        layout: 'byType',
                        install: true,
                        verbose: true,
                        cleanTargetDir: false,
                        cleanBowerDir: false,
                        bowerOptions: {}
                    }
                }
            },
            copy: {
                build: {
                    expand: true,
                    cwd: 'angularCMD',
                    src: 'angularCMD.js',
                    dest: 'plugins/angularCMD'
                }
            },
            less: {
                compile: {
                    src: ['assets/less/*.less'],
                    dest: 'dist/css/<%= pkg.name %>.less.css'
                }
            },
            sass: {
                compileScss: {
                    src: ['assets/sass/*.scss'],
                    dest: 'dist/css/<%= pkg.name %>.sass.css'
                }
            },
            autoprefixer: {
                options: {
                    browsers: ['Android 2.3', 'Android >= 4',
                        'Chrome >= 20', 'Firefox >= 24',
                        'Explorer >= 8', 'iOS >= 6', 'Opera >= 12',
                        'Safari >= 6'],
                    map: true
                },
                build: {
                    expand: true,
                    flatten: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/'
                }
            },
            csscomb: {
                options: {
                    config: '.csscomb.json'
                },
                build: {
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/'
                }
            },
            csslint: {
                options: {
                    csslintrc: '.csslintrc'
                },
                build: {
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/'
                }
            },
            cssmin: {
                build: {
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css', '!*.less.css', '!*.sass.css'],
                    dest: 'dist/css/',
                    ext: '.min.css'
                }, less: {
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.less.css'],
                    dest: 'dist/css/',
                    ext: '.less.min.css'
                }, sass: {
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.sass.css'],
                    dest: 'dist/css/',
                    ext: '.sass.min.css'
                }
            },
            concat: {
                options: {
                    banner: '<%= banner %>',
                    stripBanners: true
                },
                build: {
                    src: ['lib/**/*.js', 'lib/*.js'],
                    dest: 'dist/js/<%= pkg.name %>.js'
                },
                css: {
                    src: ['assets/css/*.css'],
                    dest: 'dist/css/<%= pkg.name %>.css'
                }
            },
            uglify: {
                options: {
                    banner: '<%= banner %>'
                },
                compile: {
                    src: '<%= concat.build.dest %>',
                    dest: 'dist/js/<%= pkg.name %>.min.js'
                }
            },
            clean: {
                files: ['dist', 'plugins', 'style', 'images', '!plugins/angular-select']
            },
            qunit: {
                files: ['test/**/*.html']
            },
            jshint: {
                options: {
                    jshintrc: true,
                    /** 检查分号缺失 */
                    '-W033': true
                },
                lib: {
                    src: ['lib/**/*.js', 'lib/*.js']
                },
                test: {
                    src: ['test/**/*.js']
                }
            },
            watch: {
                lib: {
                    files: '<%= jshint.lib.src %>',
                    tasks: ['jshint:lib', 'qunit']
                },
                test: {
                    files: '<%= jshint.test.src %>',
                    tasks: ['jshint:test', 'qunit']
                },
                autoprefixer: {
                    files: ['dist/css/*.css'],
                    tasks: ['autoprefixer']
                },
                less: {
                    files: ['assets/less/*.less'],
                    tasks: ['less']
                },
                sass: {
                    files: ['assets/less/*.scss'],
                    tasks: ['sass']
                }
            }
        });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['clean', 'bower', 'sass', 'less', 'concat', 'uglify', 'autoprefixer', 'csscomb', 'csslint',
        'cssmin']);
};
