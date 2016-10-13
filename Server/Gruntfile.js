module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    env : {
      dev : {
        NODE_ENV : 'development',
        UCC_HOME : 'Milwaukee'
      },
      production: {
        NODE_ENV : 'production',
        UCC_HOME : 'Milwaukee'
      }
	},
	 nodemon: {
		dev: { script: 'index.js' }
	  }
  });

  grunt.loadNpmTasks('grunt-contrib-nodemon');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default',  [
      'env:dev',
      'nodemon'
    ]);
     grunt.registerTask('production',  [
      'env:production',
      'nodemon'
    ]);

};
