import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
const Input = ({ name, label, type, handleChange, handleTogglePassword }) => {
  return (
    <Grid item xs={12} sm={12}>
      <TextField
        required
        fullWidth
        name={name}
        label={label}
        onChange={handleChange}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};
export default Input;
