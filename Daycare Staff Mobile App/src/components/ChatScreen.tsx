import { ArrowLeft, Send, Camera, Mic, Image as ImageIcon, Smile } from 'lucide-react';
import { useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatScreenProps {
  parent: any;
  onNavigate: (screen: string) => void;
}

interface Message {
  id: number;
  sender: 'staff' | 'parent';
  type: 'text' | 'photo' | 'voice';
  content: string;
  time: string;
}

export function ChatScreen({ parent, onNavigate }: ChatScreenProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'parent',
      type: 'text',
      content: 'Hi! How is Emma doing today?',
      time: '9:30 AM',
    },
    {
      id: 2,
      sender: 'staff',
      type: 'text',
      content: 'Good morning! Emma is doing great! She had a wonderful breakfast and is now enjoying arts and crafts.',
      time: '9:35 AM',
    },
    {
      id: 3,
      sender: 'staff',
      type: 'photo',
      content: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=300&fit=crop',
      time: '10:15 AM',
    },
    {
      id: 4,
      sender: 'parent',
      type: 'text',
      content: 'Thank you so much! She looks so happy 😊',
      time: '10:20 AM',
    },
    {
      id: 5,
      sender: 'staff',
      type: 'voice',
      content: 'Voice message (0:12)',
      time: '11:05 AM',
    },
  ]);

  if (!parent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No chat selected</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'staff',
      type: 'text',
      content: message,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleSendPhoto = () => {
    alert('Photo picker would open here');
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'staff',
      type: 'photo',
      content: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=300&h=300&fit=crop',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop recording
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'staff',
        type: 'voice',
        content: 'Voice message (0:05)',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-b-[2rem] p-6 pb-6 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('chatList')}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <ImageWithFallback
            src={parent.parentPhoto || parent.photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
            alt={parent.parentName || parent.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
          <div className="flex-1">
            <p className="text-white">{parent.parentName || parent.name}</p>
            <p className="text-white/90">{parent.childName}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl p-4 ${
                msg.sender === 'staff'
                  ? 'bg-blue-500 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 rounded-bl-sm shadow-md'
              }`}
            >
              {msg.type === 'text' && (
                <p>{msg.content}</p>
              )}
              {msg.type === 'photo' && (
                <div>
                  <ImageWithFallback
                    src={msg.content}
                    alt="Shared photo"
                    className="w-full rounded-xl mb-2"
                  />
                </div>
              )}
              {msg.type === 'voice' && (
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    msg.sender === 'staff' ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    <Mic className={`w-5 h-5 ${
                      msg.sender === 'staff' ? 'text-white' : 'text-gray-700'
                    }`} />
                  </div>
                  <div className="flex-1 h-8 bg-white/20 rounded-full flex items-center px-3">
                    <div className="h-1 bg-white rounded-full w-full"></div>
                  </div>
                  <p className="text-xs">{msg.content}</p>
                </div>
              )}
              <p className={`text-xs mt-2 ${
                msg.sender === 'staff' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSendPhoto}
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
          
          {isRecording ? (
            <div className="flex-1 bg-red-50 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-600">Recording...</p>
            </div>
          ) : (
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          {message.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button
              onClick={handleToggleRecording}
              className={`p-3 rounded-full transition-colors ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              <Mic className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}