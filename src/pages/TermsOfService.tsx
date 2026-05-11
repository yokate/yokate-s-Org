import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-slate max-w-none"
      >
        <h1 className="text-4xl font-extrabold tracking-tighter mb-8">Syarat dan Ketentuan</h1>
        <p className="text-slate-600 mb-6">Terakhir diperbarui: 10 Mei 2026</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Layanan Kami</h2>
          <p className="text-slate-600">
            Shoenitarian menyediakan layanan cuci sepatu profesional dengan berbagai teknik pembersihan sesuai dengan jenis bahan sepatu pelanggan.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Pemesanan dan Pembayaran</h2>
          <p className="text-slate-600">
            Pemesanan dianggap sah setelah pelanggan melakukan pembayaran penuh melalui QRIS dan mengunggah bukti pembayaran di sistem kami.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Pengambilan dan Pengantaran</h2>
          <p className="text-slate-600">
            Penjemputan sepatu akan dilakukan dalam waktu maksimal 24 jam setelah pembayaran dikonfirmasi. Layanan antar-jemput gratis tersedia untuk wilayah tertentu sesuai radius yang ditentukan.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Tanggung Jawab Barang</h2>
          <p className="text-slate-600">
            Kami melakukan perawatan dengan standar teknis tinggi. Namun, Shoenitarian tidak bertanggung jawab atas kerusakan yang disebabkan oleh kondisi sepatu yang memang sudah rapuh atau material yang sudah mengalami degradasi alami sebelum dicuci.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Perubahan Ketentuan</h2>
          <p className="text-slate-600">
            Kami berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
