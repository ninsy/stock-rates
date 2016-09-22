"use strict";
const fetchPrices = require("../../lib/http/fetchPrices");
const assert = require("assert");
const coMocha = require("co-mocha");

describe("fetchPrices test", function () {
   it("should fetch prices", function *() {

       let assertCallCount = 0;

       const getAllPrices = function(symbols) {
           assertCallCount++;
           assert.deepEqual(symbols, ['A','B']);
           return Promise.resolve(['r1', 'r2']);
       };

       const parseCurrentPrice = function(responseArray) {
           assertCallCount++;
           assert.deepEqual(responseArray, ['r1', 'r2']);
           return [10, 20];
       };

       const prices = fetchPrices({getAllPrices, parseCurrentPrice});

       const mappedStocks = yield prices(['A','B']);

       assertCallCount++;
       assert.deepEqual(mappedStocks,[['A', 10],['B', 20]]);
       assert.equal(assertCallCount, 3, "Expected number of assertions");

   });
});
