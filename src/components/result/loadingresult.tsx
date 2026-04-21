"use client";

import Image from "next/image";
import React from "react";

interface LoadingNotifikasiProps {
  message?: string;
  isVisible?: boolean;
}

const LoadingNotifikasi: React.FC<LoadingNotifikasiProps> = ({
  message = "Loading...",
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[90vw] sm:max-w-sm">
        <Image
          src="/icons/wajah.png"
          alt="Loading..."
          width={110}
          height={110}
          className="absolute -top-12 -left-12 z-10 drop-shadow-lg"
        />
        <div className="bg-white border-4 card-neo rounded-md w-full">
          <div className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 pt-8">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black">{message}</h3>
            </div>

            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-[#E433C3] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingNotifikasi;
