import { motion } from 'motion/react';
import { MessageSquare, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function ContactSupport() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tighter mb-4">Hubungi Kami</h1>
        <p className="text-lg text-slate-500 mb-12">Punya pertanyaan atau butuh bantuan? Tim Shoenitarian siap membantu Anda.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
            <p className="text-sm text-slate-500 mb-6">Layanan cepat melalui pesan WhatsApp.</p>
            <a 
              href="https://wa.me/6285715967156" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              Kirim Pesan <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Telepon</h3>
            <p className="text-sm text-slate-500 mb-6">Hubungi kami langsung untuk diskusi detail.</p>
            <a 
              href="tel:085715967156" 
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              Hubungi <Phone className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Lokasi</h3>
            <p className="text-sm text-slate-500 mb-6">Kunjungi workshop kami langsung.</p>
            <a 
              href="/locator" 
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              Lihat Peta <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Jam Operasional</h2>
          <div className="grid grid-cols-2 max-w-sm mx-auto text-slate-400">
            <div className="text-left py-2 border-b border-white/10">Senin - Jumat</div>
            <div className="text-right py-2 border-b border-white/10">09:00 - 20:00</div>
            <div className="text-left py-2 border-b border-white/10">Sabtu</div>
            <div className="text-right py-2 border-b border-white/10">10:00 - 18:00</div>
            <div className="text-left py-2">Minggu</div>
            <div className="text-right py-2">Tutup</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
