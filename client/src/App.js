import TickersTable from "./components/TickersTable";
import { tickerResponseAdapter } from "./utils";
import { socket } from "./api/socket";
import { useEffect, useState } from "react";
import { TextInput } from "./components/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { setFetchInterval } from "./redux/slice";
import AddTickerSelect from "./components/AddTickerSelect";
import Box from "@mui/material/Box";

function App() {
  const interval = useSelector((state) => state.tickers.fetchInterval);
  const tickersList = useSelector((state) => state.tickers.tickerList);
  const selectedTickers = useSelector(
    (state) => state.tickers.currentTickerList
  );
  const dispatch = useDispatch();
  const [tickers, setTickers] = useState([]);

  const handleSetInterval = (state) => {
    dispatch(setFetchInterval(state));
  };

  useEffect(() => {
    socket.emit("start", selectedTickers);
    socket.on("ticker", (data) => {
      setTickers(tickerResponseAdapter(data));
    });
  }, []);

  return (
    <div className="App" style={{ padding: "12px 24px" }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <AddTickerSelect options={tickersList} selected={selectedTickers} />
        <TextInput value={interval} onSetValue={handleSetInterval} />
      </Box>
      <TickersTable rows={tickers} />
    </div>
  );
}

export default App;
