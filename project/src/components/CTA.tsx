import React from 'react';
import { Phone, Mail, MapPin, Snowflake } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Main CTA */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md rounded-3xl border border-white/20 p-12 md:p-16 text-center mb-16 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <Snowflake className="w-16 h-16 text-cyan-400 mx-auto mb-6 animate-spin-slow" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              Siap Merasakan Kelezatan?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pelanggan yang telah merasakan kelezatan produk Pesona Rasa
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 glow-button">
                Mulai Berbelanja
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-semibold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Phone,
              title: 'Telepon',
              info: '+62 812-3456-7890',
              description: 'Layanan pelanggan 24/7'
            },
            {
              icon: Mail,
              title: 'Email',
              info: 'info@pesonarasa.com',
              description: 'Respon cepat dalam 1 jam'
            },
            {
              icon: MapPin,
              title: 'Alamat',
              info: 'Jakarta, Indonesia',
              description: 'Pengiriman ke seluruh nusantara'
            }
          ].map((contact, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:bg-white/10"
            >
              <contact.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{contact.title}</h3>
              <p className="text-cyan-300 font-medium mb-2">{contact.info}</p>
              <p className="text-white/60 text-sm">{contact.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60">
            © 2025 Pesona Rasa. Semua hak dilindungi. Dibuat dengan ❄️ untuk kelezatan terbaik.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;