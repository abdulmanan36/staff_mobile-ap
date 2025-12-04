import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatListProps {
  onNavigate: (screen: string, data?: any) => void;
}

const mockChats = [
  {
    id: 1,
    childName: 'Emma Wilson',
    parentName: 'Sarah Wilson',
    parentPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'Thank you for the update!',
    timestamp: '10:30 AM',
    unread: 2
  },
  {
    id: 2,
    childName: 'Oliver Brown',
    parentName: 'Michael Brown',
    parentPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastMessage: 'Will pick up at 4 PM today',
    timestamp: '9:45 AM',
    unread: 0
  },
  {
    id: 3,
    childName: 'Sophia Davis',
    parentName: 'Emily Davis',
    parentPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'Is she feeling better?',
    timestamp: 'Yesterday',
    unread: 1
  },
  {
    id: 4,
    childName: 'Liam Martinez',
    parentName: 'Carlos Martinez',
    parentPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    lastMessage: 'Sent the photos, thanks!',
    timestamp: 'Yesterday',
    unread: 0
  },
];

export function ChatList({ onNavigate }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat =>
    chat.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.parentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white">Parent Chat</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="p-6 space-y-3">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onNavigate('chat', chat)}
            className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <div className="relative flex-shrink-0">
              <ImageWithFallback
                src={chat.parentPhoto}
                alt={chat.parentName}
                className="w-14 h-14 rounded-full object-cover"
              />
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">{chat.unread}</span>
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-800">{chat.parentName}</p>
                <p className="text-gray-500 text-sm">{chat.timestamp}</p>
              </div>
              <p className="text-gray-500 text-sm">Re: {chat.childName}</p>
              <p className={`text-sm mt-1 ${chat.unread > 0 ? 'text-gray-800' : 'text-gray-500'}`}>
                {chat.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>

      <BottomNav currentScreen="chatList" onNavigate={onNavigate} />
    </div>
  );
}
