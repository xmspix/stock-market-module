import axios from "axios";

export type ApiClient = {
  nasdaqMarket: () => Promise<any>;
};

export const createApiClient = (): ApiClient => {
  return {
    nasdaqMarket: () =>
      axios
        .get(
          "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=0&offset=0&download=true"
        )
        .then((res) => res.data)
        .catch((error) => console.log(error)),
  };
};
