import { Download, Mail, Printer, QrCode } from "lucide-react";
import React from "react";

interface ActionButtonProps {
  DownloadProp: () => void;
  QRCodeProp: () => void;
  EmailProp: () => void;
  PrintProp: () => void;
}

function ActionButton({
  DownloadProp,
  QRCodeProp,
  EmailProp,
  PrintProp,
}: ActionButtonProps) {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <button
        onClick={DownloadProp}
        className="btn-neo w-full flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-3"
      >
        <span className="text-black font-black text-sm sm:text-base lg:text-xl">UNDUH</span>
        <Download size={20} className="sm:hidden" />
        <Download size={24} className="hidden sm:block lg:hidden" />
        <Download size={32} className="hidden lg:block" />
      </button>

      <button
        onClick={QRCodeProp}
        className="btn-neo w-full flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-3"
      >
        <span className="text-black font-black text-sm sm:text-base lg:text-xl">QR CODE</span>
        <QrCode size={20} className="sm:hidden" />
        <QrCode size={24} className="hidden sm:block lg:hidden" />
        <QrCode size={32} className="hidden lg:block" />
      </button>

      <button
        onClick={EmailProp}
        className="btn-neo w-full flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-3"
      >
        <span className="text-black font-black text-sm sm:text-base lg:text-xl">Email</span>
        <Mail size={20} className="sm:hidden" />
        <Mail size={24} className="hidden sm:block lg:hidden" />
        <Mail size={32} className="hidden lg:block" />
      </button>

      <button
        onClick={PrintProp}
        className="btn-neo w-full flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-3"
      >
        <span className="text-black font-black text-sm sm:text-base lg:text-xl">Cetak</span>
        <Printer size={20} className="sm:hidden" />
        <Printer size={24} className="hidden sm:block lg:hidden" />
        <Printer size={32} className="hidden lg:block" />
      </button>
    </div>
  );
}

export default ActionButton;
