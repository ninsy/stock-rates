const stockfetch =  require("../lib/stockfetch");

describe("stockfetch e2e", function() {
    it("happy path", function (done) {

        // Given
        const fetchSymbols = function(fileName) {
            // promise.resolve - wywolywana funkcja jest asynchroniczna
            return Promise.resolve(['A', 'G', "M"]);
        };

        const fetchPrices = function(symbols) {
            return Promise.resolve([['A', 10], ['G', 20]]);
        };

        const prepareReport = function(symbolsAndPrices) {
            return 'Report';
        };

        const fetch = stockfetch(fetchSymbols, fetchPrices, prepareReport);

        // when
        const reportPromise = fetch("someFile");

        // then
        reportPromise
            .then(function(result) {
                done();
            })

    })
});