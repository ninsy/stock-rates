"use strict";
const symbolFetch = require("../../lib/file/fetchSymbols");
const assert = require("assert");
const td = require("testdouble");

describe("fetchSymbolsTest", function() {

    it("[mock library] reads file and parses symbols", function *() {
        const readFile = td.function('readFile');
        td.when(readFile('someFile')).thenReturn(Promise.resolve("A B"));

        const parseSymbols = td.function('parseSymbols');
        td.when(parseSymbols("A B")).thenReturn(['A', 'B']);

        const fetch = symbolFetch({readFile, parseSymbols});
        const symbols = yield fetch("someFile");

        td.verify(readFile("someFile"));
        td.verify(parseSymbols("A B"));
        assert.deepEqual(symbols, ['A', 'B']);
    });

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