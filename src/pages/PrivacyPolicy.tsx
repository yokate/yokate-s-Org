import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-slate max-w-none"
      >
        <h1 className="text-4xl font-extrabold tracking-tighter mb-8">Kebijakan Privasi</h1>
        <p className="text-slate-600 mb-6">Terakhir diperbarui: 10 Mei 2026</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Informasi yang Kami Kumpulkan</h2>
          <p className="text-slate-600">
            Kami mengumpulkan informasi yang Anda berikan langsung kepada kami saat memesan layanan, seperti nama, nomor telepon, alamat penjemputan, dan bukti pembayaran.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Penggunaan Informasi</h2>
          <p className="text-slate-600">
            Informasi yang kami kumpulkan digunakan untuk:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mt-2">
            <li>Memproses dan mengelola pesanan cuci sepatu Anda.</li>
            <li>Menghubungi Anda terkait status pesanan melalui WhatsApp.</li>
            <li>Melakukan penjemputan dan pengantaran sepatu ke lokasi Anda.</li>
            <li>Verifikasi pembayaran yang Anda lakukan.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Keamanan Data</h2>
          <p className="text-slate-600">
            Kami berkomitmen untuk memastikan bahwa informasi Anda aman. Kami telah menerapkan prosedur fisik, elektronik, dan manajerial yang sesuai untuk menjaga dan mengamankan informasi yang kami kumpulkan secara online.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Berbagi Informasi</h2>
          <p className="text-slate-600">
            Kami tidak akan menjual, mendistribusikan, atau menyewakan informasi pribadi Anda kepada pihak ketiga kecuali kami mendapatkan izin dari Anda atau diwajibkan oleh hukum untuk melakukannya.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Kontak Kami</h2>
          <p className="text-slate-600">
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, hubungi kami melalui WhatsApp di 0857-1596-7156.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
