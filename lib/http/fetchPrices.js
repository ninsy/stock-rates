/**
 * Created by wojcieck on 2016-09-22.
 */
"use strict";
const zip = require("lodash.zip");

module.exports = function({getAllPrices, parseCurrentPrice}) {
    return function(symbols) {
        return getAllPrices(symbols)
            .then(parseCurrentPrice)
            .then(function(prices) {
                return zip(symbols,prices );
            })
    }};