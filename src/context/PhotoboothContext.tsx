"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const MAX_PHOTOS = 3;

interface PhotoboothContextType {
  capturedPhotos: (string | null)[];
  activeFilter: number | null;
  setCapturedPhoto: (index: number, photo: string | null) => void;
  setActiveFilter: (filter: number | null) => void;
  resetPhotos: () => void;
}

const PhotoboothContext = createContext<PhotoboothContextType | null>(null);

export function PhotoboothProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [capturedPhotos, setCapturedPhotos] = useState<(string | null)[]>(
    Array(MAX_PHOTOS).fill(null),
  );
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  const setCapturedPhoto = useCallback(
    (index: number, photo: string | null) => {
      setCapturedPhotos((prev) => {
        const updated = [...prev];
        updated[index] = photo;
        return updated;
      });
    },
    [],
  );

  const resetPhotos = useCallback(() => {
    setCapturedPhotos(Array(MAX_PHOTOS).fill(null));
  }, []);

  return (
    <PhotoboothContext.Provider
      value={{
        capturedPhotos,
        activeFilter,
        setCapturedPhoto,
        setActiveFilter,
        resetPhotos,
      }}
    >
      {children}
    </PhotoboothContext.Provider>
  );
}

export function usePhotobooth() {
  const context = useContext(PhotoboothContext);
  if (!context) {
    throw new Error("usePhotobooth must be used within a PhotoboothProvider");
  }
  return context;
}
