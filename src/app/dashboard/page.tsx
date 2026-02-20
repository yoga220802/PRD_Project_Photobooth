import { Camera, ArrowLeft } from 'lucide-react'

export default function DashboardPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4DD0E1] p-4 relative">
            
            {/* Button Back */}
            <a 
                href="/login"
                className="absolute top-4 left-4 z-50 bg-white hover:bg-gray-100 border-3 border-black p-2 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
                <ArrowLeft size={20} className="text-black" />
            </a>

            <div className="bg-gray-100 border-4 md:border-[6px] border-black p-6 md:p-8 w-full max-w-lg text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-4 border-black flex items-center justify-center shadow-lg">
                        <Camera size={32} className="text-white md:hidden" />
                        <Camera size={36} className="text-white hidden md:block" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black mb-4 text-black">COMING SOON</h1>
                <p className="text-gray-700 font-medium text-base md:text-lg">
                    Dashboard sedang dalam pengembangan
                </p>

                <div className="mt-6 pt-6 border-t-4 border-black">
                    <p className="text-sm font-bold text-gray-500">
                        Stay tuned! 🚀
                    </p>
                </div>
            </div>
        </div>
    )
}
