/**
 * Created by Marcin Kozaczyk on 2014-12-18.
 */
'use strict';
var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'app.templates',
    'app.search',
    'app.favourite'
]);

app
    .constant('CONST', {
        KS_URL: 'https://kerbalstuff.com',
        COLLECTION: {
            SETTINGS: 'settings',
            FAVOURITE: 'favourite'
        }
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        console.log('Configuring');

        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: 'partials/search.tpl.html'
            })
            .state('favourite', {
                url: '/favourite',
                templateUrl: 'partials/favourite.tpl.html'
            })
        ;

        $urlRouterProvider.otherwise('/search');
    })

    .controller('AppCtrl', function AppCtrl($scope) {
        console.log('App Ctrl');
    })

;