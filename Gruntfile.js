module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      build: {
        files: {
          'build/roslib.node.js': [
            'src/RosLibHeader.js',
            'src/RosLib.js',
            'src/actionlib/*.js',
            'src/core/*.js',
            'src/math/*.js',
            'src/tf/*.js',
            'src/urdf/*.js',
            'src/RosLibFooter.js'
          ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        'build/roslib.node.js',
        'build/roslib.js',
      ]
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.test.js']
      }
    },
    watch: {
      dev: {
        options: {
          interrupt: true
        },
        files: [
          'src/*.js',
          'src/**/*.js'
        ],
        tasks: ['concat']
      },
      build_and_watch: {
        options: {
          interrupt: true
        },
        files: [
          'Gruntfile.js',
          '.jshintrc',
          'src/*.js',
          'src/**/*.js'
        ],
        tasks: ['build']
      }
    },
    clean: {
      options: {
        force: true
      },
      doc: ['doc'],
    },
    jsdoc: {
      doc: {
        src: [
          'src/*.js',
          'src/**/*.js'
        ],
        options: {
          destination: 'doc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('dev', ['concat', 'watch']);
  grunt.registerTask('build', ['concat', 'jshint']);
  grunt.registerTask('build_and_watch', ['watch']);
  grunt.registerTask('doc', ['clean', 'jsdoc']);
  grunt.registerTask('test', ['build', 'mochaTest']);

};