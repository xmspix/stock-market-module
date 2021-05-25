"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
const createApiClient = () => {
    return {
        nasdaqMarket: () => axios_1.default
            .get("https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=0&offset=0&download=true")
            .then((res) => res.data)
            .catch((error) => ({ error: true, message: error.message })),
        otcMarket: () => axios_1.default
            .get("https://www.otcmarkets.com/research/stock-screener/api/downloadCSV")
            .then((res) => res.data)
            .catch((error) => ({ error: true, message: error.message })),
        quoteSummary: (options) => axios_1.default
            .get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${options.symbol}?modules=${options.modules}`)
            .then((res) => res.data)
            .catch((error) => ({ error: true, message: error.message })),
        news: (symbol) => axios_1.default
            .get(`https://feeds.finance.yahoo.com/rss/2.0/headline?s=${symbol}&region=US&lang=en-US`)
            .then((res) => res.data)
            .catch((error) => ({ error: true, message: error.message })),
        chart: (options) => axios_1.default
            .get(`http://query1.finance.yahoo.com/v7/finance/chart/${options.symbol}?period1=${options.from}&period2=${options.to}&interval=1d&events=history`)
            .then((res) => res.data)
            .catch((error) => ({ error: true, message: error.message })),
        earnings: () => axios_1.default
            .get(`http://api.stocktwits.com/api/2/discover/earnings_calendar`)
            .then((res) => res.data)
            .catch((error) => console.log(error)),
    };
};
exports.createApiClient = createApiClient;
