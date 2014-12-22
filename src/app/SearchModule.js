/**
 * Created by Marcin Kozaczyk on 2014-12-20.
 */
'use strict';


angular.module('app.search', [])

    .controller('SearchCtrl', function SearchCtrl($scope, $http, CONST) {
        console.log('Search ctrl');
        var gui = require('nw.gui');
        var DBHelper = require('./src/module/DBHelper.module');

        var helper = new DBHelper(storedb);

        $scope.query = 'FAR';
        $scope.results = [];

        $scope.search = function () {
            console.log('Searching...');
            var txt = encodeURI($scope.query);
            var url = CONST.KS_URL + '/api/search/mod?query=' + txt;
            $http.get(url).success(function (data) {
                console.log('Success!');
                $scope.results = data;
            }).error(function (data) {
                console.log('Error!');
            });
        };

        $scope.getCurrentVersion = function (mod) {
            for (var i = 0; i < mod.versions.length; i++) {
                var version = mod.versions[i];
                return version.ksp_version;
            }
        };

        $scope.openUrl = function (mod) {
            gui.Shell.openExternal(CONST.KS_URL + mod.url);
        };

        $scope.openWebsite = function (mod) {
            gui.Shell.openExternal(mod.website);
        };

        $scope.addToFavourites = function (mod) {
            helper.create(CONST.COLLECTION.FAVOURITE, mod, function (data) {
                console.log('Mod [' + mod.name + '] added to favourites!');
            }, function (err) {
                console.log(err);
            });
        };

    })

;