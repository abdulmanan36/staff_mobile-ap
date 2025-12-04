import { ArrowLeft, Smile, Meh, Frown, Upload, Camera } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DailyNotesScreenProps {
  selectedChild: any;
  onNavigate: (screen: string) => void;
}

const mockChildren = [
  { id: 1, name: 'Emma Wilson', photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop' },
  { id: 2, name: 'Oliver Brown', photo: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=100&h=100&fit=crop' },
  { id: 3, name: 'Sophia Davis', photo: 'https://images.unsplash.com/photo-1518990013801-39976c49e6fd?w=100&h=100&fit=crop' },
];

export function DailyNotesScreen({ selectedChild, onNavigate }: DailyNotesScreenProps) {
  const [child, setChild] = useState(selectedChild || mockChildren[0]);
  const [notes, setNotes] = useState({
    food: '',
    napTime: '',
    diaperChanges: 0,
    mood: '',
    activities: '',
  });

  const moods = [
    { value: 'happy', icon: Smile, label: 'Happy', color: 'text-green-500' },
    { value: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
    { value: 'sad', icon: Frown, label: 'Sad', color: 'text-red-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Daily note saved and sent to parent!');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white">Daily Notes</h1>
        </div>
      </div>

      <div className="p-6">
        {/* Select Child */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
          <label className="block text-gray-700 mb-3">Select Child</label>
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={child.photo}
              alt={child.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <select
              value={child.id}
              onChange={(e) => setChild(mockChildren.find(c => c.id === Number(e.target.value)))}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
            >
              {mockChildren.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Eaten */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Food Eaten</label>
            <textarea
              value={notes.food}
              onChange={(e) => setNotes({ ...notes, food: e.target.value })}
              placeholder="e.g., Full breakfast, half sandwich at lunch..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
            />
          </div>

          {/* Nap Time */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Nap Time</label>
            <input
              type="text"
              value={notes.napTime}
              onChange={(e) => setNotes({ ...notes, napTime: e.target.value })}
              placeholder="e.g., 1:00 PM - 2:30 PM"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
            />
          </div>

          {/* Diaper Changes */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Diaper Changes</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setNotes({ ...notes, diaperChanges: Math.max(0, notes.diaperChanges - 1) })}
                className="w-12 h-12 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center">
                <p className="text-gray-800">{notes.diaperChanges} times</p>
              </div>
              <button
                type="button"
                onClick={() => setNotes({ ...notes, diaperChanges: notes.diaperChanges + 1 })}
                className="w-12 h-12 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors text-blue-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Mood */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Mood</label>
            <div className="grid grid-cols-3 gap-3">
              {moods.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setNotes({ ...notes, mood: mood.value })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      notes.mood === mood.value
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${mood.color}`} />
                    <p className="text-gray-700 text-sm">{mood.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Learning Activities */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Learning Activities</label>
            <textarea
              value={notes.activities}
              onChange={(e) => setNotes({ ...notes, activities: e.target.value })}
              placeholder="e.g., Practiced counting, story time, outdoor play..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
            />
          </div>

          {/* Upload Photos/Videos */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Upload Media</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors"
              >
                <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Take Photo</p>
              </button>
              <button
                type="button"
                className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors"
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Upload File</p>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-2xl hover:shadow-lg transition-shadow"
          >
            Save & Send to Parent
          </button>
        </form>
      </div>
    </div>
  );
}
