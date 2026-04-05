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
    <div className="space-y-12">
      {/* Download Button */}
      <button
        onClick={DownloadProp}
        className="btn-neo w-full flex justify-center items-center gap-4"
      >
        <span className="text-black font-black text-xl">UNDUH</span>
        <Download size={32} />
      </button>

      {/* QR Code Button */}
      <button
        onClick={QRCodeProp}
        className="btn-neo w-full flex justify-center items-center gap-4"
      >
        <span className="text-black font-black text-xl">QR CODE</span>
        <QrCode size={32} />
      </button>

      {/* Email Button */}
      <button
        onClick={EmailProp}
        className="btn-neo w-full flex justify-center items-center gap-4"
      >
        <span className="text-black font-black text-xl">Email</span>
        <Mail size={32} />
      </button>

      {/* Print Button */}
      <button
        onClick={PrintProp}
        className="btn-neo w-full flex justify-center items-center gap-4"
      >
        <span className="text-black font-black text-xl">Cetak</span>
        <Printer size={32} />
      </button>
    </div>
  );
}

export default ActionButton;
