"use client";

import Image from "next/image";
import { useState } from "react";

import {
  ArrowBigRight,
  ChevronLeft,
  Download,
  Mail,
  Printer,
  QrCode,
} from "lucide-react";

import LoadingNotifikasi from "@/components/notifikasi/loadingnotifikasi";

const ResultPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  // Dummy data untuk foto hasil
  const photoResults = [
    { id: 1, src: "/frames/frame1.png", label: "WILD REBEL" },
  ];

  const handleDownload = async () => {
    setIsLoading(true);
    setLoadingMessage("Mengunduh foto...");

    try {
      // Simulasi proses download
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Logic untuk download
      console.log("Download clicked");

      setIsLoading(false);
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

      // Logic untuk QR Code
      console.log("QR Code clicked");

      setIsLoading(false);
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

      // Logic untuk Email
      console.log("Email clicked");

      setIsLoading(false);
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

      // Logic untuk Print
      console.log("Print clicked");

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#D67FCE] relative flex flex-col">
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
                {photoResults.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative bg-gray-100 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.label}
                      width={300}
                      height={0}
                      style={{ width: "100%", height: "auto" }}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Options */}
            <div className="flex flex-col gap-4">
              {/* Tambah Filter */}
              <div className="btn-neo bg-[#ffffff] border-4 border-black rounded-2xl px-12 py-4">
                <span className="text-black font-black text-xl">
                  Tambah filter!
                </span>
              </div>

              {/* Ganti Frame */}
              <div className="btn-neo bg-[#A9D965] border-4 border-black rounded-2xl px-12 py-4">
                <span className="text-black font-black text-xl">
                  Ganti frame?
                </span>
              </div>
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

      {/* Loading Notifikasi */}
      <LoadingNotifikasi message={loadingMessage} isVisible={isLoading} />
    </div>
  );
};

export default ResultPage;
