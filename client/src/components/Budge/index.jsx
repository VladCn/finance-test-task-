import { styled } from "@mui/material/styles";
import { getBudgeColor } from "../../utils";

const Item = styled("div")`
  border: 1px solid black;
  padding: 2px;
  width: 70px;
  text-align: center;
  border-radius: 5px;
  font-weight: bold;
  background-color: ${({ color }) => color};
  color: ${({ color }) => (color === "#0000FF" ? "white" : "inherit")};
`;

export function Budge({ data }) {
  return <Item color={getBudgeColor(data)}>{data}</Item>;
}
