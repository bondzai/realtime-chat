import React, { useState } from 'react';
import './Chat.css'

function ChatRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, message]);
    setMessage('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {messages.map((m, i) => <div key={i}>{m}</div>)}
      </div>
    </div>
  );
}

export default ChatRoom;
