import React from 'react';
import { MessageCircle, Edit2, Trash2 } from 'lucide-react';
import { Chat } from '../../types';

interface ChatListProps {
  chats: Chat[];
  currentChatId: string;
  editingChatId: string | null;
  newTitle: string;
  setCurrentChatId: (id: string) => void;
  startEditingChat: (id: string) => void;
  saveEditedChat: (id: string) => void;
  deleteChat: (id: string) => void;
  setNewTitle: (title: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  currentChatId,
  editingChatId,
  newTitle,
  setCurrentChatId,
  startEditingChat,
  saveEditedChat,
  deleteChat,
  setNewTitle,
}) => {
  return (
    <div className="px-4">
      <h2 className="text-sm font-medium text-gray-400 mb-2">Recent</h2>
      {chats.map(chat => (
        <div
          key={chat.id}
          className={`group relative rounded-lg mb-1 transition-all duration-200 ${
            chat.id === currentChatId ? 'bg-gray-700/50' : 'hover:bg-gray-700/30'
          }`}
        >
          {editingChatId === chat.id ? (
            <div className="p-2 flex items-center">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 px-2 py-1 rounded border bg-gray-800 border-gray-600 text-white focus:outline-none focus:ring focus:ring-blue-500"
                autoFocus
                onBlur={() => saveEditedChat(chat.id)}
                onKeyDown={(e) => e.key === 'Enter' && saveEditedChat(chat.id)}
                placeholder="Edit chat title"
                aria-label="Edit chat title"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between px-3 py-2">
              <div 
                onClick={() => setCurrentChatId(chat.id)}
                className="flex items-center space-x-2 flex-1 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="truncate">{chat.title}</span>
              </div>
              <div className="hidden group-hover:flex items-center space-x-1">
                <button
                  onClick={() => startEditingChat(chat.id)}
                  className="p-1 hover:bg-gray-600 rounded-full transition-colors"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => deleteChat(chat.id)}
                  className="p-1 hover:bg-gray-600 rounded-full transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;