module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint', {
    options: {
      jshintrc: true
    },
    all: ['Gruntfile.js', 'backbone-route-control.js', 'test/**/*.js']
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.config('mocha', {
    test: {
      src: ['test/**/*.html'],
      options: {
        run: true,
      }
    }
  });

  grunt.registerTask('test', 'mocha');
  grunt.registerTask('default', ['jshint', 'test']);
};
