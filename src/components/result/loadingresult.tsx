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

          {/* Spinner */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-[#E433C3] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingNotifikasi;
