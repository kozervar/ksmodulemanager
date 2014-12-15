/**
 * Created by Marcin Kozaczyk on 2014-12-16.
 */
'use strict';

$(document).ready(function () {

    // prepare ace9 editor
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");


    // key binding
    document.onkeydown = function (e) {
        /// check ctrl + f key
        if (e.ctrlKey === true && e.keyCode === 81/*q*/) {
            e.preventDefault();
            console.log('Ctrl + Q');
            window.close();
            return false;
        }
    }
});