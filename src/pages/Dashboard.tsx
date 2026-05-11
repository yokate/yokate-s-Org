import { useEffect, useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Loader2, RefreshCw, Phone, MessageSquare, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase, type Order } from '../lib/supabase';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completedToday: 0
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);

      // Calculate simple stats
      const pendingCount = (data || []).filter(o => o.status !== 'Completed' && o.status !== 'Ready').length;
      const today = new Date().toISOString().split('T')[0];
      const completedToday = (data || []).filter(o => (o.status === 'Completed' || o.status === 'Ready') && o.created_at.startsWith(today)).length;
      
      setStats({
        total: data?.length || 0,
        pending: pendingCount,
        completedToday
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      fetchOrders();
    } catch (err) {
      alert('Gagal memperbarui status.');
    }
  };

  const updatePaymentStatus = async (id: string, newPaymentStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: newPaymentStatus })
        .eq('id', id);
      if (error) throw error;
      fetchOrders();
    } catch (err) {
      alert('Gagal memperbarui status pembayaran.');
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.phone.includes(searchQuery)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
      case 'Cleaning':
      case 'Drying':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Ready':
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const statCards = [
    { label: 'Total Pesanan', value: stats.total, icon: 'analytics', color: 'primary' },
    { label: 'Sedang Proses', value: stats.pending, icon: 'pending_actions', color: 'secondary' },
    { label: 'Selesai Hari Ini', value: stats.completedToday, icon: 'task_alt', color: 'tertiary' }
  ];

  return (
    <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tighter text-slate-900">Dashboard Admin</h1>
          <p className="text-slate-400 mt-1">Pantau dan kelola pesanan Shoenitarian.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchOrders}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-400 hover:text-primary shadow-sm"
            title="Muat Ulang"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">{stat.label}</span>
              <div className="text-4xl font-extrabold text-slate-900">{stat.value}</div>
            </div>
            {stat.icon && (
              <span className="material-symbols-outlined absolute right-6 bottom-6 text-6xl text-slate-50 opacity-20 -rotate-12">
                {stat.icon}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="text-2xl font-bold text-slate-900">Daftar Pesanan</h3>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="text" 
                placeholder="Cari nama, order #, atau HP..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm w-full md:w-80 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center text-slate-300">
              <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary/50" />
              <p className="font-bold text-slate-400">Memperbarui data...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
             <div className="py-24 flex flex-col items-center justify-center text-slate-300">
              <span className="material-symbols-outlined text-7xl mb-4 text-slate-100">inventory_2</span>
              <p className="font-bold text-slate-400">Tidak ada pesanan yang ditemukan.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="px-8 py-5">Pesanan & Pelanggan</th>
                  <th className="px-8 py-5">Layanan & Detail</th>
                  <th className="px-8 py-5">Bukti Bayar</th>
                  <th className="px-8 py-5">Status & Update</th>
                  <th className="px-8 py-5">Status Pembayaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/20 transition-all group">
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="font-extrabold text-slate-900 group-hover:text-primary transition-colors">{order.customer_name}</div>
                        <div className="text-[10px] text-slate-400 font-bold tracking-widest">#{order.order_number}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold mt-2">
                          <Phone className="w-3 h-3" />
                          {order.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-slate-700">{order.service_type}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{order.shoe_type}</div>
                        {order.notes && (
                          <div className="flex items-start gap-1.5 text-xs text-slate-400 mt-2 max-w-xs line-clamp-2">
                            <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>{order.notes}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {order.payment_proof_url ? (
                        <a 
                          href={order.payment_proof_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center bg-slate-50 hover:border-primary transition-all group/img"
                        >
                          <img 
                            src={order.payment_proof_url} 
                            alt="Payment Proof" 
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </a>
                      ) : (
                        <div className="w-12 h-12 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-200">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-transparent outline-none transition-all cursor-pointer shadow-sm",
                          getStatusColor(order.status)
                        )}
                      >
                        <option value="Pending">Antrian</option>
                        <option value="Cleaning">Dicuci</option>
                        <option value="Drying">Dijemur</option>
                        <option value="Ready">Selesai</option>
                        <option value="Completed">Diambil</option>
                      </select>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={order.payment_status || 'Unpaid'}
                        onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-transparent outline-none transition-all cursor-pointer shadow-sm",
                          order.payment_status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        )}
                      >
                        <option value="Unpaid">Belum Dibayar</option>
                        <option value="Paid">Dibayar</option>
                      </select>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={order.payment_status || 'Unpaid'}
                        onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-transparent outline-none transition-all cursor-pointer shadow-sm",
                          order.payment_status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        )}
                      >
                        <option value="Unpaid">Belum Dibayar</option>
                        <option value="Paid">Dibayar</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-8 border-t border-slate-50 flex justify-between items-center text-xs font-bold text-slate-400">
          <span>Menampilkan {filteredOrders.length} dari {stats.total} pesanan</span>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-100 rounded-lg disabled:opacity-30" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
