import { Tchart, Tsummery } from "../types";
export declare const quoteSummary: (options: Tsummery) => Promise<any>;
export declare const news: (symbol: string) => Promise<any>;
export declare const chart: (options: Tchart) => Promise<any[] | {
    error: boolean;
    message: string;
}>;
export declare const subscribe: (symbol: any, callback: any) => Promise<void>;
