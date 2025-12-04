import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DailyNotesProps {
  child: any;
  onNavigate: (screen: string) => void;
}

interface Note {
  id: number;
  time: string;
  note: string;
  date: string;
}

export function DailyNotes({ child, onNavigate }: DailyNotesProps) {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      time: '10:30 AM',
      note: 'Emma had a great morning! She enjoyed arts and crafts and played nicely with friends.',
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      time: '2:45 PM',
      note: 'Ate all her snack and asked for more fruits!',
      date: new Date().toLocaleDateString(),
    },
  ]);

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No child selected</p>
      </div>
    );
  }

  const handleAddNote = () => {
    if (!note.trim()) {
      alert('Please write a note');
      return;
    }

    const newNote: Note = {
      id: notes.length + 1,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      note: note.trim(),
      date: new Date().toLocaleDateString(),
    };

    setNotes([newNote, ...notes]);
    setNote('');
  };

  return (
    <div className="min-h-screen pb-8 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-b-[2rem] p-6 pb-6 shadow-lg">
        <div className="flex items-center mb-4">
          <button
            onClick={() => onNavigate('childProfile', child)}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <ImageWithFallback
              src={child.photo}
              alt={child.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h1 className="text-white">Daily Notes</h1>
              <p className="text-white/90">{child.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Add New Note Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-800 mb-4">Add New Note</h2>
          
          {/* Note Input */}
          <div className="mb-4">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write a note here..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
              rows={5}
            />
          </div>

          <button
            onClick={handleAddNote}
            className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Add Note
          </button>
        </div>

        {/* Notes Timeline */}
        <h2 className="text-gray-800 mb-4">Today's Notes</h2>
        <div className="space-y-4">
          {notes.map((noteItem) => (
            <div key={noteItem.id} className="bg-white rounded-2xl p-5 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-500">{noteItem.time}</p>
                <p className="text-gray-400">{noteItem.date}</p>
              </div>
              
              <p className="text-gray-800 bg-gray-50 rounded-xl p-3">
                {noteItem.note}
              </p>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mt-6">
          <p className="text-blue-800">
            ℹ️ Notes reset daily and are stored with date for weekly/monthly reports.
          </p>
        </div>
      </div>
    </div>
  );
}