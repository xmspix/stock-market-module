import { Tsummery } from "../types";
import { createApiClient } from "../api";
import parser from "xml2json";

const api = createApiClient();

export const quoteSummary = async (options: Tsummery) => {
  options = {
    ...options,
    modules: options.modules.toString(),
  };
  const data = await api.quoteSummary(options);

  data.quoteSummary.result[0].symbol = options.symbol;

  return data.quoteSummary.result[0];
};

export const news = async (symbol: string) => {
  const n = await api.news(symbol);
  return JSON.parse(parser.toJson(n)).rss.channel.item.map((e: any) => {
    const newData = {
      symbol: symbol,
      description: e.description,
      link: e.link,
      date: Number(new Date(e.pubDate)) / 1000,
      title: e.title,
    };
    return newData;
  });
};
