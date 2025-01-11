import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ChatContainer from './components/Chat/ChatContainer';
import { Chat } from './types';

function App() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'A Simple Greeting',
      messages: [{ id: '1', text: "Hi! How can I help you today?", isUser: false, timestamp: new Date() }]
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState('1');
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentChat = chats.find(chat => chat.id === currentChatId) || chats[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat.messages]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [{ id: Date.now().toString(), text: "Hi! How can I help you today?", isUser: false, timestamp: new Date() }]
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
  };

  const startEditingChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setEditingChatId(chatId);
      setNewTitle(chat.title);
    }
  };

  const saveEditedChat = (chatId: string) => {
    if (newTitle.trim()) {
      setChats(prevChats => prevChats.map(chat => 
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      ));
    }
    setEditingChatId(null);
    setNewTitle('');
  };

  const deleteChat = (chatId: string) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId && chats.length > 1) {
      setCurrentChatId(chats[0].id);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessageId = Date.now().toString();
      const newMessage = { 
        id: userMessageId, 
        text: message, 
        isUser: true, 
        timestamp: new Date() 
      };
      
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      }));
      
      setMessage('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
        setChats(prevChats => prevChats.map(chat => {
          if (chat.id === currentChatId) {
            return {
              ...chat,
              messages: [...chat.messages, {
                id: Date.now().toString(),
                text: "Thanks for your message! I'm here to help.",
                isUser: false,
                timestamp: new Date()
              }]
            };
          }
          return chat;
        }));
      }, 2000);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMessage = {
          id: Date.now().toString(),
          text: 'Sent an image',
          isUser: true,
          timestamp: new Date(),
          imageUrl: reader.result as string
        };
        
        setChats(prevChats => prevChats.map(chat => {
          if (chat.id === currentChatId) {
            return {
              ...chat,
              messages: [...chat.messages, newMessage]
            };
          }
          return chat;
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const newMessage = {
          id: Date.now().toString(),
          text: '🎤 Voice message',
          isUser: true,
          timestamp: new Date(),
          isVoice: true
        };
        
        setChats(prevChats => prevChats.map(chat => {
          if (chat.id === currentChatId) {
            return {
              ...chat,
              messages: [...chat.messages, newMessage]
            };
          }
          return chat;
        }));
      }, 3000);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        editingChatId={editingChatId}
        newTitle={newTitle}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        createNewChat={createNewChat}
        setCurrentChatId={setCurrentChatId}
        startEditingChat={startEditingChat}
        saveEditedChat={saveEditedChat}
        deleteChat={deleteChat}
        setNewTitle={setNewTitle}
      />

      <ChatContainer
        messages={currentChat.messages}
        message={message}
        isTyping={isTyping}
        isRecording={isRecording}
        messagesEndRef={messagesEndRef}
        fileInputRef={fileInputRef}
        setIsSidebarOpen={setIsSidebarOpen}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        handleImageUpload={handleImageUpload}
        toggleRecording={toggleRecording}
      />
    </div>
  );
}

export default App;