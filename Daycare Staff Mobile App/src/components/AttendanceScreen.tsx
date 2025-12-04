import { ArrowLeft, Plus, Calendar as CalendarIcon, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AttendanceScreenProps {
  roomName: string;
  onNavigate: (screen: string) => void;
}

interface AttendanceRecord {
  id: number;
  date: string;
  presentCount: number;
  absentCount: number;
  totalCount: number;
  timeFrom: string;
  timeTo: string;
}

interface ChildAttendance {
  id: number;
  name: string;
  photo: string;
  status: 'present' | 'absent' | null;
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    presentCount: 6,
    absentCount: 2,
    totalCount: 8,
    timeFrom: '8:00 AM',
    timeTo: '9:30 AM',
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    presentCount: 7,
    absentCount: 1,
    totalCount: 8,
    timeFrom: '8:00 AM',
    timeTo: '9:15 AM',
  },
  {
    id: 3,
    date: new Date(Date.now() - 172800000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    presentCount: 8,
    absentCount: 0,
    totalCount: 8,
    timeFrom: '8:00 AM',
    timeTo: '9:00 AM',
  },
];

const mockChildren = [
  { id: 1, name: 'Emma Wilson', photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop' },
  { id: 2, name: 'Oliver Brown', photo: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=100&h=100&fit=crop' },
  { id: 3, name: 'Sophia Davis', photo: 'https://images.unsplash.com/photo-1518990013801-39976c49e6fd?w=100&h=100&fit=crop' },
  { id: 4, name: 'Liam Martinez', photo: 'https://images.unsplash.com/photo-1504570126050-8f35f8c3f1f6?w=100&h=100&fit=crop' },
  { id: 5, name: 'Ava Anderson', photo: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=100&h=100&fit=crop' },
  { id: 6, name: 'Noah Johnson', photo: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=100&h=100&fit=crop' },
  { id: 7, name: 'Isabella Garcia', photo: 'https://images.unsplash.com/photo-1488656491611-27af00c5a7e3?w=100&h=100&fit=crop' },
  { id: 8, name: 'Ethan Taylor', photo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100&h=100&fit=crop' },
];

export function AttendanceScreen({ roomName, onNavigate }: AttendanceScreenProps) {
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeFrom, setTimeFrom] = useState('08:00');
  const [timeTo, setTimeTo] = useState('09:30');
  const [editingRecordId, setEditingRecordId] = useState<number | null>(null);
  const [attendance, setAttendance] = useState<ChildAttendance[]>(
    mockChildren.map(child => ({
      id: child.id,
      name: child.name,
      photo: child.photo,
      status: null,
    }))
  );

  const handleToggleStatus = (childId: number, status: 'present' | 'absent') => {
    setAttendance(prev =>
      prev.map(record =>
        record.id === childId
          ? { ...record, status: record.status === status ? null : status }
          : record
      )
    );
  };

  const handleMarkAllPresent = () => {
    setAttendance(prev => prev.map(record => ({ ...record, status: 'present' as const })));
  };

  const handleMarkAllAbsent = () => {
    setAttendance(prev => prev.map(record => ({ ...record, status: 'absent' as const })));
  };

  const handleSaveAttendance = () => {
    const hasUnmarked = attendance.some(a => a.status === null);
    if (hasUnmarked) {
      alert('Please mark attendance for all children');
      return;
    }
    alert('Attendance saved successfully!');
    setShowMarkAttendance(false);
    setEditingRecordId(null);
  };

  const handleEditRecord = (record: AttendanceRecord) => {
    setEditingRecordId(record.id);
    setShowMarkAttendance(true);
    // In a real app, load the actual attendance data for this record
    // For now, just set some random data
    setAttendance(prev => prev.map((child, index) => ({
      ...child,
      status: index < record.presentCount ? 'present' as const : 'absent' as const,
    })));
  };

  const presentCount = attendance.filter(a => a.status === 'present').length;
  const absentCount = attendance.filter(a => a.status === 'absent').length;

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleSelectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  if (showMarkAttendance) {
    return (
      <div className="min-h-screen pb-24 bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-b-[2rem] p-6 pb-6 shadow-lg">
          <div className="flex items-center mb-4">
            <button
              onClick={() => {
                setShowMarkAttendance(false);
                setEditingRecordId(null);
              }}
              className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-white">{editingRecordId ? 'Edit Attendance' : 'Mark Attendance'}</h1>
          </div>
        </div>

        <div className="p-6">
          {/* Date and Time Selection */}
          <div className="bg-white rounded-2xl p-5 shadow-md mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Date</label>
              <div className="relative">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none flex items-center justify-between bg-white"
                >
                  <span className="text-gray-800">
                    {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                </button>

                {/* Calendar Dropdown */}
                {showCalendar && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-lg p-4 z-10 border-2 border-gray-200">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <p className="text-gray-800">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                      <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>

                    {/* Day Labels */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                        <div key={day} className="text-center text-gray-500 text-sm">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-2">
                      {emptyDays.map((_, index) => (
                        <div key={`empty-${index}`} />
                      ))}
                      {days.map((day) => {
                        const isSelected = 
                          selectedDate.getDate() === day &&
                          selectedDate.getMonth() === currentMonth.getMonth() &&
                          selectedDate.getFullYear() === currentMonth.getFullYear();
                        
                        return (
                          <button
                            key={day}
                            onClick={() => handleSelectDate(day)}
                            className={`p-2 rounded-full text-sm transition-colors ${
                              isSelected
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-100 text-gray-800'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Time Period</label>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-2xl p-5 shadow-md mb-6">
            {/* Header Row */}
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 pb-3 border-b-2 border-gray-200 mb-4">
              <p className="text-gray-700">Name List</p>
              <div className="flex flex-col items-center gap-2">
                <p className="text-gray-700">Present</p>
                <button
                  onClick={handleMarkAllPresent}
                  className="w-8 h-8 rounded-full border-4 bg-green-500 border-green-500 hover:scale-110 transition-transform"
                  title="Mark all present"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-gray-700">Absent</p>
                <button
                  onClick={handleMarkAllAbsent}
                  className="w-8 h-8 rounded-full border-4 bg-red-500 border-red-500 hover:scale-110 transition-transform"
                  title="Mark all absent"
                />
              </div>
            </div>

            {/* Children Rows */}
            <div className="space-y-3">
              {attendance.map((child) => (
                <div key={child.id} className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-center py-2">
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={child.photo}
                      alt={child.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="text-gray-800">{child.name}</p>
                  </div>
                  
                  {/* Present Bubble */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleToggleStatus(child.id, 'present')}
                      className={`w-8 h-8 rounded-full border-4 transition-all ${
                        child.status === 'present'
                          ? 'bg-green-500 border-green-500'
                          : 'bg-white border-gray-300 hover:border-green-400'
                      }`}
                    />
                  </div>
                  
                  {/* Absent Bubble */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleToggleStatus(child.id, 'absent')}
                      className={`w-8 h-8 rounded-full border-4 transition-all ${
                        child.status === 'absent'
                          ? 'bg-red-500 border-red-500'
                          : 'bg-white border-gray-300 hover:border-red-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-5 shadow-md mb-6 text-white">
            <div className="flex justify-between items-center mb-2">
              <p className="text-white/90">Present:</p>
              <p>{presentCount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-white/90">Absent:</p>
              <p>{absentCount}</p>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveAttendance}
            className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-xl hover:shadow-lg transition-shadow"
          >
            {editingRecordId ? 'Update Attendance' : 'Save Attendance'}
          </button>
        </div>

        <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
      </div>
    );
  }

  // Main Attendance List View
  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-b-[2rem] p-6 pb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-white">Attendance</h1>
              <p className="text-white/90">{roomName}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowMarkAttendance(true);
              // Reset attendance for new entry
              setAttendance(mockChildren.map(child => ({
                id: child.id,
                name: child.name,
                photo: child.photo,
                status: null,
              })));
            }}
            className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-gray-800 mb-4">Attendance Records</h2>
        
        <div className="space-y-4">
          {mockAttendanceRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-2xl p-5 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="text-gray-800">{record.date}</p>
                  <p className="text-gray-500">
                    {record.timeFrom} - {record.timeTo}
                  </p>
                </div>
                <button
                  onClick={() => handleEditRecord(record)}
                  className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <Edit className="w-5 h-5 text-blue-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-500">Total</p>
                  <p className="text-gray-800">{record.totalCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-green-500">Present</p>
                  <p className="text-green-700">{record.presentCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-red-500">Absent</p>
                  <p className="text-red-700">{record.absentCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}