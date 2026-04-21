"use client";
import IzinKamera from "@/components/studio/izinkamera";
import KameraDitolak from "@/components/studio/kameraditolak";
import DropdownFilter, {
  FILTER_CSS_MAP,
} from "@/components/studio/DropdownFilter";
import { usePhotobooth } from "@/context/PhotoboothContext";
import { usePhotoboothActions } from "@/hooks/usePhotoboothActions";
import { LucideArrowBigDown, Camera, RotateCcw, ChevronLeft } from "lucide-react";
import Webcam from "react-webcam";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CAPTURE_LABELS = ["Cekrek 1", "Cekrek 2", "Cekrek 3"] as const;
const MAX_PHOTOS = 3;

const Studio = () => {
  const router = useRouter();
  const { capturedPhotos, activeFilter, setCapturedPhoto, setActiveFilter } =
    usePhotobooth();

  const {
    cameraPermission,
    selectedSlot,
    flashSlot,
    isFilterOpen,
    countdown,
    isCountingDown,
    currentCssFilter,
    photosTaken,
    webcamRef,
    canvasRef,
    setIsFilterOpen,
    handleAllowCamera,
    handleDenyCamera,
    handleRetryCamera,
    handleCapture,
    handleRetakeSlot,
    handleSlotClick,
    handleSelectFilter,
    maxPhotos,
  } = usePhotoboothActions({
    capturedPhotos,
    activeFilter,
    setCapturedPhoto,
    setActiveFilter,
    maxPhotos: MAX_PHOTOS,
    filterCssMap: FILTER_CSS_MAP,
  });

  return (
    <>
      <IzinKamera
        showModal={cameraPermission === "prompt"}
        onClose={handleDenyCamera}
        onAllow={handleAllowCamera}
      />
      <KameraDitolak
        showModal={cameraPermission === "denied"}
        onRetry={handleRetryCamera}
      />

      <canvas ref={canvasRef} className="hidden" />      <div className="bg-[#D67FCE] min-h-screen pt-12 pb-6 px-3 sm:px-4 md:px-6 lg:px-8 relative">

        <button
          onClick={() => router.push('/dashboard')}
          className="absolute top-4 left-4 bg-white border-4 border-black rounded-2xl p-2 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-y-1 hover:drop-shadow-none transition-all active:scale-95 z-20"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center mx-4 lg:mx-8 gap-4 lg:gap-2 p-4">
          <div className="flex flex-col gap-6 place-items-center">
            <div className="text-center max-w-full lg:max-w-2xl card-neo rounded-[17px] bg-[#FF519C]">
              <span className="text-xl lg:text-2xl font-bold">
                {photosTaken >= maxPhotos
                  ? "Semua foto sudah diambil!"
                  : "Give your best smile!"}
              </span>
            </div>
            <div className="bg-white max-w-full lg:max-w-md w-full rounded-2xl card-neo flex flex-col gap-6">
              <div className="bg-[#cfd2d1] max-w-full aspect-[4/3] lg:aspect-[16/9] rounded-2xl border-4 card-neo flex items-center justify-center p-2 lg:p-4 overflow-hidden relative">
                {cameraPermission === "granted" ? (
                  <Webcam
                    mirrored={true}
                    imageSmoothing={true}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    ref={webcamRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ filter: currentCssFilter }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-3xl lg:text-4xl">📷</span>
                    <span className="text-xs lg:text-sm text-gray-500 font-medium">
                      {cameraPermission === "checking"
                        ? "Memeriksa akses kamera..."
                        : "Menunggu izin kamera"}
                    </span>
                  </div>
                )}

                {countdown !== null && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <span
                      key={countdown}
                      className="text-6xl lg:text-[120px] font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] animate-[countdownPulse_1s_ease-out]"
                    >
                      {countdown}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 lg:gap-4">
                {capturedPhotos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlotClick(index)}
                    title={
                      photo
                        ? `Klik untuk retake Foto ${index + 1}`
                        : `Slot ${index + 1}`
                    }
                    className={`
                      w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-xl overflow-hidden
                      transition-all duration-300 ease-out relative
                      cursor-pointer
                      ${photo ? "border-2 border-green-400 shadow-lg shadow-green-200" : "bg-[#678bbd] card-neo"}
                      ${flashSlot === index ? "scale-110 ring-4 ring-yellow-300" : "scale-100"}
                      ${selectedSlot === index ? "ring-4 ring-[#FF519C] ring-offset-2 ring-offset-white scale-105" : ""}
                    `}
                  >
                    {photo ? (
                      <>
                        <img
                          src={photo}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover animate-[fadeScaleIn_0.4s_ease-out]"
                        />
                        {selectedSlot === index && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center"></div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/60 text-xs lg:text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center mt-4 gap-3">
                {photosTaken >= maxPhotos ? (
                  <>
                    <button
                      onClick={handleRetakeSlot}
                      className="font-bold text-base lg:text-lg px-6 py-3 lg:px-4 lg:py-2 btn-neo bg-[#FF519C] text-black flex items-center gap-2 min-h-[44px]"
                    >
                      <RotateCcw size={18} />
                      <span className="text-sm lg:text-base">
                        Retake Foto {selectedSlot + 1}
                      </span>
                    </button>
                    <Link
                      href="/result"
                      className="font-bold text-base lg:text-lg px-8 py-3 lg:px-8 lg:py-2 btn-neo bg-[#2fd336] text-black flex items-center gap-2 min-h-[44px]"
                    >
                      <span className="text-sm lg:text-base">
                        Lihat Hasil
                      </span>
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleCapture}
                    disabled={cameraPermission !== "granted" || isCountingDown}
                    className={`
                      font-bold text-base lg:text-lg px-8 py-3 lg:px-8 lg:py-2 btn-neo
                      flex items-center gap-2 min-h-[44px]
                      transition-all duration-200
                      ${
                        isCountingDown
                          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                          : "bg-[#2fd336] text-black hover:bg-[#25b82d] hover:scale-105 active:scale-95"
                      }
                    `}
                  >
                    <Camera size={18} />
                    <span className="text-sm lg:text-base">
                      {isCountingDown
                        ? "Bersiap..."
                        : capturedPhotos[selectedSlot] !== null
                          ? `Retake ${selectedSlot + 1}`
                          : CAPTURE_LABELS[selectedSlot]}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn-neo w-full rounded-[17px] font-bold text-base lg:text-lg flex items-center justify-center gap-2 px-4 py-3"
            >
              <span className="text-center">
                Filter yang bikin foto kamu makin seru!
              </span>
              <span
                className={`transition-transform duration-300 flex-shrink-0 ${isFilterOpen ? "rotate-180" : ""}`}
              >
                <LucideArrowBigDown size={20} />
              </span>
            </button>

            <DropdownFilter
              isOpen={isFilterOpen}
              activeFilter={activeFilter}
              onSelectFilter={handleSelectFilter}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Studio;
