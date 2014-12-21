/**
 * Created by Marcin Kozaczyk on 2014-12-21.
 */
'use strict';
module.exports = function (grunt) {


    /* GRUNT TASKS*/
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-html-build');

    var userConfig = require('./build.config.js');

    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        clean: [
            '<%= build_dir %>'
        ],

        /**
         * COPY TASK
         */
        copy: {
            /* Assets */
            build_app_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '<%= src_assets %>',
                        expand: true
                    }
                ]
            },
            build_vendor_assets: {
                files: [
                    {
                        src: [ '<%= vendor_files.assets %>' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '.',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            /* JS */
            build_appjs: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            /* Vendor CSS */
            build_vendorcss: {
                files: [
                    {
                        src: [ '<%= vendor_files.css %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            }
        },
        /**
         * CONCAT TASK
         */
        concat: {
            /**
             * The `build_css` target concatenates compiled CSS and vendor CSS
             * together.
             */
            build_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
                ],
                dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
            }
        },
        /**
         * LESS TASK
         */
        less: {
            build: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.less %>'
                }
            }
        },
        /**
         * HTML2JS TASK
         * */
        html2js: {
            app: {
                options: {
                    base: 'src/app',
                    module: 'app.templates'
                },
                src: [ '<%= app_files.apptpl %>' ],
                dest: '<%= build_dir %>/app-templates.js'
            }
        },
        /**
         * JSHINT TASK
         */
        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            test: [
                '<%= app_files.jsunit %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                jshintrc: true
            }
        },
        /**
         * DELTA (watch) TASK
         * */
        delta: {
            options: {
                livereload: true
            },
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: [ 'jshint:src', 'copy:build_appjs' ]
            },
            assets: {
                files: [
                    '<%= src_assets %>/**/*'
                ],
                tasks: [ 'copy:build_app_assets', 'copy:build_vendor_assets' ]
            },
            tpls: {
                files: [
                    '<%= app_files.apptpl %>',
                ],
                tasks: [ 'html2js' ]
            },
            html: {
                files: [ '<%= app_files.html %>' ],
                tasks: [ 'buildhtml' ]
            },
            html_src: {
                files: [ '<%= app_views %>' ],
                tasks: [ 'buildhtml' ]
            },
            less: {
                files: [ 'src/**/*.less' ],
                tasks: [ 'less:build' ]
            },
            jsunit: {
                files: [
                    '<%= app_files.jsunit %>'
                ],
                tasks: [ ],
                options: {
                    livereload: false
                }
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [ 'jshint:gruntfile' ],
                options: {
                    livereload: false
                }
            }
        },

        /**
         * BUILD HTML FILES
         * */
        buildhtml: {
            build: {
                src: [
                    '<%= app_views %>'
                ]
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    /* Register tasks*/
    grunt.registerTask('build', [
        'clean', 'html2js', 'jshint', 'less', 'concat',
        'copy:build_app_assets', 'copy:build_vendor_assets',
        'copy:build_appjs', 'copy:build_vendorjs', 'copy:build_vendorcss', 'buildhtml'
    ]);

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', [ 'build', 'delta' ]);
    grunt.registerTask('default', [ 'build' ]);


    grunt.registerMultiTask('buildhtml', 'Building HTML files', function () {
        var path = require('path');

        var opts = {};

        for (var i = 0; i < this.filesSrc.length; i++) {
            var file = this.filesSrc[i];

            var srcInfo = grunt.file.readJSON(file);
            var dirName = path.dirname(file);
            var fileName = path.basename(file, '.src.json');
            var htmlFile = path.join(dirName, fileName + '.html');

            if (!grunt.file.exists(htmlFile)) {
                throw grunt.util.error('Could not find file ' + htmlFile);
            } else {
                if(!srcInfo.destination) {
                    throw grunt.util.error('Destination not set in file ' + file);
                }
                var buildName = fileName + '_htmlBuild';
                opts[buildName] = {
                    src: htmlFile,
                    dest: srcInfo.destination,
                    options: {
                        relative: false,
                        beautify: true,
                        scripts: srcInfo.scripts,
                        styles: srcInfo.styles,
                        sections: srcInfo.sections,
                        data: srcInfo.data
                    }
                };
            }
        }
        grunt.config.set('htmlbuild', opts);
        grunt.task.run('htmlbuild');
    });

};