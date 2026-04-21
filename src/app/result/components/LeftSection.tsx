import React from "react";

import PhotosLayer from "./ui/PhotosLayer";
import FilterButton from "./ui/FilterButton";

interface LeftSectionProps {
  Photos: { id: number; src: string }[];
  selectedFrame: "wild-rebel" | "disco" | null;
  frameMapping: Record<
    string,
    {
      src: string;
      label: string;
    }
  >;
  handleFilter: () => void;
  handleFrame: () => void;
}

function LeftSection({
  Photos,
  selectedFrame,
  frameMapping,
  handleFilter,
  handleFrame,
}: LeftSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full">
      <div
        className="relative rounded-3xl shadow-3xl card-neo overflow-hidden mx-auto sm:mx-0"
        style={{ width: "280px", maxWidth: "90vw" }}
      >
        <PhotosLayer
          validPhotos={Photos}
          selectedFrame={selectedFrame}
          frameMapping={frameMapping}
        />
      </div>

      <FilterButton handleFilter={handleFilter} handleFrame={handleFrame} />
    </div>
  );
}

export default LeftSection;
