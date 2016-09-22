/**
 * Created by wojcieck on 2016-09-22.
 */
module.exports = function(fetchSymbols, fetchPrices, prepareReport) {
    return function(fileName) {
        return fetchSymbols(fileName)
            .then(fetchPrices)
            .then(prepareReport);
    }
};
