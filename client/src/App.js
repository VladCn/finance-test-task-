import TickersTable from "./components/TickersTable";
import { tickerResponseAdapter } from "./utils";
import { socket } from "./api/socket";
import { useEffect, useState } from "react";
import { TextInput } from "./components/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { setFetchInterval } from "./redux/slice";

function App() {
  const interval = useSelector((state) => state.tickers.fetchInterval);
  const dispatch = useDispatch();
  const [tickers, setTickers] = useState([]);

  const handleSetInterval = (state) => {
    dispatch(setFetchInterval(state));
  };

  useEffect(() => {
    socket.emit("start");
    socket.on("ticker", (data) => {
      setTickers(tickerResponseAdapter(data));
    });
  }, []);

  return (
    <div className="App">
      <TextInput value={interval} onSetValue={handleSetInterval} />
      <TickersTable rows={tickers} />
    </div>
  );
}

export default App;
