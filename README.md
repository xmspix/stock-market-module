# Stock Market Module

# Installing

```bash
npm i @xmspix/stock-market-module
```

# Usage

```js
import StockMarketModules from "@xmspix/stock-market-module";

// Get EOD data from nasdaq.com
StockMarketModules.nasdaq()
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

// Get EOD data from otcmarkets.com
StockMarketModules.otc()
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

// Get earnings from stocktwits.com
StockMarketModules.earnings()
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

// Get news from yahoo.com
StockMarketModules.news("AAPL")
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

// Get chart data from yahoo.com
StockMarketModules.chart({
  symbol: "AAPL",
  from: "2020-05-20",
  to: "2021-05-20",
})
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

// Get real-time data from yahoo streamer
const symbols = ["AAPL", "MSFT"];
StockMarketModules.subscribe(symbols, (res, error) => {
  if (error) console.log(error);
  console.log(res);
});

// Get quoteSummary from yahoo.com
const modules = [
  "assetProfile",
  "incomeStatementHistory",
  "incomeStatementHistoryQuarterly",
  "balanceSheetHistory",
  "balanceSheetHistoryQuarterly",
  "cashflowStatementHistory",
  "cashflowStatementHistoryQuarterly",
  "defaultKeyStatistics",
  "financialData",
  "calendarEvents",
  "secFilings",
  "recommendationTrend",
  "upgradeDowngradeHistory",
  "institutionOwnership",
  "fundOwnership",
  "majorDirectHolders",
  "majorHoldersBreakdown",
  "insiderTransactions",
  "insiderHolders",
  "netSharePurchaseActivity",
  "earnings",
  "earningsHistory",
  "earningsTrend",
  "industryTrend",
  "indexTrend",
  "sectorTrend",
];
StockMarketModules.quoteSummary({ symbol: "AAPL", modules: modules })
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
```
