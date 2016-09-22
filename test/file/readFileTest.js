const assert = require("assert");
const coMocha = require("co-mocha");
const readFile = require("../../lib/file/readFile")

describe("Read file", function () {
    it("[integration test] should get file content", function *() {
        const read = readFile();

        const result = yield read('./symbols.txt');

        assert.equal(result, 'GOOG\r\nAAPL\r\nORCL\r\nMSFT\r\nINVALID');
    });
});