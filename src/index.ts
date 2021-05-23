import { nasdaq } from "./util/nasdaq";

class StockMarketModules {
  nasdaq() {
    return nasdaq();
  }
}

export default new StockMarketModules();
