import { ArrowLeft, AlertTriangle, Camera, Upload } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface IncidentReportScreenProps {
  onNavigate: (screen: string) => void;
}

const mockChildren = [
  { id: 1, name: 'Emma Wilson', photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop' },
  { id: 2, name: 'Oliver Brown', photo: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=100&h=100&fit=crop' },
  { id: 3, name: 'Sophia Davis', photo: 'https://images.unsplash.com/photo-1518990013801-39976c49e6fd?w=100&h=100&fit=crop' },
];

const incidentTypes = [
  'Minor Injury',
  'Behavioral Issue',
  'Allergic Reaction',
  'Illness',
  'Accident',
  'Other'
];

export function IncidentReportScreen({ onNavigate }: IncidentReportScreenProps) {
  const [selectedChild, setSelectedChild] = useState(mockChildren[0]);
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Incident report submitted. Parent has been notified.');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-400 to-orange-400 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white">Incident Report</h1>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-white" />
          <p className="text-white">Please fill out all details carefully</p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Child */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Child Name</label>
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={selectedChild.photo}
                alt={selectedChild.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <select
                value={selectedChild.id}
                onChange={(e) => setSelectedChild(mockChildren.find(c => c.id === Number(e.target.value)) || mockChildren[0])}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none"
                required
              >
                {mockChildren.map((child) => (
                  <option key={child.id} value={child.id}>{child.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Incident Type */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Type of Incident</label>
            <div className="grid grid-cols-2 gap-3">
              {incidentTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setIncidentType(type)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    incidentType === type
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Time of Incident */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Time of Incident</label>
            <input
              type="time"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Detailed Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe what happened, any first aid given, and current condition..."
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Upload Images */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Add Images (Optional)</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-400 transition-colors"
              >
                <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Take Photo</p>
              </button>
              <button
                type="button"
                className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-400 transition-colors"
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Upload File</p>
              </button>
            </div>
          </div>

          {/* Action Taken */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="block text-gray-700 mb-3">Action Taken</label>
            <textarea
              placeholder="Describe any immediate action taken (first aid, calling parent, etc.)"
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-4">
            <p className="text-red-800">
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              Parent will be automatically notified upon submission
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-red-400 to-orange-400 text-white rounded-2xl hover:shadow-lg transition-shadow"
          >
            Submit Report & Notify Parent
          </button>
        </form>
      </div>
    </div>
  );
}
