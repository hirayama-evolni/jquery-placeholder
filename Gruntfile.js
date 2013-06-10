module.exports = function(grunt) {
    grunt.initConfig({
        coffee: {
            all: {
                options: {
//                    bare: true
                },
                files: {
                    'jquery.placeholder.js': 'jquery.placeholder.coffee'
                }
            },
        },
        uglify: {
            all: {
                files: {
                    'jquery.placeholder.min.js': 'jquery.placeholder.js'
                }
            }
        },
        coffeelint: {
            all: ['jquery.placeholder.coffee']
        },
        watch: {
            files: ['jquery.placeholder.coffee'],
            tasks: ['coffeelint', 'coffee', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['coffeelint', 'coffee', 'uglify']);
}
