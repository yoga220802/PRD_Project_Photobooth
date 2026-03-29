"use client";

import Image from "next/image";
import { useState } from "react";
import { usePhotobooth } from "@/context/PhotoboothContext";

import {
  ArrowBigRight,
  ChevronLeft,
  Download,
  Mail,
  Printer,
  QrCode,
} from "lucide-react";

import LoadingNotifikasi from "@/components/result/loadingresult";
import BerhasilResult from "@/components/result/berhasilresult";
import ChooseFilter from "@/components/result/pilihfilter";
import ChooseFrame from "@/components/result/pilihframe";

type FrameType = "wild-rebel" | "party-celebration" | "disco" | null;

const ResultPage = () => {
  const { capturedPhotos } = usePhotobooth();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const [successMessage, setSuccessMessage] = useState("Sukses!");
  const [showSuccess, setShowSuccess] = useState(false);

  const [showFilter, setShowFilter] = useState(false);

  const [showFrame, setShowFrame] = useState(false);

  const [selectedFrame, setSelectedFrame] = useState<FrameType>("wild-rebel");

  // Mapping frame type ke gambar
  const frameMapping = {
    "wild-rebel": { src: "/frames/frame1.png", label: "Wild Rebel" },
    "party-celebration": {
      src: "/frames/frame2.png",
      label: "Party Celebration",
    },
    disco: { src: "/frames/frame3.png", label: "Disco" },
  };

  // Actual captured photos from studio
  const validPhotos = capturedPhotos
    .map((photo, index) => ({ id: index + 1, src: photo }))
    .filter((p) => p.src !== null) as { id: number; src: string }[];

  const handleSelectFrame = (frameType: FrameType) => {
    if (frameType) {
      setSelectedFrame(frameType);
      console.log("Frame selected:", frameType);
    }
  };

  const handleApplyFrame = async (frameType: FrameType) => {
    setIsLoading(true);
    setLoadingMessage("Menerapkan frame...");
    setShowFrame(false);

    try {
      // Simulasi proses apply frame
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update selected frame
      if (frameType) {
        setSelectedFrame(frameType);
      }

      // Show success message
      setIsLoading(false);
      setSuccessMessage(`Frame ${frameType} berhasil diterapkan!`);
      setShowSuccess(true);

      // Auto close success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleFrame = async () => {
    setIsLoading(true);
    setLoadingMessage("Memuat Frame...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
      setShowFrame(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = async () => {
    setIsLoading(true);
    setLoadingMessage("Memuat Filter...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
      setShowFilter(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    setLoadingMessage("Mengunduh foto...");

    try {
      // Simulasi proses download
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Setelah loading selesai
      setIsLoading(false);
      setSuccessMessage("Foto berhasil diunduh!");
      setShowSuccess(true);

      // Auto close success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleQRCode = async () => {
    setIsLoading(true);
    setLoadingMessage("Membuat QR Code...");

    try {
      // Simulasi proses generate QR Code
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Setelah loading selesai
      setIsLoading(false);
      setSuccessMessage("QR Code berhasil dibuat!");
      setShowSuccess(true);

      // Auto close success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleEmail = async () => {
    setIsLoading(true);
    setLoadingMessage("Mengirim email...");

    try {
      // Simulasi proses send email
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Setelah loading selesai
      setIsLoading(false);
      setSuccessMessage("Email berhasil dikirim!");
      setShowSuccess(true);

      // Auto close success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handlePrint = async () => {
    setIsLoading(true);
    setLoadingMessage("Menyiapkan untuk cetak...");

    try {
      // Simulasi proses print
      await new Promise((resolve) => setTimeout(resolve, 1800));

      // Setelah loading selesai
      setIsLoading(false);
      setSuccessMessage("Foto berhasil dicetak!");
      setShowSuccess(true);

      // Auto close success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

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

          {/* Left Section - Photos & Filter Options */}
          <div className="flex items-center gap-8">
            {/* Photo Result Container */}
            <div
              className="bg-white rounded-3xl p-6 shadow-3xl card-neo"
              style={{ width: "300px" }}
            >
              <div className="space-y-4">
                {validPhotos.length > 0 ? (
                  validPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative bg-gray-100 rounded-xl overflow-hidden"
                    >
                      <img
                        src={photo.src}
                        alt={`Foto ${photo.id}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <span className="text-4xl mb-2">📷</span>
                    <span className="font-bold">Belum ada foto</span>
                    <span className="text-sm">
                      Ambil foto di Studio dulu ya!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Filter Options */}
            <div className="flex flex-col gap-4">
              {/* Tambah Filter */}
              <button
                onClick={handleFilter}
                className="btn-neo relative bg-[#ffffff] border-4 border-black rounded-2xl px-12 py-4"
              >
                <Image
                  src="/icon/star.png"
                  alt="Bintang"
                  width={52}
                  height={52}
                  className="absolute -left-4 -top-1 -translate-y-1/2"
                />
                <span className="text-black font-black text-xl">
                  Tambah filter!
                </span>
              </button>

              {/* Ganti Frame */}
              <button
                onClick={handleFrame}
                className="btn-neo relative bg-[#A9D965] border-4 border-black rounded-2xl px-12 py-4"
              >
                <Image
                  src="/icon/star.png"
                  alt="Bintang"
                  width={60}
                  height={60}
                  className="absolute -right-5 top-1.5 -translate-y-1/2"
                />
                <span className="text-black font-black text-xl">
                  Ganti frame?
                </span>
              </button>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <ArrowBigRight size={80} className="text-black" />
          </div>

          {/* Right Section - Action Buttons */}
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
              <div className="space-y-12">
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="btn-neo w-full flex justify-center items-center gap-4"
                >
                  <span className="text-black font-black text-xl">UNDUH</span>
                  <Download size={32} />
                </button>

                {/* QR Code Button */}
                <button
                  onClick={handleQRCode}
                  className="btn-neo w-full flex justify-center items-center gap-4"
                >
                  <span className="text-black font-black text-xl">QR CODE</span>
                  <QrCode size={32} />
                </button>

                {/* Email Button */}
                <button
                  onClick={handleEmail}
                  className="btn-neo w-full flex justify-center items-center gap-4"
                >
                  <span className="text-black font-black text-xl">Email</span>
                  <Mail size={32} />
                </button>

                {/* Print Button */}
                <button
                  onClick={handlePrint}
                  className="btn-neo w-full flex justify-center items-center gap-4"
                >
                  <span className="text-black font-black text-xl">Cetak</span>
                  <Printer size={32} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
