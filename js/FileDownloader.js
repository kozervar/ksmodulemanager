/**
 * Created by Marcin Kozaczyk on 2014-12-21.
 */
// based on https://gist.github.com/alanhoff/fe17f8cbc1888110ba33
var request = require('request');
var fs = require('fs');
var Puid = require('puid');
var path = require('path');
var Promise = require('bluebird');

var download = function(download_url, download_dir, callback){
    var p = new Promise(function(resolve, reject){
        var id = new Puid().generate();
        var dest = path.join(download_dir, id);
        var writeStream = fs.createWriteStream(dest);
        var finalName = id;

        writeStream.on('finish', function(){
            var finalDest = path.join(download_dir, finalName);
            console.log('File downloaded to: ' + finalDest);
            fs.renameSync(dest, finalDest);
            resolve({ fileName : finalName, path : download_dir});
        });

        // Capture write stream errors
        writeStream.on('error', function(err){
            fs.unlink(dest, reject.bind(null, err));
        });

        var readStream = request.get(download_url);

        // Capture request stream error
        readStream.on('error', function(err){
            fs.unlink(dest, reject.bind(null, err));
        });

        readStream.on('response', function(res){
            try {
                var fileName = res.headers['content-disposition'].split(';')[1].split('=')[1];
                console.log('Downloading file: ' + fileName);
                finalName = fileName;
            } catch(err) {
                console.log(err);
            }
        });

        // Pipe read with write
        readStream.pipe(writeStream);
    });

    // Compatible callback
    if(!callback)
        return p;

    p.then(function(id){
        callback(null, id);
    }).catch(function(err){
        callback(err);
    });
};

module.exports = download;