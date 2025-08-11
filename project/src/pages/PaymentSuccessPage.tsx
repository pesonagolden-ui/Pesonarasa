import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Home, FileText, ArrowRight } from 'lucide-react';
import { xendithPayment } from '../services/xendithPayment';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const orderId = searchParams.get('order_id');
  const invoiceId = searchParams.get('invoice_id');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (invoiceId) {
        try {
          const status = await xendithPayment.getPaymentStatus(invoiceId);
          setPaymentDetails(status);
        } catch (error) {
          console.error('Error fetching payment details:', error);
        }
      }
      setIsLoading(false);
    };

    fetchPaymentDetails();
  }, [invoiceId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-white mb-4">Pembayaran Berhasil!</h1>
          <p className="text-white/70 mb-8">
            Terima kasih atas pembelian Anda. Pesanan sedang diproses dan akan segera dikirim.
          </p>

          {/* Payment Details */}
          {!isLoading && paymentDetails && (
            <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
              <h3 className="text-white font-semibold mb-3">Detail Pembayaran</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Order ID:</span>
                  <span className="text-white">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Invoice ID:</span>
                  <span className="text-white">{paymentDetails.invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Jumlah:</span>
                  <span className="text-cyan-400 font-bold">Rp {paymentDetails.amount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Status:</span>
                  <span className="text-green-400">Lunas</span>
                </div>
                {paymentDetails.paidAt && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Dibayar pada:</span>
                    <span className="text-white">{new Date(paymentDetails.paidAt).toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              <span>Kembali ke Dashboard</span>
            </button>
            
            <button
              onClick={() => navigate('/dashboard/billing')}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <FileText className="w-5 h-5" />
              <span>Lihat Riwayat Transaksi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              Belanja Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
