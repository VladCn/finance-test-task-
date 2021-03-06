import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export function TextInput({ value, onSetValue }) {
  const [state, setState] = useState(value);

  const handleChangeValue = (e) => {
    setState(e.target.value);
  };
  const handleSetValue = () => {
    onSetValue(state);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSetValue(state);
    }
  };

  return (
    <TextField
      value={state}
      label="Specify interval time"
      id="standard-start-adornment"
      sx={{ m: 1, width: "25ch" }}
      InputProps={{
        endAdornment: <InputAdornment position="start">ms</InputAdornment>,
      }}
      variant="standard"
      onChange={handleChangeValue}
      onBlur={handleSetValue}
      onKeyPress={handleKeyPress}
    />
  );
}
