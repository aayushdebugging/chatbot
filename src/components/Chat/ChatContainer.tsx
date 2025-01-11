import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message } from '../../types';

interface ChatContainerProps {
  messages: Message[];
  message: string;
  isTyping: boolean;
  isRecording: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  setIsSidebarOpen: (open: boolean) => void;
  setMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleRecording: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  message,
  isTyping,
  isRecording,
  messagesEndRef,
  fileInputRef,
  setIsSidebarOpen,
  setMessage,
  handleSendMessage,
  handleImageUpload,
  toggleRecording,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <ChatHeader setIsSidebarOpen={setIsSidebarOpen} />
      <MessageList
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        message={message}
        isRecording={isRecording}
        fileInputRef={fileInputRef}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        handleImageUpload={handleImageUpload}
        toggleRecording={toggleRecording}
      />
    </div>
  );
};

export default ChatContainer;