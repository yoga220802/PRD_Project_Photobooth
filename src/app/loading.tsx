'use client'

import React from 'react'

export default function GlobalLoading() {
    return (
        <div className="min-h-screen bg-[#FFF5E1] flex flex-col items-center justify-center p-8 space-y-8 select-none">

            <div className="relative">
                <div className="absolute inset-0 bg-black rounded-full translate-x-2 translate-y-2"></div>
                <div className="w-24 h-24 border-[6px] border-black rounded-full bg-[#5CE1E6] flex items-center justify-center relative z-10 animate-[spin_3s_linear_infinite]">
                    <div className="w-8 h-8 bg-black rounded-full animate-bounce"></div>
                </div>
            </div>

            <div className="bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                <h2 className="text-2xl font-black uppercase text-black animate-pulse">
                    Sabar ya, lagi loading...
                </h2>
            </div>


            <div className="w-full max-w-md space-y-4">
                <div className="h-6 bg-black/10 border-2 border-black rounded shadow-[4px_4px_0_0_rgba(0,0,0,1)] animate-pulse w-3/4 mx-auto"></div>
                <div className="h-6 bg-black/10 border-2 border-black rounded shadow-[4px_4px_0_0_rgba(0,0,0,1)] animate-pulse w-1/2 mx-auto delay-75"></div>
            </div>
        </div>
    )
}
