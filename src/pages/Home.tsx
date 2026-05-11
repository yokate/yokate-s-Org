import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const services = [
  {
    title: "Fast Cleaning",
    description: "Pembersihan bagian luar secara cepat dan efisien. Sempurna untuk perawatan harian agar sepatu selalu terlihat bersih.",
    price: "Rp 30.000",
    est: "1-2 Hari",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Sandals/Kids",
    description: "Perawatan khusus untuk sandal branded dan sepatu anak-anak dengan formula pembersih yang aman dan lembut.",
    price: "Rp 35.000",
    est: "2-3 Hari",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Deep Cleaning",
    description: "Pembersihan menyeluruh mencakup bagian dalam, luar, sol, hingga tali sepatu untuk kebersihan total.",
    price: "Rp 40.000",
    popular: true,
    est: "2-3 Hari",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Hard Deep Clean",
    description: "Solusi untuk sepatu dengan noda membandel atau kotoran ekstrem yang membutuhkan teknik pembersihan intensif.",
    price: "Rp 60.000",
    est: "2-3 Hari",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Suede Treatment",
    description: "Penanganan khusus bahan suede/nubuck untuk menjaga tekstur bulu tetap lembut dan warna tetap cerah.",
    price: "Rp 70.000",
    est: "2-3 Hari",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Leather Care",
    description: "Pemberian nutrisi dan pelembab khusus kulit untuk mencegah pecah-pecah serta mengembalikan kilau alami.",
    price: "Rp 75.000",
    est: "2-3 Hari",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Home() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto text-center mb-stack-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold mb-4">
            CUCI SEPATU PREMIUM
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Make Your Shoes,<br />Great Again!
          </h1>
          <p className="text-body-lg text-tertiary max-w-2xl mx-auto mb-8">
            Shoenitarian menghadirkan perawatan sepatu dengan teknik klinis </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="px-8 py-4 bg-primary text-on-primary rounded-lg font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
              Pesan Sekarang
            </Link>
            <Link to="/track" className="px-8 py-4 bg-secondary-container text-on-secondary-container rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">
              <Play className="w-5 h-5 fill-current" />
              Lihat Proses Kami
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 mb-stack-lg">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Katalog Layanan</h2>
          <p className="text-tertiary max-w-xl mx-auto">
            Pilih perawatan yang tepat untuk kebutuhan spesifik alas kaki Anda dilakukan oleh tenaga ahli profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {service.popular && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-secondary text-on-secondary text-[10px] font-bold rounded-full">
                    Terpopuler
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-tertiary mb-6 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="font-bold text-primary">{service.price}</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">EST. {service.est}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
