module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var bowerAndNpmScripts = [
        'bower_components/angular/angular.js'
    ];

    var taskConfig = {
        clean: {
            build: {
                src: ['build/']
            }
        },
        connect: {
            options: {
                hostname: 'localhost',
                base: 'build/',
                livereload: 35729
            },

            build: {
                options: {
                    open: 'http://localhost:9999',
                    port: 9999
                }
            }
        },
        copy: {
            html: {
                files: [{
                    cwd: 'src/',
                    src: ['**/*.html', '!index.html'],
                    dest: 'build/',
                    expand: true
                }]
            },
            js: {
                files: [{
                    cwd: 'src',
                    src: ['**/*.js'],
                    dest: 'build/',
                    expand: true
                }]
            },
            packageJs: {
                files: [{
                    src: bowerAndNpmScripts,
                    dest: 'build/'
                }]
            }
        },
        stylus: {
            options: {
                "include css": true,
                compress: false,
                use: [
                    function() {
                        return require('autoprefixer-stylus')('last 2 versions');
                    }
                ]
            },
            build: {
                src: 'src/styles/app.styl',
                dest: 'build/app.css'
            }
        },
        templateIndex: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['bower_components/**/*.js',
                        'node_modules/**/*.js',
                        '**/*.js']
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:html']
            },
            js: {
                cwd: 'src',
                files: ['**/*.js'],
                dest: 'build/',
                tasks: ['copy:js']
            }
        }
    };

    grunt.registerMultiTask('templateIndex', function() {
        var basePathRegExp = new RegExp('^(build\/)', 'g');
        var scripts = this.filesSrc.map(function(scriptPath) {
            return scriptPath.replace(basePathRegExp, '');
        });
        grunt.file.copy('src/index.html', 'build/index.html', {
            process: function( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: scripts
                    }
                });
            }
        });
    });

    grunt.initConfig(taskConfig);

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('build', 'Development build of the app', [
        'copy',
        'stylus',
        'templateIndex'
    ]);

    grunt.registerTask('dev', 'Build app and begin development', [
        'build',
        'connect',
        'watch'
    ]);

    grunt.registerTask('serve', 'Alias for dev task', [
        'dev'
    ]);
};
