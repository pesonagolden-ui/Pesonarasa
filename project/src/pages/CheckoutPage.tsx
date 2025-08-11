import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building, CheckCircle, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { xendithPayment, PaymentRequest } from '../services/xendithPayment';
import { v4 as uuidv4 } from 'uuid';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const paymentMethods = [
    { id: 'dana', name: 'DANA', icon: Smartphone, description: 'Bayar dengan DANA' },
    { id: 'ovo', name: 'OVO', icon: Smartphone, description: 'Bayar dengan OVO' },
    { id: 'gopay', name: 'GoPay', icon: Smartphone, description: 'Bayar dengan GoPay' },
    { id: 'shopeepay', name: 'ShopeePay', icon: Smartphone, description: 'Bayar dengan ShopeePay' },
    { id: 'bca', name: 'BCA Virtual Account', icon: Building, description: 'Transfer via BCA VA' },
    { id: 'mandiri', name: 'Mandiri Virtual Account', icon: Building, description: 'Transfer via Mandiri VA' },
    { id: 'bni', name: 'BNI Virtual Account', icon: Building, description: 'Transfer via BNI VA' },
    { id: 'credit_card', name: 'Kartu Kredit/Debit', icon: CreditCard, description: 'Visa, Mastercard, JCB' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Lengkapi informasi customer terlebih dahulu');
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = `ORDER-${uuidv4()}`;
      const paymentRequest: PaymentRequest = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.description
        })),
        customer: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address
        },
        orderId,
        amount: totalAmount,
        currency: 'IDR',
        description: `Pesanan Pesona Rasa - ${items.length} item(s)`,
        successUrl: `${window.location.origin}/payment/success?order_id=${orderId}`,
        failureUrl: `${window.location.origin}/payment/failed?order_id=${orderId}`,
        callbackUrl: `${window.location.origin}/api/payment/callback`
      };

      const result = await xendithPayment.createInvoice(paymentRequest);

      if (result.success && result.paymentUrl) {
        // Clear cart and redirect to payment
        clearCart();
        window.location.href = result.paymentUrl;
      } else {
        throw new Error(result.error || 'Gagal membuat pembayaran');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(error.message || 'Terjadi kesalahan saat memproses pembayaran');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-white/70 mb-6">Silakan login terlebih dahulu untuk melakukan checkout</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Keranjang Kosong</h1>
          <p className="text-white/70 mb-6">Tambahkan produk ke keranjang untuk melakukan checkout</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            Lihat Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Ringkasan Pesanan</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-white/60 text-sm">{item.quantity}x Rp {item.price.toLocaleString()}</p>
                  </div>
                  <span className="text-cyan-400 font-bold">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-white/70">Total:</span>
                <span className="text-2xl font-bold text-cyan-400">
                  Rp {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Informasi Customer</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">No. Telepon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50"
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Alamat (Opsional)</label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 resize-none"
                    placeholder="Alamat lengkap untuk pengiriman"
                  />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Metode Pembayaran</h2>
              
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 ${
                      selectedPaymentMethod === method.id
                        ? 'border-cyan-400 bg-cyan-500/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <method.icon className="w-6 h-6 text-cyan-400" />
                    <div className="flex-1 text-left">
                      <p className="text-white font-medium">{method.name}</p>
                      <p className="text-white/60 text-sm">{method.description}</p>
                    </div>
                    {selectedPaymentMethod === method.id && (
                      <CheckCircle className="w-5 h-5 text-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing || !selectedPaymentMethod}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Memproses Pembayaran...</span>
                </div>
              ) : (
                `Bayar Sekarang - Rp ${totalAmount.toLocaleString()}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
