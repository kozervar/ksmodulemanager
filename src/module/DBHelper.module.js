/**
 * Created by Marcin Kozaczyk on 2014-12-20.
 */
'use strict';
//var storeDB = function(collectionName){
//
//    var cache = [], err, ls;
//    if(localStorage[collectionName]){
//        ls = JSON.parse(localStorage[collectionName]);
//    }
//
//    return {
//        insert: function(obj,callback){
//            if(ls){
//                obj._id = new Date().valueOf();
//                for(var i = 0; i < ls.length; i++){
//                    cache.push(ls[i]);
//                }
//                cache.push(obj);
//                localStorage.setItem(collectionName,JSON.stringify(cache));
//                if(callback)
//                    callback(err,obj);
//            } else {
//                obj._id = new Date().valueOf();
//                cache.push(obj);
//                localStorage.setItem(collectionName,JSON.stringify(cache));
//                if(callback)
//                    callback(err,obj);
//            }
//        },
//
//        find: function(obj,callback){
//            var result, i;
//            if(arguments.length === 0){
//                if(ls){
//                    result = [];
//                    for(i = 0; i < ls.length; i++){
//                        cache.push(ls[i]);
//                    }
//                    return cache;
//                }
//            } else {
//                if(ls){
//                    result = [];
//                    for(i = 0; i < ls.length; i++){
//                        cache.push(ls[i]);
//                    }
//                    for(var key in obj){
//                        for(i = 0; i < cache.length; i++){
//                            if(cache[i][key] === obj[key]){
//                                result.push(cache[i]);
//                            }
//                        }
//                    }
//                    if(callback)
//                        callback(err,result);
//                    else
//                        return result;
//                } else {
//                    err = 'collection not exist';
//                    if(callback)
//                        callback(err,result);
//                    else
//                        return result;
//                }
//            }
//        },
//
//        update: function(obj,upsert,callback){
//            var i, newkey;
//            if(ls){
//                for(i = 0; i < ls.length; i++){
//                    cache.push(ls[i]);
//                }
//                for(var key in obj){
//                    for(i = 0; i < cache.length; i++){
//                        if(cache[i][key] === obj[key]){
//                            for(var upsrt in upsert){
//                                switch(upsrt){
//                                    case '$inc':
//                                        for(newkey in upsert[upsrt]){
//                                            cache[i][newkey] = cache[i][newkey] + upsert[upsrt][newkey];
//                                        }
//                                        break;
//
//                                    case '$set':
//                                        for(newkey in upsert[upsrt]){
//                                            cache[i][newkey] = upsert[upsrt][newkey];
//                                        }
//                                        break;
//
//                                    case '$push':
//                                        for(newkey in upsert[upsrt]){
//                                            cache[i][newkey].push(upsert[upsrt][newkey]);
//                                        }
//                                        break;
//
//                                    default:
//                                        err = 'unknown upsert';
//
//                                }
//                            }
//
//                            if(err === 'unknown upsert') {
//                                cache[i] = upsert;
//                            }
//                        }
//                    }
//                }
//                localStorage.setItem(collectionName,JSON.stringify(cache));
//                if(callback)
//                    callback(err);
//
//            } else {
//                err = 'collection not exist';
//                if(callback)
//                    callback(err);
//            }
//        },
//
//        remove: function(obj,callback){
//            var i;
//            if(arguments.length === 0){
//                localStorage.removeItem(collectionName);
//            } else {
//                if(ls){
//                    for(i = 0; i < ls.length; i++){
//                        cache.push(ls[i]);
//                    }
//                    for(var key in obj){
//                        for(i = 0; i < cache.length; i++){
//                            if(cache[i][key] === obj[key]){
//                                cache.splice(i,1);
//                            }
//                        }
//                    }
//                    localStorage.setItem(collectionName,JSON.stringify(cache));
//                    if(callback)
//                        callback(err);
//                } else {
//                    err = 'collection not exist';
//                    if(callback)
//                        callback(err);
//                }
//            }
//        }
//
//    };
//};

function DBHelper(store) {

    if (!store) {
        throw 'DB storage engine not initialized!';
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