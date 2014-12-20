/**
 * Created by Marcin Kozaczyk on 2014-12-16.
 */
'use strict';
var dateFormat = require('dateformat');
var newWindow = require('../js/NewWindow');
var http = require('https');
var querystring = require('querystring');
var gui = require('nw.gui');
var DBHelper = require('../js/DBHelper');
var path = require('path');

var fileDownloader = require('../js/FileDownloader');

var execPath = path.dirname( process.execPath );
var __dirname = execPath;

$(document).ready(function () {
    var title = document.title;
    //Definition of the function (non-global, because of the previous line)
    function setTitle() {
        var dateString = dateFormat(new Date(), "h:MM:ss");
        document.title = title + " - " + dateString;
    }

    //set an interval
    setInterval(setTitle, 1000);

    // key binding
    document.onkeydown = function (e) {
        /// check ctrl + f key
        if (e.ctrlKey === true && e.keyCode === 112/*F1*/) {
            e.preventDefault();
            console.log('Ctrl + F1');
            newWindow.openNewWindow('editor.html');
            return false;
        }
    }

    // click events
    $("#editor").click(function () {
        var editorWindow = newWindow.openNewWindow('editor.html');
    });
    $("#get").click(function () {
        var options = {
            host: 'kerbalstuff.com',
            port: 443,
            path: '/api/browse/top',
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
                accept: '*/*',
                'Accept-Encoding': ' gzip, deflate, sdch',
                'Accept-Language': ' pl-PL,pl;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2'
            }
        };

        var callback = function (res) {
            // res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function (data) {
                responseString += data;
            });

            res.on('end', function () {
                console.log("Finito!");
                $('#response').html(responseString);
                // console.log(responseString);
//                console.log(responseString);
//                var responseObject = JSON.parse(responseString);
                //success(responseObject);
            });
        };

        // http.request(options, callback).end();
    });

//    $("#search").click(function () {
//        var txt = encodeURI($('#query').val());
//        var url = 'https://kerbalstuff.com/api/search/mod?query=' + txt;
//        console.log('Calling url: ' + url);
//        $.get(url, function (data) {
//            if (data.length > 0) {
//                var con = '';
//                for (var i = 0; i < data.length; i++) {
//                    var mod = data[i];
//                    con += mod.name + '\n';
//                }
//            }
//            $('#resp').text(con);
//        });
//    });

});