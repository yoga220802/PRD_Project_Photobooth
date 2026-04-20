"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowUpCircle } from "lucide-react";

const CoinIcon = () => (
    <svg width="18" height="18" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M35.0121 5.00751C39.5871 5.00533 44.0244 6.57168 47.5842 9.44532C51.144 12.319 53.611 16.3262 54.5738 20.7987C55.5365 25.2712 54.9369 29.9385 52.8747 34.0224C50.8126 38.1062 47.4127 41.3596 43.2421 43.24C41.909 46.1873 39.8809 48.7672 37.3318 50.7586C34.7826 52.7499 31.7885 54.0933 28.6062 54.6734C25.4239 55.2535 22.1484 55.053 19.0605 54.0892C15.9727 53.1254 13.1647 51.427 10.8774 49.1397C8.59008 46.8524 6.8917 44.0444 5.92791 40.9566C4.96411 37.8688 4.76367 34.5932 5.34377 31.4109C5.92386 28.2286 7.26719 25.2345 9.25855 22.6854C11.2499 20.1362 13.8298 18.1081 16.7771 16.775C18.3617 13.2667 20.9251 10.2902 24.1597 8.20283C27.3943 6.11548 31.1625 5.00598 35.0121 5.00751ZM27.5121 22.5075H22.5121V25.0075C20.8874 25.0036 19.325 25.6324 18.1561 26.7609C16.9872 27.8893 16.3036 29.4286 16.2503 31.0524C16.197 32.6762 16.7781 34.257 17.8705 35.4597C18.9629 36.6624 20.4806 37.3924 22.1021 37.495L22.5121 37.5075H27.5121L27.7371 37.5275C28.0253 37.5797 28.2861 37.7314 28.4738 37.9562C28.6616 38.181 28.7644 38.4646 28.7644 38.7575C28.7644 39.0504 28.6616 39.334 28.4738 39.5588C28.2861 39.7836 28.0253 39.9353 27.7371 39.9875L27.5121 40.0075H17.5121V45.0075H22.5121V47.5075H27.5121V45.0075C29.1368 45.0115 30.6992 44.3826 31.8682 43.2542C33.0371 42.1257 33.7206 40.5865 33.774 38.9626C33.8273 37.3388 33.2462 35.758 32.1538 34.5553C31.0614 33.3527 29.5436 32.6226 27.9221 32.52L27.5121 32.5075H22.5121L22.2871 32.4875C21.9989 32.4353 21.7382 32.2836 21.5504 32.0588C21.3627 31.834 21.2598 31.5504 21.2598 31.2575C21.2598 30.9646 21.3627 30.681 21.5504 30.4562C21.7382 30.2314 21.9989 30.0797 22.2871 30.0275L22.5121 30.0075H32.5121V25.0075H27.5121V22.5075ZM35.0121 10.0075C32.8938 10.0071 30.7994 10.4553 28.8668 11.3227C26.9342 12.1901 25.2072 13.457 23.7996 15.04C26.6253 14.8685 29.4552 15.2987 32.1021 16.3024C34.7491 17.306 37.1529 18.8601 39.1545 20.862C41.1561 22.8638 42.7099 25.2677 43.7132 27.9148C44.7165 30.5619 45.1465 33.3919 44.9746 36.2175C47.2477 34.1966 48.8526 31.5324 49.5767 28.5783C50.3007 25.6242 50.1096 22.5198 49.0287 19.6768C47.9478 16.8338 46.0282 14.3866 43.5245 12.6597C41.0207 10.9328 38.0511 10.0079 35.0096 10.0075" fill="black" />
    </svg>
);

interface CoinDropdownProps {
    coins: number;
    lastTopUp?: string;
    onTopUp: () => void;
}

export default function CoinDropdown({ coins, lastTopUp = "12 Desember 2025", onTopUp }: CoinDropdownProps) {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="bg-[#F4B266] border-4 border-black rounded-xl px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 font-black text-black text-sm w-full justify-center"
            >
                <CoinIcon />
                <span>Koin</span>
                <ChevronDown
                    size={14}
                    strokeWidth={3}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute top-[calc(100%+8px)] right-0 w-52 bg-[#FFD93D] border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-[110]">

                    <div className="px-4 pt-4 pb-3 border-b-4 border-black">
                        <p className="text-xs font-black text-black uppercase tracking-wide mb-2">Saldo Koin</p>
                        <div className="relative">
                            <button
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                onClick={() => setOpen(false)}
                                className="w-full bg-white border-[3px] border-black rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                            >
                                <CoinIcon />
                                <span className="font-black text-black text-base">{coins} Koin</span>
                            </button>

                            {hovered && (
                                <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold rounded-lg px-3 py-2 whitespace-nowrap shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] pointer-events-none z-[120]">
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-black" />
                                    <p className="text-center opacity-70">Terakhir top up</p>
                                    <p className="text-center font-black">{lastTopUp}</p>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="px-4 py-3">
                        <button
                            onClick={() => {
                                setOpen(false);
                                onTopUp();
                            }}
                            className="w-full bg-[#23D73A] border-[3px] border-black rounded-lg px-3 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 font-black text-black text-sm"
                        >
                            <ArrowUpCircle size={16} strokeWidth={3} />
                            <span>Top Up</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
