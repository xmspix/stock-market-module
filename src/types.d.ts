export type Totc = {
  stocks?: boolean;
  etf?: boolean;
  country?: string;
  demo?: boolean;
};

export type Tsummery = {
  symbol: string;
  modules: string | any[];
};

export type Tchart = {
  symbol: string;
  from: string;
  to: string;
  demo?: boolean;
};
