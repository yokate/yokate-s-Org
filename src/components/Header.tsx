import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = location.pathname === '/';
  const isAdmin = location.pathname.startsWith('/admin');

  const navLinks = [
    { to: '/', label: 'Layanan' },
    { to: '/track', label: 'Lacak Pesanan' },
    { to: '/book', label: 'Pesan Sekarang' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          {!isHome && !isAdmin && (
            <Link to="/" className="active:scale-95 transition-transform">
              <ArrowLeft className="w-6 h-6 text-primary" />
            </Link>
          )}
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <img 
              src="https://i.imgur.com/t5TeXKF.jpeg" 
              alt="Shoenitarian Logo" 
              className="w-10 h-10 object-contain" 
              referrerPolicy="no-referrer"
            />
            <h1 className="font-extrabold text-xl tracking-tighter text-slate-900">Shoenitarian</h1>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className={cn(
                "transition-colors duration-200",
                location.pathname === link.to ? "text-primary font-semibold" : "text-slate-500 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-500 hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-lg font-bold transition-colors py-2",
                    location.pathname === link.to ? "text-primary" : "text-slate-500"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
