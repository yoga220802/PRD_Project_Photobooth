"use client";

import Image from "next/image";

interface DropdownFilterProps {
  isOpen: boolean;
  onSelectFilter: (filterId: number) => void;
  activeFilter: number | null;
}

const filterOptions = [
  {
    id: 1,
    name: "Black & White",
    src: "/filters/blackwhite.png",
  },
  {
    id: 2,
    name: "Vivid",
    src: "/filters/vivid.png",
  },
  {
    id: 3,
    name: "Sepia",
    src: "/filters/sepia.png",
  },
];

export default function DropdownFilter({
  isOpen,
  onSelectFilter,
  activeFilter,
}: DropdownFilterProps) {
  if (!isOpen) return null;

  return (
    <div
      className="
        w-full mt-3
        bg-[#FFC746] border-4 border-black rounded-2xl
        shadow-[6px_6px_0px_0px_#000]
        p-5 xl:p-6
        animate-[slideDown_0.25s_ease-out]
      "
    >
      <div className="flex items-start justify-center gap-4 xl:gap-6">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelectFilter(filter.id)}
            className={`
              flex flex-col items-center gap-2 xl:gap-3
              cursor-pointer group
              transition-transform duration-200
              hover:scale-105 active:scale-95
            `}
          >
            {/* Filter Name */}
            <span
              className={`
                text-sm xl:text-base font-bold text-black
                ${activeFilter === filter.id ? "underline underline-offset-4 decoration-2" : ""}
              `}
            >
              {filter.name}
            </span>

            {/* Filter Thumbnail */}
            <div
              className={`
                relative overflow-hidden rounded-xl
                border-4 transition-all duration-200
                ${
                  activeFilter === filter.id
                    ? "border-black shadow-[4px_4px_0px_0px_#000] ring-2 ring-black"
                    : "border-black/60 group-hover:border-black group-hover:shadow-[3px_3px_0px_0px_#000]"
                }
              `}
            >
              <Image
                src={filter.src}
                alt={filter.name}
                width={120}
                height={120}
                className="w-[80px] h-[80px] xl:w-[120px] xl:h-[120px] object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
