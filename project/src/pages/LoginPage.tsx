import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Snowflake, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      login(); // Set authentication state
      navigate('/dashboard'); // Redirect to dashboard
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-food-1 absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-300/20 to-cyan-400/20 rounded-full backdrop-blur-sm border border-white/10"></div>
        <div className="floating-food-2 absolute top-40 right-16 w-16 h-16 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full backdrop-blur-sm border border-white/10"></div>
        <div className="floating-food-3 absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-full backdrop-blur-sm border border-white/10"></div>
        <div className="floating-food-4 absolute bottom-20 right-10 w-18 h-18 bg-gradient-to-br from-cyan-400/20 to-blue-300/20 rounded-full backdrop-blur-sm border border-white/10"></div>
      </div>

      {/* Snow Particles */}
      <div className="snow-container absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`snow-particle snow-${i % 3 + 1}`}></div>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="absolute top-8 left-8 flex items-center space-x-2 text-white/80 hover:text-cyan-400 transition-colors duration-300 z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali</span>
      </button>

      {/* Login Form */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="relative">
                <Snowflake className="w-10 h-10 text-cyan-400 animate-spin-slow" />
                <div className="absolute inset-0 blur-sm bg-cyan-400/30 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                Pesona Rasa
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Selamat Datang</h2>
            <p className="text-white/70">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-cyan-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Masuk...</span>
                </div>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Belum punya akun?{' '}
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
