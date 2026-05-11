import { useState } from 'react';
import { Search, Info, CheckCircle, Loader2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase, type Order } from '../lib/supabase';
import { cn } from '../lib/utils';

export default function Tracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!orderNumber) return;
    
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber.trim())
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (err: any) {
      console.error('Error fetching order:', err);
      setError('Nomor pesanan tidak ditemukan. Mohon periksa kembali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto w-full min-h-screen">
      <section className="mb-stack-lg flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Lacak Perawatan Anda</h2>
        <p className="text-lg text-tertiary max-w-2xl mb-8">
          Pantau setiap langkah proses kami merawat sepatu kesayangan Anda. Masukkan nomor pesanan untuk memulai.
        </p>
        
        <div className="w-full max-w-xl bg-white p-2 rounded-xl shadow-sm border border-outline-variant flex flex-col md:flex-row gap-2">
          <div className="flex-grow flex items-center px-4 gap-3">
            <Search className="w-5 h-5 text-primary" />
            <input 
              className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant h-12 outline-none" 
              placeholder="Masukkan Nomor Pesanan (e.g. ORD-2024-8831)" 
              type="text" 
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold active:scale-95 transition-transform h-12 flex items-center justify-center min-w-[120px]"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Lacak'}
          </button>
        </div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mt-4 text-error font-bold flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.p>
        )}
      </section>

      <AnimatePresence>
        {order && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-gutter"
          >
            <div className="lg:col-span-8 lg:col-start-3 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white p-8 rounded-xl border border-outline-variant shadow-sm">
                <h3 className="text-2xl font-bold mb-8">Ringkasan Pesanan</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Status Pesanan</p>
                      <p className={cn(
                        "text-lg font-extrabold uppercase tracking-tight",
                        (order.status === 'Ready' || order.status === 'Completed') ? "text-green-600" : "text-amber-500"
                      )}>
                        {order.status === 'Pending' ? '📦 Menunggu Antrian' : 
                         order.status === 'Cleaning' ? '🧼 Sedang Dicuci' : 
                         order.status === 'Drying' ? '☀️ Sedang Dijemur' : 
                         order.status === 'Ready' ? '✨ Siap Diambil' : '✅ Selesai'}
                      </p>
                    </div>
                    <span className={cn(
                      "px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      (order.status === 'Ready' || order.status === 'Completed') ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {order.status === 'Completed' ? 'Sudah Diambil' : 'Diproses'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Detail Barang</p>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-900">{order.shoe_type}</p>
                        <p className="text-sm text-slate-500">{order.service_type}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Bukti Pembayaran</p>
                      {order.payment_proof_url ? (
                        <a 
                          href={order.payment_proof_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                        >
                          <ImageIcon className="w-4 h-4" />
                          Lihat Bukti Terkirim
                        </a>
                      ) : (
                        <p className="text-sm text-slate-400">Belum diunggah</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Penerima</p>
                      <p className="font-bold text-slate-900">{order.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Tanggal Pesan</p>
                      <p className="font-bold text-slate-900">{new Date(order.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Total Biaya</span>
                      <span className="text-3xl font-extrabold text-slate-900">Rp {order.total_price.toLocaleString('id-ID')}</span>
                    </div>
                    <span className={cn(
                      "font-bold flex items-center gap-1 px-3 py-1 rounded-full text-xs",
                      order.payment_status === 'Paid' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      <CheckCircle className="w-4 h-4" /> 
                      {order.payment_status === 'Paid' ? 'Dibayar' : 'Belum Dibayar'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-secondary-container/30 p-8 rounded-xl border border-secondary-container flex flex-col md:flex-row items-center gap-6">
                <div className="flex-grow text-center md:text-left">
                  <h4 className="text-lg font-bold text-on-secondary-container mb-2">Butuh Bantuan?</h4>
                  <p className="text-on-secondary-container/80">Jika Anda memiliki pertanyaan mengenai status pesanan Anda, tim kami siap membantu.</p>
                </div>
                <a 
                  href={`https://wa.me/6285715967156?text=Halo%20Shoenitarian,%20saya%20ingin%20bertanya%20mengenai%20pesanan%20${order.order_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap bg-secondary text-on-secondary px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-all"
                >
                  <Info className="w-5 h-5" />
                  Hubungi CS (WhatsApp)
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
