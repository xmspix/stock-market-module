import axios from "axios";
import { Tsummery } from "./types";

export type ApiClient = {
  nasdaqMarket: () => Promise<any>;
  otcMarket: () => Promise<any>;
  quoteSummary: (options: Tsummery) => Promise<any>;
};

export const createApiClient = (): ApiClient => {
  return {
    nasdaqMarket: () =>
      axios
        .get(
          "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=0&offset=0&download=true"
        )
        .then((res) => res.data)
        .catch((error) => ({ error: true, message: error.message })),

    otcMarket: () =>
      axios
        .get(
          "https://www.otcmarkets.com/research/stock-screener/api/downloadCSV"
        )
        .then((res) => res.data)
        .catch((error) => ({ error: true, message: error.message })),

    quoteSummary: (options: Tsummery) =>
      axios
        .get(
          `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${options.symbol}?modules=${options.modules}`
        )
        .then((res) => res.data)
        .catch((error) => console.log(error)),
  };
};
