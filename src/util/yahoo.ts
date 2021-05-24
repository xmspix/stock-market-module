import { Tsummery } from "../types";
import { createApiClient } from "../api";

const api = createApiClient();

export const quoteSummary = async (options: Tsummery) => {
  options = {
    ...options,
    modules: options.modules.toString(),
  };
  const data = await api.quoteSummary(options);

  data.quoteSummary.result[0].symbol = options.symbol;

  return data.quoteSummary.result[0];
};
