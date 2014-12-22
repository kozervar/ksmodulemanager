/**
 * Created by Marcin Kozaczyk on 2014-12-21.
 */

module.exports = {
    build_dir: 'build',
    src_assets: 'src/assets',

    app_views : 'src/html/**/*.src.json',

    app_files: {
        js: ['src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js', '!src/**/*.module.js'],
        module : ['src/**/*.module.js'],
        jsunit: [ 'src/**/*.spec.js' ],
        apptpl: [ 'src/app/**/*.tpl.html' ],
        html: [ 'src/html/*.html' ],
        less: 'src/less/main.less'
    },

    vendor_files: {
        js: [
            'vendor/storedb/storedb.js',
            'vendor/jquery/dist/jquery.js',
            'vendor/angular/angular.js',
            'vendor/storedb/storedb.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        css: [],
        assets: [
            'vendor/font-awesome/fonts/**/*'
        ]
    }
};