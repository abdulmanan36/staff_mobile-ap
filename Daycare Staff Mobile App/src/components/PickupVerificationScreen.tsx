import { ArrowLeft, Camera, CheckCircle, User, Phone, Shield } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PickupVerificationScreenProps {
  onNavigate: (screen: string) => void;
}

const mockChildren = [
  {
    id: 1,
    name: 'Emma Wilson',
    photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop',
    authorizedPersons: [
      { id: 1, name: 'Sarah Wilson', relation: 'Mother', phone: '+1 (555) 123-4567', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { id: 2, name: 'John Wilson', relation: 'Father', phone: '+1 (555) 123-4568', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { id: 3, name: 'Margaret Smith', relation: 'Grandmother', phone: '+1 (555) 123-4569', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    ]
  },
];

export function PickupVerificationScreen({ onNavigate }: PickupVerificationScreenProps) {
  const [selectedChild] = useState(mockChildren[0]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const handleVerifyPickup = () => {
    if (!selectedPerson) {
      alert('Please select who picked up the child');
      return;
    }
    const person = selectedChild.authorizedPersons.find(p => p.id === selectedPerson);
    alert(`Pickup verified: ${selectedChild.name} picked up by ${person?.name} at ${new Date().toLocaleTimeString()}`);
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white">Pickup Verification</h1>
        </div>

        {/* Security Notice */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
          <Shield className="w-6 h-6 text-white flex-shrink-0" />
          <p className="text-white text-sm">Only authorized persons can pick up children</p>
        </div>
      </div>

      <div className="p-6">
        {/* Child Info */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-800 mb-4">Child Information</h2>
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src={selectedChild.photo}
              alt={selectedChild.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-800">{selectedChild.name}</p>
              <p className="text-gray-500">Ready for pickup</p>
            </div>
          </div>
        </div>

        {/* Authorized Persons */}
        <h2 className="text-gray-800 mb-4">Authorized Persons</h2>
        <div className="space-y-3 mb-6">
          {selectedChild.authorizedPersons.map((person) => (
            <button
              key={person.id}
              onClick={() => setSelectedPerson(person.id)}
              className={`w-full bg-white rounded-2xl p-4 shadow-md transition-all ${
                selectedPerson === person.id
                  ? 'ring-2 ring-yellow-400 bg-yellow-50'
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ImageWithFallback
                    src={person.photo}
                    alt={person.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {selectedPerson === person.id && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800">{person.name}</p>
                  <p className="text-gray-500 text-sm">{person.relation}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-600 text-sm">{person.phone}</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Capture Photo */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-800 mb-4">Capture Photo (Optional)</h2>
          <button className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-yellow-400 transition-colors">
            <Camera className="w-10 h-10 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600">Take Photo for Record</p>
          </button>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <label className="block text-gray-700 mb-3">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special notes about pickup..."
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none resize-none"
          />
        </div>

        {/* Pickup Time Display */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
          <p className="text-yellow-800 text-center">
            Pickup Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyPickup}
          disabled={!selectedPerson}
          className={`w-full py-4 rounded-2xl transition-all ${
            selectedPerson
              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle className="w-5 h-5 inline mr-2" />
          Verify Pickup
        </button>
      </div>
    </div>
  );
}
