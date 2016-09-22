"use strict";
module.exports = function({fs}) {
    return function(fileName) {
        return new Promise(function(resolve, reject) {
            fs.readFile(fileName, 'utf-8', (err, data) => {
                if(err) reject(`Cannot read file ${fileName}`);
                else resolve(data);
            });
        });
    }
};