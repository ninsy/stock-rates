"use strict";
const stockfetch =  require("../lib/stockfetch");
const assert = require("assert");

describe("stockfetch e2e", function() {
    it("happy path", function (done) {

        // Given

        var expectedAssertionCount = 0;

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

        const fetch = stockfetch(fetchSymbols, fetchPrices, prepareReport);

        // when
        const reportPromise = fetch("someFile");

        // then
        reportPromise
            .then(function(report) {
                assert.equal(report, 'report');
                expectedAssertionCount++;
                assert.equal(expectedAssertionCount, 4, "Expected number of assertions");
                done();
            })
            .catch(done)

    })
});