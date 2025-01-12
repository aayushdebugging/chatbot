import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, Settings, X } from 'lucide-react';
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
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [showNewChatText, setShowNewChatText] = useState(false);

  const sidebarWidth = isSidebarExpanded ? 'w-72' : 'w-20';

  // Handle text delay after sidebar expands
  useEffect(() => {
    if (isSidebarExpanded) {
      const timer = setTimeout(() => setShowNewChatText(true), 300); // Delay matches the animation duration
      return () => clearTimeout(timer); // Cleanup timer on unmount or state change
    } else {
      setShowNewChatText(false);
    }
  }, [isSidebarExpanded]);

  return (
    <div
      className={`fixed md:relative inset-y-0 left-0 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-all duration-500 ease-in-out ${sidebarWidth} bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 z-30 hover:w-72`}
      onMouseEnter={() => setIsSidebarExpanded(true)}
      onMouseLeave={() => setIsSidebarExpanded(false)}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 ml-3 mt-1 text-blue-400 animate-pulse" />
            <span className={`font-semibold text-xl ${!isSidebarExpanded ? 'hidden' : ''}`}>Assistant</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={createNewChat}
          className={`mx-4 my-2 flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-700/50 transition-all duration-300 ${
            !isSidebarExpanded ? 'justify-center' : ''
          }`}
        >
          <Plus className="h-6 w-6" />
          {/* Conditionally show "New Chat" text */}
          <span className={`${!showNewChatText ? 'hidden' : ''}`}>New chat</span>
        </button>

        {/* Chat List */}
        {isSidebarExpanded ? (
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
        ) : null}

        {/* Settings Button */}
        <div className="absolute bottom-10 w-full flex ml-7">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors">
            <Settings className="h-6 w-6" />
            <span className={`${!isSidebarExpanded ? 'hidden' : ''}`}>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;