/**
 * Created by Marcin Kozaczyk on 2014-12-18.
 */
'use strict';
var gui = require('nw.gui');

var app = angular.module('app', [
    'ui.router',
    'file-dialog',
    'app.search',
    'app.favourite'
]);

app
    .constant('CONST', {
        KS_URL : 'https://kerbalstuff.com',
        COLLECTION : {
            FAVOURITE : 'favourite'
        }
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        console.log("Configuring");

        $urlRouterProvider.otherwise("/search");

        $stateProvider
            .state('search', {
                url: "/search",
                templateUrl: "partials/search.tpl.html"
            })
            .state('favourite', {
                url: "/favourite",
                templateUrl: "partials/favourite.tpl.html"
            })
        ;
    })

    .controller('AppCtrl', function AppCtrl() {
        console.log('App Ctrl');
    })

;