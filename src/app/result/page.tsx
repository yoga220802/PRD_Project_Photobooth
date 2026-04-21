"use client";

import { ArrowBigRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import LoadingNotifikasi from "@/components/result/loadingresult";
import BerhasilResult from "@/components/result/berhasilresult";
import ChooseFilter from "@/components/result/pilihfilter";
import ChooseFrame from "@/components/result/pilihframe";
import RightSection from "./components/RightSection";
import LeftSection from "./components/LeftSection";

import { usePhotobooth } from "@/context/PhotoboothContext";
import { usePhotoboothActions } from "@/hooks/usePhotoboothActions";

const ResultPage = () => {
  const router = useRouter();
  const { capturedPhotos } = usePhotobooth();

  const frameMapping = {
    "wild-rebel": { src: "/frames/frame1.png", label: "Wild Rebel" },
    disco: { src: "/frames/frame2.png", label: "Disco" },
  };

  const validPhotos = capturedPhotos
    .map((photo, index) => ({ id: index + 1, src: photo }))
    .filter((p) => p.src !== null) as { id: number; src: string }[];

  const {
    isLoading,
    loadingMessage,
    showSuccess,
    successMessage,
    selectedFrame,
    showFrame,
    showFilter,
    setShowSuccess,
    setShowFilter,
    setShowFrame,
    handleSelectFrame,
    handleApplyFrame,
    handleFrame,
    handleFilter,
    handleDownload,
    handleQRCode,
    handleEmail,
    handlePrint,
  } = usePhotoboothActions({ validPhotos, frameMapping });

  const frameTheme: Record<string, { bg: string; border: string; text: string; label: string }> = {
    "wild-rebel": { bg: "#E433C3", border: "#4A9958", text: "black", label: "WILD REBEL" },
    disco: { bg: "#FFD700", border: "#FF4500", text: "black", label: "DISCO" },
  };

  const currentTheme = frameTheme[selectedFrame ?? "wild-rebel"];

  return (
    <div className="min-h-screen bg-[#D67FCE] relative flex flex-col">
      <LoadingNotifikasi message={loadingMessage} isVisible={isLoading} />

      <BerhasilResult
        message={successMessage}
        isVisible={!isLoading && showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <ChooseFilter
        isVisible={showFilter}
        onClose={() => setShowFilter(false)}
      />

      <ChooseFrame
        isVisible={showFrame}
        onClose={() => setShowFrame(false)}
        onSelectFrame={handleSelectFrame}
        onApplyFrame={handleApplyFrame}
        currentFrame={selectedFrame}
      />

      <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-white border-4 border-black rounded-2xl p-2 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-y-1 hover:drop-shadow-none transition-all active:scale-95"
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </button>

        <div
          className="border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl px-4 sm:px-8 py-2 sm:py-3 transition-all duration-300"
          style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.border }}
        >
          <span className="font-black text-lg sm:text-2xl" style={{ color: currentTheme.text }}>
            {currentTheme.label}
          </span>
        </div>

        <div className="w-[40px] sm:w-[60px]"></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 pb-4 sm:pb-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-7xl w-full">
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -rotate-[92deg] origin-center">
            <div className="bg-[#28CD30] card-neo px-12 py-6">
              <span className="text-black font-black text-2xl tracking-widest">
                NICE, INI FOTO KAMU!
              </span>
            </div>
          </div>

          <LeftSection
            Photos={validPhotos}
            selectedFrame={selectedFrame}
            frameMapping={frameMapping}
            handleFilter={handleFilter}
            handleFrame={handleFrame}
          />

          <div className="hidden lg:flex items-center justify-center">
            <ArrowBigRight size={64} className="text-gray-700" />
          </div>

          <RightSection
            Download={handleDownload}
            QRCode={handleQRCode}
            Email={handleEmail}
            Print={handlePrint}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
