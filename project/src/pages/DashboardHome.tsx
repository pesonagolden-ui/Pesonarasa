import React from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign,
  Package,
  Star,
  Activity,
  Calendar
} from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    {
      title: 'Total Penjualan',
      value: 'Rp 2,450,000',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Pesanan Hari Ini',
      value: '24',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'Pelanggan Aktif',
      value: '1,234',
      change: '+5.1%',
      changeType: 'positive',
      icon: Users,
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'Produk Terjual',
      value: '89',
      change: '-2.3%',
      changeType: 'negative',
      icon: Package,
      color: 'from-orange-400 to-red-500'
    }
  ];

  const recentOrders = [
    { id: '#001', customer: 'Ahmad Rizki', product: 'Sosis Premium', amount: 'Rp 45,000', status: 'completed' },
    { id: '#002', customer: 'Siti Nurhaliza', product: 'Nugget Ayam', amount: 'Rp 35,000', status: 'processing' },
    { id: '#003', customer: 'Budi Santoso', product: 'Bakso Ikan', amount: 'Rp 40,000', status: 'pending' },
    { id: '#004', customer: 'Maya Sari', product: 'Dimsum Mix', amount: 'Rp 55,000', status: 'completed' },
  ];

  const topProducts = [
    { name: 'Sosis Premium', sales: 156, revenue: 'Rp 7,020,000', rating: 4.9 },
    { name: 'Nugget Ayam', sales: 134, revenue: 'Rp 4,690,000', rating: 4.8 },
    { name: 'Bakso Ikan', sales: 98, revenue: 'Rp 3,920,000', rating: 4.7 },
    { name: 'Dimsum Mix', sales: 87, revenue: 'Rp 4,785,000', rating: 4.9 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/70">Selamat datang kembali! Berikut ringkasan bisnis Anda hari ini.</p>
        </div>
        <div className="flex items-center space-x-2 text-white/60">
          <Calendar className="w-5 h-5" />
          <span>{new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${stat.changeType === 'negative' ? 'rotate-180' : ''}`} />
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-white/60 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Pesanan Terbaru</h2>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400 font-medium">{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status === 'completed' ? 'Selesai' :
                       order.status === 'processing' ? 'Diproses' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-white font-medium mt-1">{order.customer}</p>
                  <p className="text-white/60 text-sm">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Produk Terlaris</h2>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white font-medium">{product.name}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">{product.sales} terjual</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Aktivitas Penjualan</h2>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span className="text-white/60 text-sm">7 hari terakhir</span>
          </div>
        </div>
        <div className="h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60">Grafik aktivitas akan ditampilkan di sini</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
