/**
 * Created by Marcin Kozaczyk on 2014-12-18.
 */
'use strict';
var gui = require('nw.gui');

var app = angular.module('app', [
]);

app.config(function () {
    console.log("Configuring");
})

    .controller('AppCtrl', function AppCtrl() {

    })

    .controller('SearchCtrl', function SearchCtrl($scope, $http) {

        console.log("Search ctrl");
        console.log(process.env.HOME);

        $scope.query = "FAR";
        $scope.results = [];

        $scope.search = function(){
            console.log('Searching...');
            var txt = encodeURI($scope.query);
            var url = 'https://kerbalstuff.com/api/search/mod?query=' + txt;
            $http.get(url).success(function(data){
                console.log('Success!');
                $scope.results = data;
            }).error(function(data){
                console.log('Error!');
            });
        };
        
        $scope.getCurrentVersion = function(mod) {
            for (var i = 0; i < mod.versions.length; i++) {
                var version = mod.versions[i];
                return version.ksp_version;z
            }
        };

        $scope.openUrl = function(mod) {
            gui.Shell.openExternal('https://kerbalstuff.com' + mod.url);
        };

        $scope.openWebsite = function(mod) {
            gui.Shell.openExternal(mod.website);
        };

        $scope.search();

    })

;