/**
 * Created by Marcin Kozaczyk on 2014-12-15.
 */
'use strict';

module.exports.openNewWindow = function(toOpen, options){
    if(toOpen !== undefined) {
        var opt = options;
        if(options === undefined) {
            opt = {
                "position": "center",
                "focus": true,
                "toolbar": false,
                "frame": true,
                "show_in_taskbar" : false
            };
        }
        return window.open(toOpen, opt);
    }
    console.warn('No html file defined to open in new window!');
};