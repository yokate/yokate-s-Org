import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';

export default function StoreLocator() {
  const stores = [
    {
      name: "Shoenitarian Location",
      address: "Jl Ganggeng XIV no. 152B, Sungai Bambu, Tanjung Priok, Jakarta Utara",
      phone: "0857-1596-7156",
      hours: "09:00 - 24:00",
      type: "Main Store"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tighter mb-4">Lokasi Workshop</h1>
        <p className="text-lg text-slate-500 mb-12">Temukan titik drop-off terdekat atau kunjungi workshop pusat kami.</p>
        
        <div className="grid grid-cols-1 gap-8">
          {stores.map((store, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-grow">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                  {store.type}
                </div>
                <h3 className="text-2xl font-bold mb-2">{store.name}</h3>
                <p className="text-slate-500 mb-6 flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  {store.address}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                  <div>
                    <span className="text-slate-400 block pb-1">Telepon</span>
                    {store.phone}
                  </div>
                  <div>
                    <span className="text-slate-400 block pb-1">Jam Operasional</span>
                    {store.hours}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-48 flex-shrink-0">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  <Navigation className="w-5 h-5" />
                  Navigasi
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-blue-700 text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">info</span>
            Kami juga menyediakan layanan antar-jemput. Tidak perlu keluar rumah, biar kami yang jemput sepatu Anda!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
