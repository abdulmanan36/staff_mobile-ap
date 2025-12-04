import { ArrowLeft, Thermometer, Pill, AlertTriangle, Plus } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HealthLogScreenProps {
  selectedChild: any;
  onNavigate: (screen: string) => void;
}

const mockChildren = [
  { id: 1, name: 'Emma Wilson', photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop' },
  { id: 2, name: 'Oliver Brown', photo: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=100&h=100&fit=crop' },
  { id: 3, name: 'Sophia Davis', photo: 'https://images.unsplash.com/photo-1518990013801-39976c49e6fd?w=100&h=100&fit=crop' },
];

const healthLogs = [
  {
    id: 1,
    type: 'Temperature',
    value: '98.6°F',
    time: '10:30 AM',
    date: 'Today',
    notes: 'Normal temperature, feeling well'
  },
  {
    id: 2,
    type: 'Medicine',
    value: 'Tylenol (5ml)',
    time: '9:00 AM',
    date: 'Today',
    notes: 'For fever, parent consent on file'
  },
  {
    id: 3,
    type: 'Allergy Alert',
    value: 'No reaction',
    time: '12:00 PM',
    date: 'Yesterday',
    notes: 'Careful lunch monitoring'
  },
];

export function HealthLogScreen({ selectedChild, onNavigate }: HealthLogScreenProps) {
  const [child, setChild] = useState(selectedChild || mockChildren[0]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLog, setNewLog] = useState({
    type: 'Temperature',
    value: '',
    symptoms: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Health log added successfully!');
    setShowAddForm(false);
    setNewLog({ type: 'Temperature', value: '', symptoms: '', notes: '' });
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-400 to-pink-400 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white">Health & Safety Logs</h1>
        </div>

        {/* Select Child */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={child.photo}
              alt={child.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <select
              value={child.id}
              onChange={(e) => setChild(mockChildren.find(c => c.id === Number(e.target.value)) || mockChildren[0])}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none"
            >
              {mockChildren.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Add New Log Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full mb-6 py-4 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-2xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Health Log
        </button>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-md mb-6 space-y-4">
            <h2 className="text-gray-800 mb-4">New Health Log</h2>

            <div>
              <label className="block text-gray-700 mb-2">Type</label>
              <select
                value={newLog.type}
                onChange={(e) => setNewLog({ ...newLog, type: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none"
              >
                <option>Temperature</option>
                <option>Medicine Given</option>
                <option>Allergic Reaction</option>
                <option>Injury</option>
                <option>Illness</option>
              </select>
            </div>

            {newLog.type === 'Temperature' && (
              <div>
                <label className="block text-gray-700 mb-2">Temperature (°F)</label>
                <input
                  type="text"
                  value={newLog.value}
                  onChange={(e) => setNewLog({ ...newLog, value: e.target.value })}
                  placeholder="98.6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {newLog.type === 'Medicine Given' && (
              <div>
                <label className="block text-gray-700 mb-2">Medicine & Dosage</label>
                <input
                  type="text"
                  value={newLog.value}
                  onChange={(e) => setNewLog({ ...newLog, value: e.target.value })}
                  placeholder="e.g., Tylenol 5ml"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">Symptoms (if any)</label>
              <textarea
                value={newLog.symptoms}
                onChange={(e) => setNewLog({ ...newLog, symptoms: e.target.value })}
                placeholder="Describe any symptoms..."
                rows={2}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Additional Notes</label>
              <textarea
                value={newLog.notes}
                onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                placeholder="Any additional information..."
                rows={2}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-xl hover:shadow-lg transition-shadow"
              >
                Save Log
              </button>
            </div>
          </form>
        )}

        {/* Health Logs History */}
        <h2 className="text-gray-800 mb-4">Recent Logs</h2>
        <div className="space-y-4">
          {healthLogs.map((log) => (
            <div key={log.id} className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  log.type === 'Temperature' ? 'bg-blue-100' :
                  log.type === 'Medicine' ? 'bg-purple-100' : 'bg-yellow-100'
                }`}>
                  {log.type === 'Temperature' ? <Thermometer className="w-6 h-6 text-blue-500" /> :
                   log.type === 'Medicine' ? <Pill className="w-6 h-6 text-purple-500" /> :
                   <AlertTriangle className="w-6 h-6 text-yellow-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-gray-800">{log.type}</p>
                    <p className="text-gray-500 text-sm">{log.date}</p>
                  </div>
                  <p className="text-gray-700 mb-1">{log.value}</p>
                  <p className="text-gray-500 text-sm">{log.time}</p>
                  {log.notes && (
                    <p className="text-gray-600 text-sm mt-2 bg-gray-50 rounded-lg p-2">
                      {log.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
