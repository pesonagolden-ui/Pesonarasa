import React from 'react';
import { ArrowRight, Snowflake, Clock, Shield, Truck } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fresh <span className="text-blue-200">Frozen</span> Food
              <br />
              <span className="text-3xl md:text-5xl">Delivered to You!</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Nikmati berbagai pilihan frozen food berkualitas tinggi dengan cita rasa autentik. 
              Nugget, otak-otak, bakso, dan kaki naga terbaik untuk keluarga Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('products')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Belanja Sekarang</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Lihat Katalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Snowflake className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Fresh</h3>
              <p className="text-gray-600">
                Produk frozen food terjaga kualitas dan kesegarannya dengan sistem cold chain terpercaya
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Delivery</h3>
              <p className="text-gray-600">
                Pengiriman cepat dan tepat waktu ke seluruh Indonesia dengan packaging yang aman
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Semua produk telah lulus sertifikasi HACCP dan halal untuk menjamin kualitas terbaik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produk Unggulan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilihan terbaik frozen food berkualitas tinggi yang paling disukai pelanggan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('products')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Untuk Berbelanja?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelanggan yang telah mempercayai FrozenMart 
            untuk kebutuhan frozen food berkualitas
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center space-x-2"
          >
            <Truck className="h-5 w-5" />
            <span>Mulai Belanja</span>
          </button>
        </div>
      </section>
    </div>
  );
}