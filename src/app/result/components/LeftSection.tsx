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
    <div className="flex items-center gap-8">
      {/* Photo Result Container with Frame Preview */}
      <div
        className="relative rounded-3xl shadow-3xl card-neo overflow-hidden"
        style={{ width: "300px" }}
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
