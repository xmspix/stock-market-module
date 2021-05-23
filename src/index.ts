import { Totc } from "./types";
import { nasdaq } from "./util/nasdaq";
import { otc } from "./util/otc";
class StockMarketModules {
  nasdaq() {
    return nasdaq();
  }
  otc(options?: Totc) {
    return otc(options);
  }
}

export default new StockMarketModules();
