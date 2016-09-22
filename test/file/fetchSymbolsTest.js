"use strict";
const symbolFetch = require("../../lib/file/fetchSymbols");
const coMocha = require("co-mocha");
const assert = require("assert");

describe("fetchSymbolsTest", function() {
    it("shouldFetchSymbols", function *() {

        // given
        let expectedAssertCount = 0;

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


        // when
        const symbols = yield fetch("someFile");
        // then
        expectedAssertCount++;
        assert.deepEqual(symbols, ['A', 'B']);
        assert.equal(expectedAssertCount, 3, "Expected number of assertions");

        // fetch
        //     .then(function(parsedSymbols) {
        //         assert.deepEqual(parsedSymbols, ['A', 'B']);
        //         expectedAssertCount++;
        //         assert.equal(expectedAssertCount, 3, "Expected number of assertions");
        //         done();
        //     });
    });
});