import EnterScreen from "./components/enter_screen/EnterScreen";
import { useState } from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Messages from "./components/messages/Messages";
import Input from "./components/input/Input";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import "./App.css";

function App() {
  const [chatMember, setChatMember] = useState({
    chatId: "",
    username: "",
    avatar: "",
  });
  const [chat, setChat] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [activeMembers, setActiveMembers] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleEnterChat = (username) => {
    chatMember.username = username;
    setChatMember(chatMember);
    const chat = connectToChat(chatMember);
    console.log(chat);
    console.log(chatMember);
    const room = subscribeToRoom(chat, chatMember);
    console.log(room);
    getRoomMembers(room);
  };

  const connectToChat = (chatMember) => {
    const drone = new window.Scaledrone("MvruVbKWffeNRS5x", {
      data: chatMember,
    });

    drone.on("open", (error) => {
      if (error) {
        console.log("Error connecting to chat: " + error);
        return null;
      } else {
        chatMember.chatId = drone.clientId;
        setChatMember(chatMember);
      }
    });

    setChat(drone);
    return drone;
  };

  const subscribeToRoom = (chat) => {
    const room = chat.subscribe("observable-room");

    room.on("message", function (message) {
      const allMessages = (messages) => [...messages, message];
      setMessages(allMessages);
    });

    setChatRoom(room);
    return room;
  };

  const getRoomMembers = (room) => {
    room.on("members", function (members) {
      const allMembers = members;
      setActiveMembers(allMembers);
      setChatRoom(room);
    });

    room.on("member_join", function (member) {
      const allMembers = (activeMembers) => [...activeMembers, member];
      setActiveMembers(allMembers);
    });
    room.on("member_leave", function (member) {
      setActiveMembers((activeMembers) =>
        activeMembers.filter((m) => m.id !== member.id)
      );
    });
  };

  const onSendMessage = (message) => {
    chat.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div className="app">
      <CssBaseline />
      {chatMember.username === "" ? (
        <EnterScreen userEnter={handleEnterChat} />
      ) : (
        <>
          <Header />
          <Box className="chat-main">
            <Sidebar activeMembers={activeMembers} currentMember={chatMember} />
            <Box className="chat">
              <Messages
                className="messages"
                messages={messages}
                currentMember={chatMember}
              />
              <Input className="chat-input" onSendMessage={onSendMessage} />
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}

export default App;
