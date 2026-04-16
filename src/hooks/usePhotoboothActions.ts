import { useState, useCallback, useEffect, useRef } from "react";
import type Webcam from "react-webcam";

// --- Types ---
export type FrameType = "wild-rebel" | "disco" | null;
export type CameraPermission = "checking" | "prompt" | "granted" | "denied";

export interface UsePhotoboothActionsProps {
  // Result page inputs
  validPhotos?: { id: number; src: string }[];
  frameMapping?: Record<string, { src: string; label: string }>;

  // Studio page inputs
  capturedPhotos?: (string | null)[];
  activeFilter?: number | null;
  setCapturedPhoto?: (index: number, photo: string | null) => void;
  setActiveFilter?: (filter: number | null) => void;
  maxPhotos?: number;
  filterCssMap?: Record<number, string>;
}

// --- Hook ---
export function usePhotoboothActions({
  validPhotos,
  frameMapping,
  capturedPhotos,
  activeFilter,
  setCapturedPhoto,
  setActiveFilter,
  maxPhotos = 3,
  filterCssMap,
}: UsePhotoboothActionsProps) {
  const safeValidPhotos = validPhotos ?? [];
  const safeFrameMapping = frameMapping ?? {};
  const safeCapturedPhotos = capturedPhotos ?? [];

  const hasStudioBindings =
    Array.isArray(capturedPhotos) && typeof setCapturedPhoto === "function";

  // --- States ---
  const [selectedFrame, setSelectedFrame] = useState<FrameType>("wild-rebel");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [successMessage, setSuccessMessage] = useState("Sukses!");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFrame, setShowFrame] = useState(false);

  // Studio states
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermission>("checking");
  const [selectedSlot, setSelectedSlot] = useState<number>(0);
  const [flashSlot, setFlashSlot] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);

  // Studio refs
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentCssFilter =
    activeFilter !== null && activeFilter !== undefined
      ? (filterCssMap?.[activeFilter] ?? "none")
      : "none";

  const photosTaken = safeCapturedPhotos.filter((p) => p !== null).length;

  // Keep selected slot focused on the next empty slot when current is filled.
  useEffect(() => {
    if (!hasStudioBindings || safeCapturedPhotos.length === 0) return;

    const firstEmpty = safeCapturedPhotos.findIndex((p) => p === null);
    if (firstEmpty !== -1 && safeCapturedPhotos[selectedSlot] !== null) {
      setSelectedSlot(firstEmpty);
    }
  }, [hasStudioBindings, safeCapturedPhotos, selectedSlot]);

  // Camera permission check for Studio flow.
  useEffect(() => {
    if (!hasStudioBindings || typeof window === "undefined") return;

    let permissionStatus: PermissionStatus | null = null;

    const syncPermission = () => {
      if (!permissionStatus) return;
      if (permissionStatus.state === "granted") {
        setCameraPermission("granted");
      } else if (permissionStatus.state === "denied") {
        setCameraPermission("denied");
      } else {
        setCameraPermission("prompt");
      }
    };

    const checkPermission = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          permissionStatus = await navigator.permissions.query({
            name: "camera" as PermissionName,
          });

          syncPermission();
          permissionStatus.addEventListener("change", syncPermission);
        } else {
          setCameraPermission("prompt");
        }
      } catch {
        setCameraPermission("prompt");
      }
    };

    checkPermission();

    return () => {
      if (permissionStatus) {
        permissionStatus.removeEventListener("change", syncPermission);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [hasStudioBindings]);

  // Cleanup countdown timer on unmount.
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  // --- Internal Helpers ---

  /**
   * Sets a success message and auto-hides it after 3 seconds.
   */
  const triggerSuccess = useCallback((message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }, []);

  /**
   * Wraps an async action with loading state management and error handling.
   */
  const runWithLoading = useCallback(
    async (loadingText: string, action: () => Promise<void>) => {
      setIsLoading(true);
      setLoadingMessage(loadingText);
      try {
        await action();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // --- Handlers ---

  const handleSelectFrame = useCallback((frameType: FrameType) => {
    if (frameType) {
      setSelectedFrame(frameType);
      console.log("Frame selected:", frameType);
    }
  }, []);

  const handleApplyFrame = useCallback(
    async (frameType: FrameType) => {
      setShowFrame(false);
      await runWithLoading("Menerapkan frame...", async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        if (frameType) {
          setSelectedFrame(frameType);
        }
        triggerSuccess(`Frame ${frameType} berhasil diterapkan!`);
      });
    },
    [runWithLoading, triggerSuccess],
  );

  const handleFrame = useCallback(async () => {
    await runWithLoading("Memuat Frame...", async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setShowFrame(true);
    });
  }, [runWithLoading]);

  const handleFilter = useCallback(async () => {
    await runWithLoading("Memuat Filter...", async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setShowFilter(true);
    });
  }, [runWithLoading]);

  const handleDownload = useCallback(async () => {
    if (safeValidPhotos.length === 0) {
      triggerSuccess("Belum ada foto untuk diunduh!");
      return;
    }

    await runWithLoading("Mengunduh foto...", async () => {
      try {
        // Define photo slot positions for each frame type (x, y, width, height)
        // These are proportional values (0-1) relative to the frame dimensions
        const frameSlots: Record<
          string,
          { x: number; y: number; w: number; h: number }[]
        > = {
          "wild-rebel": [
            { x: 0.075, y: 0.065, w: 0.86, h: 0.27 },
            { x: 0.075, y: 0.365, w: 0.86, h: 0.27 },
            { x: 0.075, y: 0.635, w: 0.86, h: 0.27 },
          ],
          disco: [
            { x: 0.09, y: 0.075, w: 0.82, h: 0.27 },
            { x: 0.09, y: 0.375, w: 0.82, h: 0.24 },
            { x: 0.09, y: 0.635, w: 0.82, h: 0.24 },
          ],
        };

        // Load the frame image
        const frameKey = selectedFrame || "wild-rebel";
        const frameConfig = safeFrameMapping[frameKey];
        if (!frameConfig) {
          throw new Error("Frame mapping is not configured");
        }
        const frameSrc = frameConfig.src;

        const frameImg = await new Promise<HTMLImageElement>(
          (resolve, reject) => {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = frameSrc;
          },
        );

        // Create canvas with frame dimensions
        const canvas = document.createElement("canvas");
        canvas.width = frameImg.naturalWidth;
        canvas.height = frameImg.naturalHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) throw new Error("Canvas context not available");

        // Fill background white
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Load and draw each photo into its slot
        const slots = frameSlots[frameKey] || frameSlots["wild-rebel"];

        for (
          let i = 0;
          i < Math.min(safeValidPhotos.length, slots.length);
          i++
        ) {
          const photo = safeValidPhotos[i];
          const slot = slots[i];

          const photoImg = await new Promise<HTMLImageElement>(
            (resolve, reject) => {
              const img = new window.Image();
              img.crossOrigin = "anonymous";
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = photo.src;
            },
          );

          // Calculate destination rect
          const dx = slot.x * canvas.width;
          const dy = slot.y * canvas.height;
          const dw = slot.w * canvas.width;
          const dh = slot.h * canvas.height;

          // Draw photo with cover-fit (fill the slot while maintaining aspect ratio)
          const photoAspect = photoImg.naturalWidth / photoImg.naturalHeight;
          const slotAspect = dw / dh;

          let sx = 0,
            sy = 0,
            sw = photoImg.naturalWidth,
            sh = photoImg.naturalHeight;

          if (photoAspect > slotAspect) {
            // Photo is wider - crop sides
            sw = photoImg.naturalHeight * slotAspect;
            sx = (photoImg.naturalWidth - sw) / 2;
          } else {
            // Photo is taller - crop top/bottom
            sh = photoImg.naturalWidth / slotAspect;
            sy = (photoImg.naturalHeight - sh) / 2;
          }

          ctx.drawImage(photoImg, sx, sy, sw, sh, dx, dy, dw, dh);
        }

        // Draw the frame overlay on top
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

        // Convert to blob and trigger download
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) =>
              b ? resolve(b) : reject(new Error("Failed to create blob")),
            "image/png",
            1.0,
          );
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `photobooth-${frameKey}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        triggerSuccess("Foto berhasil diunduh!");
      } catch (error) {
        console.error("Download error:", error);
        triggerSuccess("Gagal mengunduh foto. Coba lagi ya!");
      }
    });
  }, [
    safeValidPhotos,
    selectedFrame,
    safeFrameMapping,
    runWithLoading,
    triggerSuccess,
  ]);

  const handleAllowCamera = useCallback(async () => {
    if (!hasStudioBindings || typeof window === "undefined") return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission("granted");
    } catch {
      setCameraPermission("denied");
    }
  }, [hasStudioBindings]);

  const handleDenyCamera = useCallback(() => {
    if (!hasStudioBindings) return;
    setCameraPermission("denied");
  }, [hasStudioBindings]);

  const handleRetryCamera = useCallback(async () => {
    if (!hasStudioBindings || typeof window === "undefined") return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission("granted");
    } catch {
      setCameraPermission("denied");
    }
  }, [hasStudioBindings]);

  const doCapture = useCallback(() => {
    if (
      !hasStudioBindings ||
      cameraPermission !== "granted" ||
      !setCapturedPhoto
    ) {
      return;
    }

    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = 1080;
      canvas.height = 1080;

      ctx.filter = currentCssFilter;
      ctx.drawImage(img, 0, 0, 1080, 1080);
      ctx.filter = "none";

      const processedImage = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedPhoto(selectedSlot, processedImage);

      setFlashSlot(selectedSlot);
      setTimeout(() => setFlashSlot(null), 600);

      const nextEmpty = safeCapturedPhotos.findIndex(
        (p, i) => p === null && i !== selectedSlot,
      );
      if (nextEmpty !== -1) {
        setTimeout(() => setSelectedSlot(nextEmpty), 300);
      }
    };
    img.src = imageSrc;
  }, [
    hasStudioBindings,
    cameraPermission,
    setCapturedPhoto,
    currentCssFilter,
    selectedSlot,
    safeCapturedPhotos,
  ]);

  const handleCapture = useCallback(() => {
    if (!hasStudioBindings) return;
    if (cameraPermission !== "granted" || isCountingDown) return;

    setIsCountingDown(true);
    setCountdown(3);

    let timeLeft = 3;
    countdownRef.current = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) {
        setCountdown(timeLeft);
      } else {
        if (countdownRef.current) {
          clearInterval(countdownRef.current);
        }
        countdownRef.current = null;
        setCountdown(null);
        setIsCountingDown(false);
        doCapture();
      }
    }, 1000);
  }, [hasStudioBindings, cameraPermission, isCountingDown, doCapture]);

  const handleRetakeSlot = useCallback(() => {
    if (!hasStudioBindings || !setCapturedPhoto) return;
    setCapturedPhoto(selectedSlot, null);
  }, [hasStudioBindings, setCapturedPhoto, selectedSlot]);

  const handleSlotClick = useCallback(
    (index: number) => {
      if (!hasStudioBindings) return;
      setSelectedSlot(index);
    },
    [hasStudioBindings],
  );

  const handleSelectFilter = useCallback(
    (filterId: number | null) => {
      if (!hasStudioBindings || !setActiveFilter) return;
      setActiveFilter(filterId);
    },
    [hasStudioBindings, setActiveFilter],
  );

  const handleQRCode = useCallback(async () => {
    await runWithLoading("Membuat QR Code...", async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      triggerSuccess("QR Code berhasil dibuat!");
    });
  }, [runWithLoading, triggerSuccess]);

  const handleEmail = useCallback(async () => {
    await runWithLoading("Mengirim email...", async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      triggerSuccess("Email berhasil dikirim!");
    });
  }, [runWithLoading, triggerSuccess]);

  const handlePrint = useCallback(async () => {
    await runWithLoading("Menyiapkan untuk cetak...", async () => {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      triggerSuccess("Foto berhasil dicetak!");
    });
  }, [runWithLoading, triggerSuccess]);

  // --- Return ---
  return {
    // States
    isLoading,
    loadingMessage,
    showSuccess,
    successMessage,
    selectedFrame,
    showFrame,
    showFilter,

    // Studio states
    cameraPermission,
    selectedSlot,
    flashSlot,
    isFilterOpen,
    countdown,
    isCountingDown,
    currentCssFilter,
    photosTaken,

    // Studio refs
    webcamRef,
    canvasRef,

    // State setters (for UI callbacks like onClose)
    setShowSuccess,
    setShowFilter,
    setShowFrame,
    setIsFilterOpen,

    // Handlers
    handleSelectFrame,
    handleApplyFrame,
    handleFrame,
    handleFilter,
    handleDownload,
    handleQRCode,
    handleEmail,
    handlePrint,

    // Studio handlers
    handleAllowCamera,
    handleDenyCamera,
    handleRetryCamera,
    handleCapture,
    handleRetakeSlot,
    handleSlotClick,
    handleSelectFilter,

    // Studio constants
    maxPhotos,
  };
}
