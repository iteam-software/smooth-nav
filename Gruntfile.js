 /* smooth-nav's Gruntfile
 * https://github.com/iteam-software/smooth-nav
 * Copyright 2015 iTEAM Software
 * Licensed under MIT (https://github.com/iteam-software/blob/master/LICENSE)
 */

module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({

     // metadata
     pkg: grunt.file.readJSON('package.json'),

     // tasks
     clean: {
       dist: 'dist/js/*.js',
       docs: 'docs/js/*.js'
     },

     concat: {
       smoothNav: {
         src: [
           'js/smooth.js'
           // add more here
           ],
         dest: 'dist/js/<%= pkg.name %>.js'
       }
     },

     uglify: {
       options: {
         preserveComments: 'some',
         sourceMap: true
       },
       build: {
         src: ['js/smooth.js'],
         dest: 'dist/js/<%= pkg.name %>.min.js'
       }
     },

     copy: {
       docs: {
         expand: true,
         src: 'dist/**/*.js',
         dest: 'docs/'
       },

       // used while we aren't concatting anything
       dist: {
         src: 'js/smooth.js',
         dest: 'dist/js/<%= pkg.name %>.js'
       }
     }
   });

   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-uglify');

   grunt.registerTask('default', [
     'clean:dist',
     'clean:docs',
     'copy:dist',
     'copy:docs',
     'uglify:build'
   ]);
 }
