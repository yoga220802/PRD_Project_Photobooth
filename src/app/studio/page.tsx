"use client";
import IzinKamera from "@/components/studio/izinkamera";
import KameraDitolak from "@/components/studio/kameraditolak";
import DropdownFilter from "@/components/studio/DropdownFilter";
import {
  ArrowLeft,
  LucideArrowBigDown,
  LucideArrowBigUp,
  Check,
  Camera,
} from "lucide-react";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import Link from "next/link";

type CameraPermission = "checking" | "prompt" | "granted" | "denied";

// Label untuk setiap tombol capture
const CAPTURE_LABELS = ["Cekrek 1", "Cekrek 2", "Cekrek 3"] as const;
const MAX_PHOTOS = 3;

const Studio = () => {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermission>("checking");
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // State untuk menyimpan hasil foto (3 slot)
  const [capturedPhotos, setCapturedPhotos] = useState<(string | null)[]>(
    Array(MAX_PHOTOS).fill(null),
  );
  // State untuk animasi flash saat foto diambil
  const [flashSlot, setFlashSlot] = useState<number | null>(null);

  // State untuk dropdown filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  // Cek permission kamera saat halaman pertama kali dibuka
  useEffect(() => {
    const checkPermission = async () => {
      try {
        // Gunakan Permissions API jika tersedia
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({
            name: "camera" as PermissionName,
          });

          if (result.state === "granted") {
            setCameraPermission("granted");
          } else if (result.state === "denied") {
            setCameraPermission("denied");
          } else {
            // "prompt" — belum pernah diminta
            setCameraPermission("prompt");
          }

          // Listen for permission changes (e.g. user changes from browser settings)
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
          // Fallback: Permissions API tidak tersedia, langsung tampilkan modal
          setCameraPermission("prompt");
        }
      } catch {
        // Fallback jika query gagal
        setCameraPermission("prompt");
      }
    };

    checkPermission();

    // Cleanup: stop media stream saat unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle klik "Boleh" di modal IzinKamera
  const handleAllowCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Berhasil dapat akses kamera
      streamRef.current = stream;
      // Stop stream ini karena react-webcam akan membuat stream sendiri
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission("granted");
    } catch {
      // User menolak di browser prompt, atau error lainnya
      setCameraPermission("denied");
    }
  }, []);

  // Handle klik "Tidak" di modal IzinKamera
  const handleDenyCamera = useCallback(() => {
    setCameraPermission("denied");
  }, []);

  // Handle klik "Coba Lagi" di modal KameraDitolak
  const handleRetryCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission("granted");
    } catch {
      // Masih ditolak
      setCameraPermission("denied");
    }
  }, []);

  // === LOGIKA PENGAMBILAN GAMBAR ===
  const handleCapture = useCallback(
    (slotIndex: number) => {
      // Guard: slot sudah terisi atau kamera belum granted
      if (capturedPhotos[slotIndex] !== null) return;
      if (cameraPermission !== "granted") return;

      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        // Proses gambar ke ukuran standar photobooth 1080x1080
        canvas.width = 1080;
        canvas.height = 1080;
        ctx.filter = "none";
        ctx.drawImage(img, 0, 0, 1080, 1080);

        const processedImage = canvas.toDataURL("image/jpeg", 0.9);

        // Simpan ke slot yang sesuai
        setCapturedPhotos((prev) => {
          const updated = [...prev];
          updated[slotIndex] = processedImage;
          return updated;
        });

        // Trigger animasi flash pada slot
        setFlashSlot(slotIndex);
        setTimeout(() => setFlashSlot(null), 600);
      };
      img.src = imageSrc;
    },
    [capturedPhotos, cameraPermission],
  );

  // Hitung jumlah foto yang sudah diambil
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

      {/* Hidden canvas untuk memproses gambar */}
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
              </div>

              {/* Slot Hasil Foto */}
              <div className="flex items-center justify-center gap-4">
                {capturedPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className={`
                      w-[120px] h-[120px] rounded-xl overflow-hidden
                      transition-all duration-300 ease-out relative
                      ${photo ? "border-2 border-green-400 shadow-lg shadow-green-200" : "bg-[#678bbd] card-neo"}
                      ${flashSlot === index ? "scale-110 ring-4 ring-yellow-300" : "scale-100"}
                    `}
                  >
                    {photo ? (
                      <>
                        <img
                          src={photo}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover animate-[fadeScaleIn_0.4s_ease-out]"
                        />
                        {/* Badge nomor foto */}
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/60 text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Button — 1 tombol yang berubah label sesuai index */}
              <div className="flex justify-center mt-4 mb-2">
                <button
                  onClick={() => handleCapture(photosTaken)}
                  disabled={
                    cameraPermission !== "granted" || photosTaken >= MAX_PHOTOS
                  }
                  className={`
                    font-bold text-lg px-8 py-2 btn-neo
                    flex items-center gap-2
                    transition-all duration-200
                    ${
                      photosTaken >= MAX_PHOTOS
                        ? "bg-[#2fd336] text-black"
                        : "bg-[#2fd336] text-black hover:bg-[#25b82d] hover:scale-105 active:scale-95"
                    }
                  `}
                >
                  {photosTaken >= MAX_PHOTOS ? (
                    <Link href="/result">Lihat Hasil</Link>
                  ) : (
                    <>
                      <Camera size={18} />
                      {CAPTURE_LABELS[photosTaken]}
                    </>
                  )}
                </button>
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
                console.log(`Filter ${id} dipilih`);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Studio;
