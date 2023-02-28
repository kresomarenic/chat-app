import React from "react";

function Messages({ messages, currentMember }) {
  console.log("Messages");
  console.log(JSON.stringify(currentMember));
  console.log(JSON.stringify(messages));

  const renderMessage = (message) => {
    console.log("render message: " + JSON.stringify(message));

    const messageText = message.data;
    const userSent = message.member.clientData.username;

    const current =
      message.member.id === currentMember.chatId ? "current - " : "";

    return (
      <li>
        <div>
          {current}
          {userSent}
        </div>
        <div>{messageText}</div>
      </li>
    );
  };

  return (
    <div>
      <h2>Messages</h2>
      <ul>{messages.map((m) => renderMessage(m))}</ul>
    </div>
  );
}

export default Messages;
