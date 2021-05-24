import { Tchart, Totc, Tsummery } from "./types";
import { nasdaq } from "./util/nasdaq";
import { otc } from "./util/otc";
import { quoteSummary, news, chart } from "./util/yahoo";
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
  news(symbol: string) {
    return news(symbol);
  }
  chart(options: Tchart) {
    return chart(options);
  }
}

export default new StockMarketModules();
