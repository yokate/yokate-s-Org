import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User, Verified, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username, // Assuming username is email here
        password: password
      });

      if (error) throw error;
      
      console.log('Login - success', data);
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login gagal. Periksa email dan password.');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-12 pb-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white flex items-center justify-center rounded-3xl shadow-sm mb-6 overflow-hidden">
            <img 
              src="https://i.imgur.com/t5TeXKF.jpeg" 
              alt="Shoenitarian Logo" 
              className="w-full h-full object-contain" 
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-primary tracking-tighter mb-2">Shoenitarian</h1>
          <p className="text-tertiary">Membuat sepatu anda terlihat lebih bersih</p>
        </div>

        {/* Hero Image */}
        <div className="relative h-48 w-full">
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800" 
            alt="Shoenitarian Premium Care" 
            className="w-full h-full object-cover grayscale brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block" htmlFor="username">Nama Pengguna</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                placeholder="Admin username" 
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block" htmlFor="password">Kata Sandi</label>
              <a href="#" className="text-xs font-bold text-secondary hover:underline">Lupa?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                placeholder="••••••••" 
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg text-primary focus:ring-primary/20" />
            <label htmlFor="remember" className="text-xs font-bold text-slate-500 cursor-pointer">Tetap masuk</label>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            Masuk ke Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="pb-8 text-center">
          <p className="text-xs font-bold text-slate-300 flex items-center justify-center gap-2 uppercase tracking-[0.2em]">
            <Verified className="w-4 h-4" />
            Hanya Akses Admin
          </p>
        </div>
      </motion.div>
    </div>
  );
}
