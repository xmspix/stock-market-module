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
exports.createApiClient = void 0;
var axios_1 = __importDefault(require("axios"));
var createApiClient = function () {
    return {
        nasdaqMarket: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=0&offset=0&download=true")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, ({ error: true, message: error_1.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        otcMarket: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://www.otcmarkets.com/research/stock-screener/api/downloadCSV")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, ({ error: true, message: error_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        quoteSummary: function (_a) {
            var symbol = _a.symbol, modules = _a.modules;
            return __awaiter(void 0, void 0, void 0, function () {
                var res, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1["default"]
                                    .get("https://query1.finance.yahoo.com/v10/finance/quoteSummary/".concat(symbol, "?modules=").concat(modules))];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res.data];
                        case 2:
                            error_3 = _b.sent();
                            return [2 /*return*/, ({ error: true, message: error_3.message })];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        news: function (symbol) { return __awaiter(void 0, void 0, void 0, function () {
            var res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://feeds.finance.yahoo.com/rss/2.0/headline?s=".concat(symbol, "&region=US&lang=en-US"))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, ({ error: true, message: error_4.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        chart: function (_a) {
            var symbol = _a.symbol, from = _a.from, to = _a.to, interval = _a.interval;
            return __awaiter(void 0, void 0, void 0, function () {
                var res, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1["default"]
                                    .get("http://query1.finance.yahoo.com/v7/finance/chart/".concat(symbol, "?period1=").concat(from, "&period2=").concat(to, "&interval=").concat(interval, "&events=history"))];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res.data];
                        case 2:
                            error_5 = _b.sent();
                            return [2 /*return*/, ({ error: true, message: error_5.message })];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        earnings: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]
                                .get("http://api.stocktwits.com/api/2/discover/earnings_calendar")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, ({ error: true, message: error_6.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        finvizScreenerSymbols: function (url) { return __awaiter(void 0, void 0, void 0, function () {
            var res, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]
                                .get(url)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, ({ error: true, message: error_7.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        finvizQuote: function (symbol) { return __awaiter(void 0, void 0, void 0, function () {
            var res, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://finviz.com/quote.ashx?t=".concat(symbol))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, ({ error: true, message: error_8.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); }
    };
};
exports.createApiClient = createApiClient;
