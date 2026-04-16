"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import GlobalLoading from "@/app/loading";

export default function TesterPage() {
  const { showToast } = useToast();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulasi jika sebuah komponen Crash / Throw Error
  if (isError) {
    throw new Error(
      "Ini error buatan dari halaman preview! (Simulasi Component Crash)",
    );
  }

  // Render Preview Loading Component Murni
  if (isLoading) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsLoading(false)}
          className="absolute top-8 right-8 z-50 bg-[#FF69B4] text-black border-[4px] border-black font-black uppercase py-2 px-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
        >
          Tutup Preview Loading
        </button>
        <GlobalLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5E1] flex flex-col items-center p-8 space-y-12">
      {/* Header Neobrutalism */}
      <div className="bg-white border-[6px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-4xl transform -rotate-1 mt-8">
        <h1 className="text-4xl font-black uppercase text-black mb-2 flex items-center gap-3">
          <span className="bg-[#39FF14] px-2 py-1 border-4 border-black">
            🧪
          </span>{" "}
          Pusat Preview UI
        </h1>
        <p className="font-bold text-gray-700 bg-[#5CE1E6] inline-block px-3 py-1 border-2 border-black">
          Testing khusus untuk Loading Skeleton, Global Error Boundary, & Toast
        </p>
      </div>

      {/* Grid Konten Tester */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl pb-16">
        {/* 1. TOAST PREVIEW */}
        <div className="bg-[#FFEA00] border-4 border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] rotate-1 flex flex-col items-start gap-4">
          <h2 className="text-2xl font-black uppercase border-b-4 border-black w-full pb-2">
            1. Toast Feedback
          </h2>
          <p className="font-bold">
            Test varian kemunculan notifikasi pop-up sudut kanan bawah:
          </p>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => showToast("Data berhasil disimpan!", "success")}
              className="bg-[#39FF14] text-black border-2 border-black font-bold p-2 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
            >
              Sukses Toast
            </button>
            <button
              onClick={() => showToast("Terjadi kesalahan sistem!", "error")}
              className="bg-[#FF69B4] text-black border-2 border-black font-bold p-2 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
            >
              Error Toast
            </button>
            <button
              onClick={() => showToast("Ups, koin tidak cukup!", "warning")}
              className="bg-white text-black border-2 border-black font-bold p-2 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
            >
              Warning Toast
            </button>
            <button
              onClick={() => showToast("Email sedang diproses...", "info")}
              className="bg-[#5CE1E6] text-black border-2 border-black font-bold p-2 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
            >
              Info Toast
            </button>
          </div>
        </div>

        {/* 2. ERROR PREVIEW */}
        <div className="bg-[#FF69B4] border-4 border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] -rotate-1 flex flex-col items-start gap-4">
          <h2 className="text-2xl font-black uppercase text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)] border-b-4 border-black w-full pb-2">
            2. Error Boundary
          </h2>
          <p className="font-bold bg-white text-black p-2 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            Melempar (Throw) Error palsu untuk memicu UI Global Error dari
            Next.js.
          </p>
          <button
            onClick={() => setIsError(true)}
            className="mt-auto bg-black text-white font-black uppercase px-6 py-4 w-full border-[4px] border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:bg-red-500 hover:border-black hover:text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none"
          >
            Picu Error!
          </button>
        </div>

        {/* 3. LOADING PREVIEW */}
        <div className="bg-[#5CE1E6] border-4 border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] rotate-1 flex flex-col items-start gap-4">
          <h2 className="text-2xl font-black uppercase text-black border-b-4 border-black w-full pb-2">
            3. Loading UI
          </h2>
          <p className="font-bold text-black opacity-90">
            Memanggil komponen Loading Skeleton Spinner (
            <code className="bg-white px-1 border border-black">
              loading.tsx
            </code>
            ) secara langsung.
          </p>
          <button
            onClick={() => setIsLoading(true)}
            className="mt-auto bg-white text-black font-black uppercase px-6 py-4 border-[4px] border-black hover:bg-[#39FF14] shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all w-full active:translate-y-1 active:shadow-none"
          >
            Lihat Loading
          </button>
        </div>
      </div>
    </div>
  );
}
