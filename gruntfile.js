(function(){
    'use strict';

    module.exports = function(grunt) {
        // Project Configuration
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            watch: {
                jade: {
                    files: ['app/views/**'],
                    options: {
                        livereload: true,
                    },
                },
                js: {
                    files: [
                        'gruntfile.js',
                        'server.js',
                        'app/**/*.js',
                        'public/js/**',
                        'public/lib/**/*.js',
                        'test/**/*.js'
                    ],
                    tasks: ['jshint', 'concat'],
                    options: {
                        livereload: true,
                    },
                },
                html: {
                    files: ['public/views/**'],
                    options: {
                        livereload: true,
                    },
                },
                css: {
                    files: ['public/css/**'],
                    options: {
                        livereload: true
                    }
                },
                less: {
                    files: ['public/lib/bootstrap/less/**'],
                    tasks: ['less'],
                    options: {
                        livereload: true
                    }
                }
            },
            less: {
                bootstrap: {
                    files: {
                        "public/dist/css/bootstrap.css": "public/lib/bootstrap/less/bootstrap.less"
                    }
                }
            },
            concat: {
                angular: {
                    src: [
                        'public/lib/angular/angular.js',
                        'public/lib/angular/angular-cookies.js',
                        'public/lib/angular/angular-resource.js',
                        'public/lib/angular/angular-route.js',
                        'public/lib/angular/ui-bootstrap.js',
                        'public/lib/angular/ui-bootstrap-tpls.js',
                        'public/lib/angular/ui-utils.js'
                    ],
                    dest: 'public/dist/js/angular.js'
                },
                app: {
                    src: [
                        // Globals
                        'public/js/globals/app.js',
                        'public/js/globals/config.js',
                        'public/js/globals/directives.js',
                        'public/js/globals/filters.js',

                        // Services
                        'public/js/services/global.js',
                        'public/js/services/mediaFiles.js',
                        'public/js/services/profiles.js',

                        // Controllers
                        'public/js/controllers/index.js',
                        'public/js/controllers/header.js',
                        'public/js/controllers/mediaFiles.js',
                        'public/js/controllers/profiles.js',

                        // Init
                        'public/js/globals/init.js'
                    ],
                    dest: 'public/dist/js/app.js'
                }
            },
            jshint: {
                all: {
                    src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**'],
                    options: {
                        newcap: false,
                        globals: {
                            console: true,
                            document: true,
                            window: true,
                            angular: true,
                            exports: true,
                            module: true,
                            process: true,
                            require: true,
                            Buffer: true,
                            __dirname: true
                        }
                    }
                }
            },
            nodemon: {
                dev: {
                    options: {
                        file: 'server.js',
                        args: [],
                        ignoredFiles: ['public/**'],
                        watchedExtensions: ['js'],
                        nodeArgs: ['--debug'],
                        delayTime: 1,
                        env: {
                            PORT: 3000
                        },
                        cwd: __dirname
                    }
                }
            },
            concurrent: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
            mochaTest: {
                options: {
                    reporter: 'spec',
                    require: 'server.js'
                },
                src: ['test/mocha/**/*.js']
            },
            env: {
                test: {
                    NODE_ENV: 'test'
                }
            },
            karma: {
                unit: {
                    configFile: 'test/karma/karma.conf.js'
                }
            }
        });

        //Load NPM tasks
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-mocha-test');
        grunt.loadNpmTasks('grunt-karma');
        grunt.loadNpmTasks('grunt-nodemon');
        grunt.loadNpmTasks('grunt-concurrent');
        grunt.loadNpmTasks('grunt-env');

        //Making grunt default to force in order not to break the project.
        grunt.option('force', true);

        grunt.registerTask('null', function() {
            return '';
        });

        //Default task(s).
        grunt.registerTask('default', ['concurrent']);

        //Test task.
        grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
    };
})();
