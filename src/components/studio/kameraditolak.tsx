"use client";

import Image from "next/image";

interface KameraDitolakProps {
  onRetry: () => void;
  showModal?: boolean;
}

export default function KameraDitolak({
  onRetry,
  showModal,
}: KameraDitolakProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg items-center flex flex-col gap-4 max-w-sm">
        <div>
          <Image
            src="/icons/sad.svg"
            alt="Camera Denied"
            width={150}
            height={150}
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Kamera tidak diizinkan</h2>
          <p className="text-sm text-gray-600">
            Kita gabisa foto bareng kalau tidak diizinkan.
          </p>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button className="btn-neo bg-[#28CD30]" onClick={onRetry}>
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  );
}
