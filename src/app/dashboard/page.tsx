"use client";

import { User, Lock, LogOut, Coins, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/Toast'
import LoadingScreen from '@/components/LoadingScreenDB'
import FramePurchaseModal from '@/components/modals/FramePurchaseModal'
import CoinDropdown from '@/components/dropdown/CoinDropdown'


export default function DashboardPage() {
    const [selectedFrame, setSelectedFrame] = useState(1)
    const [userCoins, setUserCoins] = useState(45)
    const [unlockedFrames, setUnlockedFrames] = useState<number[]>([1])
    const [selectedCategory, setSelectedCategory] = useState("Semua")
    const [isLoadingTopUp, setIsLoadingTopUp] = useState(false)
    const [purchaseTarget, setPurchaseTarget] = useState<typeof frames[0] | null>(null)
    const [profileName, setProfileName] = useState('Iswara')
    const [profileImage, setProfileImage] = useState<string | null>(null)

    useEffect(() => {
        const saved = localStorage.getItem('profileData')
        if (saved) {
            const parsed = JSON.parse(saved)
            if (parsed.formData?.name) setProfileName(parsed.formData.name)
            if (parsed.profileImage) setProfileImage(parsed.profileImage)
        }
    }, [])

    const router = useRouter()
    const { showToast } = useToast()

    const framesData = useMemo(() => [
        { id: 1,  name: 'STYLE',    category: 'Clasico', price: 0,  thumbnail: '/images/Frame1.png',      image: '/frames/Frame1.png' },
        { id: 2,  name: 'POLAROID', category: 'Cute',    price: 20, thumbnail: '/images/Frame2.png',      image: '/frames/Frame2.png' },
        { id: 3,  name: 'DANCE',    category: 'Estetik', price: 25, thumbnail: '/images/Frame3.png',      image: '/frames/Frame3.png' },
        { id: 4,  name: 'GAMER',    category: 'Estetik', price: 25, thumbnail: '/images/Frame4.png',      image: '/frames/Frame4.png' },
        { id: 5,  name: 'RETRO',    category: 'Clasico', price: 20, thumbnail: '/images/Frame5.png',      image: '/frames/Frame5.png' },
        { id: 6,  name: 'NEON',     category: 'Cute',    price: 25, thumbnail: '/images/Frame6.png',      image: '/frames/Frame6.png' },
        { id: 7,  name: 'DISCO',    category: 'Cute',    price: 25, thumbnail: '/images/Frame7.png',      image: '/frames/Frame7.png' },
        { id: 8,  name: 'WILD',     category: 'Estetik', price: 20, thumbnail: '/images/Frame8.png',      image: '/frames/Frame8.png' },
        { id: 9,  name: 'PASTEL',   category: 'Cute',    price: 20, thumbnail: '/images/Frame9.png',      image: '/frames/Frame9.png' },
        { id: 10, name: 'VINTAGE',  category: 'Clasico', price: 25, thumbnail: '/images/Frame10.png',     image: '/frames/Frame10.png' },
        { id: 11, name: 'BLOOM',    category: 'Cute',    price: 20, thumbnail: '/images/Frame11.png',     image: '/frames/Frame11.png' },
        { id: 12, name: 'DARK',     category: 'Estetik', price: 25, thumbnail: '/images/Frame12.png',     image: '/frames/Frame12.png' },
        { id: 13, name: 'SUMMER',   category: 'Cute',    price: 20, thumbnail: '/images/Frame13.png',     image: '/frames/Frame13.png' },
        { id: 14, name: 'MINIMAL',  category: 'Clasico', price: 0,  thumbnail: '/images/Frame14.png',     image: '/frames/Frame14.png' },
        { id: 15, name: 'DREAMY',   category: 'Cute',    price: 25, thumbnail: '/images/Frame15.png',     image: '/frames/Frame15.png' },
        { id: 16, name: 'URBAN',    category: 'Estetik', price: 20, thumbnail: '/images/Frame16.png',     image: '/frames/Frame16.png' },
        { id: 17, name: 'GLAM',     category: 'Cute',    price: 25, thumbnail: '/images/Frame 17.PNG',    image: '/frames/Frame 17.PNG' },
        { id: 18, name: 'COSMIC',   category: 'Estetik', price: 25, thumbnail: '/images/Frame 18.PNG',    image: '/frames/Frame 18.PNG' },
        { id: 19, name: 'FOREST',   category: 'Clasico', price: 20, thumbnail: '/images/Frame 19.PNG',    image: '/frames/Frame 19.PNG' },
        { id: 20, name: 'CANDY',    category: 'Cute',    price: 20, thumbnail: '/images/Frame 20.PNG',    image: '/frames/Frame 20.PNG' },
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
        if (frame.locked) {
            setPurchaseTarget(frame)
            return
        }
        setSelectedFrame(frame.id)
    }, [frames])

    const handleConfirmPurchase = useCallback(() => {
        if (!purchaseTarget) return
        setUserCoins((prev) => prev - purchaseTarget.price)
        setUnlockedFrames((prev) => [...prev, purchaseTarget.id])
        setSelectedFrame(purchaseTarget.id)
        showToast("Frame berhasil dibuka!", "success")
        setPurchaseTarget(null)
    }, [purchaseTarget, showToast])

    const handleCancelPurchase = useCallback(() => {
        setPurchaseTarget(null)
    }, [])

    const handleLogout = useCallback(() => {
        router.push('/login')
    }, [router])

    const handleTopUpClick = useCallback(() => {
        setIsLoadingTopUp(true)
        setTimeout(() => {
            router.push('/topup')
        }, 3000)
    }, [router])

    const selectedFrameData = useMemo(() =>
        framesData.find(f => f.id === selectedFrame),
        [framesData, selectedFrame]
    )

    return (
        <>
            <div className="min-h-screen bg-[#4DD0E1] pt-12 pb-6 px-3 sm:px-4 md:px-6 lg:px-8 relative">

        <button
          onClick={() => router.push('/')}
          className="absolute top-4 left-4 bg-white border-4 border-black rounded-2xl p-2 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-y-1 hover:drop-shadow-none transition-all active:scale-95 z-20"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>

                <div className="bg-[#FFD93D] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-col items-start">
                            <div className="bg-[#23D73A] border-[3px] border-black shadow-[4px_4px_0_rgba(0,0,0,1)] px-3 py-1 inline-block -rotate-1 mb-2">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-black tracking-wide">SNAP BOOTH!</h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border-[3px] border-black overflow-hidden bg-white shrink-0 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                    {profileImage ? (
                                        <Image src={profileImage} alt="Foto Profil" width={40} height={40} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#81D4FA]">
                                            <User size={20} className="stroke-[3] text-black" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-lg sm:text-xl md:text-2xl font-black text-black">Hai, {profileName}!</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">

                            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2">
                                <button
                                    onClick={() => router.push('/editprofile')}
                                    className="bg-[#F4B266] border-4 border-black rounded-xl px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 font-black text-black text-sm">
                                    <User size={18} className="stroke-[3] shrink-0" />
                                    <span>Profil</span>
                                </button>

                                <CoinDropdown
                                    coins={userCoins}
                                    onTopUp={handleTopUpClick}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:flex sm:flex-row gap-2">
                                <button
                                    onClick={handleLogout}
                                    className="bg-[#FF6B6B] border-4 border-black rounded-xl px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 font-black text-black text-sm">
                                    <LogOut size={18} className="stroke-[3] shrink-0" />
                                    <span>Logout</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2">
                        <div className="bg-[#FFD93D] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 relative">
                            <div className="absolute -top-4 left-4 sm:left-6 bg-[#FF6B9D] border-[3px] border-black rounded-lg px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] z-10">
                                <p className="font-bold text-xs sm:text-sm text-black whitespace-nowrap">
                                    Yang orang suka!, kalau kamu?
                                </p>
                            </div>

                            <div className="absolute -top-4 right-4 sm:right-6 bg-[#6BCF7F] border-[3px] border-black rounded-lg px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[2deg] z-10 hidden sm:block">
                                <p className="font-bold text-xs sm:text-sm text-black whitespace-nowrap">
                                    Frame seru kami yang lain!
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4 mt-8 pt-2 relative z-0">
                                {["Semua", "Clasico", "Cute", "Estetik"].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`border-[3px] border-black rounded-lg px-4 py-1.5 font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all text-xs sm:text-sm ${selectedCategory === cat ? "bg-[#4DD0E1]" : "bg-white"}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[420px] sm:max-h-[480px] overflow-y-auto pr-1">
                                {frames.map((frame) => (
                                    <div
                                        key={frame.id}
                                        onClick={() => handleFrameClick(frame)}
                                        className={`border-4 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col items-center ${selectedFrame === frame.id ? "bg-[#F2EDD0]" : "bg-white"}`}
                                    >
                                        <div className="relative aspect-square w-full mb-2 rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-400">
                                            <Image
                                                src={frame.thumbnail}
                                                alt={frame.name}
                                                fill
                                                className="object-contain"
                                                loading="lazy"
                                                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                                            />
                                            {frame.locked && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <Lock size={36} fill="black" className="text-black" />
                                                </div>
                                            )}
                                        </div>

                                        <p className="font-black text-xs text-black mb-1">{frame.name}</p>

                                        <div className="flex items-center justify-center gap-1 mb-2">
                                            {frame.price === 0 ? (
                                                <span className="bg-[#23D73A] border-[2px] border-black rounded-md px-2 py-0.5 font-black text-black text-xs">FREE</span>
                                            ) : (
                                                <>
                                                    <Coins size={12} strokeWidth={3} />
                                                    <span className="font-black text-black text-xs">{frame.price} Koin</span>
                                                </>
                                            )}
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFrameClick(frame);
                                            }}
                                            className={`w-full border-[3px] border-black rounded-lg py-1 font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1 text-xs cursor-pointer hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
                                                frame.locked ? "bg-[#F4B266]" : selectedFrame === frame.id ? "bg-[#4DD0E1]" : "bg-[#6BCF7F]"
                                            }`}
                                        >
                                            {frame.price === 0 ? "Pakai" : frame.locked ? "Beli" : selectedFrame === frame.id ? "Dipilih" : "Pakai"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-[#FFD93D] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 sticky top-24">
                            <div className="bg-[#FF6B9D] border-[3px] border-black rounded-lg px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] inline-block mb-4">
                                <p className="font-black text-sm text-black">Preview Frame</p>
                            </div>

                            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-gray-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                                {selectedFrameData && (
                                    <Image
                                        src={selectedFrameData.image}
                                        alt={selectedFrameData.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 1024px) 90vw, 30vw"
                                    />
                                )}
                            </div>

                            <div className="bg-white border-4 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                                <p className="font-black text-sm text-black">Frame dipilih:</p>
                                <p className="font-black text-lg text-[#4DD0E1]">{selectedFrameData?.name ?? '-'}</p>
                                <p className="text-xs text-gray-500 font-bold">{selectedFrameData?.category}</p>
                            </div>

                            <button
                                onClick={() => router.push('/studio')}
                                className="w-full bg-[#23D73A] border-4 border-black rounded-xl py-3 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm sm:text-base"
                            >
                                Mulai Foto Sekarang!
                            </button>
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

            <FramePurchaseModal
                frame={purchaseTarget}
                userCoins={userCoins}
                onConfirm={handleConfirmPurchase}
                onCancel={handleCancelPurchase}
                onTopUp={() => {
                    setPurchaseTarget(null)
                    handleTopUpClick()
                }}
            />
        </>
    )
}
