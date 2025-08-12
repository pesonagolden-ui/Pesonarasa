import React, { useState } from 'react';
import { ArrowLeft, CreditCard, QrCode } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQRIS, setShowQRIS] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const totalPrice = getTotalPrice();

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowQRIS(true);
    }, 1000);
  };

  const handlePaymentComplete = () => {
    // Simulate payment completion
    setTimeout(() => {
      clearCart();
      setOrderComplete(true);
    }, 2000);
  };

  if (!user) {
    onNavigate('login');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pesanan Berhasil!</h2>
          <p className="text-gray-600 mb-8">
            Terima kasih telah berbelanja. Pesanan Anda akan segera diproses dan dikirim.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (showQRIS) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <QrCode className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan QR Code untuk Pembayaran</h2>
              <p className="text-gray-600">
                Scan QR code di bawah dengan aplikasi mobile banking atau e-wallet Anda
              </p>
            </div>

            {/* Mock QRIS Code */}
            <div className="bg-gray-100 rounded-lg p-8 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200">
                  <rect width="200" height="200" fill="white"/>
                  {/* Mock QR pattern */}
                  <g fill="black">
                    <rect x="0" y="0" width="20" height="20"/>
                    <rect x="20" y="0" width="20" height="20"/>
                    <rect x="60" y="0" width="20" height="20"/>
                    <rect x="80" y="0" width="20" height="20"/>
                    <rect x="100" y="0" width="20" height="20"/>
                    <rect x="120" y="0" width="20" height="20"/>
                    <rect x="160" y="0" width="20" height="20"/>
                    <rect x="180" y="0" width="20" height="20"/>
                    <rect x="0" y="20" width="20" height="20"/>
                    <rect x="140" y="20" width="20" height="20"/>
                    <rect x="180" y="20" width="20" height="20"/>
                    <rect x="0" y="40" width="20" height="20"/>
                    <rect x="40" y="40" width="20" height="20"/>
                    <rect x="60" y="40" width="20" height="20"/>
                    <rect x="80" y="40" width="20" height="20"/>
                    <rect x="140" y="40" width="20" height="20"/>
                    <rect x="180" y="40" width="20" height="20"/>
                  </g>
                  <text x="100" y="190" textAnchor="middle" fontSize="10" fill="black">
                    QRIS - Rp {totalPrice.toLocaleString('id-ID')}
                  </text>
                </svg>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-lg font-semibold text-blue-900 mb-2">
                Total Pembayaran: Rp {totalPrice.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-blue-700">
                Kode pembayaran akan expired dalam 10 menit
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowQRIS(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handlePaymentComplete}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Saya Sudah Bayar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali ke Keranjang
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pelanggan</h2>
              <div className="flex items-center space-x-4">
                {user.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-12 w-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Alamat Pengiriman</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan alamat lengkap..."
                    defaultValue="Jl. Contoh No. 123, Kelurahan ABC, Kecamatan XYZ, Kota Jakarta Selatan, DKI Jakarta 12345"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="08xxxxxxxxx"
                      defaultValue="081234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12345"
                      defaultValue="12345"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pesanan Anda</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-gray-900">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ongkir</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-blue-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Metode Pembayaran</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input type="radio" name="payment" value="qris" className="mr-3" defaultChecked />
                  <QrCode className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">QRIS</div>
                    <div className="text-sm text-gray-600">Scan QR dengan mobile banking atau e-wallet</div>
                  </div>
                </label>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}