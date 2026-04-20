"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black shadow-[0px_4px_0px_0px_#000]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#FF90E8] border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#000] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200">
            <Camera size={18} className="text-black" />
          </div>
          <span className="text-lg font-black uppercase tracking-tight bg-yellow-300 px-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200">
            SNAP! BOOTH
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="font-bold text-sm uppercase tracking-wide px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 bg-white"
          >
            Dashboard
          </Link>
          <Link
            href="/login"
            className="font-bold text-sm uppercase tracking-wide px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 bg-cyan-300"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="font-bold text-sm uppercase tracking-wide px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 bg-yellow-300"
          >
            Daftar
          </Link>
        </div>

        <button
          className="sm:hidden w-9 h-9 border-2 border-black flex flex-col items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-black transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-black transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-black transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t-4 border-black bg-white flex flex-col">
          <Link href="/dashboard" className="font-bold text-sm uppercase tracking-wide px-6 py-4 border-b-2 border-black hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link href="/login" className="font-bold text-sm uppercase tracking-wide px-6 py-4 border-b-2 border-black hover:bg-cyan-50 transition-colors" onClick={() => setMenuOpen(false)}>
            Masuk
          </Link>
          <Link href="/register" className="font-bold text-sm uppercase tracking-wide px-6 py-4 hover:bg-yellow-50 transition-colors" onClick={() => setMenuOpen(false)}>
            Daftar
          </Link>
        </div>
      )}
    </nav>
  );
}
