import React from "react";
import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";
import "./Sidebar.css";
import { Box, List, ListItem, Avatar, Typography, Chip } from "@mui/material";

function Sidebar({ activeMembers, currentMember }) {
  const getAvatar = (username, size) => {
    const avatar = createAvatar(micah, {
      seed: username,
      radius: 50,
      size: 48,
    });
    const dataUri = avatar.toDataUriSync();
    return dataUri;
  };

  return (
    <Box className="sidebar">
      <Box className="current-member">
        <Avatar src={getAvatar(currentMember.username)} alt="avatar" />
        <Typography variant="h5">{currentMember.username}</Typography>
      </Box>

      <Chip label="ACTIVE MEMBERS" />

      <Box className="active-members">
        <Typography></Typography>
        <List>
          {activeMembers.map((user) => (
            <ListItem key={user.id}>
              <Avatar src={getAvatar(user.clientData.username)} alt="avatar" />
              {user.clientData.username}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
