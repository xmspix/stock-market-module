import { Totc } from "../types";
export declare type OTC = {
    Symbol: string;
    Country: string;
    Price: string;
    "Change%": string;
    Vol: string;
    SecType: string;
    SecurityName: string;
    Tier: string;
};
export declare const otc: (options: Totc) => Promise<any>;
