'use client'

import { useEffect } from 'react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-[#FFF5E1] flex flex-col items-center justify-center p-8 space-y-8 select-none">

            <div className="bg-red-500 border-[6px] border-black p-8 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative max-w-lg w-full transform -rotate-1">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-white border-4 border-black rounded-full flex items-center justify-center font-black text-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black">
                    !
                </div>
                <h2 className="text-3xl font-black uppercase text-white mb-4 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    Waduh, Ada Error Nih!
                </h2>
                <p className="text-black font-bold mb-8 bg-white/90 p-3 border-2 border-black rotate-1">
                    {error.message || 'Sistem lagi sedikit pusing cuy, coba refresh bentar ya!'}
                </p>

                <button
                    onClick={() => reset()}
                    className="bg-[#5CE1E6] hover:bg-[#39FF14] text-black border-[4px] border-black font-black uppercase py-4 px-8 transform hover:-translate-y-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-2 active:shadow-none"
                >
                    Coba Lagi Dong
                </button>
            </div>
        </div>
    )
}
