import { ArrowLeft, AlertTriangle, Flame, UserX, Shield, Baby } from 'lucide-react';
import { BottomNav } from './BottomNav';

interface AIAlertsProps {
  onNavigate: (screen: string) => void;
}

const alertIcons = {
  cry: Baby,
  fire: Flame,
  unknown: UserX,
  dangerous: Shield,
};

const alertColors = {
  cry: 'from-blue-400 to-blue-500',
  fire: 'from-red-400 to-red-500',
  unknown: 'from-orange-400 to-orange-500',
  dangerous: 'from-purple-400 to-purple-500',
};

const mockAlerts = [
  {
    id: 1,
    type: 'cry' as const,
    title: 'Cry Detection',
    room: 'Room 2A',
    child: 'Emma Wilson',
    time: '10:45 AM',
    date: 'Today',
    description: 'Continuous crying detected for 2 minutes',
    status: 'Resolved by Admin',
  },
  {
    id: 2,
    type: 'fire' as const,
    title: 'Fire Detected',
    room: 'Kitchen Area',
    child: null,
    time: '9:30 AM',
    date: 'Today',
    description: 'Smoke detected in kitchen area',
    status: 'Resolved by Admin',
  },
  {
    id: 3,
    type: 'unknown' as const,
    title: 'Unknown Person',
    room: 'Main Entrance',
    child: null,
    time: '8:15 AM',
    date: 'Today',
    description: 'Unrecognized person detected at entrance',
    status: 'Resolved by Admin',
  },
  {
    id: 4,
    type: 'dangerous' as const,
    title: 'Dangerous Object',
    room: 'Play Area',
    child: null,
    time: '2:20 PM',
    date: 'Yesterday',
    description: 'Sharp object detected in play area',
    status: 'Resolved by Admin',
  },
  {
    id: 5,
    type: 'cry' as const,
    title: 'Cry Detection',
    room: 'Room 1B',
    child: 'Oliver Brown',
    time: '11:30 AM',
    date: 'Yesterday',
    description: 'Crying detected during nap time',
    status: 'Resolved by Admin',
  },
  {
    id: 6,
    type: 'unknown' as const,
    title: 'Unknown Person',
    room: 'Playground',
    child: null,
    time: '3:45 PM',
    date: 'Yesterday',
    description: 'Unrecognized person near playground fence',
    status: 'Resolved by Admin',
  },
];

export function AIAlerts({ onNavigate }: AIAlertsProps) {
  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-b-[2rem] p-6 pb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-white">AI Alerts Log</h1>
              <p className="text-white/90">View Only</p>
            </div>
          </div>
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white/80">Total Alerts</p>
            <p className="text-white mt-1">{mockAlerts.length}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white/80">All Resolved</p>
            <p className="text-white mt-1">✓</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* View Only Notice */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
          <p className="text-yellow-800">
            ℹ️ This is a view-only log. Only administrators can acknowledge or resolve alerts.
          </p>
        </div>

        {/* Alerts Timeline */}
        <h2 className="text-gray-800 mb-4">Alert History</h2>
        <div className="space-y-4">
          {mockAlerts.map((alert) => {
            const Icon = alertIcons[alert.type];
            const colorClass = alertColors[alert.type];
            
            return (
              <div key={alert.id} className="bg-white rounded-2xl p-5 shadow-md">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-800">{alert.title}</p>
                        <p className="text-gray-500">{alert.room}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">{alert.time}</p>
                        <p className="text-gray-400">{alert.date}</p>
                      </div>
                    </div>
                    
                    {alert.child && (
                      <div className="flex items-center gap-2 mb-2">
                        <Baby className="w-4 h-4 text-blue-500" />
                        <p className="text-blue-600">{alert.child}</p>
                      </div>
                    )}
                    
                    <p className="text-gray-700 bg-gray-50 rounded-xl p-3 mb-3">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {alert.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mt-6">
          <p className="text-blue-800">
            🤖 AI alerts are automatically detected by our safety system and require admin action to resolve.
          </p>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
