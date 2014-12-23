/**
 * Created by Marcin Kozaczyk on 2014-12-20.
 */
'use strict';
angular.module('app.favourite', [
    'app.FileDialogFactory'
])

    .controller('FavouriteCtrl', function FavouriteCtrl($scope, $http, CONST, FileDialog, $timeout) {

        var gui = require('nw.gui');
        var DBHelper = require(CONST.MODULE_PATH + 'DBHelper.module');
        var fileDownloader = require(CONST.MODULE_PATH + 'FileDownloader.module');

        console.log('Favourite ctrl');
        var helper = new DBHelper(storedb);

        $scope.results = [];
        $scope.downloadDIR = '';

        $scope.refresh = function () {
            try {
                $scope.results = helper.getAll(CONST.COLLECTION.FAVOURITE);
            }
            catch (err) {
                if (err === 'collection not exist') {
                    $scope.results = [];
                }
                else
                    console.log(err);
            }
            try {
                helper.get(CONST.COLLECTION.SETTINGS, {prop: 'download_dir'}, function (data) {
                    $scope.downloadDIR = data[0].value;
                }, function (err) {
                    console.log(err);
                });
            }
            catch (err) {
                console.log(err);
            }
        };


        $scope.removeFromFavourites = function (mod) {
            var value = confirm('Remove from favourites?');
            if (value) {
                helper.remove(CONST.COLLECTION.FAVOURITE, {id: mod.id}, function () {
                    console.log(mod.name + ' removed from favourites!');
                    $scope.refresh();
                }, function (err) {
                    console.log(err);
                });
            }
        };

        $scope.download = function (mod, fileName) {
            fileDownloader(fileName, $scope.downloadDIR, function (err, data) {
                if (err)
                    console.error(err);
                console.log('File ' + data.fileName + ' was saved into ' + data.path);
                mod.file = data;

                helper.get(CONST.COLLECTION.DOWNLOADED, {id: mod.id}, function (data) {
                    if (data.length > 0) {
                        // update existing download
                        helper.update(CONST.COLLECTION.DOWNLOADED, {_id: mod._id}, {'$set': mod}, function (data) {
                            console.log('Mod [' + mod.name + '] in download list updated!');
                        }, function (error) {
                            console.log(error);
                        });
                    } else {
                        // create new download
                        helper.create(CONST.COLLECTION.DOWNLOADED, mod, function (data) {
                            console.log('Mod [' + mod.name + '] added to downloaded!');
                        }, function (error) {
                            console.log(error);
                        });
                    }

                }, function (err) {
                    if (err === 'collection not exist') {
                        // Create first download3
                        helper.create(CONST.COLLECTION.DOWNLOADED, mod, function (data) {
                            console.log('Mod [' + mod.name + '] added to downloaded!');
                        }, function (error) {
                            console.log(error);
                        });
                    } else {
                        console.log(err);
                    }
                });

            });
        };

        $scope.openUrl = function (mod) {
            gui.Shell.openExternal(CONST.KS_URL + mod.url);
        };

        $scope.openWebsite = function (mod) {
            gui.Shell.openExternal(mod.website);
        };

        // call
        $scope.refresh();
    })

;