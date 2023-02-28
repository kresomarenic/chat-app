import React from "react";
import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";

function Sidebar({ activeMembers, currentMember }) {
  console.log("Sidebar: " + JSON.stringify(currentMember));

  const getAvatar = (username) => {
    const avatar = createAvatar(micah, {
      seed: username,
      radius: 50,
      size: 48,
    });
    const dataUri = avatar.toDataUriSync();
    console.log("Data uri: " + dataUri);
    return dataUri;
  };

  return (
    <div>
      <h2>Chat members</h2>
      <h5>Current member: {currentMember.username}</h5>
      <img src={getAvatar(currentMember.username)} alt="avatar" />
      <ul>
        {activeMembers.map((user) => (
          <li key={user.id}>{user.clientData.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
