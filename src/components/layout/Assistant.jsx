import React, { useState } from 'react';
import {
  X,
  Settings,
  MoreHorizontal,
  Send,
  ArrowUp,
} from 'lucide-react';
import './Assistant.css';

export const Assistant = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      console.log('Sending:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="assistant-panel">
      {/* Header */}
      <div className="assistant-header">
        <div className="assistant-header-left">
          <span className="assistant-icon">✨</span>
          <h3 className="assistant-title">Assistant</h3>
        </div>
        <div className="assistant-header-right">
          <button className="assistant-header-btn" aria-label="More options">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          <button className="assistant-header-btn" aria-label="Settings">
            <Settings className="w-4 h-4" />
          </button>
          <button className="assistant-header-btn" onClick={onClose} aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="assistant-content">
        {/* Welcome Message */}
        <p className="assistant-welcome">
          What do you need help with? Select a topic or type your question below.
        </p>

        {/* Suggested Topic Buttons - Pill style */}
        <div className="assistant-suggestions">
          <button className="assistant-topic-btn">
            Where is my 1099 tax form?
          </button>
          <button className="assistant-topic-btn">
            My verification status
          </button>
          <button className="assistant-topic-btn">
            My payout is missing
          </button>
          <button className="assistant-topic-btn">
            Update bank account for payout
          </button>
          <button className="assistant-topic-btn">
            My customer's payment is failing
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="assistant-input-area">
        <div className="assistant-input-wrapper">
          <textarea
            className="assistant-input"
            placeholder=""
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button 
            className="assistant-send-btn"
            onClick={handleSend}
            disabled={!message.trim()}
            aria-label="Send message"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
        <p className="assistant-disclaimer">
          AI may make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default Assistant;

