import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, Home, RotateCcw, ArrowLeft } from 'lucide-react';

const PaymentFailedPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const orderId = searchParams.get('order_id');
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-white" />
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-white mb-4">Pembayaran Gagal</h1>
          <p className="text-white/70 mb-6">
            Maaf, pembayaran Anda tidak dapat diproses. Silakan coba lagi atau gunakan metode pembayaran lain.
          </p>

          {/* Error Details */}
          {(orderId || error) && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-left">
              <h3 className="text-red-400 font-semibold mb-2">Detail Error</h3>
              <div className="space-y-1 text-sm">
                {orderId && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Order ID:</span>
                    <span className="text-white">{orderId}</span>
                  </div>
                )}
                {error && (
                  <div>
                    <span className="text-white/60">Pesan Error:</span>
                    <p className="text-red-400 mt-1">{decodeURIComponent(error)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Coba Lagi</span>
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              <span>Kembali ke Dashboard</span>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center space-x-2 py-3 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/50 text-sm">
              Butuh bantuan? Hubungi customer service kami di{' '}
              <a href="mailto:support@pesonarasa.com" className="text-cyan-400 hover:text-cyan-300">
                support@pesonarasa.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
