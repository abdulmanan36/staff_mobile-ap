import { ArrowLeft, Clock, Users, Utensils, Sun, Book, Music, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';

interface ScheduleScreenProps {
  onNavigate: (screen: string) => void;
}

interface ScheduleEvent {
  id: number;
  time: string;
  activity: string;
  icon: any;
  color: string;
}

const defaultSchedule: ScheduleEvent[] = [
  { id: 1, time: '7:00 AM - 8:30 AM', activity: 'Arrival & Free Play', icon: Users, color: 'from-blue-400 to-blue-500' },
  { id: 2, time: '8:30 AM - 9:00 AM', activity: 'Breakfast Time', icon: Utensils, color: 'from-green-400 to-green-500' },
  { id: 3, time: '9:00 AM - 10:00 AM', activity: 'Circle Time & Learning', icon: Book, color: 'from-purple-400 to-purple-500' },
  { id: 4, time: '10:00 AM - 10:30 AM', activity: 'Snack Time', icon: Utensils, color: 'from-green-400 to-green-500' },
  { id: 5, time: '10:30 AM - 11:30 AM', activity: 'Outdoor Play', icon: Sun, color: 'from-yellow-400 to-yellow-500' },
  { id: 6, time: '11:30 AM - 12:30 PM', activity: 'Lunch Time', icon: Utensils, color: 'from-green-400 to-green-500' },
  { id: 7, time: '12:30 PM - 2:30 PM', activity: 'Nap Time', icon: Clock, color: 'from-indigo-400 to-indigo-500' },
  { id: 8, time: '2:30 PM - 3:00 PM', activity: 'Afternoon Snack', icon: Utensils, color: 'from-green-400 to-green-500' },
  { id: 9, time: '3:00 PM - 4:00 PM', activity: 'Music & Arts', icon: Music, color: 'from-pink-400 to-pink-500' },
  { id: 10, time: '4:00 PM - 4:30 PM', activity: 'Story Time', icon: Book, color: 'from-purple-400 to-purple-500' },
  { id: 11, time: '4:30 PM - 6:00 PM', activity: 'Free Play & Pick Up', icon: Users, color: 'from-blue-400 to-blue-500' },
];

const iconOptions = [
  { name: 'Users', icon: Users },
  { name: 'Utensils', icon: Utensils },
  { name: 'Book', icon: Book },
  { name: 'Sun', icon: Sun },
  { name: 'Music', icon: Music },
  { name: 'Clock', icon: Clock },
];

const colorOptions = [
  { name: 'Blue', value: 'from-blue-400 to-blue-500' },
  { name: 'Green', value: 'from-green-400 to-green-500' },
  { name: 'Purple', value: 'from-purple-400 to-purple-500' },
  { name: 'Yellow', value: 'from-yellow-400 to-yellow-500' },
  { name: 'Pink', value: 'from-pink-400 to-pink-500' },
  { name: 'Red', value: 'from-red-400 to-red-500' },
];

export function ScheduleScreen({ onNavigate }: ScheduleScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleEvent[]>(defaultSchedule);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
  const [formData, setFormData] = useState({
    time: '',
    activity: '',
    icon: 'Users',
    color: 'from-blue-400 to-blue-500'
  });

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleAddEvent = () => {
    const IconComponent = iconOptions.find(i => i.name === formData.icon)?.icon || Users;
    const newEvent: ScheduleEvent = {
      id: schedule.length + 1,
      time: formData.time,
      activity: formData.activity,
      icon: IconComponent,
      color: formData.color
    };
    setSchedule([...schedule, newEvent].sort((a, b) => a.time.localeCompare(b.time)));
    setShowAddForm(false);
    setFormData({ time: '', activity: '', icon: 'Users', color: 'from-blue-400 to-blue-500' });
  };

  const handleEditEvent = (event: ScheduleEvent) => {
    setEditingEvent(event);
    setFormData({
      time: event.time,
      activity: event.activity,
      icon: iconOptions.find(i => i.icon === event.icon)?.name || 'Users',
      color: event.color
    });
    setShowAddForm(true);
  };

  const handleUpdateEvent = () => {
    if (editingEvent) {
      const IconComponent = iconOptions.find(i => i.name === formData.icon)?.icon || Users;
      const updatedSchedule = schedule.map(event =>
        event.id === editingEvent.id
          ? { ...event, time: formData.time, activity: formData.activity, icon: IconComponent, color: formData.color }
          : event
      );
      setSchedule(updatedSchedule.sort((a, b) => a.time.localeCompare(b.time)));
      setShowAddForm(false);
      setEditingEvent(null);
      setFormData({ time: '', activity: '', icon: 'Users', color: 'from-blue-400 to-blue-500' });
    }
  };

  const handleDeleteEvent = (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setSchedule(schedule.filter(event => event.id !== id));
    }
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingEvent(null);
    setFormData({ time: '', activity: '', icon: 'Users', color: 'from-blue-400 to-blue-500' });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-b-[2rem] p-6 pb-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-white">Schedule</h1>
          </div>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <CalendarIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Date Navigation */}
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
          <button onClick={handlePrevDay} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <p className="text-gray-800">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <button onClick={handleNextDay} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Add Event Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full mb-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Event
        </button>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
            <h2 className="text-gray-800 mb-4">{editingEvent ? 'Edit Event' : 'New Event'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Time</label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="e.g., 9:00 AM - 10:00 AM"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Activity</label>
                <input
                  type="text"
                  value={formData.activity}
                  onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                  placeholder="e.g., Music Time"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Icon</label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: option.name })}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.icon === option.name
                            ? 'border-yellow-400 bg-yellow-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto text-gray-700" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: option.value })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.color === option.value
                          ? 'border-gray-800 scale-105'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className={`w-full h-8 rounded-lg bg-gradient-to-br ${option.value}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelForm}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
                  className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl hover:shadow-lg transition-shadow"
                >
                  {editingEvent ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Daily Timetable */}
        <h2 className="text-gray-800 mb-4">Daily Timetable</h2>
        <div className="space-y-3">
          {schedule.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">{item.activity}</p>
                    <p className="text-gray-500">{item.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditEvent(item)}
                      className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(item.id)}
                      className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
