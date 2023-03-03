import React, { useState } from "react";
import "./Input.css";
import { Box, TextField, Button } from "@mui/material";

function Input({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    //e.preventDefault();
    //console.log("Submited message" + message);
    onSendMessage(message);
    setMessage("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <Box className="input-container">
      <TextField
        className="input-field"
        required
        id="input-message"
        /* label="Nickname" */
        placeholder="Enter your message"
        variant="standard"
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyUp={handleEnter}
      />
      <Button type="submit" variant="outlined" onClick={onSubmit}>
        SEND
      </Button>
      {/*  <form onSubmit={onSubmit}>
        <input
          onChange={handleInputChange}
          value={message}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus={true}
        />
        <button>Send</button>
      </form> */}
    </Box>
  );
}

export default Input;
