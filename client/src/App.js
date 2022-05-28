import TickersTable from "./components/TickersTable";
import { tickerResponseAdapter } from "./utils";
import { socket } from "./api/socket";
import { useEffect, useState } from "react";

function App() {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    socket.emit("start");
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("ticker", (data) => {
      setTickers(tickerResponseAdapter(data));
    });
  }, []);

  return (
    <div className="App">
      <TickersTable rows={tickers} />
    </div>
  );
}

export default App;
