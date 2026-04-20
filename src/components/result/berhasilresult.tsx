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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[90vw] sm:max-w-sm">
        <Image
          src="/icons/wajah.png"
          alt="Berhasil"
          width={110}
          height={110}
          className="absolute -top-12 -left-12 z-10 drop-shadow-lg"
        />
        <div className="bg-white border-4 card-neo rounded-md w-full">
          <div className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 pt-8">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black">{message}</h3>
            </div>

            <div className="flex justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-8 border-green-400 bg-white flex items-center justify-center">
                <Check size={48} className="text-black" strokeWidth={4} />
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-green-400 text-black font-black text-sm sm:text-base px-10 sm:px-12 py-2 sm:py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
