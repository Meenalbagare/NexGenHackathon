import React, { useState } from 'react';
import './Dashboard.css'; // Import the corresponding CSS file

const Dashboard = () => {
  const [messages, setMessages] = useState([]); // State to hold chat messages
  const [newMessage, setNewMessage] = useState(''); // State to track new message input

  const handleInputChange = (e) => {
    setNewMessage(e.target.value); // Update new message input state
  };

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      // Create a new message object
      const message = {
        content: newMessage,
        sentByUser: true // Assume message is sent by the user
      };

      // Update the messages state with the new message
      setMessages([...messages, message]);

      // Clear the new message input
      setNewMessage('');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Chat History */}
      <div className="chat-history">
        {/* Render existing chat messages */}
        {messages.map((message, index) => (
          <div key={index} className={`chat-item ${message.sentByUser ? 'sent' : 'received'}`}>
            <div className="chat-content">{message.content}</div>
          </div>
        ))}
      </div>

      {/* Chat Space */}
      <div className="chat-space">
        {/* Chat area */}
        <div className="chat-area">
          {/* Chat messages */}
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sentByUser ? 'sent' : 'received'}`}>
              {message.content}
            </div>
          ))}
        </div>

        {/* Chat input */}
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={handleInputChange}
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
