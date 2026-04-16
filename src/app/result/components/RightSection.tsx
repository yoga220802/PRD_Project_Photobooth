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
    <div className="flex flex-col items-center justify-center mb-20 gap-12">
      <div className="flex flex-row gap-4">
        <div>
          <div className="bg-[#4CAF50] card-neo ">
            <span className="text-black font-bold text-xl ">
              Simpen dulu dong foto kamu
            </span>
          </div>
        </div>
      </div>
      <div
        className="bg-white rounded-3xl p-8 shadow-2xl card-neo"
        style={{ width: "300px" }}
      >
        {/*  Action Button */}
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
