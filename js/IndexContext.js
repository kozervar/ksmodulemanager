/**
 * Created by Marcin Kozaczyk on 2014-12-16.
 */
'use strict';
var dateFormat = require('dateformat');
var newWindow = require('../js/NewWindow');

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
    $( "#editor" ).click(function() {
        var editorWindow = newWindow.openNewWindow('editor.html');
    });
});