'use client';
import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Download } from 'lucide-react';

export default function CameraStudio() {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [filter, setFilter] = useState('none'); // none, grayscale, sepia

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Set canvas ukuran standar photobooth (misal: 1080x1080)
                canvas.width = 1080;
                canvas.height = 1080;

                // 1. Terapkan Filter
                if (ctx) {
                    ctx.filter = filter === 'grayscale' ? 'grayscale(100%)' :
                        filter === 'sepia' ? 'sepia(100%)' : 'none';

                    // 2. Gambar hasil foto webcam
                    ctx.drawImage(img, 0, 0, 1080, 1080);

                    // 3. (Opsional) Tumpuk Frame PNG di atasnya
                    // const frameImg = new Image();
                    // frameImg.src = '/frames/frame-premium-1.png';
                    // frameImg.onload = () => {
                    //   ctx.drawImage(frameImg, 0, 0, 1080, 1080);
                    //   setCapturedImage(canvas.toDataURL('image/png'));
                    // }

                    setCapturedImage(canvas.toDataURL('image/jpeg', 0.9));
                }
            };
            img.src = imageSrc;
        }
    }, [webcamRef, filter]);

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            <div className="card-neo relative overflow-hidden bg-pink-300">
                {!capturedImage ? (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full max-w-2xl border-4 border-black"
                        style={{ filter: filter === 'grayscale' ? 'grayscale(100%)' : filter === 'sepia' ? 'sepia(100%)' : 'none' }}
                    />
                ) : (
                    <img src={capturedImage} alt="Captured" className="w-full max-w-2xl border-4 border-black" />
                )}

                {/* Canvas disembunyikan, hanya dipakai untuk proses merging */}
                <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex gap-4">
                {!capturedImage ? (
                    <>
                        <select
                            className="border-4 border-black p-2 bg-cyan-300 font-bold outline-none"
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="none">Normal</option>
                            <option value="grayscale">BW (Retro)</option>
                            <option value="sepia">Sepia</option>
                        </select>
                        <button onClick={capture} className="btn-neo flex items-center gap-2">
                            <Camera size={24} /> SNAP!
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setCapturedImage(null)} className="btn-neo bg-white">
                            Retake
                        </button>
                        <button className="btn-neo bg-green-400 flex items-center gap-2">
                            <Download size={24} /> Save & Print
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}