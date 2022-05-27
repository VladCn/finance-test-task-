import { convertTickerName } from "./index";

export const tickerResponseAdapter = (responseData) => {
  return responseData.map((item) => ({
    ...item,
    name: convertTickerName(item.ticker),
  }));
};
