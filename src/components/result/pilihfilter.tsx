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
      <div className="relative bg-white border-4 card-neo rounded-md w-[90vw] max-w-2xl xl:max-w-3xl mx-auto">
        {/* Title Badge */}
        <div className="absolute -right-2 xl:-right-24 -top-8 z-10">
          <span className="bg-[#FF4CC3] card-neo rounded-md px-4 py-2 xl:px-6 xl:py-4 text-base xl:text-2xl font-bold whitespace-nowrap">
            Filter yang kece buat kamu!
          </span>
        </div>

        <div className="grid grid-cols-2 relative items-center gap-6 xl:gap-12 mx-6 xl:mx-12 mt-10 xl:mt-6">
          {/* Back Button */}
          <div className="absolute -left-16 xl:-left-28 -top-10 xl:-top-14">
            <button
              onClick={onClose}
              className="bg-[#FF4CC3] rotate-[-12deg] card-neo rounded-md px-3 py-1.5 xl:px-4 xl:py-2 text-sm xl:text-base font-bold"
            >
              Kembali
            </button>
          </div>

          {/* Frame Preview */}
          <div className="card-neo flex flex-col items-center">
            <Image
              src={frame[0].src}
              alt={frame[0].name}
              width={170}
              height={170}
              className="w-24 h-auto xl:w-[170px]"
            />
          </div>

          {/* Filter Options */}
          <div className="flex flex-col justify-center mb-6 xl:mb-8">
            {filterOptions.map((filter) => (
              <div
                key={filter.id}
                className="mx-auto relative hover:scale-105 cursor-pointer transition-transform duration-300 py-2 xl:py-4 group"
              >
                <div className="absolute -right-6 xl:-right-8 rotate-[16deg] group-hover:rotate-[25deg] transition-all duration-300">
                  <span
                    className={`${filter.color} card-neo rounded-md px-2 py-1.5 xl:px-4 xl:py-3 text-xs xl:text-base font-bold`}
                  >
                    {filter.name}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src={filter.src}
                    alt={filter.name}
                    width={250}
                    height={250}
                    onClick={() => filterHandle(filter.id)}
                    className={`w-28 xl:w-[250px] h-auto ${
                      activeFilter === filter.id
                        ? `${filter.borderColor} border-8 rounded-[18px]`
                        : ""
                    }`}
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
