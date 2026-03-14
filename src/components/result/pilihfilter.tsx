"use client";

import Image from "next/image";
import { useState } from "react";

interface ChooseFilterProps {
  onClose: () => void;
  isVisible: boolean;
}

export default function ChooseFilter({
  onClose,
  isVisible,
}: ChooseFilterProps) {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  const frame = [{ id: 1, name: "WILD REBEL", src: "/frames/frame1.png" }];

  const filterOptions = [
    {
      id: 1,
      name: "Black & White",
      color: "bg-[#FFFFFF]",
      borderColor: "border-[#565CFD]",
      src: "/filters/blackwhite.png",
    },
    {
      id: 2,
      name: "Vivid",
      color: "bg-[#468AFF]",
      borderColor: "border-[#468AFF]",
      src: "/filters/vivid.png",
    },
    {
      id: 3,
      name: "Sepia",
      color: "bg-[#FFC746]",
      borderColor: "border-[#FFC746]",
      src: "/filters/sepia.png",
    },
  ];

  if (!isVisible) {
    return null;
  }

  const filterHandle = (filterId: number) => {
    setActiveFilter(filterId);
    console.log(`Filter dengan ID ${filterId} dipilih.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white border-4 card-neo rounded-md max-w-full h-auto mx-auto">
        <div className="absolute -right-24 -top-8 ">
          <span className="bg-[#FF4CC3] card-neo rounded-md px-6 py-4 text-2xl font-bold">
            Filter yang kece buat kamu!
          </span>
        </div>
        <div className="grid grid-cols-2 relative items-center gap-12 mx-12 mt-6">
          {/* Back Button */}
          <div className="absolute -left-28 -top-14">
            <button
              onClick={onClose}
              className="bg-[#FF4CC3] rotate-[-12deg] card-neo rounded-md px-4 py-2 font-bold"
            >
              Kembali
            </button>
          </div>
          {/* Frame */}
          <div className="card-neo flex flex-col items-center">
            <Image
              src={frame[0].src}
              alt={frame[0].name}
              width={170}
              height={170}
            />
          </div>

          {/* Filter */}
          <div className="flex flex-col justify-center mb-8">
            {filterOptions.map((filter) => (
              <div
                key={filter.id}
                className="mx-auto relative hover:scale-105 cursor-pointer transition-transform duration-300 py-4 group "
              >
                <div className="absolute -right-8 rotate-[16deg] group-hover:rotate-[25deg] transition-all duration-300 ">
                  <span
                    className={`${filter.color} card-neo rounded-md px-4 py-3 font-bold`}
                  >
                    {filter.name}
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <Image
                    src={filter.src}
                    alt={filter.name}
                    width={250}
                    height={250}
                    onClick={() => filterHandle(filter.id)}
                    className={
                      activeFilter === filter.id
                        ? `${filter.borderColor} border-8 rounded-[18px]`
                        : ""
                    }
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
