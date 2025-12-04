import { ArrowLeft, Phone, Mail, AlertTriangle, FileText, Heart, User, MessageCircle, Edit, Camera, Upload } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChildProfileProps {
  child: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function ChildProfile({ child, onNavigate }: ChildProfileProps) {
  const [isEditingMedical, setIsEditingMedical] = useState(false);
  const [medicalInfo, setMedicalInfo] = useState({
    allergies: '• Peanut allergy (severe)\n• Lactose intolerant',
  });

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No child selected</p>
      </div>
    );
  }

  const actions = [
    { id: 'dailyNotes', icon: FileText, label: 'Daily Notes', color: 'from-green-400 to-green-500', screen: 'dailyNotes' },
    { id: 'upload', icon: Upload, label: 'Upload Photo/Video', color: 'from-blue-400 to-blue-500', screen: 'uploadMedia' },
    { id: 'health', icon: Heart, label: 'Health Logs', color: 'from-red-400 to-red-500', screen: 'healthLog' },
    { id: 'pickup', icon: User, label: 'Pickup Verify', color: 'from-yellow-400 to-yellow-500', screen: 'pickup' },
  ];

  const handleCall = () => {
    alert(`Calling ${child.parentName} at ${child.parentPhone}...`);
  };

  const handleMessage = () => {
    const parentChat = {
      id: child.id,
      childName: child.name,
      parentName: child.parentName || 'Parent',
      parentPhoto: child.photo,
      lastMessage: '',
      timestamp: 'Now',
      unread: 0
    };
    onNavigate('chat', parentChat);
  };

  const handleSaveMedical = () => {
    setIsEditingMedical(false);
    alert('Medical information updated successfully!');
  };

  return (
    <div className="min-h-screen pb-8 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-b-[2rem] p-6 pb-24 shadow-lg relative">
        <button
          onClick={() => onNavigate('children')}
          className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mb-4"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        {/* Profile Photo - Overlapping */}
        <div className="absolute left-1/2 -translate-x-1/2 top-24">
          <div className="relative">
            <ImageWithFallback
              src={child.photo}
              alt={child.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${
              child.status === 'Present' ? 'bg-green-500' : 'bg-red-500'
            }`} />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 mt-20">
        <div className="text-center mb-6">
          <h1 className="text-gray-800 mb-2">{child.name}</h1>
          <p className="text-gray-600">{child.age} years old</p>
          <span
            className={`inline-block mt-2 px-4 py-2 rounded-full ${
              child.status === 'Present'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {child.status}
          </span>
        </div>

        {/* Allergies/Medical Info */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-3 flex-1">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-red-800 mb-1">Allergies & Medical Info</p>
                {isEditingMedical ? (
                  <textarea
                    value={medicalInfo.allergies}
                    onChange={(e) => setMedicalInfo({ allergies: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-red-300 rounded-xl focus:border-red-500 focus:outline-none resize-none text-red-700"
                    rows={3}
                  />
                ) : (
                  <div className="text-red-600 whitespace-pre-line">{medicalInfo.allergies}</div>
                )}
              </div>
            </div>
            <button
              onClick={() => isEditingMedical ? handleSaveMedical() : setIsEditingMedical(true)}
              className="ml-2 p-2 bg-red-200 rounded-full hover:bg-red-300 transition-colors"
            >
              <Edit className="w-4 h-4 text-red-700" />
            </button>
          </div>
        </div>

        {/* Parent Contact */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-800 mb-4">Parent Contact</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-800">{child.parentName || 'Sarah Wilson'}</p>
                <p className="text-gray-500">Mother</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCall}
                className="flex-1 flex items-center gap-3 p-3 bg-green-100 rounded-xl hover:bg-green-200 transition-colors"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700">{child.parentPhone || '+1 (555) 123-4567'}</p>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleMessage}
                className="flex-1 flex items-center gap-3 p-3 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700">Send Message</p>
              </button>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-gray-700">sarah.wilson@email.com</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-gray-800 mb-4">Quick Actions</h2>
        <button
          onClick={() => onNavigate('dailyNotes', child)}
          className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <p className="text-gray-800 flex-1 text-left">Daily Notes</p>
        </button>
      </div>
    </div>
  );
}