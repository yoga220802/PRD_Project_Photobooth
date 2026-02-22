'use client';

import { Camera, Image, Star, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterSuksesNotifikasi from '@/components/notifikasi/registersuksesnotifikasi';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const nama = formData.get('nama') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const newErrors = {
      nama: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!nama || nama.trim() === '') {
      newErrors.nama = 'Nama harus diisi';
    }

    if (!email || email.trim() === '') {
      newErrors.email = 'Email harus diisi';
    }

    if (!password || password.trim() === '') {
      newErrors.password = 'Password harus diisi';
    }

    if (!confirmPassword || confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    }

    setErrors(newErrors);

    if (!newErrors.nama && !newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-300 p-6 overflow-hidden relative">
      
      <a 
        href="/"
        className="absolute top-4 left-4 z-50 bg-white hover:bg-gray-100 border-3 border-black p-2 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
      >
        <ArrowLeft size={20} className="text-black" />
      </a>

      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400 border-4 border-black rounded-full" />
      
      <div className="absolute top-16 right-16 w-28 h-28 bg-green-400 border-4 border-black rounded-lg rotate-12 flex items-center justify-center">
        <Image size={40} className="text-black" />
      </div>
      
      <div className="absolute bottom-20 left-16 w-32 h-24 bg-purple-300 border-4 border-black -rotate-6" />
      
      <Star size={48} className="absolute bottom-16 right-20 text-black fill-black" />

      <div className="bg-gray-100 border-4 border-black max-w-2xl w-full p-8 z-10">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-[#FF90E8] border-4 border-black rounded-full flex items-center justify-center mb-4">
            <Camera size={40} className="text-black" />
          </div>
          
          <h1 className="text-3xl font-black text-black">Register</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm font-bold text-black mb-2">Nama</label>
              <input
                type="text"
                name="nama"
                placeholder="iswaro1233484828"
                className={`w-full px-4 py-3 bg-white border-4 ${errors.nama ? 'border-red-500' : 'border-black'} text-black font-medium focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.nama && <p className="text-red-500 text-sm font-bold mt-1">{errors.nama}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="iswaro@gmail.com"
                className={`w-full px-4 py-3 bg-white border-4 ${errors.email ? 'border-red-500' : 'border-black'} text-black font-medium focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.email && <p className="text-red-500 text-sm font-bold mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Password baru kamu</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Admin123"
                  className={`w-full px-4 py-3 bg-white border-4 ${errors.password ? 'border-red-500' : 'border-black'} text-black font-medium focus:outline-none focus:ring-2 focus:ring-black pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm font-bold mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Ketik ulang password kamu</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Admin126"
                  className={`w-full px-4 py-3 bg-white border-4 ${errors.confirmPassword ? 'border-red-500' : 'border-black'} text-black font-medium focus:outline-none focus:ring-2 focus:ring-black pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm font-bold mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-green-400 text-black font-black text-lg px-16 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase"
            >
              DAFTAR
            </button>
          </div>

          <div className="flex flex-col items-center mt-6 space-y-3">
            <p className="text-sm text-black font-medium">Atau daftar dengan</p>
            <button
              type="button"
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-12 h-12">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
          </div>
        </form>

      </div>

      {showSuccessModal && <RegisterSuksesNotifikasi onClose={handleCloseModal} />}
    </div>
  );
}
