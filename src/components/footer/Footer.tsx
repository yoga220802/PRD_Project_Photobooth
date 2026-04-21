import Link from "next/link";
import { Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-7 h-7 bg-[#FF90E8] border-2 border-white rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#fff] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200">
            <Camera size={14} className="text-black" />
          </div>
          <span className="text-sm font-black uppercase tracking-tight bg-yellow-300 text-black px-2 border-2 border-white shadow-[2px_2px_0px_0px_#fff] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200">
            SNAP! BOOTH
          </span>
        </Link>

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Snap! Booth. All rights reserved.
        </p>

        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          collab? DM
          <a
            href="https://instagram.com/tikum.community"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors font-bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            tikum.community
          </a>
        </p>
      </div>
    </footer>
  );
}
