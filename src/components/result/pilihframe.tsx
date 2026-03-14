"use client";

import Image from "next/image";
import { useState } from "react";

interface ChooseFilterProps {
  onClose: () => void;
  isVisible: boolean;
}

export default function ChooseFrame({ onClose, isVisible }: ChooseFilterProps) {
  const [activeFrame, setActiveFrame] = useState<number | null>(null);

  const frame = [
    { id: 1, name: "Wild Rebel", src: "/frames/frame1.png" },
    { id: 2, name: "Party Celebration", src: "/frames/frame2.png" },
    { id: 3, name: "Disco", src: "/frames/frame3.png" },
  ];

  if (!isVisible) {
    return null;
  }

  const frameHandle = (frameId: number) => {
    setActiveFrame(frameId);
    console.log(`Frame dengan ID ${frameId} dipilih.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white border-4 card-neo rounded-md max-w-full min-h-max mx-auto">
        <div className="absolute -right-24 -top-8 ">
          <span className="bg-[#FF4CC3] card-neo rounded-md px-6 py-4 text-2xl font-bold">
            Filter yang kece buat kamu!
          </span>
        </div>
        <div className="grid relative items-center gap-12 mx-12 mt-6">
          {/* Back Button */}
          <div className="absolute -left-28 -top-14">
            <button
              onClick={onClose}
              className="bg-[#F5FF37] rotate-[-12deg] card-neo rounded-md px-4 py-2 font-bold text-2xl"
            >
              Kembali
            </button>
          </div>

          {/* Frame */}
          <div className="flex flex-row justify-center mb-8 ">
            {frame.map((frame) => (
              <div
                key={frame.id}
                className="flex mx-auto relative hover:scale-105 cursor-pointer transition-transform duration-300 py-4"
              >
                <div className="flex items-center px-8 py-4">
                  <Image
                    src={frame.src}
                    alt={frame.name}
                    width={200}
                    height={200}
                    onClick={() => frameHandle(frame.id)}
                    className="card-neo rounded-md mx-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
