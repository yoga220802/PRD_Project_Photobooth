import React from "react";

import ActionButton from "./ui/ActionButton";

interface RightSectionProps {
  Download: () => void;
  QRCode: () => void;
  Email: () => void;
  Print: () => void;
}

function RightSection({ Download, QRCode, Email, Print }: RightSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-4 sm:mb-8 lg:mb-20 gap-4 sm:gap-6 lg:gap-12 w-full">
      <div className="flex flex-row gap-4">
        <div className="bg-[#4CAF50] card-neo px-3 py-2 sm:px-4 sm:py-3">
          <span className="text-black font-bold text-sm sm:text-base lg:text-xl">
            Simpen dulu dong foto kamu
          </span>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl card-neo mx-auto w-[220px] sm:w-[260px] lg:w-[280px] max-w-[90vw]">
        <ActionButton
          DownloadProp={Download}
          QRCodeProp={QRCode}
          EmailProp={Email}
          PrintProp={Print}
        />
      </div>
    </div>
  );
}

export default RightSection;
