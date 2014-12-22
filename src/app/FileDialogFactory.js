/**
 * Created by Marcin Kozaczyk on 2014-12-20.
 */
'use strict';

angular.module('app.FileDialogFactory', [])
    .factory('FileDialog', [function () {
        var callDialog = function (dialog, callback) {
            dialog.addEventListener('change', function () {
                var result = dialog.value;
                callback(result);
            }, false);
            dialog.click();
        };

        var dialogs = {};

        dialogs.saveAs = function (callback, options) {
            if (!angular.isObject(options))
                options = {};
            var acceptTypes = options.acceptTypes;
            var defaultFilename = options.defaultFilename;
            var workDir = options.workDirectory;

            var dialog = document.createElement('input');
            dialog.type = 'file';
            dialog.nwsaveas = defaultFilename || '';
            if (angular.isArray(acceptTypes)) {
                dialog.accept = acceptTypes.join(',');
            } else if (angular.isString(acceptTypes)) {
                dialog.accept = acceptTypes;
            }
            if (angular.isString(workDir)) {
                dialog.nwworkingdir = workDir;
            }
            callDialog(dialog, callback);
        };

        dialogs.openFile = function (callback, options) {
            if (!angular.isObject(options))
                options = {};
            var multiple = options.multiple;
            var acceptTypes = options.acceptTypes;
            var workDir = options.workDirectory;

            var dialog = document.createElement('input');
            dialog.type = 'file';
            if (multiple === true) {
                dialog.multiple = 'multiple';
            }
            if (angular.isArray(acceptTypes)) {
                dialog.accept = acceptTypes.join(',');
            } else if (angular.isString(acceptTypes)) {
                dialog.accept = acceptTypes;
            }
            if (angular.isString(workDir)) {
                dialog.nwworkingdir = workDir;
            }
            callDialog(dialog, callback);
        };

        dialogs.openDir = function (callback, options) {
            if (!angular.isObject(options))
                options = {};
            var workDir = options.workDirectory;

            var dialog = document.createElement('input');
            dialog.type = 'file';
            dialog.nwdirectory = 'nwdirectory';

            if (angular.isString(workDir)) {
                dialog.nwworkingdir = workDir;
            }

            callDialog(dialog, callback);
        };

        return dialogs;
    }]);