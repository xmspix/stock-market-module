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
exports.otc = void 0;
const csv2json_1 = __importDefault(require("../lib/csv2json"));
const api_1 = require("../api");
const api = api_1.createApiClient();
const otc = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return yield api
        .otcMarket()
        .then((res) => res)
        .then((res) => csv2json_1.default.convert(res))
        .then((res) => filterStocks(res, options))
        .then((res) => getData(res));
});
exports.otc = otc;
const filterStocks = (data, options) => {
    console.log(options);
    data = removeDuplicates(data);
    if (options && options.stocks)
        return data.filter((e) => e.SecType === "Common Stock");
    else if (options && options.etf)
        return data.filter((e) => e.SecType === "ETFs");
    else
        return data;
};
const removeDuplicates = (arr) => arr.filter((v, i, a) => a.findIndex((t) => t.Symbol === v.Symbol) === i);
const getData = (arr) => {
    return arr.map((e) => ({
        symbol: e.Symbol,
        name: e.SecurityName,
        close: parseFloat(e.Price),
        changePercent: parseFloat(e["Change%"]),
        volume: parseFloat(e.Vol),
        exchange: e.Tier,
        type: renameType(e.SecType),
        otc: true,
        country: e.Country,
    }));
};
const renameType = (type) => {
    switch (type) {
        case "Common Stock":
            return "stock";
        case "ETFs":
            return "etf";
        default:
            return "other";
    }
};
