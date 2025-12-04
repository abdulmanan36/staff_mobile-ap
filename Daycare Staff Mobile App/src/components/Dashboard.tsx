import { Users, ClipboardCheck, Bell } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardProps {
  staffName: string;
  staffPhoto: string;
  roomName: string;
  onNavigate: (screen: string) => void;
}

const menuItems = [
  { id: 'children', icon: Users, label: 'Children', color: 'from-blue-400 to-blue-500', screen: 'children' },
  { id: 'attendance', icon: ClipboardCheck, label: 'Attendance', color: 'from-green-400 to-green-500', screen: 'attendance' },
  { id: 'aiAlerts', icon: Bell, label: 'AI Alerts', color: 'from-orange-400 to-orange-500', screen: 'aiAlerts' },
];

export function Dashboard({ staffName, staffPhoto, roomName, onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-2">
          <ImageWithFallback
            src={staffPhoto}
            alt={staffName}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="flex-1">
            <p className="text-blue-100">Welcome back,</p>
            <h1 className="text-white mt-1">{staffName}</h1>
            <p className="text-white/90">{roomName}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-gray-800 mb-4">Main Menu</h2>

        <div className="space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.screen)}
                className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-gray-800 flex-1 text-left">{item.label}</p>
              </button>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-2xl p-4 shadow-md space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ClipboardCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800">Emma Wilson checked in</p>
                <p className="text-gray-500">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800">New message from Mrs. Anderson</p>
                <p className="text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800">AI Alert: Cry detected in Room 2A</p>
                <p className="text-gray-500">2 hours ago • Resolved by Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}