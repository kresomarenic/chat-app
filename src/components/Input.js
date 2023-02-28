import React, { useState } from "react";

function Input({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log("Submited message" + message);
    onSendMessage(message);
  };

  return (
    <div>
      <h2>Input</h2>
      <form onSubmit={onSubmit}>
        <input
          onChange={handleInputChange}
          value={message}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus={true}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Input;
