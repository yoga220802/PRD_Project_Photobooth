"use client";

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
      <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md">
        <div className="flex flex-col items-center gap-6">
          {/* Spinner */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-[#E433C3] border-t-transparent rounded-full animate-spin"></div>
          </div>

          {/* Message */}
          <div className="text-center">
            <h3 className="text-2xl font-black text-black mb-2">{message}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingNotifikasi;
