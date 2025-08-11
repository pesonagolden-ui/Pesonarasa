import React from 'react';
import { ArrowRight, Star, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-food-1 absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-300/20 to-cyan-400/20 rounded-full backdrop-blur-sm border border-white/10"></div>
        <div className="floating-food-2 absolute top-40 right-16 w-16 h-16 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full backdrop-blur-sm border border-white/10"></div>
        <div className="floating-food-3 absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-full backdrop-blur-sm border border-white/10"></div>
        <div className="floating-food-4 absolute bottom-20 right-10 w-18 h-18 bg-gradient-to-br from-cyan-400/20 to-blue-300/20 rounded-full backdrop-blur-sm border border-white/10"></div>
      </div>

      {/* Snow Particles */}
      <div className="snow-container absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div key={i} className={`snow-particle snow-${i % 3 + 1}`}></div>
        ))}
      </div>

      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-white/90 text-sm">Premium Frozen Food Indonesia</span>
          <Zap className="w-4 h-4 text-cyan-400" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slide-up">
          <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Rasakan Kelezatan
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Frozen Food Premium!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
          Nikmati cita rasa autentik dalam setiap gigitan. Produk frozen food berkualitas tinggi 
          dengan teknologi pembekuan terdepan untuk menjaga kesegaran dan nutrisi.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 animate-slide-up-delay">
          <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 glow-button flex items-center space-x-2">
            <span>Jelajahi Produk</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-semibold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-cyan-400/50">
            Lihat Menu Lengkap
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
          {[
            { number: '1000+', label: 'Produk Berkualitas' },
            { number: '50K+', label: 'Pelanggan Puas' },
            { number: '24/7', label: 'Layanan Terpercaya' }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;