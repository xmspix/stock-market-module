import { createApiClient } from "../api";

const api = createApiClient();

interface record {
  symbol: string;
  name: string;
  lastsale: string | any;
  netchange: string | any;
  pctchange: string | any;
  volume: string;
  marketCap: string;
  country: string;
  ipoyear: string;
  industry: string;
  sector: string;
}

export const nasdaq = async () => {
  const data = await api.nasdaqMarket();
  return filter(data.data.rows);
};

const filter = (data: any[]) => {
  return data.map((e: record) => ({
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

const fixChangePercent = (changeNet: number, changePercent: any) => {
  if (changeNet > 0) {
    return parseFloat("+" + changePercent.match(/[\d|,|.|e|E|\+]+/g)[0]);
  }
  if (changeNet < 0) {
    return parseFloat("-" + changePercent.match(/[\d|,|.|e|E|\+]+/g)[0]);
  }
};
