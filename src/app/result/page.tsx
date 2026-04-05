"use client";

import { ArrowBigRight, ChevronLeft } from "lucide-react";

import LoadingNotifikasi from "@/components/result/loadingresult";
import BerhasilResult from "@/components/result/berhasilresult";
import ChooseFilter from "@/components/result/pilihfilter";
import ChooseFrame from "@/components/result/pilihframe";
import RightSection from "./components/RightSection";
import LeftSection from "./components/LeftSection";

import { usePhotobooth } from "@/context/PhotoboothContext";
import { usePhotoboothActions } from "@/hooks/usePhotoboothActions";

const ResultPage = () => {
  const { capturedPhotos } = usePhotobooth();

  // Mapping frame type ke gambar
  const frameMapping = {
    "wild-rebel": { src: "/frames/frame1.png", label: "Wild Rebel" },
    disco: { src: "/frames/frame2.png", label: "Disco" },
  };

  // Actual captured photos from studio
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

  return (
    <div className="min-h-screen bg-[#D67FCE] relative flex flex-col">
      {/* Loading Notifikasi */}
      <LoadingNotifikasi message={loadingMessage} isVisible={isLoading} />

      {/* Berhasil Notifikasi */}
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

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        {/* Back Button */}
        <button className="hover:opacity-80 transition-opacity">
          <ChevronLeft size={60} />
        </button>

        <div className="bg-[#E433C3] border-4 border-[#4A9958] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl px-8 py-3">
          <span className="text-black font-black text-2xl">NEO</span>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-[120pxpx]"></div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex items-center justify-center px-8 pb-8">
        <div className="flex items-center justify-center gap-16 max-w-7xl">
          {/* Left Sidebar Label */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-[92deg] origin-center">
            <div className="bg-[#28CD30] card-neo px-12 py-6">
              <span className="text-black font-black text-2xl tracking-widest">
                NICE, INI FOTO KAMU!
              </span>
            </div>
          </div>

          {/*Left Section - Photos & Filter Options */}
          <LeftSection
            Photos={validPhotos}
            selectedFrame={selectedFrame}
            frameMapping={frameMapping}
            handleFilter={handleFilter}
            handleFrame={handleFrame}
          />

          {/* Arrow Icon */}
          <div className="flex items-center justify-center">
            <ArrowBigRight size={64} className="text-gray-700" />
          </div>

          {/* Right Section - Action Buttons */}
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
