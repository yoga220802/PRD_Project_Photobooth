'use client'

import { useState, useEffect } from 'react'
import { Camera, Star } from 'lucide-react'

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        // Simulasi progres loading
        const timer = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + 5
                if (newProgress >= 100) {
                    clearInterval(timer)
                    setTimeout(() => setIsFinished(true), 500)
                    return 100
                }
                return newProgress
            })
        }, 150)

        return () => clearInterval(timer)
    }, [])

    if (isFinished) {
        return (
            <div className="w-full min-h-[400px] md:min-h-[500px] bg-[#5CE1E6] flex flex-col items-center justify-center p-8 border-4 border-black rounded-xl">
                <div className="bg-white border-[6px] border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce relative max-w-lg w-full">
                    <h3 className="text-2xl font-black uppercase text-red-500 mb-2">Logic belum dibuat</h3>
                    <p className="text-black font-bold">Mode Preview Foto akan ditampilkan di sini.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-[400px] md:min-h-[500px] bg-[#5CE1E6] flex flex-col items-center justify-center relative overflow-hidden p-8 border-4 border-black rounded-xl">
            {/* Dekorasi Bintang Kiri Bawah */}
            <div className="absolute bottom-[20%] md:bottom-[22%] left-[5%] md:left-[12%] z-10">
                <div className="relative">
                    <svg className="absolute top-6 right-4 w-20 h-24 md:w-24 md:h-28 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="8">
                        {/* Lengkung tajam halus ke atas */}
                        <path d="M 10 90 C 40 85, 60 60, 80 15" strokeLinecap="round" />
                    </svg>
                    <Star size={56} strokeWidth={2.5} className="text-black fill-[#FFD700] -rotate-[15deg] relative z-10 drop-shadow-[3px_3px_0_rgba(0,0,0,0.15)]" />
                </div>
            </div>

            {/* Dekorasi Bintang Kanan Atas */}
            <div className="absolute top-[20%] right-[8%] md:right-[15%] z-10">
                <div className="relative flex items-center justify-center">
                    <svg className="absolute top-2 left-8 w-24 h-16 md:w-28 md:h-20 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="6" strokeLinejoin="round">
                        {/* Bentuk loop / ekor jatuhan meruncing sebelah kanan */}
                        <path d="M 5 60 Q 50 10, 95 40 Q 60 50, 5 60 Z" />
                    </svg>
                    <Star size={48} strokeWidth={2.5} className="text-black fill-[#FFD700] rotate-[15deg] relative z-10 drop-shadow-[3px_3px_0_rgba(0,0,0,0.15)]" />
                </div>
            </div>

            {/* Ikon Kamera Utama */}
            <div className="w-32 h-32 bg-[#FF69B4] rounded-full border-[6px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-16 relative z-10">
                <Camera size={64} className="text-black" strokeWidth={2.5} />
            </div>

            {/* Area Progress Loading */}
            <div className="w-full max-w-md relative z-10 mb-6 pt-10">
                {/* Bola Kuning di Atas Bar */}
                <div
                    className="absolute top-0 w-12 h-12 bg-[#FFEA00] rounded-full border-[4px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] z-20"
                    style={{
                        left: `calc(${progress}% - 24px)`, // Selalu berada di ujung bar hijau
                        transition: 'left 150ms linear'
                    }}
                />

                {/* Progress Bar Container */}
                <div className="w-full h-10 bg-white border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center relative overflow-hidden rounded-sm">
                    {/* Fill Hijau */}
                    <div
                        className="h-full bg-[#39FF14] border-r-[4px] border-black"
                        style={{
                            width: `${progress}%`,
                            transition: 'width 150ms linear'
                        }}
                    />
                </div>
            </div>

            {/* Teks Status */}
            <h2 className="text-2xl font-black text-black z-10 tracking-wide text-center">
                {progress < 100 ? 'Lagi nyiapin keseruan buat kamu' : 'Kece!, udah nih'}
            </h2>
        </div>
    )
}
