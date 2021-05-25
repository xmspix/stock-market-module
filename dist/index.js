"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nasdaq_1 = require("./util/nasdaq");
const otc_1 = require("./util/otc");
const stockTwits_1 = require("./util/stockTwits");
const yahoo_1 = require("./util/yahoo");
class StockMarketModules {
    nasdaq() {
        return nasdaq_1.nasdaq();
    }
    otc(options) {
        return otc_1.otc(options);
    }
    quoteSummary(options) {
        return yahoo_1.quoteSummary(options);
    }
    news(symbol) {
        return yahoo_1.news(symbol);
    }
    chart(options) {
        return yahoo_1.chart(options);
    }
    earnings() {
        return stockTwits_1.earnings();
    }
    subscribe(symbols, callback) {
        return yahoo_1.subscribe(symbols, callback);
    }
}
exports.default = new StockMarketModules();
