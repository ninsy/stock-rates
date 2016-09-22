"use strict";

const assert = require("assert");
const coMocha = require("co-mocha");
const readFile = require("../../lib/file/readFile");
const td = require("testdouble");

describe("Read file", function () {
    it("[integration test] should get file content", function *() {
        const fs = require("fs");

        const read = readFile({fs});

        const result = yield read('./symbols.txt');

        assert.equal(result, 'GOOG\r\nAAPL\r\nORCL\r\nMSFT\r\nINVALID');
    });

    it("[unit test] should get file content", function *() {
        const fs = {
            readFile(fileName, encoding, callback) {
                assert.equal(encoding, "utf-8");
                assert.equal(fileName, "./symbols.txt");
                callback(null, "content");
            }
        };
        const read = readFile({fs});

        const result = yield read("./symbols.txt");

        assert.equal(result, "content");
    });

    it("[unit test] should fail on non-existent file", function *() {
        const fs = {
            readFile(fileName, encoding, callback) {
                assert.equal(encoding, "utf-8");
                assert.equal(fileName, "./symbols-invalid.txt");
                callback(`Cannot read file ${fileName}`, null);
            }
        };
        const read = readFile({fs});

        try {
            yield read("./symbols-invalid.txt");
            throw "Should never get here";
        } catch (e) {
            assert.equal(e, "Cannot read file ./symbols-invalid.txt");
        }
    });


    it("[unit test with mock lib] should fail on non-existent file", function *() {
        const fs = td.object();

        td.when(fs.readFile("./symbols-invalid.txt", "utf-8")).thenCallback("Cannot read file ./symbols-invalid.txt",null);

        const read = readFile({fs});
        try {
            yield read("./symbols-invalid.txt");
            throw "Should never get here";
        } catch(e) {
            assert.equal(e,"Cannot read file ./symbols-invalid.txt" );
        }

    });

    it("[unit test with mock lib] should get file content", function *() {
        const fs = td.object();

        td.when(fs.readFile("./symbols.txt", "utf-8")).thenCallback(null, "content");

        const read = readFile({fs});

        const result = yield read("./symbols.txt");

        assert.equal(result, "content");
    });


    it("[integration test] should fail on non existent file read", function *() {
        const fs = require("fs");

        const read = readFile({fs});
        try {
            yield read("./symbols_invalid.txt");
            throw "Should never get here";
        } catch(e) {
            assert.equal(e,"Cannot read file ./symbols_invalid.txt");
        }
    });
});