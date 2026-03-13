"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Lenyap dalam 3 detik
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-[#39FF14]";
      case "error":
        return "bg-[#FF69B4]";
      case "warning":
        return "bg-[#FFEA00]";
      case "info":
      default:
        return "bg-[#5CE1E6]";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto w-80 text-black font-bold px-6 py-4 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center transform transition-all duration-300 translate-x-0 ${getBgColor(toast.type)}`}
            style={{
              animation: "slideIn 0.3s ease-out forwards",
            }}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="bg-white border-2 border-black p-1 hover:bg-black hover:text-white transition-colors flex-shrink-0 ml-4 font-black w-8 h-8 flex justify-center items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(100%) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
