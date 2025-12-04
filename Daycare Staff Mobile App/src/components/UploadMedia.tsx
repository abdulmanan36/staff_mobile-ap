import { ArrowLeft, Upload, Camera, Video, Image as ImageIcon, X } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UploadMediaProps {
  child: any;
  onNavigate: (screen: string) => void;
}

interface MediaItem {
  id: number;
  type: 'photo' | 'video';
  url: string;
  caption: string;
  timestamp: string;
}

export function UploadMedia({ child, onNavigate }: UploadMediaProps) {
  const [caption, setCaption] = useState('');
  const [uploads, setUploads] = useState<MediaItem[]>([
    {
      id: 1,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
      caption: 'Playing with building blocks!',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&h=300&fit=crop',
      caption: 'Singing during music time 🎵',
      timestamp: '2:15 PM',
    },
  ]);

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No child selected</p>
      </div>
    );
  }

  const handlePhotoUpload = () => {
    alert('Photo upload feature would open camera/gallery here');
    // Simulate upload
    const newMedia: MediaItem = {
      id: uploads.length + 1,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1518990013801-39976c49e6fd?w=400&h=300&fit=crop',
      caption: caption || 'New photo',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setUploads([newMedia, ...uploads]);
    setCaption('');
  };

  const handleVideoUpload = () => {
    alert('Video upload feature would open camera/gallery here');
    // Simulate upload
    const newMedia: MediaItem = {
      id: uploads.length + 1,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1504570126050-8f35f8c3f1f6?w=400&h=300&fit=crop',
      caption: caption || 'New video',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setUploads([newMedia, ...uploads]);
    setCaption('');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this media?')) {
      setUploads(uploads.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen pb-8 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-b-[2rem] p-6 pb-6 shadow-lg">
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
              <h1 className="text-white">Upload Photo/Video</h1>
              <p className="text-white/90">{child.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-800 mb-4">Add Media</h2>
          
          {/* Caption Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Caption (optional)</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
            />
          </div>

          {/* Upload Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handlePhotoUpload}
              className="py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl hover:shadow-lg transition-shadow flex flex-col items-center justify-center gap-2"
            >
              <Camera className="w-6 h-6" />
              Take Photo
            </button>
            <button
              onClick={handleVideoUpload}
              className="py-4 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-xl hover:shadow-lg transition-shadow flex flex-col items-center justify-center gap-2"
            >
              <Video className="w-6 h-6" />
              Record Video
            </button>
          </div>
        </div>

        {/* Gallery */}
        <h2 className="text-gray-800 mb-4">Today's Media</h2>
        <div className="grid grid-cols-2 gap-4">
          {uploads.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md relative">
              <div className="relative">
                <ImageWithFallback
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-40 object-cover"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-gray-800" />
                    </div>
                  </div>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-gray-800 mb-1">{item.caption}</p>
                <p className="text-gray-500">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mt-6">
          <p className="text-blue-800">
            📸 Photos and videos are automatically shared with parents and stored in the child's daily report.
          </p>
        </div>
      </div>
    </div>
  );
}
