"use client";

import Image from "next/image";

interface IzinKameraProps {
  onClose: () => void;
  onAllow: () => void;
  showModal?: boolean;
}

export default function IzinKamera({
  onClose,
  onAllow,
  showModal,
}: IzinKameraProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-4 rounded-lg items-center flex flex-col gap-4">
        <div>
          <Image
            src="/icons/permission.svg"
            alt="Camera Permission"
            width={150}
            height={150}
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            Boleh ga kami akses kamera kamu?
          </h2>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button className="btn-neo bg-[#CD2828]" onClick={onClose}>
            Tidak
          </button>
          <button className="btn-neo bg-[#28CD30]" onClick={onAllow}>
            Boleh
          </button>
        </div>
      </div>
    </div>
  );
}
