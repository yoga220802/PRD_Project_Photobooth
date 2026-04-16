import { Check } from "lucide-react";

import Image from "next/image";

import React from "react";

interface BerhasilResultProps {
  message?: string;
  onClose?: () => void;
  isVisible?: boolean;
}

export default function BerhasilResult({
  onClose,
  message = "Sudah Berhasil",
  isVisible = true,
}: BerhasilResultProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white border-4 card-neo rounded-md max-w-md">
        <div className="absolute -left-24 -top-14 ">
          <Image
            src="/icon/wajah.png"
            alt="Loading..."
            width={170}
            height={170}
          />
        </div>
        <div className=" flex flex-col items-center gap-6">
          {/* Message */}
          <div className="text-center">
            <h3 className="text-2xl font-black text-black mb-2">{message}</h3>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full border-8 border-green-400 bg-white flex items-center justify-center">
              <Check size={64} className="text-black" strokeWidth={4} />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-green-400 text-black font-black text-lg px-12 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
