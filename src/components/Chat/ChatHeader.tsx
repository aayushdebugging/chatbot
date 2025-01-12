import React from 'react';
import { Menu, User } from 'lucide-react';



interface ChatHeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ setIsSidebarOpen }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 p-4 flex items-center justify-between">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-colors">
          Try Assistant Advanced
        </button>
      </div>
      <div className="flex items-center space-x-3 pr-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
          <User className="h-5 w-5" />
        </div>
        <span className="font-medium">John Doe</span>
      </div>
    </header>
  );
};

export default ChatHeader;