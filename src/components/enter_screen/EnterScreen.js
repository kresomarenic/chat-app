import { Paper, TextField, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import "./EnterScreen.css";

function EnterScreen({ userEnter }) {
  const [nickname, setNickname] = useState("");

  const handleInputChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e) => {
    userEnter(nickname);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <Box className="enter-page">
        <Paper className="enter-form" elevation={24}>
          <TextField
            required
            id="input-nickname"
            label="Nickname"
            variant="standard"
            type="text"
            value={nickname}
            onChange={handleInputChange}
            onKeyUp={handleEnter}
          />
          <Button type="submit" variant="outlined" onClick={handleSubmit}>
            Enter chat
          </Button>
          <Typography>Choose desired nickname and enjoy chating</Typography>
        </Paper>
      </Box>
    </div>
  );
}

export default EnterScreen;
