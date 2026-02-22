import LoadingScreen from '@/components/LoadingScreen'

export default function TestLoadingPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-4xl">
                {/* Header untuk halaman tester */}
                <div className="mb-6 bg-white p-4 border-[4px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex justify-between items-center">
                    <h1 className="text-xl font-black text-black">TESTER - Loading Screen Component</h1>
                    <span className="text-red-500 font-bold p-1 border-2 border-red-500 rounded text-sm">Halaman Sementara</span>
                </div>

                {/* Render Komponen Loading */}
                <LoadingScreen />
            </div>
        </div>
    )
}
