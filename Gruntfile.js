module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var taskConfig = {
        copy: {
            build: {
                files: [{
                    cwd: 'src/',
                    src: 'index.html',
                    dest: 'build/',
                    expand: true
                }]
            }
        }
    };

    grunt.initConfig(taskConfig);
    
    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('build', [
        'copy'
    ]);
};
