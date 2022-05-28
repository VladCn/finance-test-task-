import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../api/socket";

const initialState = {
  tickerList: ["AAPL", "GOOGL", "MSFT", "AMZN", "FB", "TSLA"],
  selectedTickerList: ["AAPL", "GOOGL", "MSFT", "AMZN", "FB", "TSLA"],
  fetchInterval: 5000,
};

const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    setFetchInterval(state, action) {
      const interval = Number(action.payload);
      if (interval && interval !== state.fetchInterval) {
        state.fetchInterval = action.payload;
        socket.emit("interval", interval);
      }
    },
  },
});

export const { setFetchInterval } = tickersSlice.actions;
export default tickersSlice.reducer;
