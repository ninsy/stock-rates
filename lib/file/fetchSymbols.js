"use strict";
module.exports = function({readFile, parseSymbols}) {
    return function(fileName) {
        return readFile(fileName)
            .then(parseSymbols)
    }
};