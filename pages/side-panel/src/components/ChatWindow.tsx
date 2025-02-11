import React, { useState, useEffect, useRef } from 'react';

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'User', text: 'Hello!' },
    { sender: 'Bot', text: 'How can I assist you today?' },
    { sender: 'User', text: 'What is AI?' },
    { sender: 'Bot', text: 'AI stands for Artificial Intelligence.' },
    { sender: 'User', text: 'How does it work?' },
    { sender: 'Bot', text: 'AI works by using algorithms and data.' },
    { sender: 'User', text: 'Can you give examples?' },
    { sender: 'Bot', text: 'Sure! Examples include chatbots and recommendation systems.' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent new line
      if (inputValue.trim()) {
        setMessages(prevMessages => [...prevMessages, { sender: 'User', text: inputValue.trim() }]);
        setInputValue(''); // Clear input
      }
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat window
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col p-1">
      {/* Top Chat Window Section */}
      <div
        className="flex flex-1 flex-col overflow-y-auto border-b border-gray-300 p-2"
        style={{ maxHeight: 'calc(100% - 300px' }}>
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'User' ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`rounded p-2 ${message.sender === 'User' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {message.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* Reference for scrolling */}
      </div>

      {/* Suggestions Section */}
      <div className="border-b border-gray-300 p-2">
        <div className="flex flex-col space-y-1">
          <button className="rounded bg-blue-200 px-3 py-1 text-gray-700 transition duration-200 hover:bg-blue-300">
            What is AI?
          </button>
          <button className="rounded bg-blue-200 px-3 py-1 text-gray-700 transition duration-200 hover:bg-blue-300">
            How does it work?
          </button>
        </div>
      </div>

      {/* Chat Sending Section */}
      <div className="flex items-center p-2">
        <textarea
          className="mr-2 flex-1 resize-none rounded border border-gray-300 p-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
          placeholder="Type your message..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ overflow: 'hidden' }} // Prevents overflow
        />
      </div>
    </div>
  );
}

export default ChatWindow;
