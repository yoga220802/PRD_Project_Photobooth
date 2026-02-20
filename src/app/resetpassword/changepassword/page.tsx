'use client'

import { useState } from 'react'
import { Camera, Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function ChangePasswordPage() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                alert('Password tidak cocok!')
                return
            }
            
            if (newPassword.length < 6) {
                alert('Password minimal 6 karakter!')
                return
            }
            
            console.log('Password berhasil diubah')
            // Redirect ke login atau dashboard
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4DD0E1] p-4 relative overflow-hidden">
            
            {/* Button Back */}
            <a 
                href="/resetpassword/verify"
                className="absolute top-4 left-4 z-50 bg-white hover:bg-gray-100 border-3 border-black p-2 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
                <ArrowLeft size={20} className="text-black" />
            </a>

            {/* Kiri Atas - Lingkaran Kuning */}
            <div className="absolute top-8 left-8 w-24 h-24 md:w-32 md:h-32 bg-yellow-400 rounded-full border-4 border-black shadow-lg"></div>

            {/* Kiri Bawah - Persegi Panjang Pink Miring */}
            <div className="absolute bottom-16 left-12 w-28 h-20 md:w-36 md:h-24 bg-pink-400 border-4 border-black rotate-[15deg] shadow-lg"></div>

            {/* Kanan Atas - Kotak Hijau */}
            <div className="absolute top-12 right-12 w-24 h-24 md:w-28 md:h-28 bg-green-400 rounded-lg border-4 border-black shadow-lg"></div>

            {/* Kanan Bawah - Kotak Ungu */}
            <div className="absolute bottom-20 right-16 w-20 h-20 md:w-24 md:h-24 bg-purple-400 border-4 border-black shadow-lg"></div>

            {/* Card Utama */}
            <div className="bg-gray-100 border-4 md:border-[6px] border-black p-6 md:p-8 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10">
                
                {/* Ikon Kamera */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-4 border-black flex items-center justify-center shadow-lg">
                        <Camera size={32} className="text-white md:hidden" />
                        <Camera size={36} className="text-white hidden md:block" />
                    </div>
                </div>

                {/* Judul */}
                <h1 className="text-3xl md:text-4xl font-black text-center mb-2 text-black">
                    Ubah Kata Sandi
                </h1>
                
                {/* Subjudul */}
                <p className="text-center text-sm md:text-base font-bold text-gray-600 mb-6">
                    Masukkan password baru kamu
                </p>

                {/* Form */}
                <form onSubmit={handleChangePassword} className="space-y-4">
                    
                    {/* Password Baru */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">
                            Password Baru
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white border-4 border-black text-black focus:outline-none focus:ring-0 pr-12"
                                placeholder="Masukkan password baru"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                            >
                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Konfirmasi Password */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">
                            Konfirmasi Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white border-4 border-black text-black focus:outline-none focus:ring-0 pr-12"
                                placeholder="Konfirmasi password baru"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Tombol Ubah Password */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg md:text-xl py-3 md:py-4 border-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] md:shadow-[0_6px_0_0_rgba(0,0,0,1)] active:shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 transition-all"
                    >
                        Ubah Password
                    </button>
                </form>
            </div>
        </div>
    )
}
