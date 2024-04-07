import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Import the corresponding CSS file
import { useNavigate } from "react-router-dom";
import { RiChatNewLine } from "react-icons/ri";

const Dashboard = () => {
  const [chats, setChats] = useState([[]]); // State to hold chat messages (array of chats)
  const [currentChatIndex, setCurrentChatIndex] = useState(0); // State to track the current chat index
  const [newMessage, setNewMessage] = useState(''); // State to track new message input
  const [currentChatId, setCurrentChatId] = useState(-1)
  const navigate = useNavigate();
  // setCurrentChatId(-1)
  const handleInputChange = (e) => {
    setNewMessage(e.target.value); // Update new message input state
  };

  const handleSend = async () => {
    if (newMessage.trim() !== '') {
      const updatedChats = [...chats];
      updatedChats[currentChatIndex] = [
        ...updatedChats[currentChatIndex],
        {
          content: newMessage,
          sentByUser: true // Assume message is sent by the user
        }
      ];
      console.log(  JSON.stringify({ email: localStorage.getItem('email'), chat_id: currentChatId, prompt: newMessage }));
      try {
        // Send the prompt message to the API endpoint
        const response = await fetch("http://localhost:8000/chat/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: localStorage.getItem('email'), chat_id: currentChatId, prompt: newMessage })
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData)
          // Append the response message to the chat
          updatedChats[currentChatIndex] = [
            ...updatedChats[currentChatIndex],
            {
              content: responseData.result,
              sentByUser: false // Response message is sent by the system
            }
          ];
          setCurrentChatId(responseData.chat_id)
          setChats(updatedChats);
          // Clear the new message input
          setNewMessage('');
        } else {
          console.error('Failed to fetch');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    // Check if auth_key is present in localStorage
    const authKey = localStorage.getItem("auth_key");
    if (!authKey) {
      // If auth_key is not set, redirect to login
      navigate("/");
    }
  }, []);

  // If auth_key is not set, return null to prevent rendering
  if (!localStorage.getItem("auth_key")) {
    return null;
  }

  const handleNewChat = () => {
    setCurrentChatId(-1)
    const newChat = [];
    setChats([...chats, newChat]); // Add new chat to the end of the chats array
    setCurrentChatIndex(chats.length); // Switch to the new chat index
    setNewMessage(''); // Clear the message input for the new chat
  };

  return (
    <div className="dashboard-container">
      {/* Chat History */}
      <div className="chat-history">
        {/* "New Chat" Header */}
        <div className="new-chat-header">
          <h3 className='chats-text'>Chats</h3>
          {/* Button to create a new chat */}
          <button className="new-chat-button" onClick={handleNewChat}>
            <RiChatNewLine />
          </button>
        </div>
        {/* Render chat tabs for each chat */}
        <div className="chat-tabs">
          {chats.map((chat, index) => (
            <div key={index} className={`chat-tab ${index === currentChatIndex ? 'active-chat' : ''}`}>
              <button className='chat-buttons' onClick={() => setCurrentChatIndex(index)}>
                Chat {index + 1}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Space */}
      <div className="chat-space">
        {/* Display messages of the current active chat */}
        <div className="chat-area">
          {chats[currentChatIndex].map((message, idx) => (
            <div key={idx} className={`chat-message ${message.sentByUser ? 'sent' : 'received'}`}>
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
