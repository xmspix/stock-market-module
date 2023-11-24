"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.subscribe = exports.chart = exports.news = exports.quoteSummary = void 0;
var api_1 = require("../api");
var xml2json_1 = __importDefault(require("xml2json"));
var protobufjs_1 = __importDefault(require("protobufjs"));
var ws_1 = __importDefault(require("ws"));
var api = (0, api_1.createApiClient)();
;
;
var quoteSummary = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = __assign(__assign({}, options), { modules: options.modules.toString() });
                return [4 /*yield*/, api.quoteSummary(options)];
            case 1:
                data = _a.sent();
                data.quoteSummary.result[0].symbol = options.symbol;
                return [2 /*return*/, data.quoteSummary.result[0]];
        }
    });
}); };
exports.quoteSummary = quoteSummary;
var news = function (symbol) { return __awaiter(void 0, void 0, void 0, function () {
    var n;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.news(symbol)];
            case 1:
                n = _a.sent();
                return [2 /*return*/, JSON.parse(xml2json_1["default"].toJson(n)).rss.channel.item.map(function (e) {
                        var newData = {
                            symbol: symbol,
                            description: e.description,
                            link: e.link,
                            date: Number(new Date(e.pubDate)) / 1000,
                            title: e.title
                        };
                        return newData;
                    })];
        }
    });
}); };
exports.news = news;
var chart = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var data, records, newData, i, tmp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = __assign(__assign({}, options), { from: String(Number(new Date("".concat(options.from, "T16:30:00"))) / 1000), to: String(Number(new Date("".concat(options.to, "T16:30:00"))) / 1000) });
                return [4 /*yield*/, api.chart(options)];
            case 1:
                data = _a.sent();
                if (data.error)
                    return [2 /*return*/, { error: true, message: "".concat(options.symbol, " not found") }];
                else {
                    records = data.chart.result[0].timestamp.length;
                    newData = [];
                    for (i = 0; i < records; i++) {
                        tmp = {
                            symbol: options.symbol.toUpperCase(),
                            open: data.chart.result[0].indicators.quote[0].open[i],
                            high: data.chart.result[0].indicators.quote[0].high[i],
                            low: data.chart.result[0].indicators.quote[0].low[i],
                            close: data.chart.result[0].indicators.quote[0].close[i],
                            adjclose: data.chart.result[0].indicators.adjclose[0].adjclose[i],
                            volume: data.chart.result[0].indicators.quote[0].volume[i],
                            date: data.chart.result[0].timestamp[i]
                        };
                        newData.push(tmp);
                    }
                    return [2 /*return*/, newData];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.chart = chart;
var subscribe = function (symbol, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var socket;
    return __generator(this, function (_a) {
        socket = new ws_1["default"]("wss://streamer.finance.yahoo.com/");
        // When a connection is made
        socket.onopen = function () {
            console.log("Connected to Yahoo finance streamer");
            var json = { subscribe: symbol };
            socket.send(JSON.stringify(json));
        };
        // When data is received
        socket.onmessage = function (event) {
            return protobufjs_1["default"].load(__dirname + "/PricingData.proto", function (err, root) {
                if (err)
                    return { error: true, message: err.message };
                var PricingData = root.lookupType("PricingData");
                var buffer = Buffer.from(event.data, "base64");
                var decode = JSON.parse(JSON.stringify(PricingData.decode(buffer)));
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
        return [2 /*return*/];
    });
}); };
exports.subscribe = subscribe;
