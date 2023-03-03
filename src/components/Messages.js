import React from "react";
import "./Messages.css";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";

function Messages({ messages, currentMember }) {
  //console.log("Messages");
  //console.log(JSON.stringify(currentMember));
  //console.log(JSON.stringify(messages));

  const renderMessage = (message) => {
    // console.log("render message: " + JSON.stringify(message));

    const messageText = message.data;
    const userSent = message.member.clientData.username;

    const current = message.member.id === currentMember.chatId;

    const resolveClassName = () => {
      if (current) {
        //console.log("Class name: current");
        return "current";
      }
      //console.log("Class name: not current");
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
      {/* <h2>Messages</h2> */}
      <List className="messages-list">
        {messages.map((m) => renderMessage(m))}
      </List>
    </div>
  );
}

export default Messages;
