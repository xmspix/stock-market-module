import axios from "axios";
import { Ichart, Isummery } from "./util/yahoo";

export type ApiClient = {
  nasdaqMarket: () => Promise<any>;
  otcMarket: () => Promise<any>;
  quoteSummary: (options: Isummery) => Promise<any>;
  news: (symbol: string) => Promise<any>;
  chart: (options: Ichart) => Promise<any>;
  earnings: () => Promise<any>;
  finvizScreenerSymbols: (url: string) => Promise<any>;
  finvizQuote: (url: string) => Promise<any>;
};

export const createApiClient = (): ApiClient => {
  return {
    nasdaqMarket: async () => {
      try {
        const res = await axios
          .get(
            "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=0&offset=0&download=true"
          );
        return res.data;
      } catch (error) {
        return ({ error: true, message: error.message });
      }
    },

    otcMarket: async () => {
      try {
        const res = await axios
          .get(
            "https://www.otcmarkets.com/research/stock-screener/api/downloadCSV"
          );
        return res.data;
      } catch (error) {
        return ({ error: true, message: error.message });
      }
    },

    quoteSummary: async ({ symbol, modules }: Isummery) => {
      try {
        const res = await axios
          .get(
            `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=${modules}`
          );
        return res.data;
      } catch (error) {
        return ({ error: true, message: error.message });
      }
    },

    news: async (symbol: string) => {
      try {
        const res = await axios
          .get(
            `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${symbol}&region=US&lang=en-US`
          );
        return res.data;
      } catch (error) {
        return ({ error: true, message: error.message });
      }
    },

    chart: async ({ symbol, from, to, interval }: Ichart) => {
      try {
        const res = await axios
          .get(
            `http://query1.finance.yahoo.com/v7/finance/chart/${symbol}?period1=${from}&period2=${to}&interval=${interval}&events=history`
          );
        return res.data;
      } catch (error) {
        return ({ error: true, message: error.message });
      }
    },

    earnings: async () => {
      try {
        const res = await axios
          .get(`http://api.stocktwits.com/api/2/discover/earnings_calendar`);
        return res.data;
      } catch (error) {
        return ({ error: true, message: error.message });
      }
    },

    finvizScreenerSymbols: async (url: string) => {
      try {
        const res = await axios
          .get(url);
        return res.data;
      } catch (error) {
        return ({ error: true, message: error.message });
      }
    },

    finvizQuote: async (symbol: string) => {
      try {
        const res = await axios
          .get(`https://finviz.com/quote.ashx?t=${symbol}`);
        return res.data;
      } catch (error) {
        return ({ error: true, message: error.message });
      }
    }
  };
};
