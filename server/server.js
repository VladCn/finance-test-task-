"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

let FETCH_INTERVAL = 5000;
let INTERVAL_ID = null;
const PORT = process.env.PORT || 4000;

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket, tickersList = tickers) {
  const quotes = tickersList?.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(-1, 1, 5),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit("ticker", quotes);
}

function trackTickers(socket, tickersList, interval = FETCH_INTERVAL) {
  console.log(tickersList, interval);
  // run the first time immediately
  getQuotes(socket, tickersList);
  // every N seconds
  if (INTERVAL_ID) {
    clearInterval(INTERVAL_ID);
  }
  INTERVAL_ID = setInterval(function () {
    getQuotes(socket, tickersList);
  }, interval);

  socket.on("disconnect", function () {
    clearInterval(INTERVAL_ID);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", (tickersList) => {
    trackTickers(socket, tickersList, FETCH_INTERVAL);
  });
  socket.on("change", (tickersList, interval) => {
    trackTickers(socket, tickersList, interval);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
