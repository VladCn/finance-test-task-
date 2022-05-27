import { styled } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Wrapper = styled("div")`
  display: flex;
  justify-content: flex-end;
`;

export const StatusW = styled("div")`
  display: flex;
  align-items: center;
  width: max-content;
  padding: 2px 5px;
  border-radius: 5px;
  color: ${({ variant }) => {
    if (variant === "up") {
      return "#137333";
    }
    if (variant === "down") {
      return "#a50e0e";
    }
    return "inherit";
  }};
  background-color: ${({ variant }) => {
    if (variant === "up") {
      return "#e6f4ea";
    }
    if (variant === "down") {
      return "#fce8e6";
    }
    return "inherit";
  }};
`;

export function Status({ data }) {
  const percent = Math.abs(data * 100).toFixed(2);
  const isUp = data > 0;

  return (
    <Wrapper>
      <StatusW variant={isUp ? "up" : "down"}>
        {isUp ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        {percent} %
      </StatusW>
    </Wrapper>
  );
}
