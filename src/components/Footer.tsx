import { Share2, Link as LinkIcon, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const shareWebsite = () => {
    const text = `Cek Shoenitarian - Jasa Cuci Sepatu Premium! Make Your Shoes Great Again!`;
    const url = window.location.origin;
    
    if (navigator.share) {
      navigator.share({
        title: 'Shoenitarian',
        text: text,
        url: url,
      }).catch(console.error);
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    }
  };

  return (
    <footer className="bg-slate-900 p-12 border-t border-slate-800">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-xl font-extrabold text-white tracking-tighter">Shoenitarian</span>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">© 2024 Shoenitarian. All Rights Reserved.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link className="text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest" to="/privacy">Privacy Policy</Link>
          <Link className="text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest" to="/terms">Terms of Service</Link>
          <Link className="text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest" to="/support">Contact Support</Link>
          <Link className="text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest" to="/locator">Store Locator</Link>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={shareWebsite}
            className="flex items-center gap-2 group"
            title="Bagikan via WhatsApp"
          >
            <Share2 className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
            <span className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors hidden md:block">Bagikan</span>
          </button>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
            <Instagram className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
          </a>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin);
              alert('Link disalin!');
            }}
            className="group"
            title="Salin Link"
          >
            <LinkIcon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
}
