'use client'

import { useState } from 'react'
import { Camera, Aperture, Film, Image, ArrowLeft } from 'lucide-react'
import EmailNotification from '@/components/notifikasi/emailnotifikasi'
import ErrorNotification from '@/components/notifikasi/errornotifikasi'

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            if (!validateEmail(email)) {
                setErrorMessage('Format email tidak valid! Pastikan email mengandung @ dan domain yang benar (contoh: user@gmail.com)')
                setShowErrorModal(true)
                return
            }
            setShowModal(true)
        }
    }

    const handleOk = () => {
        localStorage.setItem('resetEmail', email)
        setShowModal(false)
        setEmail('')
        window.location.href = '/resetpassword/verify'
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4DD0E1] p-4 relative overflow-hidden">
            
            {/* Button Back */}
            <a 
                href="/login"
                className="absolute top-4 left-4 z-50 bg-white hover:bg-gray-100 border-3 border-black p-2 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
                <ArrowLeft size={20} className="text-black" />
            </a>

            <div className="absolute top-8 left-8 bg-white border-4 border-black p-4 rotate-[-5deg] shadow-lg hidden sm:block">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 border-2 border-black flex items-center justify-center">
                    <Camera size={48} className="text-black" />
                </div>
                <div className="mt-2 h-2 bg-black"></div>
            </div>

            <div className="absolute top-12 right-12 bg-white border-4 border-black p-4 rotate-[8deg] shadow-lg hidden sm:block">
                <div className="w-28 h-28 bg-gradient-to-br from-yellow-300 to-orange-300 border-2 border-black flex items-center justify-center">
                    <Aperture size={40} className="text-black" />
                </div>
                <div className="mt-2 h-2 bg-black"></div>
            </div>

            <div className="absolute bottom-16 left-16 bg-white border-4 border-black p-4 rotate-[12deg] shadow-lg hidden sm:block">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-300 to-cyan-300 border-2 border-black flex items-center justify-center">
                    <Film size={36} className="text-black" />
                </div>
                <div className="mt-2 h-2 bg-black"></div>
            </div>

            <div className="absolute bottom-20 right-20 bg-white border-4 border-black p-4 rotate-[-8deg] shadow-lg hidden sm:block">
                <div className="w-28 h-28 bg-gradient-to-br from-green-300 to-teal-300 border-2 border-black flex items-center justify-center">
                    <Image size={40} className="text-black" />
                </div>
                <div className="mt-2 h-2 bg-black"></div>
            </div>

            <div className="absolute top-4 left-4 bg-white border-3 border-black p-2 rotate-[-5deg] shadow-md sm:hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 border-2 border-black flex items-center justify-center">
                    <Camera size={24} className="text-black" />
                </div>
                <div className="mt-1 h-1 bg-black"></div>
            </div>

            <div className="absolute top-4 right-4 bg-white border-3 border-black p-2 rotate-[8deg] shadow-md sm:hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-300 border-2 border-black flex items-center justify-center">
                    <Aperture size={24} className="text-black" />
                </div>
                <div className="mt-1 h-1 bg-black"></div>
            </div>

            <div className="absolute bottom-4 left-4 bg-white border-3 border-black p-2 rotate-[12deg] shadow-md sm:hidden">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-300 to-cyan-300 border-2 border-black flex items-center justify-center">
                    <Film size={20} className="text-black" />
                </div>
                <div className="mt-1 h-1 bg-black"></div>
            </div>

            <div className="absolute bottom-4 right-4 bg-white border-3 border-black p-2 rotate-[-8deg] shadow-md sm:hidden">
                <div className="w-14 h-14 bg-gradient-to-br from-green-300 to-teal-300 border-2 border-black flex items-center justify-center">
                    <Image size={20} className="text-black" />
                </div>
                <div className="mt-1 h-1 bg-black"></div>
            </div>
            
            <div className="bg-gray-100 border-4 md:border-[6px] border-black p-6 md:p-8 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10">
                
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-4 border-black flex items-center justify-center shadow-lg">
                        <Camera size={32} className="text-white md:hidden" />
                        <Camera size={36} className="text-white hidden md:block" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-center mb-2 text-black">
                    Reset Password
                </h1>
                <p className="text-center text-xs md:text-sm font-bold text-gray-600 mb-6">Masukkan email untuk reset password</p>

                <form onSubmit={handleResetPassword} className="space-y-4">
                    
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white border-4 border-black text-black focus:outline-none focus:ring-0"
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg md:text-xl py-3 md:py-4 border-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] md:shadow-[0_6px_0_0_rgba(0,0,0,1)] active:shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 transition-all"
                    >
                        KIRIM KODE
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-black">
                    Sudah ingat password? <a href="/login" className="font-bold underline hover:text-gray-700">login disini</a>
                </p>
            </div>

            {showModal && <EmailNotification email={email} onClose={handleOk} />}
            {showErrorModal && <ErrorNotification message={errorMessage} onClose={() => setShowErrorModal(false)} />}
        </div>
    )
}
