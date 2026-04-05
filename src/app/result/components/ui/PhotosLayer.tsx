interface PhotosLayerProps {
  validPhotos: { id: number; src: string }[];
  selectedFrame: "wild-rebel" | "disco" | null;
  frameMapping: Record<
    string,
    {
      src: string;
      label: string;
    }
  >;
}

function PhotosLayer({
  validPhotos,
  selectedFrame,
  frameMapping,
}: PhotosLayerProps) {
  return (
    <>
      {/* Photos layer (behind the frame) */}
      <div className="relative w-full" style={{ aspectRatio: "1 / 2.95" }}>
        {validPhotos.length > 0 ? (
          <>
            {/* Position photos in their frame slots */}
            {validPhotos.map((photo, index) => {
              const frameKey = selectedFrame || "wild-rebel";
              const slotPositions: Record<
                string,
                {
                  top: string;
                  left: string;
                  width: string;
                  height: string;
                }[]
              > = {
                "wild-rebel": [
                  {
                    top: "6.5%",
                    left: "7.5%",
                    width: "86%",
                    height: "27%",
                  },
                  {
                    top: "36.5%",
                    left: "7.5%",
                    width: "86%",
                    height: "27%",
                  },
                  {
                    top: "65.5%",
                    left: "7.5%",
                    width: "86%",
                    height: "27%",
                  },
                ],
                disco: [
                  {
                    top: "7.5%",
                    left: "9%",
                    width: "82%",
                    height: "27%",
                  },
                  {
                    top: "37.5%",
                    left: "9%",
                    width: "82%",
                    height: "24%",
                  },
                  {
                    top: "63.5%",
                    left: "9%",
                    width: "82%",
                    height: "24%",
                  },
                ],
              };
              const slots =
                slotPositions[frameKey] || slotPositions["wild-rebel"];
              if (index >= slots.length) return null;
              const pos = slots[index];
              return (
                <div
                  key={photo.id}
                  className="absolute overflow-hidden"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    width: pos.width,
                    height: pos.height,
                  }}
                >
                  <img
                    src={photo.src}
                    alt={`Foto ${photo.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-white z-10">
            <span className="text-4xl mb-2">📷</span>
            <span className="font-bold">Belum ada foto</span>
            <span className="text-sm">Ambil foto di Studio dulu ya!</span>
          </div>
        )}

        {/* Frame overlay on top */}
        {selectedFrame && (
          <img
            src={frameMapping[selectedFrame].src}
            alt={frameMapping[selectedFrame].label}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
          />
        )}
      </div>
    </>
  );
}

export default PhotosLayer;
