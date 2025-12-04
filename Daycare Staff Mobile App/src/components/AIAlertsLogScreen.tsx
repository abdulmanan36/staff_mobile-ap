import { ArrowLeft, AlertTriangle, Flame, UserX, Skull, Baby, Clock, MapPin } from 'lucide-react';
import { BottomNav } from './BottomNav';

interface AIAlertsLogScreenProps {
  onNavigate: (screen: string) => void;
}

const mockAlerts = [
  {
    id: 1,
    type: 'Cry Detection',
    room: 'Toddlers Room A',
    time: '2:45 PM',
    date: 'Today',
    status: 'Resolved by Admin',
    severity: 'medium',
    description: 'Prolonged crying detected - Staff attended',
    icon: Baby,
    color: 'yellow'
  },
  {
    id: 2,
    type: 'Fire Detected',
    room: 'Kitchen Area',
    time: '11:30 AM',
    date: 'Today',
    status: 'Resolved by Admin',
    severity: 'high',
    description: 'Smoke alarm triggered - False alarm, burnt toast',
    icon: Flame,
    color: 'red'
  },
  {
    id: 3,
    type: 'Unknown Person',
    room: 'Main Entrance',
    time: '9:15 AM',
    date: 'Today',
    status: 'Resolved by Admin',
    severity: 'high',
    description: 'Unrecognized face detected - Verified as new parent',
    icon: UserX,
    color: 'red'
  },
  {
    id: 4,
    type: 'Dangerous Object',
    room: 'Play Area',
    time: '8:30 AM',
    date: 'Today',
    status: 'Resolved by Admin',
    severity: 'high',
    description: 'Sharp object detected - Item removed by staff',
    icon: Skull,
    color: 'red'
  },
  {
    id: 5,
    type: 'Cry Detection',
    room: 'Infant Room',
    time: '4:20 PM',
    date: 'Yesterday',
    status: 'Resolved by Admin',
    severity: 'medium',
    description: 'Baby crying - Diaper changed',
    icon: Baby,
    color: 'yellow'
  },
  {
    id: 6,
    type: 'Unknown Person',
    room: 'Parking Lot',
    time: '3:45 PM',
    date: 'Yesterday',
    status: 'Resolved by Admin',
    severity: 'medium',
    description: 'Unrecognized person - Delivery driver verified',
    icon: UserX,
    color: 'yellow'
  },
];

export function AIAlertsLogScreen({ onNavigate }: AIAlertsLogScreenProps) {
  const getColorClasses = (color: string) => {
    switch(color) {
      case 'red':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          icon: 'text-red-500',
          border: 'border-red-200'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-600',
          icon: 'text-yellow-500',
          border: 'border-yellow-200'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          icon: 'text-gray-500',
          border: 'border-gray-200'
        };
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white">AI Alert Logs</h1>
        </div>

        {/* Info Notice */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white">View-Only Access</p>
            <p className="text-white/80 text-sm">All alerts are handled by admin. You can view the history here.</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <p className="text-gray-500 mb-1">Today's Alerts</p>
            <p className="text-gray-800">4</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <p className="text-gray-500 mb-1">All Resolved</p>
            <p className="text-green-600">100%</p>
          </div>
        </div>

        {/* Timeline */}
        <h2 className="text-gray-800 mb-4">Alert History</h2>
        <div className="space-y-4">
          {mockAlerts.map((alert, index) => {
            const Icon = alert.icon;
            const colors = getColorClasses(alert.color);
            
            return (
              <div key={alert.id} className="relative">
                {/* Timeline Line */}
                {index !== mockAlerts.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200 -mb-4" />
                )}
                
                <div className={`bg-white rounded-2xl p-4 shadow-md border-2 ${colors.border}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-gray-800">{alert.type}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <MapPin className="w-3 h-3" />
                              {alert.room}
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <Clock className="w-3 h-3" />
                              {alert.time}
                            </div>
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm whitespace-nowrap ml-2">{alert.date}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 bg-gray-50 rounded-lg p-2">
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          {alert.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <p className="text-blue-800 text-sm text-center">
            💡 All AI alerts are automatically sent to admin for immediate action. Staff can view logs for awareness and record-keeping.
          </p>
        </div>
      </div>

      <BottomNav currentScreen="aiAlerts" onNavigate={onNavigate} />
    </div>
  );
}
