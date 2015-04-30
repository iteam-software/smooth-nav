 /* Smooth-nav's Gruntfile
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

     comments: {
       js: {
         options: {
           singleline: true,
           multiline: false
         },
         src: ['dist/js/*.js']
       }
     },

     uglify: {
       options: {
         preserveComments: 'some',
         sourceMap: true
       },
       build: {
         src: ['dist/js/<%= pkg.name %>.js'],
         dest: 'dist/js/<%= pkg.name %>.min.js'
       }
     },

     copy: {
       docs: {
         expand: true,
         flatten: true,
         src: [
           'dist/js/*.js',
           'dist/js/*.map'
         ],
         dest: 'docs/js/'
       },

       // used while we aren't concatting anything
       dist: {
         src: 'js/smooth.js',
         dest: 'dist/js/<%= pkg.name %>.js'
       }
     },
     
     compress: {
       release: {
         options: {
           archive: 'release/<%= pkg.name %>.zip'
         },
         expand: true,
         flatten: true,
         src: ['dist/**/*.js'],
         dest: 'release/'
       }
     }
   });

   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-compress');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-stripcomments');
   
   grunt.registerTask('release', [
     'copy:dist',
     'uglify:build',
     'compress:release'
   ]);

   grunt.registerTask('default', [
     'clean:dist',
     'clean:docs',
     'copy:dist',
     'comments:js',
     'uglify:build',
     'copy:docs'
   ]);
 }
