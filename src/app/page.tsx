import Link from "next/link";
import Image from "next/image";
import { Camera, Sparkles } from "lucide-react";
import StepCard from "@/components/home/StepCard";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col bg-cyan-300 overflow-hidden relative'>
			<Navbar />
			<div className='absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-yellow-400 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce' />
			<div className='absolute bottom-12 sm:bottom-16 md:bottom-20 right-4 sm:right-6 md:right-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-[#FF90E8] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-12' />
			<Sparkles size={32} className='absolute top-12 sm:top-16 md:top-20 right-20 sm:right-24 md:right-32 text-black rotate-12' />

			<div className='flex items-center justify-center min-h-screen pt-16 px-4 sm:px-6'>
				<div className='card-neo max-w-3xl w-full flex flex-col items-center text-center space-y-8 bg-white z-10'>
					<div className='w-20 h-20 sm:w-24 sm:h-28 md:w-32 md:h-32 bg-[#FF90E8] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center rotate-[-5deg] mb-4'>
						<Camera size={40} className="text-black" />
					</div>
					<div className='space-y-4'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight bg-yellow-300 inline-block px-2 sm:px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2'>
							SNAP! BOOTH
						</h1>
						<p className='text-lg sm:text-xl md:text-2xl font-bold border-b-4 border-black pb-2 mt-6'>
							Photobooth Web-App Modern & Praktis.
						</p>
						<p className='text-sm sm:text-base text-gray-700 font-medium px-2'>
							Abadikan momen, pilih frame premium, dan cetak langsung atau kirim ke emailmu!
						</p>
					</div>
					<Link
						href='/login'
						className='btn-neo bg-green-400 text-lg sm:text-xl md:text-2xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3 group'>
						MULAI FOTO SEKARANG
						<span className='group-hover:translate-x-2 transition-transform text-sm sm:text-base'>➔</span>
					</Link>
				</div>
			</div>

			<div className='px-4 sm:px-8 md:px-12 py-10 sm:py-14'>
				<div className='max-w-4xl mx-auto space-y-6 sm:space-y-8'>
					<div className='relative mx-6 sm:mx-8'>
						<div className='absolute -left-6 sm:-left-8 -top-6 sm:-top-8 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center z-10'>
							<Image src='/assets/icons/cassette.png' alt='cassette icon' width={64} height={64} className='object-contain w-full h-full' />
						</div>
						<div className='absolute -right-6 sm:-right-8 -bottom-6 sm:-bottom-8 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center z-10'>
							<Image src='/assets/icons/header-divider.png' alt='header divider icon' width={64} height={64} className='object-contain w-full h-full' />
						</div>
						<div className='bg-lime-400 border-4 border-black rounded-3xl px-4 sm:px-6 py-5 sm:py-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
							<h2 className='text-base sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-wide text-center'>
								FOTO DENGAN 4 LANGKAH MUDAH
							</h2>
						</div>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3'>
						<span className='btn-neo bg-yellow-300 text-xs sm:text-sm md:text-base font-extrabold py-2 sm:py-3 text-center'>Top Up!</span>
						<span className='btn-neo bg-[#FF90E8] text-xs sm:text-sm md:text-base font-extrabold py-2 sm:py-3 text-center'>Pilih frame</span>
						<span className='btn-neo bg-blue-300 text-xs sm:text-sm md:text-base font-extrabold py-2 sm:py-3 text-center'>Cekrek!</span>
						<span className='btn-neo bg-green-400 text-xs sm:text-sm md:text-base font-extrabold py-2 sm:py-3 text-center'>Cetak!</span>
					</div>

					<div className='grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-1 sm:gap-2 md:gap-3'>
						<StepCard
							bgColor='bg-yellow-300'
							iconSrc='/assets/icons/top-up.png'
							iconAlt='Top Up'
							stepNumber={1}
							stepTitle='Top Up'
							stepDesc='Isi saldo dulu sebelum mulai sesi foto'
						/>
						<div className='flex items-center justify-center'>
							<Image src='/assets/icons/arrow.png' alt='Next step' width={32} height={32} className='object-contain w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8' />
						</div>
						<StepCard
							bgColor='bg-[#AB3DDE]'
							iconSrc='/assets/icons/frame.png'
							iconAlt='Pilih Frame'
							stepNumber={2}
							stepTitle='Pilih Frame'
							stepDesc='Pilih frame favoritmu sebelum foto'
						/>
						<div className='flex items-center justify-center'>
							<Image src='/assets/icons/arrow.png' alt='Next step' width={32} height={32} className='object-contain w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8' />
						</div>
						<StepCard
							bgColor='bg-[#72ACC7]'
							iconSrc='/assets/icons/camera.png'
							iconAlt='Cekrek'
							stepNumber={3}
							stepTitle='Cekrek!'
							stepDesc='Ambil foto seru bareng teman-temanmu'
						/>
						<div className='flex items-center justify-center'>
							<Image src='/assets/icons/arrow.png' alt='Next step' width={32} height={32} className='object-contain w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8' />
						</div>
						<StepCard
							bgColor='bg-[#4ADE80]'
							iconSrc='/assets/icons/printer.png'
							iconAlt='Cetak'
							stepNumber={4}
							stepTitle='Cetak!'
							stepDesc='Cetak atau kirim foto ke emailmu'
						/>
					</div>
				</div>
			</div>

			<div className='px-4 sm:px-6 pb-16 sm:pb-20'>
				<div
					className='bg-green-400 border-4 border-black rounded-3xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 mb-8 sm:mb-12 md:mb-16 shadow-[7px_11px_0px_rgba(0,0,0,1)] text-center'
					style={{ transform: "matrix(1, 0.01, -0.01, 1, 0, 0)" }}>
					<h3 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-wide'>
						Lihat koleksi foto keren ini!
					</h3>
				</div>
				<div className='max-w-7xl mx-auto'>
					<div className='relative'>
						<div className='absolute -top-20 -right-6 sm:-top-24 sm:-right-8 md:-top-28 md:-right-10 z-20 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48'>
							<Image src='/assets/decorations/neo-booth.png' alt='Neo Boohoo decoration' width={280} height={280} className='object-contain w-full h-full' />
						</div>
						<div
							className='bg-yellow-400 border-4 border-black rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-[7px_11px_0px_rgba(0,0,0,1)] relative overflow-hidden'
							style={{ transform: "matrix(1, 0.01, -0.01, 1, 0, 0)" }}>
							<div className='absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 space-y-2 sm:space-y-4 md:space-y-6 hidden lg:flex flex-col'>
								<Image src='/assets/icons/star.png' alt='Star decoration' width={24} height={24} className='object-contain w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8' />
								<Image src='/assets/icons/star.png' alt='Star decoration' width={24} height={24} className='object-contain w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8' />
								<Image src='/assets/icons/star.png' alt='Star decoration' width={24} height={24} className='object-contain w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8' />
							</div>
							<div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-3'>
								<div className='flex-shrink-0 w-20 sm:w-24 md:w-28 lg:w-32 h-auto' style={{ transform: "rotate(-9.36deg)" }}>
									<Image src='/assets/frames/wild-frame.png' alt='WILD Frame' width={178} height={534} className='object-contain w-full h-full' />
								</div>
								<div className='flex-shrink-0 w-20 sm:w-24 md:w-28 lg:w-32 h-auto' style={{ transform: "rotate(8.19deg)" }}>
									<Image src='/assets/frames/disco-frame.png' alt='DISCO Frame' width={178} height={534} className='object-contain w-full h-full' />
								</div>
								<div className='flex-shrink-0 w-20 sm:w-24 md:w-28 lg:w-32 h-auto hidden sm:block' style={{ transform: "rotate(-5.58deg)" }}>
									<Image src='/assets/frames/disco-frame.png' alt='DISCO Frame' width={178} height={534} className='object-contain w-full h-full' />
								</div>
								<div className='flex-shrink-0 w-20 sm:w-24 md:w-28 lg:w-32 h-auto hidden lg:block' style={{ transform: "rotate(4.61deg)" }}>
									<Image src='/assets/frames/wild-frame.png' alt='WILD Frame' width={178} height={534} className='object-contain w-full h-full' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
