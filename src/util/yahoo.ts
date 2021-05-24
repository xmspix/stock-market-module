import { Tchart, Tsummery } from "../types";
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

export const chart = async (options: Tchart) => {
  options = {
    ...options,
    from: String(Number(new Date(`${options.from}T16:30:00`)) / 1000),
    to: String(Number(new Date(`${options.to}T16:30:00`)) / 1000),
  };

  const data = await api.chart(options);

  if (data.error)
    return { error: true, message: `${options.symbol} not found` };
  else {
    const records = data.chart.result[0].timestamp.length;
    const newData = [];
    for (let i = 0; i < records; i++) {
      let tmp = {
        symbol: options.symbol.toUpperCase(),
        open: data.chart.result[0].indicators.quote[0].open[i],
        high: data.chart.result[0].indicators.quote[0].high[i],
        low: data.chart.result[0].indicators.quote[0].low[i],
        close: data.chart.result[0].indicators.quote[0].close[i],
        adjclose: data.chart.result[0].indicators.adjclose[0].adjclose[i],
        volume: data.chart.result[0].indicators.quote[0].volume[i],
        date: data.chart.result[0].timestamp[i],
      };
      newData.push(tmp);
    }
    return newData;
  }
};
