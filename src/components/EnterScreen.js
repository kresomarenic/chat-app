import {
  Card,
  Paper,
  TextField,
  Button,
  Typography,
  FormGroup,
} from "@mui/material";
import { Box, display } from "@mui/system";
import React from "react";
import { useState } from "react";
import "./EnterScreen.css";

function EnterScreen({ userEnter }) {
  const [nickname, setNickname] = useState("");

  const handleInputChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    userEnter(nickname);
    //console.log("Entered nick: " + nickname);
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
      {/*  <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
        <Paper
          elevation={3}
          sx={{ display: "flex", width: "20vw", height: "20vh" }}
        />
      </Box> */}

      {/* <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your username:
            <input
              type="text"
              value={nickname}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div> */}
    </div>
  );
}

export default EnterScreen;
