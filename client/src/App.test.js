import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

test("renders correctly", () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );

  expect(screen.getByTestId("add-ticker-select")).toBeInTheDocument();
  expect(
    screen.getByRole("textbox", { name: /specify interval time/i })
  ).toBeInTheDocument();
  expect(screen.getByTestId("tickers-table")).toBeInTheDocument();
});
