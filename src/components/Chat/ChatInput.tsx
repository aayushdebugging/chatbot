import React from 'react';
import { Send, Mic, Image as ImageIcon } from 'lucide-react';

interface ChatInputProps {
  message: string;
  isRecording: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  setMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleRecording: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  isRecording,
  fileInputRef,
  setMessage,
  handleSendMessage,
  handleImageUpload,
  toggleRecording,
}) => {
  return (
    <div className="p-4  border-gray-700 bg-gray-800/50 backdrop-blur-lg">
      <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message Assistant..."
            className="flex-1 p-4 rounded-2xl border border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <ImageIcon className="h-5 w-5 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-colors ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-gray-700/50'
            }`}
          >
            <Mic className={`h-5 w-5 ${isRecording ? 'text-white' : 'text-gray-400'}`} />
          </button>
          <button
            type="submit"
            className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-colors"
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-400 text-center">
          Assistant can make mistakes, so double-check its responses
        </div>
      </form>
    </div>
  );
};

export default ChatInput;