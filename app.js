var fs = require("fs");
var goodGuy = require('good-guy-http')();

var SYMBOL_NAMES_FILE = process.env.STOCK_SYMBOLS || process.argv[2] || "symbols.txt";
var API_URL = process.env.API_URL|| process.argv[3] || "http://ichart.finance.yahoo.com/table.csv?s=";

var stockValuesMap = {};
var errors = {};

function names() {
    fs.readFile(SYMBOL_NAMES_FILE, function(err, contents) {
        if(err) console.log(err);
        contents.toString().split("\n").forEach(function(name) {
            goodGuy(API_URL+name)
                .then(function(data) {
                    var lines = data.body.split("\n");
                    var soughtValue = lines[1].split(",")[1];

                    stockValuesMap[name] = soughtValue;
                })
                .catch(function(err) {
                    errors[name] = err.message;
                })
        })
    });
}

names();