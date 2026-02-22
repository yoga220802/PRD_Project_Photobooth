'use client'

import { User, Coins, Zap, Lock, LogOut } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
    const [selectedFrame, setSelectedFrame] = useState(1)
    const [userCoins, setUserCoins] = useState(20)
    const router = useRouter()

    const frames = [
        { id: 1, name: 'STYLE', price: 0, locked: false, image: '/images/frame 1.png' },
        { id: 2, name: 'POLAROID', price: 20, locked: true, image: '/images/frame 2.png' },
        { id: 3, name: 'DANCE', price: 25, locked: true, image: '/images/frame 3.png' },
    ]

    const handleFrameClick = (frame: typeof frames[0]) => {
        if (!frame.locked || userCoins >= frame.price) {
            setSelectedFrame(frame.id)
        }
    }

    const handleUseFrame = () => {
        const frame = frames.find(f => f.id === selectedFrame)
        if (frame && frame.locked && userCoins >= frame.price) {
            setUserCoins(userCoins - frame.price)
            alert(`Frame ${frame.name} berhasil dibuka!`)
        } else if (frame && !frame.locked) {
            alert(`Menggunakan frame ${frame.name}!`)
        }
    }

    const handleLogout = () => {
        router.push('/login')
    }

    return (
        <div className="min-h-screen bg-[#4DD0E1] p-4 md:p-8">
            {/* Header */}
            <div className="bg-[#FFD93D] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-black text-black">SNAP BOOTH!</h1>
                    
                    {/* Menu Buttons */}
                    <div className="flex gap-3 flex-wrap justify-center">
                        <button className="bg-[#FFD93D] border-4 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 font-black text-black">
                            <User size={20} className="stroke-[3]" />
                            <span className="hidden sm:inline">Profil Kamu</span>
                        </button>
                        
                        <div className="bg-[#FFD93D] border-4 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 font-black text-black">
                            <Coins size={20} className="text-black stroke-[3]" />
                            <span>{userCoins} coins</span>
                        </div>
                        
                        <button className="bg-[#FFD93D] border-4 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 font-black text-black">
                            <Coins size={20} className="text-black stroke-[3]" />
                            <span className="hidden sm:inline">Top Up Koin</span>
                        </button>

                        <button 
                            onClick={handleLogout}
                            className="bg-[#FF6B9D] border-4 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 font-black text-black">
                            <LogOut size={20} className="stroke-[3]" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section - Frame Selection */}
                <div className="lg:col-span-2">
                    <div className="bg-[#FFD93D] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 relative">
                        {/* Pink Label */}
                        <div className="absolute -top-4 left-6 bg-[#FF6B9D] border-3 border-black rounded-lg px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
                            <p className="font-bold text-sm md:text-base text-black">Yang orang suka!, kalau kamu?</p>
                        </div>

                        {/* Frame Grid */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            {frames.map((frame) => (
                                <div
                                    key={frame.id}
                                    onClick={() => handleFrameClick(frame)}
                                    className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                >
                                    <div className="relative aspect-square mb-3">
                                        <Image
                                            src={frame.image}
                                            alt={frame.name}
                                            fill
                                            className="object-contain"
                                        />
                                        {frame.locked && (
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                                                <Lock size={40} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {frame.price === 0 ? (
                                        <button className="w-full bg-[#6BCF7F] border-3 border-black rounded-lg py-2 font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                            FREE
                                        </button>
                                    ) : (
                                        <button className="w-full bg-[#6BCF7F] border-3 border-black rounded-lg py-2 font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1">
                                            <Coins size={16} />
                                            {frame.price} Koin
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section - Preview */}
                <div className="relative">
                    {/* Decorative Lightning - Top Right */}
                    <Zap className="absolute -top-3 -right-3 text-[#FFD93D] fill-[#FFD93D] w-16 h-16 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
                    
                    {/* Decorative Lightning - Bottom Left */}
                    <Zap className="absolute -bottom-3 -left-3 text-[#FFD93D] fill-[#FFD93D] w-14 h-14 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
                    
                    <div className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
                        <h2 className="text-2xl font-black text-black mb-4">Frame pilihan kamu</h2>
                        
                        <div className="relative aspect-square mb-4 border-4 border-black rounded-xl overflow-hidden">
                            <Image
                                src={frames.find(f => f.id === selectedFrame)?.image || frames[0].image}
                                alt="Selected Frame"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <button
                            onClick={handleUseFrame}
                            className="w-full bg-[#6BCF7F] border-4 border-black rounded-xl py-4 font-black text-lg text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            FOTO PAKE INI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
