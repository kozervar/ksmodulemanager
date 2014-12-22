/**
 * Created by Marcin Kozaczyk on 2014-12-21.
 */
'use strict';
var dateFormat = require('dateformat');

$(document).ready(function () {
    var title = document.title;
    //Definition of the function (non-global, because of the previous line)
    function setTitle() {
        var dateString = dateFormat(new Date(), 'h:MM:ss');
        document.title = title + ' - ' + dateString;
    }

    //set an interval
    setInterval(setTitle, 1000);
});