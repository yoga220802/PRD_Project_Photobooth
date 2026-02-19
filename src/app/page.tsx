import Link from 'next/link';
import { Camera, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-300 p-6 overflow-hidden relative">

      {/* Dekorasi Background ala Neobrutalism */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#FF90E8] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-12" />
      <Sparkles size={48} className="absolute top-20 right-32 text-black rotate-12" />

      <div className="card-neo max-w-3xl w-full flex flex-col items-center text-center space-y-8 bg-white z-10">

        {/* Logo Icon */}
        <div className="w-32 h-32 bg-[#FF90E8] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center rotate-[-5deg] mb-4">
          <Camera size={64} className="text-black" />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight bg-yellow-300 inline-block px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
            SNAP! BOOTH
          </h1>
          <p className="text-xl md:text-2xl font-bold border-b-4 border-black pb-2 mt-6">
            Photobooth Web-App Modern & Praktis.
          </p>
          <p className="text-gray-700 font-medium">
            Abadikan momen, pilih frame premium, dan cetak langsung atau kirim ke emailmu!
          </p>
        </div>

        {/* Tombol CTA */}
        <Link
          href="/login"
          className="btn-neo bg-green-400 text-2xl px-12 py-4 mt-8 flex items-center gap-3 group"
        >
          MULAI FOTO SEKARANG
          <span className="group-hover:translate-x-2 transition-transform">➔</span>
        </Link>

      </div>
    </div>
  );
}