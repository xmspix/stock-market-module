import { Totc, Tsummery } from "./types";
import { nasdaq } from "./util/nasdaq";
import { otc } from "./util/otc";
import { quoteSummary } from "./util/yahoo";
class StockMarketModules {
  nasdaq() {
    return nasdaq();
  }
  otc(options?: Totc) {
    return otc(options);
  }
  quoteSummary(options: Tsummery) {
    return quoteSummary(options);
  }
}

export default new StockMarketModules();
