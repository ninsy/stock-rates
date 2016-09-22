"use strict";
const stockfetch =  require("../lib/stockfetch");
const coMocha = require("co-mocha");
const assert = require("assert");

describe("stockfetch e2e", function() {
    it("happy path", function *() {

        // Given

        // ctrl+w / ctrl+shift+w = increment

        let expectedAssertionCount = 0;

        const fetchSymbols = function(fileName) {
            // promise.resolve - wywolywana funkcja jest asynchroniczna
            expectedAssertionCount++;
            assert.equal(fileName, "someFile");
            return Promise.resolve(['A', 'B']);
        };

        const fetchPrices = function(symbols) {
            expectedAssertionCount++;
            assert.deepEqual(symbols, ['A', 'B']);
            return Promise.resolve([['A', 10], ['B', 20]]);
        };

        const prepareReport = function(symbolsAndPrices) {
            expectedAssertionCount++;
            assert.deepEqual(symbolsAndPrices,[['A', 10], ['B', 20]] );
            return 'report';
        };

        // join lines, inline refactor

        // >= 2 args - use object
        const fetch = stockfetch({ fetchSymbols, fetchPrices, prepareReport });

        // when
        const report = yield fetch("someFile");
        // then
        assert.equal(report, 'report');
        expectedAssertionCount++;
        assert.equal(expectedAssertionCount, 4, "Expected number of assertions");
    })
});