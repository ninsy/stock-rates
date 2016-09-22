"use strict";
const fs = require("fs");

module.exports = function() {
    return function(fileName) {
        return new Promise(function(resolve, reject) {
            fs.readFile(fileName, 'utf-8', (err, data) => {
                if(err) reject(err);
                else resolve(data);
            });
        });
    }
};