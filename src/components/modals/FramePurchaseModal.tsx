"use client";

import Image from "next/image";
import { X, Coins } from "lucide-react";

interface FrameData {
  id: number;
  name: string;
  category: string;
  price: number;
  thumbnail: string;
  image: string;
  locked: boolean;
}

interface FramePurchaseModalProps {
  frame: FrameData | null;
  userCoins: number;
  onConfirm: () => void;
  onCancel: () => void;
  onTopUp: () => void;
}

export default function FramePurchaseModal({
  frame,
  userCoins,
  onConfirm,
  onCancel,
  onTopUp,
}: FramePurchaseModalProps) {
  if (!frame) return null;

  const hasEnoughCoins = userCoins >= frame.price;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-sm bg-[#FFD93D] border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">

        <div className="flex items-center justify-between bg-[#FF6B9D] border-b-4 border-black px-4 py-3">
          <p className="font-black text-black text-base">
            {hasEnoughCoins ? "Konfirmasi Pembelian" : "Koin Tidak Cukup"}
          </p>
          <button
            onClick={onCancel}
            className="bg-white border-[3px] border-black rounded-lg p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        <div className="p-5 flex flex-col items-center gap-4">

          <div className="relative w-40 aspect-[3/4] rounded-xl overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gray-100">
            <Image
              src={frame.image}
              alt={frame.name}
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>

          <div className="w-full bg-white border-4 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-1">
              <p className="font-black text-black text-sm">Frame</p>
              <p className="font-black text-[#4DD0E1] text-sm">{frame.name}</p>
            </div>
            <div className="flex justify-between items-center mb-1">
              <p className="font-black text-black text-sm">Kategori</p>
              <p className="font-bold text-gray-600 text-sm">{frame.category}</p>
            </div>
            <div className="h-[2px] bg-black my-2" />
            <div className="flex justify-between items-center">
              <p className="font-black text-black text-sm">Harga</p>
              <div className="flex items-center gap-1 bg-[#FFD93D] border-[2px] border-black rounded-lg px-2 py-0.5">
                <Coins size={14} strokeWidth={3} />
                <p className="font-black text-black text-sm">{frame.price} Koin</p>
              </div>
            </div>
          </div>

          <div className={`w-full border-4 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${hasEnoughCoins ? "bg-[#6BCF7F]" : "bg-[#FF6B6B]"}`}>
            <div className="flex justify-between items-center">
              <p className="font-black text-black text-sm">Koin kamu</p>
              <p className="font-black text-black text-sm">{userCoins} Koin</p>
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="font-black text-black text-sm">Setelah beli</p>
              <p className="font-black text-black text-sm">
                {hasEnoughCoins ? `${userCoins - frame.price} Koin` : "—"}
              </p>
            </div>
          </div>

          {!hasEnoughCoins && (
            <div className="w-full bg-[#FFF3CD] border-4 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <p className="font-black text-black text-xs">
                Koin kamu kurang{" "}
                <span className="text-[#FF6B6B]">
                  {frame.price - userCoins} Koin
                </span>{" "}
                lagi. Yuk top up dulu!
              </p>
            </div>
          )}

          {hasEnoughCoins ? (
            <div className="w-full flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 bg-white border-4 border-black rounded-xl py-2.5 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
              >
                Tidak
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 bg-[#23D73A] border-4 border-black rounded-xl py-2.5 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
              >
                Ya, Beli!
              </button>
            </div>
          ) : (
            <div className="w-full flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 bg-white border-4 border-black rounded-xl py-2.5 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
              >
                Batal
              </button>
              <button
                onClick={onTopUp}
                className="flex-1 bg-[#F4B266] border-4 border-black rounded-xl py-2.5 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
              >
                Top Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
