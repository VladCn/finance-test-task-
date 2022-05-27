export * from "./tickerResponseAdapter";

export function convertTickerName(name) {
  switch (name) {
    case "AAPL":
      return "Apple";
    case "GOOGL":
      return "Alphabet";
    case "MSFT":
      return "Microsoft";
    case "AMZN":
      return "Amazon";
    case "FB":
      return "Facebook";
    case "TSLA":
      return "Tesla";
    default:
      return "Unknown";
  }
}

export function getBudgeColor(ticker) {
  switch (ticker) {
    case "GOOGL":
      return "#0000FF";
    case "AMZN":
      return "#FFD700";
    case "AAPL":
    case "MSFT":
    case "FB":
    case "TSLA":
    default:
      return "white";
  }
}
