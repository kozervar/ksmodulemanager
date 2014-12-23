/**
 * Created by Marcin Kozaczyk on 2014-12-18.
 */
'use strict';
var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'app.templates',
    'app.search',
    'app.favourite',
    'app.downloaded'
]);

app
    .constant('CONST', {
        MODULE_PATH : './src/module/',
        KS_URL: 'https://kerbalstuff.com',
        COLLECTION: {
            SETTINGS: 'settings',
            FAVOURITE: 'favourite',
            DOWNLOADED: 'downloaded'
        }
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        console.log('Configuring');

        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: 'partials/search.tpl.html',
                data: {
                    name: 'Search mods'
                }
            })
            .state('favourite', {
                url: '/favourite',
                templateUrl: 'partials/favourite.tpl.html',
                data: {
                    name: 'Favourites'
                }
            })
            .state('downloaded', {
                url: '/downloaded',
                templateUrl: 'partials/downloaded.tpl.html',
                data: {
                    name: 'Downloaded mods'
                }
            })
        ;

        $urlRouterProvider.otherwise('/downloaded');
    })

    .controller('AppCtrl', function AppCtrl($scope, $state) {
        console.log('App Ctrl');
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $scope.viewName = $state.current.data.name;
        });
    })

;