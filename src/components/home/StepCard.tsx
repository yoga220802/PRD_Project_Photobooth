"use client";

import Image from "next/image";

interface StepCardProps {
  bgColor: string;
  iconSrc: string;
  iconAlt: string;
  stepNumber: number;
  stepTitle: string;
  stepDesc: string;
}

export default function StepCard({
  bgColor,
  iconSrc,
  iconAlt,
  stepNumber,
  stepTitle,
  stepDesc,
}: StepCardProps) {
  return (
    <div className="w-full group perspective">
      <div className="relative w-full aspect-square transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
        <div
          className={`absolute inset-0 ${bgColor} border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-2 sm:p-4 shadow-[4px_6px_0px_rgba(0,0,0,1)] sm:shadow-[7px_11px_0px_rgba(0,0,0,1)] flex items-center justify-center backface-hidden`}
        >
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={50}
            height={50}
            className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
          />
        </div>
        <div
          className={`absolute inset-0 ${bgColor} border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-1.5 sm:p-3 shadow-[4px_6px_0px_rgba(0,0,0,1)] sm:shadow-[7px_11px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center backface-hidden rotate-y-180 text-center`}
        >
          <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wide text-black/60">
            Step {stepNumber}
          </span>
          <span className="text-[9px] sm:text-xs md:text-sm font-medium text-black/70 mt-1 leading-tight">
            {stepDesc}
          </span>
        </div>
      </div>
    </div>
  );
}
