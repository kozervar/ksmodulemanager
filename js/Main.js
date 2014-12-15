/**
 * Created by Marcin Kozaczyk on 2014-12-15.
 */
'use strict';

var fs = require('fs');
var spawn = require('child_process').spawn;
var dateFormat = require('dateformat');

var newWindow = require('../js/NewWindow');
//var child = spawn('java', ['-jar', 'gradle-test-project-1.0.jar', 'JABADABADUU']);
//console.log('Spawned child pid: ' + child.pid);
//
//fs.readFile('./package.json', 'utf-8', function (error, contents) {
//    document.write(contents);
//});

$(document).ready(function () {
    var title = document.title;
    //Definition of the function (non-global, because of the previous line)
    function setTitle() {
        var dateString = dateFormat(new Date(), "h:MM:ss");
        document.title = title + " - " + dateString;
    }

    //set an interval
    setInterval(setTitle, 1000);

    // prepare ace9 editor
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

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
});

