import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import "./Header.css";

function Header() {
  return (
    <Box className="header">
      <Typography className="header-text">Chatty - chatty</Typography>
    </Box>
  );
}

export default Header;
