import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Snowflake, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack }) => {
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
      alert('Login berhasil! Selamat datang di Pesona Rasa');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        onClick={onBack}
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
              <label className="block text-white/80 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-cyan-400 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-400/50"
                />
                <span className="text-white/70 text-sm">Ingat saya</span>
              </label>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-300">
                Lupa password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 glow-button disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/50 text-sm">atau</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
              <div className="w-5 h-5 bg-white rounded-full"></div>
              <span>Masuk dengan Google</span>
            </button>
            <button className="w-full py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
              <div className="w-5 h-5 bg-blue-600 rounded"></div>
              <span>Masuk dengan Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              Belum punya akun?{' '}
              <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300">
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-white/50 text-sm">
            Dengan masuk, Anda menyetujui{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
              Syarat & Ketentuan
            </a>{' '}
            dan{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
              Kebijakan Privasi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;