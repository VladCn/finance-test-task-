import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../api/socket";

const initialState = {
  tickerList: ["AAPL", "GOOGL", "MSFT", "AMZN", "FB", "TSLA"],
  currentTickerList: ["AAPL", "GOOGL", "MSFT", "AMZN", "FB", "TSLA"],
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
        socket.emit("change", state.currentTickerList, action.payload);
      }
    },
    deleteTicker(state, action) {
      const selectedTickers = action.payload;
      const filteredTickets = state.tickerList.filter(
        (ticker) => !selectedTickers.includes(ticker)
      );
      state.currentTickerList = filteredTickets;
      socket.emit("change", filteredTickets, state.fetchInterval);
    },
    addTicker(state, action) {
      const selectedTickers = action.payload;
      state.currentTickerList = selectedTickers;
      socket.emit("change", selectedTickers, state.fetchInterval);
    },
  },
});

export const { setFetchInterval, deleteTicker, addTicker } =
  tickersSlice.actions;
export default tickersSlice.reducer;
