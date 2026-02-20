interface VerifikasiNotificationProps {
    onClose: () => void
}

export default function VerifikasiNotification({ onClose }: VerifikasiNotificationProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-4 md:border-[6px] border-black p-6 md:p-8 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full border-4 border-black flex items-center justify-center">
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                
                <h2 className="text-xl md:text-2xl font-black text-center mb-4 text-black">Verifikasi Berhasil!</h2>
                <p className="text-center text-sm md:text-base text-gray-700 mb-6 font-medium">
                    Kode verifikasi yang kamu masukkan sudah benar.
                </p>
                
                <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-black text-lg md:text-xl py-3 border-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] md:shadow-[0_6px_0_0_rgba(0,0,0,1)] active:shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 transition-all"
                >
                    OK
                </button>
            </div>
        </div>
    )
}
