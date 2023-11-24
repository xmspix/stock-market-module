import { nasdaq } from "./util/nasdaq";
import { otc, Iotc } from "./util/otc";
import { earnings } from "./util/stockTwits";
import { quoteSummary, news, chart, subscribe, Isummery, Ichart } from "./util/yahoo";
import { finvizScreenerSymbols, finvizQuote } from './util/finviz';

class StockMarketModules {
  nasdaq() {
    return nasdaq();
  }
  otc(options: Iotc) {
    return otc(options);
  }
  quoteSummary(options: Isummery) {
    return quoteSummary(options);
  }
  news(symbol: string) {
    return news(symbol);
  }
  chart(options: Ichart) {
    return chart(options);
  }
  earnings() {
    return earnings();
  }
  subscribe(symbols: string[], callback: any) {
    return subscribe(symbols, callback);
  }
  // Finviz
  finvizScreenerSymbols(url: string) {
    return finvizScreenerSymbols(url);
  }
  finvizQuote(url: string) {
    return finvizQuote(url);
  }
}

export default new StockMarketModules();
