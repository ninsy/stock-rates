"use strict";
module.exports = function(fileContent) {

    return fileContent
        .split('\r\n')
        .filter(function(item) {
            return item.length > 0 && item.length === item.trim().length;
        });
};