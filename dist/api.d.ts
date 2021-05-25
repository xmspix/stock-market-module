import { Tchart, Tsummery } from "./types";
export declare type ApiClient = {
    nasdaqMarket: () => Promise<any>;
    otcMarket: () => Promise<any>;
    quoteSummary: (options: Tsummery) => Promise<any>;
    news: (symbol: string) => Promise<any>;
    chart: (options: Tchart) => Promise<any>;
    earnings: () => Promise<any>;
};
export declare const createApiClient: () => ApiClient;
