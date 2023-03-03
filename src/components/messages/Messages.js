import React from "react";
import "./Messages.css";
import { List, ListItem, ListItemText, Chip } from "@mui/material";

function Messages({ messages, currentMember }) {
  const renderMessage = (message) => {
    const messageText = message.data;
    const userSent = message.member.clientData.username;

    const current = message.member.id === currentMember.chatId;

    const resolveClassName = () => {
      if (current) {
        return "current";
      }
      return "";
    };

    return (
      <ListItem className={resolveClassName()}>
        <ListItemText
          primary={userSent}
          secondary={<Chip label={messageText} />}
        />
      </ListItem>
    );
  };

  return (
    <div className="messages-container">
      <List className="messages-list">
        {messages.map((m) => renderMessage(m))}
      </List>
    </div>
  );
}

export default Messages;
