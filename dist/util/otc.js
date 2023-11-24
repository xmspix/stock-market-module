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
exports.otc = void 0;
var csv2json_1 = __importDefault(require("../lib/csv2json"));
var api_1 = require("../api");
;
var api = (0, api_1.createApiClient)();
var otc = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api
                    .otcMarket()
                    .then(function (res) { return res; })
                    .then(function (res) { return csv2json_1["default"].convert(res); })
                    .then(function (res) { return filterStocks(res, options); })
                    .then(function (res) { return getData(res); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.otc = otc;
var filterStocks = function (data, options) {
    data = removeDuplicates(data);
    if (options && options.stocks)
        return data.filter(function (e) { return e.SecType === "Common Stock"; });
    else if (options && options.etf)
        return data.filter(function (e) { return e.SecType === "ETFs"; });
    else
        return data;
};
var removeDuplicates = function (arr) {
    return arr.filter(function (v, i, a) {
        return a.findIndex(function (t) { return t.Symbol === v.Symbol; }) === i;
    });
};
var getData = function (arr) {
    return arr.map(function (e) { return ({
        symbol: e.Symbol,
        name: e.SecurityName,
        close: parseFloat(e.Price),
        changePercent: parseFloat(e["Change%"]),
        volume: parseFloat(e.Vol),
        exchange: e.Tier,
        type: renameType(e.SecType),
        otc: true,
        country: e.Country
    }); });
};
var renameType = function (type) {
    switch (type) {
        case "Common Stock":
            return "stock";
        case "ETFs":
            return "etf";
        default:
            return "other";
    }
};
