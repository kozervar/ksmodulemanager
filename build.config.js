/**
 * Created by Marcin Kozaczyk on 2014-12-21.
 */

module.exports = {
    build_dir: 'build',
    src_assets: 'src/assets',

    app_views : 'src/html/**/*.src.json',

    app_files: {
        js: ['src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js'],
        jsunit: [ 'src/**/*.spec.js' ],
        apptpl: [ 'src/app/**/*.tpl.html' ],
        html: [ 'src/html/*.html' ],
        less: 'src/less/main.less'
    },

    vendor_files: {
        js: [],
        css: [],
        assets: []
    }
};