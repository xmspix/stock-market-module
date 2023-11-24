"use strict";
exports.__esModule = true;
var nasdaq_1 = require("./util/nasdaq");
var otc_1 = require("./util/otc");
var stockTwits_1 = require("./util/stockTwits");
var yahoo_1 = require("./util/yahoo");
var finviz_1 = require("./util/finviz");
var StockMarketModules = /** @class */ (function () {
    function StockMarketModules() {
    }
    StockMarketModules.prototype.nasdaq = function () {
        return (0, nasdaq_1.nasdaq)();
    };
    StockMarketModules.prototype.otc = function (options) {
        return (0, otc_1.otc)(options);
    };
    StockMarketModules.prototype.quoteSummary = function (options) {
        return (0, yahoo_1.quoteSummary)(options);
    };
    StockMarketModules.prototype.news = function (symbol) {
        return (0, yahoo_1.news)(symbol);
    };
    StockMarketModules.prototype.chart = function (options) {
        return (0, yahoo_1.chart)(options);
    };
    StockMarketModules.prototype.earnings = function () {
        return (0, stockTwits_1.earnings)();
    };
    StockMarketModules.prototype.subscribe = function (symbols, callback) {
        return (0, yahoo_1.subscribe)(symbols, callback);
    };
    // Finviz
    StockMarketModules.prototype.finvizScreenerSymbols = function (url) {
        return (0, finviz_1.finvizScreenerSymbols)(url);
    };
    StockMarketModules.prototype.finvizQuote = function (url) {
        return (0, finviz_1.finvizQuote)(url);
    };
    return StockMarketModules;
}());
exports["default"] = new StockMarketModules();
