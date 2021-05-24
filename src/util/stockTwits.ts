import { createApiClient } from "../api";
const api = createApiClient();

export const earnings = async () => {
  const data = await api.earnings();

  const res = [].concat(
    ...Object.values(data.earnings).map((itm: any) => itm.stocks)
  );

  return res;
};
