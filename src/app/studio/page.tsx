"use client";
import IzinKamera from "@/components/studio/izinkamera";
import KameraDitolak from "@/components/studio/kameraditolak";
import { ArrowLeft, LucideArrowBigDown } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";

type CameraPermission = "checking" | "prompt" | "granted" | "denied";

const Studio = () => {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermission>("checking");
  const videoRef = useRef(null);
  const streamRef = useRef<MediaStream | null>(null);

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
              <span className="text-2xl font-bold">Give your best smile!</span>
            </div>
            <div className="bg-white max-w-md w-full rounded-2xl card-neo flex flex-col gap-6">
              {/* Main Camera / Timer Area */}
              <div className="bg-[#cfd2d1] max-w-full aspect-[4/3] rounded-2xl border-4 card-neo flex items-center justify-center p-4 overflow-hidden relative">
                {cameraPermission === "granted" ? (
                  <Webcam
                    mirrored={true}
                    imageSmoothing={true}
                    ref={videoRef}
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

              {/* Thumbnails */}
              <div className="flex items-center justify-center gap-4">
                <div className="bg-[#678bbd] w-[80px] h-[80px] rounded-xl card-neo"></div>
                <div className="bg-[#678bbd] w-[80px] h-[80px] rounded-xl card-neo"></div>
                <div className="bg-[#678bbd] w-[80px] h-[80px] rounded-xl card-neo"></div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center mt-6">
                <button
                  className="bg-[#2fd336] text-black font-bold text-lg px-8 py-2 btn-neo"
                  disabled={cameraPermission !== "granted"}
                >
                  Cekrek ke 1
                </button>
              </div>
            </div>
          </div>
          {/* Filter */}
          <div className="items-center gap-6">
            <button className="btn-neo w-full rounded-[17px] font-bold text-lg flex items-center justify-center gap-2">
              Filter yang bikin foto kamu makin seru!{" "}
              <span>
                <LucideArrowBigDown />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Studio;
