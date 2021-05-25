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
Object.defineProperty(exports, "__esModule", { value: true });
exports.nasdaq = void 0;
const api_1 = require("../api");
const api = api_1.createApiClient();
const nasdaq = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield api.nasdaqMarket();
    return filter(data.data.rows);
});
exports.nasdaq = nasdaq;
const filter = (data) => {
    return data.map((e) => ({
        symbol: e.symbol,
        name: e.name,
        close: e.lastsale ? +e.lastsale.match(/[\d|,|.|e|E|\+]+/g)[0] : null,
        changeNet: +e.netchange,
        changePercent: e.pctchange
            ? fixChangePercent(+e.netchange, e.pctchange)
            : null,
        volume: +e.volume,
        marketCap: +e.marketCap,
        country: e.country,
        ipoyear: +e.ipoyear,
        industry: e.industry ? e.industry : null,
        sector: e.sector ? e.sector : null,
    }));
};
const fixChangePercent = (changeNet, changePercent) => {
    if (changeNet > 0) {
        return parseFloat("+" + changePercent.match(/[\d|,|.|e|E|\+]+/g)[0]);
    }
    if (changeNet < 0) {
        return parseFloat("-" + changePercent.match(/[\d|,|.|e|E|\+]+/g)[0]);
    }
};
