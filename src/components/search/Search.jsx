import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import "./search.scss";

const Search = ({ onSubmit, isNotFound }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    onSubmit(value);
  };

  return (
    <Paper className="search" elevation={1}>
      <Typography variant="body1" />
      <form className="search_form" onSubmit={handleSubmit}>
        <TextField
          label="Search"
          value={value}
          onChange={e => setValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          error={isNotFound}
          helperText={isNotFound && "User not found"}
        />
        <Button
          className="search_form_button"
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          OK
        </Button>
      </form>
    </Paper>
  );
};

export default Search;
