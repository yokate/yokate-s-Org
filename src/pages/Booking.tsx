import React, { useState, useRef } from 'react';
import { Truck, Upload, ShieldCheck, CheckCircle, Loader2, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

const SERVICE_PRICES: Record<string, number> = {
  'Fast Cleaning': 30000,
  'Sandals/Kids': 35000,
  'Deep Cleaning': 40000,
  'Hard Deep Clean': 60000,
  'Suede Treatment': 70000,
  'Leather Care': 75000,
  'Un-yellowing': 50000,
  'Repaint': 100000
};

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    shoe_type: '',
    service_type: '',
    notes: ''
  });
  const [orderNumber, setOrderNumber] = useState('');

  const currentPrice = SERVICE_PRICES[formData.service_type] || 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert('File terlalu besar. Maksimal 2MB.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const uploadFile = async (orderNum: string): Promise<string> => {
    if (!file) return '';
    
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${orderNum}.${fileExt}`;
      const filePath = `proofs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Gagal mengunggah bukti pembayaran.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.phone || !formData.service_type) {
      alert('Mohon lengkapi data pelanggan dan layanan.');
      return;
    }

    if (!file) {
      alert('Mohon unggah bukti pembayaran.');
      return;
    }

    setLoading(true);
    const generatedOrderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    try {
      // 1. Upload File
      const proofUrl = await uploadFile(generatedOrderNumber);

      // 2. Insert Order
      const { error } = await supabase
        .from('orders')
        .insert([
          { 
            ...formData, 
            order_number: generatedOrderNumber,
            status: 'Pending',
            total_price: currentPrice,
            payment_proof_url: proofUrl
          }
        ]);

      if (error) throw error;

      setOrderNumber(generatedOrderNumber);
      setSuccess(true);
    } catch (err: any) {
      console.error('Error submitting order:', err);
      alert(err.message || 'Gagal mengirim pesanan. Pastikan bucket "payment-proofs" sudah dibuat di Supabase Storage.');
    } finally {
      setLoading(false);
    }
  };

  const sendToWhatsApp = () => {
    const text = `Halo Shoenitarian, saya telah mengirim pesanan baru:%0A%0ANomor Pesanan: *${orderNumber}*%0ANama: *${formData.customer_name}*%0ALayanan: *${formData.service_type}*%0ASepatu: *${formData.shoe_type}*%0ATotal: *Rp ${currentPrice.toLocaleString('id-ID')}*%0A%0AMohon segera diproses. Terima kasih!`;
    window.open(`https://wa.me/6285715967156?text=${text}`, '_blank');
  };

  if (success) {
    return (
      <div className="pt-32 pb-stack-lg px-6 max-w-2xl mx-auto w-full text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl border border-slate-100 shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Pesanan Berhasil!</h1>
          <p className="text-tertiary mb-8">
            Terima kasih {formData.customer_name}. Pesanan Anda sedang kami proses. 
            Silakan klik tombol di bawah untuk konfirmasi via WhatsApp.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Nomor Pesanan</p>
            <p className="text-3xl font-extrabold text-primary">{orderNumber}</p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={sendToWhatsApp}
              className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Konfirmasi via WhatsApp
            </button>
            <button 
              onClick={() => window.location.href = '/track'}
              className="w-full py-4 text-slate-500 font-bold hover:text-primary transition-all"
            >
              Lacak Pesanan Nanti
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-stack-lg px-6 max-w-7xl mx-auto w-full">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-5xl font-bold tracking-tighter text-primary">Pemesanan Layanan</h1>
        <p className="text-lg text-tertiary mt-2">Kembalikan kebersihan sepatu kesayangan Anda.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-7 space-y-8">
          {/* Customer Info */}
          <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">person_edit</span>
              Informasi Pelanggan
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                  className="w-full h-12 px-4 rounded-lg bg-surface-container border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-1">Nomor Telepon (WhatsApp)</label>
                <div className="flex h-12">
                  <span className="px-4 flex items-center bg-slate-100 border-r border-slate-200 rounded-l-lg text-slate-500 font-bold">+62</span>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="flex-grow px-4 rounded-r-lg bg-surface-container border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="8123456789"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Service Details */}
          <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">inventory_2</span>
              Detail Sepatu & Layanan
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-1">Jenis Sepatu</label>
                <select 
                  required
                  value={formData.shoe_type}
                  onChange={(e) => setFormData({...formData, shoe_type: e.target.value})}
                  className="w-full h-12 px-4 rounded-lg bg-surface-container border-none focus:ring-2 focus:ring-primary/20 outline-none appearance-none font-medium"
                >
                  <option value="" disabled>Pilih jenis sepatu</option>
                  <option value="Sneakers">Sneakers</option>
                  <option value="Leather Shoes">Leather Shoes / Pantofel</option>
                  <option value="Suede">Suede / Nubuck</option>
                  <option value="Luxury">Luxury / High-end Brands</option>
                  <option value="Boots">Boots</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-4">Pilih Layanan</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'Fast Cleaning', title: 'Fast Cleaning', desc: 'Pembersihan bagian luar (1-2 hari)' },
                    { id: 'Deep Cleaning', title: 'Deep Cleaning', desc: 'Pembersihan luar & dalam (2-3 hari)' },
                    { id: 'Sandals/Kids', title: 'Sandals/Kids', desc: 'Sandal branded & sepatu anak (2-3 hari)' },
                    { id: 'Hard Deep Clean', title: 'Hard Deep Clean', desc: 'Noda ekstrem & membandel (2-3 hari)' },
                    { id: 'Suede Treatment', title: 'Suede Treatment', desc: 'Khusus bahan suede/nubuck (2-3 hari)' },
                    { id: 'Leather Care', title: 'Leather Care', desc: 'Perawatan kulit premium (2-3 hari)' }
                  ].map(service => (
                    <label 
                      key={service.id}
                      className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all group ${
                        formData.service_type === service.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="service" 
                        required
                        checked={formData.service_type === service.id}
                        onChange={() => setFormData({...formData, service_type: service.id})}
                        className="mt-1 w-5 h-5 text-primary focus:ring-primary/20" 
                      />
                      <div>
                        <div className={`font-bold transition-colors ${
                          formData.service_type === service.id ? 'text-primary' : 'text-slate-900 group-hover:text-primary'
                        }`}>
                          {service.title}
                        </div>
                        <div className="text-xs text-slate-400 mt-1 font-medium">{service.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-1">Alamat Penjemputan & Catatan</label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full p-4 rounded-lg bg-surface-container border-none focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all font-medium"
                  rows={4}
                  placeholder="Contoh: Alamat jalan ABC no.123, Ada sedikit noda tinta harap hati-hati dengan tali sepatu."
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Section */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">qr_code_2</span>
              Pembayaran (QRIS)
            </h2>
            
            <div className="flex flex-col items-center gap-6 p-6 rounded-xl bg-slate-50 border border-slate-100">
              <div className="relative w-full bg-white p-3 rounded-xl shadow-md border border-slate-100">
                <img 
                  src="https://imgur.com/AMo9eb3.png" 
                  alt="QRIS Shoenitarian" 
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="w-full p-4 rounded-xl bg-primary-container/20 border border-primary-container">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-on-primary-container">Total Tagihan</span>
                  <span className="text-2xl font-extrabold text-primary">
                    {currentPrice > 0 ? `Rp ${currentPrice.toLocaleString('id-ID')}` : '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-4">Bukti Pembayaran</label>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${
                  file ? 'border-green-400 bg-green-50' : 'border-slate-100 hover:bg-slate-50'
                }`}
              >
                {file ? (
                  <>
                    <FileCheck className="w-12 h-12 text-green-500" />
                    <span className="text-sm font-bold text-green-600">{file.name}</span>
                    <p className="text-[10px] text-green-400">Klik untuk mengganti file</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-slate-300 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-bold text-slate-400">Unggah Bukti Pembayaran</span>
                    <p className="text-[10px] text-slate-300">JPG, PNG (Maks. 2MB)</p>
                  </>
                ) }
              </div>
            </div>
          </section>

          <button 
            type="submit"
            disabled={loading || uploading}
            className="w-full h-16 bg-primary text-on-primary rounded-xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading || uploading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>{uploading ? 'Mengunggah...' : 'Memproses...'}</span>
              </div>
            ) : (
              <>
                <Truck className="w-6 h-6" />
                <span>Kirim Pemesanan</span>
              </>
            )}
          </button>

          <div className="flex items-start gap-4 p-4 grayscale opacity-60">
            <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0" />
            <p className="text-[10px] leading-relaxed text-slate-500 text-justify">
              Data Anda aman. Penjemputan akan dilakukan dalam waktu maksimal 24 jam setelah konfirmasi pembayaran diterima.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
