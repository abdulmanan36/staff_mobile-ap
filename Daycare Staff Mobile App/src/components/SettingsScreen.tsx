import { ArrowLeft, User, Bell, Lock, LogOut, ChevronRight } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SettingsScreenProps {
  staffName: string;
  staffPhoto: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function SettingsScreen({ staffName, staffPhoto, onNavigate, onLogout }: SettingsScreenProps) {
  const handleEditProfile = () => {
    alert('Edit Profile feature would open here');
  };

  const handleNotifications = () => {
    alert('Notification Settings would open here');
  };

  const handleChangePassword = () => {
    alert('Change Password feature would open here');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <h1 className="text-white mb-6">Settings</h1>

        {/* Profile Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4">
          <ImageWithFallback
            src={staffPhoto}
            alt={staffName}
            className="w-16 h-16 rounded-full object-cover border-4 border-white"
          />
          <div className="flex-1">
            <p className="text-white">{staffName}</p>
            <p className="text-white/80">Daycare Staff</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Edit Profile */}
        <button
          onClick={handleEditProfile}
          className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-800">Edit Profile</p>
            <p className="text-gray-500">Update your personal information</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Notifications */}
        <button
          onClick={handleNotifications}
          className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-800">Notifications</p>
            <p className="text-gray-500">Manage notification preferences</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Change Password */}
        <button
          onClick={handleChangePassword}
          className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-800">Change Password</p>
            <p className="text-gray-500">Update your account password</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 border-2 border-red-200"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center">
            <LogOut className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-red-600">Logout</p>
            <p className="text-gray-500">Sign out of your account</p>
          </div>
          <ChevronRight className="w-5 h-5 text-red-400" />
        </button>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-5 shadow-md mt-8">
          <p className="text-gray-500 text-center">Daycare Staff App</p>
          <p className="text-gray-400 text-center">Version 1.0.0</p>
        </div>
      </div>

      <BottomNav currentScreen="settings" onNavigate={onNavigate} />
    </div>
  );
}