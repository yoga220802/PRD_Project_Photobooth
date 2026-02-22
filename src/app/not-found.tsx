import Link from 'next/link'
import { Footprints, Star } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#5CE1E6] flex flex-col justify-center items-center relative overflow-hidden font-sans">
            {/* Dekorasi Kiri */}
            <div className="absolute top-8 left-8 flex flex-col gap-1">
                <div className="flex gap-2">
                    <Star size={48} strokeWidth={2} className="text-black fill-[#FFD700] rotate-12" />
                    <Star size={64} strokeWidth={2} className="text-black fill-[#FFD700] rotate-12" />
                </div>
                <div className="flex gap-4 ml-6">
                    <Star size={56} strokeWidth={2} className="text-black fill-[#FFD700] -rotate-12" />
                    <Star size={36} strokeWidth={2} className="text-black fill-[#FFD700] rotate-6" />
                </div>
            </div>

            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 pointer-events-none">
                <img src="https://i.postimg.cc/05WDLKm3/1.png" alt="Decoration Left" className="w-40 md:w-52 lg:w-64 h-auto object-contain drop-shadow-xl" />
            </div>

            {/* Dekorasi Kanan */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-10 pointer-events-none">
                <img src="https://i.postimg.cc/KcqBd3Lw/2(1).png" alt="Decoration Right" className="w-36 md:w-48 lg:w-56 h-auto object-contain drop-shadow-xl" />
            </div>

            <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                <div className="flex justify-end gap-2 pr-4">
                    <Star size={48} strokeWidth={2} className="text-black fill-[#FFD700] rotate-[15deg]" />
                    <Star size={56} strokeWidth={2} className="text-black fill-[#FFD700] -rotate-[10deg]" />
                </div>
                <div className="flex gap-2 justify-end">
                    <Star size={40} strokeWidth={2} className="text-black fill-[#FFD700] rotate-[30deg]" />
                    <Star size={64} strokeWidth={2} className="text-black fill-[#FFD700] rotate-[5deg]" />
                </div>
            </div>

            {/* Jejak Kaki Melingkar */}
            <div className="relative w-full max-w-2xl mb-16 md:mb-20 aspect-[3/1] flex items-center justify-center group pointer-events-none mt-16 md:mt-4">
                <Footprints size={40} className="absolute top-[30%] left-[5%] rotate-[45deg] text-black fill-black" strokeWidth={1} />
                <Footprints size={40} className="absolute top-0 left-[22%] rotate-[70deg] text-black fill-black" strokeWidth={1} />
                <Footprints size={40} className="absolute -top-[15%] left-[50%] rotate-[95deg] text-black fill-black -translate-x-1/2" strokeWidth={1} />
                <Footprints size={40} className="absolute top-0 right-[22%] rotate-[130deg] text-black fill-black" strokeWidth={1} />
                <Footprints size={40} className="absolute top-[30%] right-[5%] rotate-[160deg] text-black fill-black" strokeWidth={1} />
                <Footprints size={40} className="absolute bottom-[-10%] right-[22%] -rotate-[135deg] text-black fill-black" strokeWidth={1} />
                <Footprints size={40} className="absolute bottom-[-20%] left-[50%] -rotate-[90deg] text-black fill-black -translate-x-1/2" strokeWidth={1} />
                <Footprints size={40} className="absolute bottom-[-10%] left-[22%] -rotate-[40deg] text-black fill-black" strokeWidth={1} />

                <h1 className="text-[2.2rem] md:text-6xl font-black text-black z-10 text-center flex gap-3 md:gap-5 drop-shadow-[4px_4px_0_rgba(0,0,0,0.15)] mt-4">
                    <span>404</span>
                    <span>NOT</span>
                    <span>FOUND</span>
                </h1>
            </div>

            {/* Teks Deskripsi */}
            <div className="text-center mb-10 z-10">
                <h2 className="text-2xl md:text-[32px] font-black text-black tracking-tight mb-3">
                    Halaman yang kamu cari ngga ada :(
                </h2>
                <p className="text-black font-medium text-lg md:text-[22px]">
                    Kembali ke halaman kamu sebelumnya ya
                </p>
            </div>

            {/* Tombol Kembali */}
            <Link
                href="/"
                className="bg-[#39FF14] text-black font-black text-2xl md:text-[32px] py-3 px-16 md:py-4 md:px-24 border-[5px] md:border-[6px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[8px] active:translate-y-[8px] transition-all z-10"
            >
                kembali
            </Link>
        </div>
    )
}
