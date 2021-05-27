"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = exports.chart = exports.news = exports.quoteSummary = void 0;
const api_1 = require("../api");
const xml2json_1 = __importDefault(require("xml2json"));
const protobufjs_1 = __importDefault(require("protobufjs"));
const ws_1 = __importDefault(require("ws"));
const api = api_1.createApiClient();
const quoteSummary = (options) => __awaiter(void 0, void 0, void 0, function* () {
    options = Object.assign(Object.assign({}, options), { modules: options.modules.toString() });
    const data = yield api.quoteSummary(options);
    data.quoteSummary.result[0].symbol = options.symbol;
    return data.quoteSummary.result[0];
});
exports.quoteSummary = quoteSummary;
const news = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    const n = yield api.news(symbol);
    return JSON.parse(xml2json_1.default.toJson(n)).rss.channel.item.map((e) => {
        const newData = {
            symbol: symbol,
            description: e.description,
            link: e.link,
            date: Number(new Date(e.pubDate)) / 1000,
            title: e.title,
        };
        return newData;
    });
});
exports.news = news;
const chart = (options) => __awaiter(void 0, void 0, void 0, function* () {
    options = Object.assign(Object.assign({}, options), { from: String(Number(new Date(`${options.from}T16:30:00`)) / 1000), to: String(Number(new Date(`${options.to}T16:30:00`)) / 1000) });
    const data = yield api.chart(options);
    if (data.error)
        return { error: true, message: `${options.symbol} not found` };
    else {
        const records = data.chart.result[0].timestamp.length;
        const newData = [];
        for (let i = 0; i < records; i++) {
            let tmp = {
                symbol: options.symbol.toUpperCase(),
                open: data.chart.result[0].indicators.quote[0].open[i],
                high: data.chart.result[0].indicators.quote[0].high[i],
                low: data.chart.result[0].indicators.quote[0].low[i],
                close: data.chart.result[0].indicators.quote[0].close[i],
                adjclose: data.chart.result[0].indicators.adjclose[0].adjclose[i],
                volume: data.chart.result[0].indicators.quote[0].volume[i],
                date: data.chart.result[0].timestamp[i],
            };
            newData.push(tmp);
        }
        return newData;
    }
});
exports.chart = chart;
const subscribe = (symbol, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const socket = new ws_1.default(`wss://streamer.finance.yahoo.com/`);
    // When a connection is made
    socket.onopen = function () {
        console.log("Connected to Yahoo finance streamer");
        const json = { subscribe: symbol };
        socket.send(JSON.stringify(json));
    };
    // When data is received
    socket.onmessage = function (event) {
        return protobufjs_1.default.load(__dirname + "/PricingData.proto", (err, root) => {
            if (err)
                return { error: true, message: err.message };
            const PricingData = root.lookupType("PricingData");
            const buffer = Buffer.from(event.data, "base64");
            const decode = JSON.parse(JSON.stringify(PricingData.decode(buffer)));
            // const data = {
            //   symbol: decode.id,
            //   price: <number>decode.price,
            //   change: <number>decode.change,
            //   changePercent: <number>decode.changePercent,
            //   volume: <number>decode.dayVolume,
            // };
            callback(decode);
        });
    };
    // When connection could not be made
    socket.onerror = function (error) {
        return { error: true, message: error.message };
    };
    // When connection was closed
    socket.onclose = function (error) {
        return { error: true, message: error.message };
    };
});
exports.subscribe = subscribe;
