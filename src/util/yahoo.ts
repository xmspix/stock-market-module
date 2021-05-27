import { Tchart, Tsummery } from "../types";
import { createApiClient } from "../api";
import parser from "xml2json";
import protobufjs from "protobufjs";
import WebSocket from "ws";

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

export const subscribe = async (symbol: any, callback: any) => {
  const socket = new WebSocket(`wss://streamer.finance.yahoo.com/`);
  // When a connection is made
  socket.onopen = function () {
    console.log("Connected to Yahoo finance streamer");
    const json = { subscribe: symbol };
    socket.send(JSON.stringify(json));
  };

  // When data is received
  socket.onmessage = function (event: any) {
    return protobufjs.load(
      __dirname + "/PricingData.proto",
      (err: any, root: any) => {
        if (err) return { error: true, message: err.message };

        const PricingData: any = root.lookupType("PricingData");
        const buffer: any = Buffer.from(event.data, "base64");
        const decode: any = JSON.parse(
          JSON.stringify(PricingData.decode(buffer))
        );

        // const data = {
        //   symbol: decode.id,
        //   price: <number>decode.price,
        //   change: <number>decode.change,
        //   changePercent: <number>decode.changePercent,
        //   volume: <number>decode.dayVolume,
        // };

        callback(decode);
      }
    );
  };

  // When connection could not be made
  socket.onerror = function (error: any) {
    return { error: true, message: error.message };
  };

  // When connection was closed
  socket.onclose = function (error: any) {
    return { error: true, message: error.message };
  };
};
