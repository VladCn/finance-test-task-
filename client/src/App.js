import TickersTable from "./components/TickersTable";
import { jsonArray } from "./api/mock";
import { tickerResponseAdapter } from "./utils";

function App() {
  const data = tickerResponseAdapter(jsonArray);

  return (
    <div className="App">
      <TickersTable rows={data} />
    </div>
  );
}

export default App;
