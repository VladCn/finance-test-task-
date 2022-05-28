import React from "react";
import Ticker from "react-ticker";

export const TickersString = ({ data }) => (
  <Ticker>
    {() => (
      <>
        <h1 style={{ paddingRight: "0.5em" }}>{data}</h1>
      </>
    )}
  </Ticker>
);
