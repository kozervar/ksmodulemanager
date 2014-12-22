/**
 * Created by Marcin Kozaczyk on 2014-12-21.
 */
/* globals APP_PACKAGE_INFO */
'use strict';
var dateFormat = require('dateformat');

$(document).ready(function () {
    var title = document.title;
    //Definition of the function (non-global, because of the previous line)
    function setTitle() {
        var dateString = dateFormat(new Date(), 'HH:MM:ss');
        document.title = title + ' - ' + APP_PACKAGE_INFO.version;
    }

    //set an interval
    setInterval(setTitle, 1000);
});