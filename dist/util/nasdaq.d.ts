export declare const nasdaq: () => Promise<{
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
