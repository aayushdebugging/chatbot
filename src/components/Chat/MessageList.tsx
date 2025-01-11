import React from 'react';
import { ThumbsUp, ThumbsDown, RotateCw, Share, MoreVertical } from 'lucide-react';
import { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
        >
          <div className={`max-w-[80%] space-y-2 ${msg.isUser ? 'text-right' : ''}`}>
            <div className={`inline-block p-4 rounded-2xl transition-all duration-200 hover:shadow-lg ${
              msg.isUser
                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700'
            }`}>
              {msg.imageUrl ? (
                <img src={msg.imageUrl} alt="Uploaded" className="max-w-sm rounded-lg" />
              ) : msg.isVoice ? (
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-8 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-blue-500/20 animate-pulse"></div>
                  </div>
                  <span>🎤 Voice message</span>
                </div>
              ) : (
                msg.text
              )}
            </div>
            {!msg.isUser && (
              <div className="flex items-center space-x-4 text-gray-400">
                <button className="hover:bg-gray-700/50 p-1 rounded transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                </button>
                <button className="hover:bg-gray-700/50 p-1 rounded transition-colors">
                  <ThumbsDown className="h-4 w-4" />
                </button>
                <button className="hover:bg-gray-700/50 p-1 rounded transition-colors">
                  <RotateCw className="h-4 w-4" />
                </button>
                <button className="hover:bg-gray-700/50 p-1 rounded transition-colors">
                  <Share className="h-4 w-4" />
                </button>
                <button className="hover:bg-gray-700/50 p-1 rounded transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex items-center space-x-2 text-gray-400">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
          <span className="text-sm">Assistant is typing...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;