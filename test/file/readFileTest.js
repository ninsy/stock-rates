const assert = require("assert");
const coMocha = require("co-mocha");
const fs = require("fs");
const readFile = require("../../lib/file/readFile");
"use strict";
describe("Read file", function () {
    it("[integration test] should get file content", function *() {
        const read = readFile({fs});

        const result = yield read('./symbols.txt');

        assert.equal(result, 'GOOG\r\nAAPL\r\nORCL\r\nMSFT\r\nINVALID');
    });

    
    it("[integration test] should fail on non existent file read", function *() {
        const read = readFile({fs});
        try {
            yield read("./symbols_invalid.txt");
            throw "Should never get here";
        } catch(e) {
            assert.equal(e,"Cannot read file ./symbols_invalid.txt");
        }
    });
});