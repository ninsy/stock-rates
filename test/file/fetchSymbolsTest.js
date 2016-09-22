"use strict";
const symbolFetch = require("../../lib/file/fetchSymbols");
const assert = require("assert");

describe("fetchSymbolsTest", function() {
    it("shouldFetchSymbols", function(done) {

        let expectedAssertCount = 0;

        //given

        const readFile = function(fileName) {
            expectedAssertCount++;
            assert.equal(fileName, "someFile");
            return Promise.resolve("A B")
        };

        const parseSymbols = function(fileContens) {
            expectedAssertCount++;
            assert.equal(fileContens, "A B");
            return ['A', 'B'];
        };

        const fetch = symbolFetch({readFile, parseSymbols});

        const fetchSymbols = fetch("someFile");

        fetchSymbols
            .then(function(parsedSymbols) {
                assert.deepEqual(parsedSymbols, ['A', 'B']);
                expectedAssertCount++;
                assert.equal(expectedAssertCount, 3, "Expected number of assertions");
                done();
            });
    });
});