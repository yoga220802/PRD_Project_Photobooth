"use client";
import IzinKamera from "@/components/studio/izinkamera";
import KameraDitolak from "@/components/studio/kameraditolak";
import DropdownFilter, {
  FILTER_CSS_MAP,
} from "@/components/studio/DropdownFilter";
import { usePhotobooth } from "@/context/PhotoboothContext";
import { ArrowLeft, LucideArrowBigDown, Camera, RotateCcw } from "lucide-react";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import Link from "next/link";

type CameraPermission = "checking" | "prompt" | "granted" | "denied";

const CAPTURE_LABELS = ["Cekrek 1", "Cekrek 2", "Cekrek 3"] as const;
const MAX_PHOTOS = 3;

const Studio = () => {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermission>("checking");
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Global state from context
  const { capturedPhotos, activeFilter, setCapturedPhoto, setActiveFilter } =
    usePhotobooth();

  // Currently selected slot for capture/retake
  const [selectedSlot, setSelectedSlot] = useState<number>(0);

  // Flash animation state
  const [flashSlot, setFlashSlot] = useState<number | null>(null);

  // Filter dropdown state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Countdown timer state
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Get CSS filter string for current filter
  const currentCssFilter =
    activeFilter !== null ? (FILTER_CSS_MAP[activeFilter] ?? "none") : "none";

  // Auto-advance selectedSlot to the first empty slot
  useEffect(() => {
    const firstEmpty = capturedPhotos.findIndex((p) => p === null);
    if (firstEmpty !== -1 && capturedPhotos[selectedSlot] === null) {
      // Only auto-advance if current slot is also empty (don't override explicit selection)
    } else if (firstEmpty !== -1 && capturedPhotos[selectedSlot] !== null) {
      setSelectedSlot(firstEmpty);
    }
  }, [capturedPhotos, selectedSlot]);

  // Camera permission check
  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({
            name: "camera" as PermissionName,
          });

          if (result.state === "granted") {
            setCameraPermission("granted");
          } else if (result.state === "denied") {
            setCameraPermission("denied");
          } else {
            setCameraPermission("prompt");
          }

          result.addEventListener("change", () => {
            if (result.state === "granted") {
              setCameraPermission("granted");
            } else if (result.state === "denied") {
              setCameraPermission("denied");
            } else {
              setCameraPermission("prompt");
            }
          });
        } else {
          setCameraPermission("prompt");
        }
      } catch {
        setCameraPermission("prompt");
      }
    };

    checkPermission();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleAllowCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission("granted");
    } catch {
      setCameraPermission("denied");
    }
  }, []);

  const handleDenyCamera = useCallback(() => {
    setCameraPermission("denied");
  }, []);

  const handleRetryCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission("granted");
    } catch {
      setCameraPermission("denied");
    }
  }, []);

  // === ACTUAL CAPTURE (called after countdown finishes) ===
  const doCapture = useCallback(() => {
    if (cameraPermission !== "granted") return;

    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = 1080;
      canvas.height = 1080;

      // Apply the active filter to the canvas context
      ctx.filter = currentCssFilter;
      ctx.drawImage(img, 0, 0, 1080, 1080);
      ctx.filter = "none"; // reset

      const processedImage = canvas.toDataURL("image/jpeg", 0.9);

      // Save to the selected slot (via context)
      setCapturedPhoto(selectedSlot, processedImage);

      // Flash animation
      setFlashSlot(selectedSlot);
      setTimeout(() => setFlashSlot(null), 600);

      // Auto-advance to next empty slot
      const nextEmpty = capturedPhotos.findIndex(
        (p, i) => p === null && i !== selectedSlot,
      );
      if (nextEmpty !== -1) {
        setTimeout(() => setSelectedSlot(nextEmpty), 300);
      }
    };
    img.src = imageSrc;
  }, [
    cameraPermission,
    currentCssFilter,
    selectedSlot,
    capturedPhotos,
    setCapturedPhoto,
  ]);

  // === COUNTDOWN + CAPTURE — 3 second timer before capture ===
  const handleCapture = useCallback(() => {
    if (cameraPermission !== "granted" || isCountingDown) return;

    setIsCountingDown(true);
    setCountdown(3);

    let timeLeft = 3;
    countdownRef.current = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) {
        setCountdown(timeLeft);
      } else {
        // Timer finished — capture!
        clearInterval(countdownRef.current!);
        countdownRef.current = null;
        setCountdown(null);
        setIsCountingDown(false);
        doCapture();
      }
    }, 1000);
  }, [cameraPermission, isCountingDown, doCapture]);

  // Cleanup countdown on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  // Handle retake selected slot photo
  const handleRetakeSlot = useCallback(() => {
    setCapturedPhoto(selectedSlot, null);
  }, [selectedSlot, setCapturedPhoto]);

  // Click on photo slot to select it for retake
  const handleSlotClick = useCallback((index: number) => {
    setSelectedSlot(index);
  }, []);

  const photosTaken = capturedPhotos.filter((p) => p !== null).length;

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

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="bg-[#D67FCE] min-h-screen ">
        <header className="flex items-center gap-4 p-4">
          <button>
            <ArrowLeft />
          </button>
        </header>
        <div className="grid grid-cols-2 justify-center mx-8 gap-2 p-4">
          {/* Photoshot Area */}
          <div className="flex flex-col gap-6 place-items-center">
            <div className="text-center max-w-2xl card-neo rounded-[17px] bg-[#FF519C]">
              <span className="text-2xl font-bold">
                {photosTaken >= MAX_PHOTOS
                  ? "Semua foto sudah diambil!"
                  : "Give your best smile!"}
              </span>
            </div>
            <div className="bg-white max-w-md w-full rounded-2xl card-neo flex flex-col gap-6">
              {/* Main Camera / Timer Area */}
              <div className="bg-[#cfd2d1] max-w-full aspect-[4/3] rounded-2xl border-4 card-neo flex items-center justify-center p-4 overflow-hidden relative">
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
                    <span className="text-4xl">📷</span>
                    <span className="text-sm text-gray-500 font-medium">
                      {cameraPermission === "checking"
                        ? "Memeriksa akses kamera..."
                        : "Menunggu izin kamera"}
                    </span>
                  </div>
                )}

                {/* Countdown overlay */}
                {countdown !== null && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <span
                      key={countdown}
                      className="text-[120px] font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] animate-[countdownPulse_1s_ease-out]"
                    >
                      {countdown}
                    </span>
                  </div>
                )}
              </div>

              {/* Photo Slots — clickable for retake */}
              <div className="flex items-center justify-center gap-4">
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
                      w-[120px] h-[120px] rounded-xl overflow-hidden
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
                        {/* Retake overlay on selected filled slot */}
                        {selectedSlot === index && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center"></div>
                        )}
                        {/* Check badge */}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/60 text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center mt-4 gap-3">
                {photosTaken >= MAX_PHOTOS ? (
                  <>
                    <button
                      onClick={handleRetakeSlot}
                      className="font-bold text-lg px-4 py-2 btn-neo bg-[#FF519C] text-black flex items-center gap-2"
                    >
                      <RotateCcw size={18} />
                      Retake Foto {selectedSlot + 1}
                    </button>
                    <Link
                      href="/result"
                      className="font-bold text-lg px-8 py-2 btn-neo bg-[#2fd336] text-black flex items-center gap-2"
                    >
                      Lihat Hasil
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleCapture}
                    disabled={cameraPermission !== "granted" || isCountingDown}
                    className={`
                      font-bold text-lg px-8 py-2 btn-neo
                      flex items-center gap-2
                      transition-all duration-200
                      ${
                        isCountingDown
                          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                          : "bg-[#2fd336] text-black hover:bg-[#25b82d] hover:scale-105 active:scale-95"
                      }
                    `}
                  >
                    <Camera size={18} />
                    {isCountingDown
                      ? "Bersiap..."
                      : capturedPhotos[selectedSlot] !== null
                        ? `Retake ${selectedSlot + 1}`
                        : CAPTURE_LABELS[selectedSlot]}
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Filter */}
          <div className="items-center gap-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn-neo w-full rounded-[17px] font-bold text-lg flex items-center justify-center gap-2"
            >
              Filter yang bikin foto kamu makin seru!{" "}
              <span
                className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
              >
                <LucideArrowBigDown />
              </span>
            </button>

            <DropdownFilter
              isOpen={isFilterOpen}
              activeFilter={activeFilter}
              onSelectFilter={(id) => {
                setActiveFilter(id);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Studio;
