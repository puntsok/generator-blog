/*global module:false */


module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dev: {
                files: {
                    'public/js/require-dev.js': [
                        'public/js/requireconfig.js',
                        'public/assets/requirejs/require.js'
                    ],
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: false,
                    amd: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: 'precompiled_templates/', // relative to this path.
                    src: ['**/*.mustache'], // Actual pattern(s) to match.
                    dest: 'public/js/templates/', // Destination path prefix.
                    ext: '.js', // Dest filepaths will have this extension.
                }]
            }
        },
        'string-replace': {
            builthtml: {
                files: {
                    'public/index.html': 'public/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /(version=")(\d+\.\d+\.\d+)/g,
                        replacement: '$10.0.0'
                    }]
                }
            },
            appjs: {
                files: {
                    'public/js/app.js': 'public/js/app.js'
                },
                options: {
                    replacements: [{
                        pattern: /(version: ')(\d+\.\d+\.\d+)(')/g,
                        replacement: '$10.0.0$3'
                    }]
                }
            },
            css: {
                files: {
                    'public/css/main.scss': 'public/css/main.scss'
                },
                options: {
                    replacements: [{
                        pattern: /(CSSVersion: )(\d+\.\d+\.\d+)/g,
                        replacement: '$10.0.0'
                    }]
                }
            }
        },
        watch: {
            requireconfig: {
                files: ['public/js/requireconfig.js'],
                tasks: ['concat:dev'],
                options: {
                    livereload: false,
                    spawn: false   
                }
            },
            scripts: {
                files: ['precompiled_templates/*.mustache'],
                tasks: ['handlebars'],
                options: {
                    livereload: false,
                    spawn: false
                }
            },
            css: {
                files: ['public/css/**/*.scss'],
                tasks: ['sass:dev'],
                options: {
                    livereload: false,
                    spawn: false
                }
            },
            build: {
                files: ['package.json'],
                tasks: ['build'],
                options: {
                    livereload: false,
                    spawn: true
                }
            },
            md2html: {
                files: ['README.md'],
                tasks: ['md2html'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        },
        jshint: {
            individual_files: {
                files: [{
                    src: 'Gruntfile.js'
                }, {
                    src: 'public/js/*.js'
                }]
            },
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    'public/js/build.js', 
                    'public/js/build-min.js',
                    'public/js/require-dev.js',
                ]
            }
        },
        requirejs: {
            dev: {
                options: {
                    baseUrl: 'public/js',
                    include: 'requireLib',
                    mainConfigFile: 'public/js/requireconfig.js',
                    name: 'main',
                    out: 'public/js/build.js',
                    optimize: 'none'
                }
            },
            dist: {
                options: {
                    baseUrl: 'public/js',
                    include: 'requireLib',
                    mainConfigFile: 'public/js/requireconfig.js',
                    name: 'main',
                    out: 'public/js/build-min.js',
                    optimize: 'uglify2',
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        mangle: true,
                        warnings: false
                    },
                    preserveLicenseComments: false
                }
            }
        },
        sass: {
            options: {
                trace: true,
                quiet: false
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/main.css': 'public/css/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/build.css': 'public/css/main.scss'
                }
            }
        },
        md2html: {
            options: {
                layout: 'public/README-layout.html'
            },
            readme: {
                files: [{
                    src: 'README.md',
                    dest: 'public/README.html'
                }]
            }
        }
    });

    function registerTasks() {
        grunt.registerTask('default', ['jshint']);
        grunt.registerTask('build',
            ['string-replace','sass:dist','requirejs:dist']);
        grunt.registerTask('init', 
            ['concat', 'handlebars', 'sass', 'requirejs']
        );
    }

    function loadTasks() {
        [
            'grunt-contrib-requirejs',
            'grunt-contrib-handlebars',
            'grunt-contrib-jshint',
            'grunt-contrib-watch',
            'grunt-contrib-sass',
            'grunt-string-replace',
            'grunt-md2html',
            'grunt-contrib-concat'
        ].forEach( function(lib) {
            grunt.loadNpmTasks(lib);
        });
    }

    registerTasks();
    loadTasks();
};