/**
 * Created by Marcin Kozaczyk on 2014-12-20.
 */
'use strict';
angular.module('app.favourite', [
    'app.FileDialogFactory'
])

    .controller('FavouriteCtrl', function FavouriteCtrl($scope, $http, CONST, FileDialog, $timeout) {

        var DBHelper = require('./src/module/DBHelper.module');
        var fileDownloader = require('./src/module/FileDownloader.module');

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
                helper.get('settings', {prop: 'download_dir'}, function (data) {
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
            helper.remove(CONST.COLLECTION.FAVOURITE, { id: mod.id}, function () {
                console.log(mod.name + ' removed from favourites!');
                $scope.refresh();
            }, function (err) {
                console.log(err);
            });
        };

        $scope.changeDownloadDIR = function () {

            var createDownloadDir = function (dir) {
                helper.create(CONST.COLLECTION.SETTINGS, { prop: 'download_dir', value: dir}, function (data) {
                    console.log('Download DIR saved!');
                    $timeout(function () {
                        $scope.downloadDIR = dir;
                    });
                }, function (error) {
                    console.log(error);
                });
            };

            var currDir = process.cwd();
            var options = { workDirectory: (angular.isString($scope.downloadDIR) && $scope.downloadDIR.length > 0 ? $scope.downloadDIR : currDir )};
            FileDialog.openDir(function (downloadDIR) {
                helper.get(CONST.COLLECTION.SETTINGS, {prop: 'download_dir'}, function (data) {
                    console.log('Go', data);
                    if (data.length === 0) { // if settings where cleaned up
                        createDownloadDir(downloadDIR);
                        return;
                    }
                    helper.update(CONST.COLLECTION.SETTINGS, { prop: 'download_dir' }, { '$set': { value: downloadDIR} }, function (data) {
                        console.log('Download DIR updated!');
                        $timeout(function () {
                            $scope.downloadDIR = downloadDIR;
                        });
                    }, function (error) {
                        console.log(error);
                    });

                }, function (error) {
                    createDownloadDir(downloadDIR);
                });
            }, options);
        };

        $scope.download = function (fileName) {
            fileDownloader(fileName, $scope.downloadDIR, function (err, data) {
                if (err)
                    console.error(err);
                console.log('File ' + data.fileName + ' was saved into ' + data.path);
            });
        };

//        helper.remove('settings', { prop: 'download_dir' }, function () {
//        }, function () {
//        });

        // call
        $scope.refresh();
    })

;