import React from 'react';
import { Sparkles, Plus, Settings, X, User } from 'lucide-react';
import ChatList from './ChatList';
import { Chat } from '../../types';

interface SidebarProps {
  chats: Chat[];
  currentChatId: string;
  editingChatId: string | null;
  newTitle: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  createNewChat: () => void;
  setCurrentChatId: (id: string) => void;
  startEditingChat: (id: string) => void;
  saveEditedChat: (id: string) => void;
  deleteChat: (id: string) => void;
  setNewTitle: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentChatId,
  editingChatId,
  newTitle,
  isSidebarOpen,
  setIsSidebarOpen,
  createNewChat,
  setCurrentChatId,
  startEditingChat,
  saveEditedChat,
  deleteChat,
  setNewTitle,
}) => {
  return (
    <div className={`fixed md:relative inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-72 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 z-30`}>
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
            <span className="font-semibold text-xl">Assistant</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <button
          onClick={createNewChat}
          className="mx-4 flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-700/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" />
          <span>New chat</span>
        </button>

        <div className="mt-4 flex-1 overflow-y-auto">
          <ChatList
            chats={chats}
            currentChatId={currentChatId}
            editingChatId={editingChatId}
            newTitle={newTitle}
            setCurrentChatId={setCurrentChatId}
            startEditingChat={startEditingChat}
            saveEditedChat={saveEditedChat}
            deleteChat={deleteChat}
            setNewTitle={setNewTitle}
          />
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <span className="font-medium">John Doe</span>
          </div>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;