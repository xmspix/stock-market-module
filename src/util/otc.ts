import csv2json from "../lib/csv2json";
import { createApiClient } from "../api";

export interface Iotc {
  stocks?: boolean;
  etf?: boolean;
  country?: string;
  demo?: boolean;
};

export type OTC = {
  Symbol: string;
  Country: string;
  Price: string;
  "Change%": string;
  Vol: string;
  SecType: string; // ETFs | Common Stock | Foreign Ordinary Shares | ADRs | New York Registry Shs | Units | Warrants | Other Security Type
  SecurityName: string;
  Tier: string; // OTCQX U.S. Premier | OTCQX U.S. | OTCQX International Premier | OTCQB | Pink Current | Pink No Information | Expert Market
};

const api = createApiClient();

export const otc = async (options: Iotc) => {
  return await api
    .otcMarket()
    .then((res: string) => res)
    .then((res: string) => csv2json.convert(res))
    .then((res: any) => filterStocks(res, options))
    .then((res: any) => getData(res));
};

const filterStocks = (data: any, options: Iotc) => {
  data = removeDuplicates(data);

  if (options && options.stocks)
    return data.filter((e: any) => e.SecType === "Common Stock");
  else if (options && options.etf)
    return data.filter((e: any) => e.SecType === "ETFs");
  else return data;
};

const removeDuplicates = (arr: any) =>
  arr.filter(
    (v: any, i: any, a: any) =>
      a.findIndex((t: any) => t.Symbol === v.Symbol) === i
  );

const getData = (arr: any) => {
  return arr.map((e: OTC) => ({
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

const renameType = (type: string) => {
  switch (type) {
    case "Common Stock":
      return "stock";
    case "ETFs":
      return "etf";
    default:
      return "other";
  }
};
