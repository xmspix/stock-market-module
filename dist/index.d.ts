import { Tchart, Totc, Tsummery } from "./types";
declare class StockMarketModules {
    nasdaq(): Promise<{
        symbol: string;
        name: string;
        close: number;
        changeNet: number;
        changePercent: number;
        volume: number;
        marketCap: number;
        country: string;
        ipoyear: number;
        industry: string;
        sector: string;
    }[]>;
    otc(options?: Totc): Promise<any>;
    quoteSummary(options: Tsummery): Promise<any>;
    news(symbol: string): Promise<any>;
    chart(options: Tchart): Promise<any[] | {
        error: boolean;
        message: string;
    }>;
    earnings(): Promise<any[]>;
    subscribe(symbols: string[], callback: any): Promise<void>;
}
declare const _default: StockMarketModules;
export default _default;
