"use client";

import { User, Zap, Lock, LogOut, Camera } from 'lucide-react'
import Image from 'next/image'
import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/Toast'
import LoadingScreen from '@/components/LoadingScreenDB'

export default function DashboardPage() {
    const [selectedFrame, setSelectedFrame] = useState(1)
    const [userCoins, setUserCoins] = useState(45)
    const [unlockedFrames, setUnlockedFrames] = useState<number[]>([1])
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [showBuyModal, setShowBuyModal] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("Semua")
    const [isLoadingTopUp, setIsLoadingTopUp] = useState(false)

    const router = useRouter()
    const { showToast } = useToast()

    const framesData = useMemo(() => [
        { id: 1, name: 'STYLE', category: 'Clasico', price: 0, thumbnail: '/images/frame 1.png', image: '/frames/frame1.png' },
        { id: 2, name: 'POLAROID', category: 'Cute', price: 20, thumbnail: '/images/frame 2.png', image: '/frames/frame2.png' },
        { id: 3, name: 'DANCE', category: 'Estetik', price: 25, thumbnail: '/images/frame 3.png', image: '/frames/frame3.png' },
        { id: 4, name: 'GAMER', category: 'Estetik', price: 25, thumbnail: '/images/frame 1.png', image: '/frames/frame1.png' },
        { id: 5, name: 'RETRO', category: 'Clasico', price: 20, thumbnail: '/images/frame 2.png', image: '/frames/frame2.png' },
        { id: 6, name: 'NEON', category: 'Cute', price: 25, thumbnail: '/images/frame 3.png', image: '/frames/frame3.png' },
    ], [])

    const frames = useMemo(() => 
        framesData
            .filter(f => selectedCategory === 'Semua' || f.category === selectedCategory)
            .map(f => ({
                ...f,
                locked: !unlockedFrames.includes(f.id)
            })),
        [framesData, selectedCategory, unlockedFrames]
    )

    const handleFrameClick = useCallback((frame: typeof frames[0]) => {
        setSelectedFrame(frame.id)
    }, [])

    const handleUseFrame = useCallback(() => {
        const frame = framesData.find(f => f.id === selectedFrame)
        if (!frame) return

        const isLocked = !unlockedFrames.includes(frame.id)

        if (isLocked) {
            setShowBuyModal(true)
        } else {
            showToast(`Yeay! Menggunakan frame ${frame.name}!`, 'success')
        }
    }, [framesData, selectedFrame, unlockedFrames, showToast])

    const confirmBuy = useCallback(() => {
        const frame = framesData.find(f => f.id === selectedFrame)
        if (!frame) return

        if (userCoins >= frame.price) {
            setUserCoins(prev => prev - frame.price)
            setUnlockedFrames(prev => [...prev, frame.id])
            showToast(`Frame ${frame.name} berhasil dibeli!`, 'success')
            setShowBuyModal(false)
        } else {
            showToast(`Ups! Koin kamu kurang untuk beli frame ${frame.name}.`, 'error')
            setShowBuyModal(false)
        }
    }, [framesData, selectedFrame, userCoins, unlockedFrames, showToast])

    const handleLogout = useCallback(() => {
        setShowLogoutModal(true)
    }, [])

    const confirmLogout = useCallback(() => {
        router.push('/login')
    }, [router])

    const handleTopUpClick = useCallback(() => {
        setIsLoadingTopUp(true)
        setTimeout(() => {
            router.push('/topup')
        }, 3000)
    }, [router])

    const currentFrame = useMemo(() => 
        framesData.find(f => f.id === selectedFrame) || framesData[0],
        [framesData, selectedFrame]
    )
    
    const isCurrentFrameLocked = useMemo(() => 
        !unlockedFrames.includes(selectedFrame),
        [unlockedFrames, selectedFrame]
    )

    return (
        <div className="min-h-screen bg-[#4DD0E1] p-4 md:p-8">
            <div className="bg-[#FFD93D] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="bg-[#23D73A] border-3 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] px-4 py-1 inline-block -rotate-1 mb-2">
                            <h1 className="text-2xl md:text-3xl font-black text-black tracking-wide">SNAP BOOTH!</h1>
                        </div>
                        <p className="text-xl md:text-2xl font-black text-black">Hai, Iswara!</p>
                    </div>

                    <div className="flex gap-3 flex-wrap justify-center">
                        <button
                            onClick={() => router.push('/editprofile')}
                            className="bg-[#F4B266] border-4 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 font-black text-black">
                            <User size={20} className="stroke-[3]" />
                            <span className="hidden sm:inline">Profil Kamu</span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowHistory(!showHistory)}
                                className="bg-[#F4B266] border-4 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 font-black text-black h-full">
                                <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35.0121 5.00751C39.5871 5.00533 44.0244 6.57168 47.5842 9.44532C51.144 12.319 53.611 16.3262 54.5738 20.7987C55.5365 25.2712 54.9369 29.9385 52.8747 34.0224C50.8126 38.1062 47.4127 41.3596 43.2421 43.24C41.909 46.1873 39.8809 48.7672 37.3318 50.7586C34.7826 52.7499 31.7885 54.0933 28.6062 54.6734C25.4239 55.2535 22.1484 55.053 19.0605 54.0892C15.9727 53.1254 13.1647 51.427 10.8774 49.1397C8.59008 46.8524 6.8917 44.0444 5.92791 40.9566C4.96411 37.8688 4.76367 34.5932 5.34377 31.4109C5.92386 28.2286 7.26719 25.2345 9.25855 22.6854C11.2499 20.1362 13.8298 18.1081 16.7771 16.775C18.3617 13.2667 20.9251 10.2902 24.1597 8.20283C27.3943 6.11548 31.1625 5.00598 35.0121 5.00751ZM27.5121 22.5075H22.5121V25.0075C20.8874 25.0036 19.325 25.6324 18.1561 26.7609C16.9872 27.8893 16.3036 29.4286 16.2503 31.0524C16.197 32.6762 16.7781 34.257 17.8705 35.4597C18.9629 36.6624 20.4806 37.3924 22.1021 37.495L22.5121 37.5075H27.5121L27.7371 37.5275C28.0253 37.5797 28.2861 37.7314 28.4738 37.9562C28.6616 38.181 28.7644 38.4646 28.7644 38.7575C28.7644 39.0504 28.6616 39.334 28.4738 39.5588C28.2861 39.7836 28.0253 39.9353 27.7371 39.9875L27.5121 40.0075H17.5121V45.0075H22.5121V47.5075H27.5121V45.0075C29.1368 45.0115 30.6992 44.3826 31.8682 43.2542C33.0371 42.1257 33.7206 40.5865 33.774 38.9626C33.8273 37.3388 33.2462 35.758 32.1538 34.5553C31.0614 33.3527 29.5436 32.6226 27.9221 32.52L27.5121 32.5075H22.5121L22.2871 32.4875C21.9989 32.4353 21.7382 32.2836 21.5504 32.0588C21.3627 31.834 21.2598 31.5504 21.2598 31.2575C21.2598 30.9646 21.3627 30.681 21.5504 30.4562C21.7382 30.2314 21.9989 30.0797 22.2871 30.0275L22.5121 30.0075H32.5121V25.0075H27.5121V22.5075ZM35.0121 10.0075C32.8938 10.0071 30.7994 10.4553 28.8668 11.3227C26.9342 12.1901 25.2072 13.457 23.7996 15.04C26.6253 14.8685 29.4552 15.2987 32.1021 16.3024C34.7491 17.306 37.1529 18.8601 39.1545 20.862C41.1561 22.8638 42.7099 25.2677 43.7132 27.9148C44.7165 30.5619 45.1465 33.3919 44.9746 36.2175C47.2477 34.1966 48.8526 31.5324 49.5767 28.5783C50.3007 25.6242 50.1096 22.5198 49.0287 19.6768C47.9478 16.8338 46.0282 14.3866 43.5245 12.6597C41.0207 10.9328 38.0511 10.0079 35.0096 10.0075" fill="black" />
                                </svg>
                                <span>{userCoins} coins</span>
                            </button>

                            {showHistory && (
                                <div className="absolute top-[120%] left-[50%] -translate-x-1/2 w-48 bg-white border-4 border-black rounded-lg shadow-[4px_4px_0_rgba(0,0,0,1)] p-3 z-[100] animate-in fade-in zoom-in duration-200">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-4 border-l-4 border-black rotate-45"></div>
                                    <div className="relative z-10 text-center flex flex-col items-center">
                                        <p className="text-[11px] md:text-sm font-semibold text-black">Terakhir top up</p>
                                        <p className="text-[11px] md:text-sm font-black text-black mt-1">12- Desember - 2025</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleTopUpClick}
                            className="bg-[#F4B266] border-4 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 font-black text-black">
                            <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.0121 5.00751C39.5871 5.00533 44.0244 6.57168 47.5842 9.44532C51.144 12.319 53.611 16.3262 54.5738 20.7987C55.5365 25.2712 54.9369 29.9385 52.8747 34.0224C50.8126 38.1062 47.4127 41.3596 43.2421 43.24C41.909 46.1873 39.8809 48.7672 37.3318 50.7586C34.7826 52.7499 31.7885 54.0933 28.6062 54.6734C25.4239 55.2535 22.1484 55.053 19.0605 54.0892C15.9727 53.1254 13.1647 51.427 10.8774 49.1397C8.59008 46.8524 6.8917 44.0444 5.92791 40.9566C4.96411 37.8688 4.76367 34.5932 5.34377 31.4109C5.92386 28.2286 7.26719 25.2345 9.25855 22.6854C11.2499 20.1362 13.8298 18.1081 16.7771 16.775C18.3617 13.2667 20.9251 10.2902 24.1597 8.20283C27.3943 6.11548 31.1625 5.00598 35.0121 5.00751ZM27.5121 22.5075H22.5121V25.0075C20.8874 25.0036 19.325 25.6324 18.1561 26.7609C16.9872 27.8893 16.3036 29.4286 16.2503 31.0524C16.197 32.6762 16.7781 34.257 17.8705 35.4597C18.9629 36.6624 20.4806 37.3924 22.1021 37.495L22.5121 37.5075H27.5121L27.7371 37.5275C28.0253 37.5797 28.2861 37.7314 28.4738 37.9562C28.6616 38.181 28.7644 38.4646 28.7644 38.7575C28.7644 39.0504 28.6616 39.334 28.4738 39.5588C28.2861 39.7836 28.0253 39.9353 27.7371 39.9875L27.5121 40.0075H17.5121V45.0075H22.5121V47.5075H27.5121V45.0075C29.1368 45.0115 30.6992 44.3826 31.8682 43.2542C33.0371 42.1257 33.7206 40.5865 33.774 38.9626C33.8273 37.3388 33.2462 35.758 32.1538 34.5553C31.0614 33.3527 29.5436 32.6226 27.9221 32.52L27.5121 32.5075H22.5121L22.2871 32.4875C21.9989 32.4353 21.7382 32.2836 21.5504 32.0588C21.3627 31.834 21.2598 31.5504 21.2598 31.2575C21.2598 30.9646 21.3627 30.681 21.5504 30.4562C21.7382 30.2314 21.9989 30.0797 22.2871 30.0275L22.5121 30.0075H32.5121V25.0075H27.5121V22.5075ZM35.0121 10.0075C32.8938 10.0071 30.7994 10.4553 28.8668 11.3227C26.9342 12.1901 25.2072 13.457 23.7996 15.04C26.6253 14.8685 29.4552 15.2987 32.1021 16.3024C34.7491 17.306 37.1529 18.8601 39.1545 20.862C41.1561 22.8638 42.7099 25.2677 43.7132 27.9148C44.7165 30.5619 45.1465 33.3919 44.9746 36.2175C47.2477 34.1966 48.8526 31.5324 49.5767 28.5783C50.3007 25.6242 50.1096 22.5198 49.0287 19.6768C47.9478 16.8338 46.0282 14.3866 43.5245 12.6597C41.0207 10.9328 38.0511 10.0079 35.0096 10.0075" fill="black" />
                            </svg>
                            <span className="hidden sm:inline">Top Up Koin</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="bg-[#FF6B6B] border-4 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 font-black text-black">
                            <LogOut size={20} className="stroke-[3]" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-[#FFD93D] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 relative">
                        <div className="absolute -top-4 left-6 bg-[#FF6B9D] border-3 border-black rounded-lg px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] z-10">
                            <p className="font-bold text-sm md:text-base text-black">
                                Yang orang suka!, kalau kamu?
                            </p>
                        </div>

                        <div className="absolute -top-4 right-6 bg-[#6BCF7F] border-3 border-black rounded-lg px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[2deg] z-10 hidden sm:block">
                            <p className="font-bold text-sm md:text-base text-black">
                                Frame seru kami yang lain!
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 md:gap-4 mb-6 mt-6 pt-2 relative z-0">
                            {["Semua", "Clasico", "Cute", "Estetik"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`bg-white border-[3px] border-black rounded-lg px-6 py-2 font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all text-sm md:text-base ${selectedCategory === cat ? "bg-[#4DD0E1]" : ""}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pb-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {frames.map((frame) => (
                                <div
                                    key={frame.id}
                                    onClick={() => handleFrameClick(frame)}
                                    className={`bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col items-center ${selectedFrame === frame.id ? "bg-[#F2EDD0]" : "bg-white"}`}
                                >
                                    <div className="relative aspect-square w-full mb-3 rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-400">
                                        <Image
                                            src={frame.thumbnail}
                                            alt={frame.name}
                                            fill
                                            className="object-contain"
                                            loading="lazy"
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                        />
                                        {frame.locked && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <Lock size={48} fill="black" className="text-black" />
                                            </div>
                                        )}
                                    </div>

                                    {frame.price === 0 ? (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFrameClick(frame);
                                            }}
                                            className="w-full bg-[#6BCF7F] border-3 border-black rounded-lg py-1 md:py-2 font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-sm md:text-base cursor-pointer hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                        >
                                            FREE
                                        </button>
                                    ) : frame.locked ? (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFrameClick(frame);
                                            }}
                                            className="w-full bg-[#6BCF7F] border-3 border-black rounded-lg py-1 md:py-2 font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1 text-sm md:text-base cursor-pointer hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                        >
                                            {frame.price} Koin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFrameClick(frame);
                                            }}
                                            className="w-full bg-[#6BCF7F] border-3 border-black rounded-lg py-1 md:py-2 font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1 text-sm md:text-base cursor-pointer hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                        >
                                            Pakai
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isLoadingTopUp && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4">
                    <div className="w-full max-w-2xl">
                        <LoadingScreen />
                    </div>
                </div>
            )}
        </div>
    )
}
