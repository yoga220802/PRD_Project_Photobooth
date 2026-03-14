"use client";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type FrameType = "wild-rebel" | "party-celebration" | "disco" | null;

interface ChooseFrameProps {
  onClose: () => void;
  isVisible: boolean;
  onApplyFrame?: (frameType: FrameType) => void;
  onSelectFrame?: (frameType: FrameType) => void;
  currentFrame?: FrameType;
}

export default function ChooseFrame({
  onClose,
  isVisible,
  onApplyFrame,
  onSelectFrame,
}: ChooseFrameProps) {
  const [activeFrame, setActiveFrame] = useState<number | null>(null);

  const frame = [
    {
      id: 1,
      name: "Wild Rebel",
      src: "/frames/frame1.png",
      type: "wild-rebel" as FrameType,
    },
    {
      id: 2,
      name: "Party Celebration",
      src: "/frames/frame2.png",
      type: "party-celebration" as FrameType,
    },
    {
      id: 3,
      name: "Disco",
      src: "/frames/frame3.png",
      type: "disco" as FrameType,
    },
    {
      id: 4,
      name: "Party Celebration",
      src: "/frames/frame2.png",
      type: "party-celebration" as FrameType,
    },
    {
      id: 5,
      name: "Wild Rebel",
      src: "/frames/frame1.png",
      type: "wild-rebel" as FrameType,
    },
    {
      id: 6,
      name: "Party Celebration",
      src: "/frames/frame2.png",
      type: "party-celebration" as FrameType,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 3;

  const visibleFrames = frame.slice(currentIndex, currentIndex + itemsPerView);

  const nextFrames = () => {
    if (currentIndex + itemsPerView < frame.length) {
      setCurrentIndex(currentIndex + itemsPerView);
    }
  };

  const prevFrames = () => {
    if (currentIndex - itemsPerView >= 0) {
      setCurrentIndex(currentIndex - itemsPerView);
    }
  };

  if (!isVisible) {
    return null;
  }

  const frameHandle = (frameId: number, frameType: FrameType) => {
    setActiveFrame(frameId);
    if (onSelectFrame) {
      onSelectFrame(frameType);
    }
    console.log(`Frame dengan ID ${frameId} (${frameType}) dipilih.`);
  };

  const handleApplySelectedFrame = () => {
    const selectedFrameData = frame.find((f) => f.id === activeFrame);
    if (selectedFrameData && onApplyFrame) {
      onApplyFrame(selectedFrameData.type);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="my-6">
        <span className="bg-[#FF4CC3] card-neo rounded-md px-16 py-4 text-2xl font-bold">
          Frame kece kamu
        </span>
      </div>
      <div className="relative bg-white border-4 card-neo rounded-md max-w-full min-h-max mx-auto">
        <div className="grid relative items-center gap-12 mx-12 mt-6">
          {/* Back Button */}
          <div className="absolute -left-28 -top-14">
            <button
              onClick={onClose}
              className="btn-neo rotate-[-12deg] card-neo rounded-md px-4 py-2 font-bold text-2xl"
            >
              Kembali
            </button>
          </div>

          {/* Frame */}
          <div className="flex flex-row mx-auto justify-center mb-8 ">
            <button
              className={currentIndex === 0 ? "invisible" : ""}
              onClick={prevFrames}
            >
              <ArrowBigLeft size={64} />
            </button>
            {visibleFrames.map((frameItem) => (
              <div
                key={frameItem.id}
                className="flex mx-auto relative hover:scale-105 cursor-pointer transition-transform duration-300"
              >
                <div className="flex items-center px-8">
                  <Image
                    src={frameItem.src}
                    alt={frameItem.name}
                    width={200}
                    height={200}
                    onClick={() => frameHandle(frameItem.id, frameItem.type)}
                    className={
                      activeFrame === frameItem.id
                        ? `border-8 border-yellow-400 mx-auto rounded-md`
                        : "card-neo rounded-md mx-auto"
                    }
                  />
                </div>
              </div>
            ))}
            <button
              className={
                currentIndex + itemsPerView >= frame.length ? `invisible` : ""
              }
              onClick={nextFrames}
            >
              <ArrowBigRight size={64} />
            </button>
          </div>
        </div>
      </div>
      <div className="z-12 mt-8">
        <button
          onClick={handleApplySelectedFrame}
          disabled={activeFrame === null}
          className={`btn-neo rounded-md px-8 py-4 text-2xl font-bold transition-all ${
            activeFrame === null
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105"
          }`}
        >
          Pilih frame ini
        </button>
      </div>
    </div>
  );
}
