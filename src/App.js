import EnterScreen from "./components/EnterScreen";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Messages from "./components/Messages";
import Input from "./components/Input";
import { CssBaseline } from "@mui/material";

function App() {
  /* const chatMember = {
    chatId: "",
    username: "",
  }; */

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
    const membersEvents = getRoomMembers(room);
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
    //console.log("Room chat data: " + JSON.stringify(chat.data));
    const room = chat.subscribe("observable-room");
    /* room.on("data", (data, member) => {
      //console.log("On data: " + data);
      //console.log("On data: " + JSON.stringify(member));
      //const messages = messages;
      messages.push({ member, text: data });
      setMessages(messages);
    }); */

    room.on("message", function (message) {
      const member = message.member;
      //console.log("Message sent by: " + member + " - " + message.data);
      const allMessages = (messages) => [...messages, message];
      setMessages(allMessages);
    });

    setChatRoom(room);
    return room;
  };

  const getRoomMembers = (room) => {
    room.on("members", function (members) {
      //console.log("Members from chat: " + JSON.stringify(members));
      const allMembers = members;
      setActiveMembers(allMembers);
      //console.log("Members from chat - all: " + allMembers);
      setChatRoom(room);
    });
    room.on("member_join", function (member) {
      //console.log("Member join: " + JSON.stringify(member));
      const allMembers = (activeMembers) => [...activeMembers, member];
      //console.log("Join all: " + allMembers);
      setActiveMembers(allMembers);
    });
    room.on("member_leave", function (member) {
      //console.log("Member leave: " + JSON.stringify(member));
      setActiveMembers((activeMembers) =>
        activeMembers.filter((m) => m.id !== member.id)
      );
    });
  };

  const onSendMessage = (message) => {
    //console.log("Received message: " + message);
    chat.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div className="App">
      <CssBaseline />
      <Header />
      {chatMember.username === "" ? (
        <EnterScreen userEnter={handleEnterChat} />
      ) : (
        <>
          <Sidebar activeMembers={activeMembers} currentMember={chatMember} />
          <div>
            <Messages messages={messages} currentMember={chatMember} />
            <Input onSendMessage={onSendMessage} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
