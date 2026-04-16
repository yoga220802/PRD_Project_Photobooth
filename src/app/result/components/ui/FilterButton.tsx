import Image from "next/image";
import React from "react";

interface FilterButtonProps {
  handleFilter: () => void;
  handleFrame: () => void;
}

function FilterButton({ handleFilter, handleFrame }: FilterButtonProps) {
  return (
    <>
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
          <span className="text-black font-black text-xl">Tambah filter!</span>
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
          <span className="text-black font-black text-xl">Ganti frame?</span>
        </button>
      </div>
    </>
  );
}

export default FilterButton;
