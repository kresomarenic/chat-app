import React from "react";
import { useState } from "react";

function EnterScreen({ userEnter }) {
  const [nickname, setNickname] = useState("");

  const handleInputChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userEnter(nickname);
    //console.log("Entered nick: " + nickname);
  };

  return (
    <div>
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
    </div>
  );
}

export default EnterScreen;
