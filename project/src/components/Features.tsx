import React from 'react';
import { Snowflake, Shield, Clock, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Snowflake,
      title: 'Teknologi Pembekuan Terdepan',
      description: 'Sistem pembekuan cepat yang menjaga tekstur dan nutrisi makanan tetap optimal'
    },
    {
      icon: Shield,
      title: 'Terjamin Halal & Aman',
      description: 'Semua produk telah tersertifikasi halal dan lolos standar keamanan pangan'
    },
    {
      icon: Clock,
      title: 'Siap Saji Dalam Menit',
      description: 'Proses pemasakan yang cepat tanpa mengurangi kualitas dan cita rasa'
    },
    {
      icon: Award,
      title: 'Kualitas Premium',
      description: 'Bahan-bahan pilihan terbaik dengan standar kualitas internasional'
    }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Mengapa Pilih Pesona Rasa?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Komitmen kami untuk memberikan yang terbaik dalam setiap produk frozen food
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/10"
            >
              {/* Icon */}
              <div className="mb-6 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 bg-cyan-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;