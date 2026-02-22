'use client';

import { Check } from 'lucide-react';

interface RegisterSuksesNotifikasiProps {
  onClose: () => void;
}

export default function RegisterSuksesNotifikasi({ onClose }: RegisterSuksesNotifikasiProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-gray-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg max-w-md w-full p-8">
        
        <h2 className="text-2xl font-black text-black text-center mb-8">
          Asik!, Kamu udah kedaftar
        </h2>

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
  );
}
