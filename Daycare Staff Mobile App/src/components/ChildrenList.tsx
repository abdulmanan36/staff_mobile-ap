import { ArrowLeft, Search, Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChildrenListProps {
  onNavigate: (screen: string, data?: any) => void;
}

const mockChildren = [
  { id: 1, name: 'Emma Wilson', age: 3, status: 'Present', photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop', checkIn: '8:30 AM', parentName: 'Sarah Wilson', parentPhone: '+1 (555) 123-4567' },
  { id: 2, name: 'Oliver Brown', age: 4, status: 'Present', photo: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=100&h=100&fit=crop', checkIn: '8:45 AM', parentName: 'John Brown', parentPhone: '+1 (555) 234-5678' },
  { id: 3, name: 'Sophia Davis', age: 2, status: 'Absent', photo: 'https://images.unsplash.com/photo-1518990013801-39976c49e6fd?w=100&h=100&fit=crop', checkIn: null, parentName: 'Emily Davis', parentPhone: '+1 (555) 345-6789' },
  { id: 4, name: 'Liam Martinez', age: 3, status: 'Present', photo: 'https://images.unsplash.com/photo-1504570126050-8f35f8c3f1f6?w=100&h=100&fit=crop', checkIn: '9:00 AM', parentName: 'Maria Martinez', parentPhone: '+1 (555) 456-7890' },
  { id: 5, name: 'Ava Anderson', age: 4, status: 'Present', photo: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=100&h=100&fit=crop', checkIn: '8:15 AM', parentName: 'Lisa Anderson', parentPhone: '+1 (555) 567-8901' },
  { id: 6, name: 'Noah Johnson', age: 2, status: 'Present', photo: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=100&h=100&fit=crop', checkIn: '9:15 AM', parentName: 'Mike Johnson', parentPhone: '+1 (555) 678-9012' },
  { id: 7, name: 'Isabella Garcia', age: 3, status: 'Absent', photo: 'https://images.unsplash.com/photo-1488656491611-27af00c5a7e3?w=100&h=100&fit=crop', checkIn: null, parentName: 'Sofia Garcia', parentPhone: '+1 (555) 789-0123' },
  { id: 8, name: 'Ethan Taylor', age: 4, status: 'Present', photo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100&h=100&fit=crop', checkIn: '8:40 AM', parentName: 'Rachel Taylor', parentPhone: '+1 (555) 890-1234' },
];

export function ChildrenList({ onNavigate }: ChildrenListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChildren = mockChildren.filter(child =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presentCount = mockChildren.filter(c => c.status === 'Present').length;
  const absentCount = mockChildren.filter(c => c.status === 'Absent').length;

  const handleCall = (child: any, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Calling ${child.parentName} at ${child.parentPhone}...`);
  };

  const handleMessage = (child: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const parentChat = {
      id: child.id,
      childName: child.name,
      parentName: child.parentName,
      parentPhoto: child.photo,
      lastMessage: '',
      timestamp: 'Now',
      unread: 0
    };
    onNavigate('chat', parentChat);
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-b-[2rem] p-6 pb-6 shadow-lg">
        <div className="flex items-center mb-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white">Assigned Children</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white/80">Present Today</p>
            <p className="text-white mt-1">{presentCount}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white/80">Absent Today</p>
            <p className="text-white mt-1">{absentCount}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 -mt-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search children..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
          />
        </div>
      </div>

      {/* Children List */}
      <div className="p-6 pt-4 space-y-4">
        {filteredChildren.map((child) => (
          <div
            key={child.id}
            className="bg-white rounded-2xl p-4 shadow-md"
          >
            <div className="flex items-center gap-4 mb-3">
              <ImageWithFallback
                src={child.photo}
                alt={child.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-gray-800">{child.name}</p>
                <p className="text-gray-500">{child.age} years old</p>
                {child.checkIn && (
                  <p className="text-gray-500">Check-in: {child.checkIn}</p>
                )}
              </div>
              <span
                className={`px-4 py-2 rounded-full flex-shrink-0 ${
                  child.status === 'Present'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {child.status}
              </span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('childProfile', child)}
                className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={(e) => handleCall(child, e)}
                className="p-2 bg-green-100 rounded-xl hover:bg-green-200 transition-colors"
              >
                <Phone className="w-5 h-5 text-green-600" />
              </button>
              <button
                onClick={(e) => handleMessage(child, e)}
                className="p-2 bg-purple-100 rounded-xl hover:bg-purple-200 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}