"use strict";

const parseSymbols = require("../../lib/file/parseSymbols");
const assert = require("assert");
const coMocha = require("co-mocha");

describe("parseSymbolsTest", function() {
   it("[unit test] should parse properly on happy case", function*() {

       const symbols = parseSymbols("GOOG\r\nAAPL");
       assert.deepEqual(symbols, ['GOOG','AAPL']);
   });
    it("[unit test] should return empty array on empty contents", function*() {

        const symbols = parseSymbols("");
        assert.deepEqual(symbols, []);
    });
    it("[unit test] should return empty array on only-spaces contents", function*() {

        const symbols = parseSymbols("    ");
        assert.deepEqual(symbols, []);
    });
    it("[unit test] should erase elems with spaces", function*() {

        const symbols = parseSymbols("AAPL    \r\nGOOG\r\n\r\n   ");
        assert.deepEqual(symbols, ['GOOG']);
    });
});