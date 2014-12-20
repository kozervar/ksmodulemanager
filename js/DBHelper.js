/**
 * Created by Marcin Kozaczyk on 2014-12-20.
 */
'use strict';

function DBHelper(store) {
    if (!store) {
        throw "DB storage engine not initialized!";
    }
    var storeDB = store;

    this.create = function(name, obj, success, error) {
        storeDB(name).insert(obj, function (err, result) {
            if (!err) {
                success(result);
            } else {
                error(err);
            }
        });
    };
    this.update = function(name, obj, upd, success, error) {
        storeDB(name).update(obj, upd, function (err) {
            if (!err) {
                success();
            } else {
                error(err);
            }
        });
    };
    this.get = function(name, obj, success, error) {
        storeDB(name).find(obj, function (err, result) {
            if (!err) {
                success(result);
            } else {
                error(err);
            }
        });
    };
    this.getAll = function(name) {
        return storeDB(name).find();
    };
    this.remove = function(name, obj, success, error) {
        storeDB(name).remove(obj, function (err) {
            if (!err) {
                success();
            } else {
                error(err);
            }
        });
    };
}

module.exports = DBHelper;