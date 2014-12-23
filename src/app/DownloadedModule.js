/**
 * Created by Marcin Kozaczyk on 2014-12-20.
 */
'use strict';
angular.module('app.downloaded', [
    'app.FileDialogFactory'
])

    .controller('DownloadedCtrl', function DownloadedCtrl($scope, $http, CONST, FileDialog, $timeout) {

        var gui = require('nw.gui');
        var DBHelper = require(CONST.MODULE_PATH + 'DBHelper.module');
        var fileDownloader = require(CONST.MODULE_PATH + 'FileDownloader.module');

        console.log('Downloaded ctrl');
        var helper = new DBHelper(storedb);

        $scope.results = [];
        $scope.downloadDIR = '';

        $scope.refresh = function () {
            try {
                $scope.results = helper.getAll(CONST.COLLECTION.DOWNLOADED);
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

        $scope.changeDownloadDIR = function () {

            var createDownloadDir = function (dir) {
                helper.create(CONST.COLLECTION.SETTINGS, {prop: 'download_dir', value: dir}, function (data) {
                    console.log('Download DIR saved!');
                    $timeout(function () {
                        $scope.downloadDIR = dir;
                    });
                }, function (error) {
                    console.log(error);
                });
            };

            var currDir = process.cwd();
            var options = {workDirectory: (angular.isString($scope.downloadDIR) && $scope.downloadDIR.length > 0 ? $scope.downloadDIR : currDir )};
            FileDialog.openDir(function (downloadDIR) {
                helper.get(CONST.COLLECTION.SETTINGS, {prop: 'download_dir'}, function (data) {
                    if (data.length === 0) { // if settings where cleaned up
                        createDownloadDir(downloadDIR);
                        return;
                    }
                    helper.update(CONST.COLLECTION.SETTINGS, {prop: 'download_dir'}, {'$set': {value: downloadDIR}}, function (data) {
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

        $scope.removeFromDownloaded = function (mod) {
            var value = confirm('Remove from download list?');
            if (value) {
                var fs = require('fs');
                var path = require('path');
                fs.unlink( path.join(mod.file.path, mod.file.fileName), function(err){
                       if(err) {
                           console.log(err);
                       } else {
                           console.debug('File ' + mod.file.fileName + ' removed.');
                           helper.remove(CONST.COLLECTION.DOWNLOADED, {id: mod.id}, function () {
                               console.log(mod.name + ' removed from downloaded!');
                               $scope.refresh();
                           }, function (err) {
                               console.log(err);
                           });
                       }
                });
            }
        };

        // call
        $scope.refresh();
    })

;