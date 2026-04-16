'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Camera, Star, ArrowLeft } from 'lucide-react'
import VerifikasiNotification from '@/components/notifikasi/verifikasinotifikasi'
import VerifikasiGagalNotification from '@/components/notifikasi/verifikasigagalnotifikasi'

export default function ResetPasswordVerifyPage() {
    const [otp, setOtp] = useState(['', '', '', ''])
    const [showSuccessNotif, setShowSuccessNotif] = useState(false)
    const [showErrorNotif, setShowErrorNotif] = useState(false)
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ]

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return
        
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 3) {
            inputRefs[index + 1].current?.focus()
        }
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault()
        const code = otp.join('')
        
        if (code.length === 4) {
            // Cek apakah semua karakter adalah angka
            const isAllNumbers = /^\d+$/.test(code)
            
            if (isAllNumbers) {
                // Jika semua angka, tampilkan notifikasi berhasil
                setShowSuccessNotif(true)
            } else {
                // Jika ada huruf, tampilkan notifikasi gagal
                setShowErrorNotif(true)
            }
        }
    }

    return (
        <>
            {/* Notifikasi */}
            {showSuccessNotif && (
                <VerifikasiNotification 
                    onClose={() => {
                        setShowSuccessNotif(false)
                        window.location.href = '/resetpassword/changepassword'
                    }} 
                />
            )}
            {showErrorNotif && (
                <VerifikasiGagalNotification 
                    onClose={() => {
                        setShowErrorNotif(false)
                        setOtp(['', '', '', ''])
                        inputRefs[0].current?.focus()
                    }} 
                />
            )}

            <div className="min-h-screen flex items-center justify-center bg-[#4DD0E1] p-4 relative overflow-hidden">
            
            {/* Button Back */}
            <a 
                href="/resetpassword"
                className="absolute top-4 left-4 z-50 bg-white hover:bg-gray-100 border-3 border-black p-2 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
                <ArrowLeft size={20} className="text-black" />
            </a>

            {/* Kiri Atas - Lingkaran Kuning */}
            <div className="absolute top-8 left-8 w-24 h-24 md:w-32 md:h-32 bg-yellow-400 rounded-full border-4 border-black shadow-lg"></div>

            {/* Kiri Bawah - Persegi Panjang Pink Miring */}
            <div className="absolute bottom-16 left-12 w-28 h-20 md:w-36 md:h-24 bg-pink-400 border-4 border-black rotate-[15deg] shadow-lg"></div>

            {/* Kanan Atas - Kotak Hijau dengan Ikon */}
            <div className="absolute top-12 right-12 w-24 h-24 md:w-28 md:h-28 bg-green-400 rounded-lg border-4 border-black shadow-lg flex items-center justify-center">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded border-2 border-black flex items-center justify-center">
                    <div className="w-8 h-6 border-2 border-black rounded-sm relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-black"></div>
                    </div>
                </div>
            </div>

            {/* Kanan Bawah - Bintang Hitam */}
            <div className="absolute bottom-20 right-16">
                <Star size={48} className="text-black fill-black" />
            </div>

            {/* Card Utama */}
            <div className="bg-gray-100 border-4 md:border-[6px] border-black p-6 md:p-8 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10">
                
                {/* Ikon Kamera */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-400 rounded-full border-4 border-black flex items-center justify-center shadow-lg">
                        <Camera size={32} className="text-black md:hidden" />
                        <Camera size={36} className="text-black hidden md:block" />
                    </div>
                </div>

                {/* Judul */}
                <h1 className="text-3xl md:text-4xl font-black text-center mb-2 text-black">
                    Reset password
                </h1>
                
                {/* Subjudul */}
                <p className="text-center text-sm md:text-base font-bold text-black mb-8">
                    Masukin kode verifikasi
                </p>

                {/* Form OTP */}
                <form onSubmit={handleVerify} className="space-y-6">
                    
                    {/* 4 Kotak Input OTP */}
                    <div className="flex justify-center gap-3 md:gap-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl md:text-3xl font-bold bg-white border-4 border-black text-black focus:outline-none focus:ring-0 focus:border-black"
                            />
                        ))}
                    </div>

                    {/* Tombol Verifikasi */}
                    <button
                        type="submit"
                        className="w-full bg-green-400 hover:bg-green-500 text-black font-black text-lg md:text-xl py-3 md:py-4 border-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 transition-all"
                    >
                        Verifikasi!
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}
