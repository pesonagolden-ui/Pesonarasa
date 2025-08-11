import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Filter
} from 'lucide-react';

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const billingStats = [
    {
      title: 'Saldo Saat Ini',
      value: 'Rp 1,250,000',
      change: '+5.2%',
      icon: DollarSign,
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Tagihan Bulan Ini',
      value: 'Rp 450,000',
      change: '+12.1%',
      icon: FileText,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'Total Transaksi',
      value: '156',
      change: '+8.7%',
      icon: CreditCard,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const recentInvoices = [
    {
      id: 'INV-001',
      date: '2025-01-10',
      amount: 'Rp 125,000',
      status: 'paid',
      description: 'Pembelian Produk Frozen Food'
    },
    {
      id: 'INV-002',
      date: '2025-01-08',
      amount: 'Rp 89,000',
      status: 'pending',
      description: 'Langganan Premium'
    },
    {
      id: 'INV-003',
      date: '2025-01-05',
      amount: 'Rp 156,000',
      status: 'paid',
      description: 'Pembelian Bulk Order'
    },
    {
      id: 'INV-004',
      date: '2025-01-03',
      amount: 'Rp 78,000',
      status: 'overdue',
      description: 'Biaya Pengiriman Express'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'credit',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'credit',
      last4: '8888',
      brand: 'Mastercard',
      expiry: '08/25',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'overdue':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Lunas';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Terlambat';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Pembayaran</h1>
          <p className="text-white/70">Kelola tagihan, pembayaran, dan riwayat transaksi Anda</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300">
          <Plus className="w-5 h-5" />
          <span>Tambah Metode Pembayaran</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {billingStats.map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-white/60 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        <div className="flex border-b border-white/20">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'invoices', label: 'Tagihan' },
            { id: 'payments', label: 'Metode Pembayaran' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Balance */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl p-6 border border-cyan-400/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Saldo Akun</h3>
                  <div className="text-3xl font-bold text-white mb-2">Rp 1,250,000</div>
                  <p className="text-cyan-300 text-sm mb-4">Tersedia untuk digunakan</p>
                  <button className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg transition-colors duration-300">
                    Top Up Saldo
                  </button>
                </div>

                {/* Next Payment */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Pembayaran Berikutnya</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="w-5 h-5 text-yellow-400" />
                    <span className="text-white">15 Januari 2025</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">Rp 89,000</div>
                  <p className="text-white/60 text-sm">Langganan Premium</p>
                </div>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Riwayat Tagihan</h3>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-300">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-300">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span>{getStatusText(invoice.status)}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{invoice.id}</p>
                        <p className="text-white/60 text-sm">{invoice.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{invoice.amount}</p>
                      <p className="text-white/60 text-sm">{new Date(invoice.date).toLocaleDateString('id-ID')}</p>
                    </div>
                    <button className="ml-4 p-2 text-cyan-400 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-all duration-300">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Metode Pembayaran</h3>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-white font-medium">{method.brand} •••• {method.last4}</p>
                          {method.isDefault && (
                            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-white/60 text-sm">Berakhir {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-cyan-400 hover:text-cyan-300 text-sm">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-red-400 hover:text-red-300 text-sm">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 border-2 border-dashed border-white/30 text-white/70 rounded-xl hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300">
                + Tambah Metode Pembayaran Baru
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
