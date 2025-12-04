import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: string) => void;
}

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-gray-800 mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-8">
            We've sent password reset instructions to {email}
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="w-full py-4 bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-2xl hover:shadow-lg transition-shadow"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate('login')}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="ml-4 text-gray-800">Forgot Password</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@daycare.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-2xl hover:shadow-lg transition-shadow"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
