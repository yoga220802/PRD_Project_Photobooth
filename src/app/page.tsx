import Link from 'next/link';
import Image from 'next/image';
import { Camera, Sparkles } from 'lucide-react';

export default function Home() {
  const frameTemplates = [
    { name: 'WILD', color: 'bg-yellow-300' },
    { name: 'DISCO', color: 'bg-[#FF90E8]' },
    { name: 'WILD', color: 'bg-blue-300' },
    { name: 'WILD', color: 'bg-yellow-300' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cyan-300 overflow-hidden relative">

      {/* Dekorasi Background ala Neobrutalism */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#FF90E8] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-12" />
      <Sparkles size={48} className="absolute top-20 right-32 text-black rotate-12" />

      {/* HERO SECTION */}
      <div className="flex items-center justify-center min-h-screen px-6">
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
            href="/register"
            className="btn-neo bg-green-400 text-2xl px-12 py-4 mt-8 flex items-center gap-3 group"
          >
            MULAI FOTO SEKARANG
            <span className="group-hover:translate-x-2 transition-transform">➔</span>
          </Link>

        </div>
      </div>

      {/* 4 LANGKAH MUDAH SECTION */}
      <div className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Title Section */}
          <div className="relative">
            <div className="absolute -left-8 top-4 w-20 h-20 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center bg-white">
              <Image
                src="/assets/icons/header-divider.png"
                alt="Step divider icon"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            
            <div className="bg-lime-400 border-4 border-black rounded-3xl px-8 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
                FOTO DENGAN 4 LANGKAH MUDAH
              </h2>
            </div>
          </div>

          {/* 4 Options Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <button className="btn-neo bg-yellow-300 text-2xl font-bold py-4 hover:scale-105 transition-transform">
              Top Up!
            </button>
            <button className="btn-neo bg-[#FF90E8] text-2xl font-bold py-4 hover:scale-105 transition-transform">
              Pilih frame
            </button>
            <button className="btn-neo bg-blue-300 text-2xl font-bold py-4 hover:scale-105 transition-transform">
              Cekrek!
            </button>
            <button className="btn-neo bg-green-400 text-2xl font-bold py-4 hover:scale-105 transition-transform">
              Cetak!
            </button>
          </div>

          {/* Process Flow */}
          <div className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
              
              {/* Step 1 - Payment */}
              <div className="flex-1 min-w-[100px]">
                <div className="bg-yellow-300 border-4 border-black rounded-3xl p-6 shadow-[7px_11px_0px_rgba(0,0,0,1)] flex items-center justify-center aspect-square hover:scale-105 transition-transform">
                  <Image
                    src="/assets/icons/top-up.png"
                    alt="Top Up"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="text-3xl font-bold">→</div>
              </div>

              {/* Step 2 - Frames */}
              <div className="flex-1 min-w-[100px]">
                <div className="bg-[#AB3DDE] border-4 border-black rounded-3xl p-6 shadow-[7px_11px_0px_rgba(0,0,0,1)] flex items-center justify-center aspect-square hover:scale-105 transition-transform">
                  <Image
                    src="/assets/icons/frame.png"
                    alt="Pilih Frame"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="text-3xl font-bold">→</div>
              </div>

              {/* Step 3 - Camera */}
              <div className="flex-1 min-w-[100px]">
                <div className="bg-[#72ACC7] border-4 border-black rounded-3xl p-6 shadow-[7px_11px_0px_rgba(0,0,0,1)] flex items-center justify-center aspect-square hover:scale-105 transition-transform">
                  <Image
                    src="/assets/icons/camera.png"
                    alt="Cekrek"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="text-3xl font-bold">→</div>
              </div>

              {/* Step 4 - Print */}
              <div className="flex-1 min-w-[100px]">
                <div className="bg-[#4ADE80] border-4 border-black rounded-3xl p-6 shadow-[7px_11px_0px_rgba(0,0,0,1)] flex items-center justify-center aspect-square hover:scale-105 transition-transform">
                  <Image
                    src="/assets/icons/printer.png"
                    alt="Cetak"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Collection Section */}
          <div className="bg-green-400 border-4 border-black rounded-3xl px-8 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
              Lihat koleksi foto keren ini!
            </h3>
          </div>

        </div>
      </div>

      {/* GALLERY SHOWCASE SECTION */}
      <div className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Rainbow decoration - Neo Boohoo text */}
            <div className="absolute -top-8 -right-8 text-4xl font-black text-black transform rotate-12">
              NEO<br />BOOHOO!
            </div>

            {/* Gallery Container */}
            <div className="bg-yellow-400 border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              
              {/* Frame Templates Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {frameTemplates.map((template, idx) => (
                  <div key={idx} className={`${template.color} border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:scale-105 transition-transform cursor-pointer`}>
                    <div className="space-y-3">
                      {/* Template label */}
                      <div className="bg-black text-white px-2 py-1 text-xs font-bold w-fit">
                        {template.name}
                      </div>
                      
                      {/* Mock photo tiles */}
                      <div className="space-y-2">
                        <div className="bg-gray-200 border-2 border-black h-20 rounded flex items-center justify-center text-xs font-bold">
                          PHOTO 1
                        </div>
                        <div className="bg-gray-200 border-2 border-black h-20 rounded flex items-center justify-center text-xs font-bold">
                          PHOTO 2
                        </div>
                      </div>

                      {/* Style label */}
                      <div className="bg-red-400 text-black px-2 py-1 text-xs font-bold">
                        STYLE
                      </div>

                      {/* Celebrate day label */}
                      <div className="bg-yellow-300 text-black px-2 py-1 text-xs font-bold text-center">
                        CELEBRATE DAY
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative sparks */}
              <div className="absolute -left-12 bottom-12">
                <div className="text-3xl">⚡</div>
                <div className="text-3xl">⚡</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
