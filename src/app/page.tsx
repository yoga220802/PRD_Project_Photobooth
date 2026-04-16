import Link from "next/link";
import Image from "next/image";
import { Camera, Sparkles } from "lucide-react";

export default function Home() {

	return (
		<div className='min-h-screen flex flex-col bg-cyan-300 overflow-hidden relative'>
			{/* Dekorasi Background ala Neobrutalism */}
			<div className='absolute top-10 left-10 w-24 h-24 bg-yellow-400 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce' />
			<div className='absolute bottom-20 right-10 w-32 h-32 bg-[#FF90E8] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-12' />
			<Sparkles
				size={48}
				className='absolute top-20 right-32 text-black rotate-12'
			/>

			{/* HERO SECTION */}
			<div className='flex items-center justify-center min-h-screen px-6'>
				<div className='card-neo max-w-3xl w-full flex flex-col items-center text-center space-y-8 bg-white z-10'>
					{/* Logo Icon */}
					<div className='w-32 h-32 bg-[#FF90E8] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center rotate-[-5deg] mb-4'>
						<Camera size={64} className='text-black' />
					</div>

					<div className='space-y-4'>
						<h1 className='text-5xl md:text-7xl font-black uppercase tracking-tight bg-yellow-300 inline-block px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2'>
							SNAP! BOOTH
						</h1>
						<p className='text-xl md:text-2xl font-bold border-b-4 border-black pb-2 mt-6'>
							Photobooth Web-App Modern & Praktis.
						</p>
						<p className='text-gray-700 font-medium'>
							Abadikan momen, pilih frame premium, dan cetak langsung atau kirim ke
							emailmu!
						</p>
					</div>

					{/* Tombol CTA */}
					<Link
						href='/login'
						className='btn-neo bg-green-400 text-2xl px-12 py-4 mt-8 flex items-center gap-3 group'>
						MULAI FOTO SEKARANG
						<span className='group-hover:translate-x-2 transition-transform'>➔</span>
					</Link>
				</div>
			</div>

			{/* 4 LANGKAH MUDAH SECTION */}
			<div className='px-6 py-16'>
				<div className='max-w-5xl mx-auto space-y-12 my-12'>
					{/* Title Section */}
					<div className='relative'>
						{/* Left Icon - Disk/Divider */}
						<div className='absolute -left-8 -top-8 w-20 h-20 rounded-full flex items-center justify-center z-10'>
							<Image
								src='/assets/icons/cassette.png'
								alt='cassette icon'
								width={64}
								height={64}
								className='object-contain'
							/>
						</div>

						{/* Right Icon - Cassette */}
						<div className='absolute -right-8 -bottom-8 w-20 h-20 rounded-full flex items-center justify-center z-10'>
							<Image
								src='/assets/icons/header-divider.png'
								alt='header divider icon'
								width={64}
								height={64}
								className='object-contain'
							/>
						</div>

						<div className='bg-lime-400 border-4 border-black rounded-3xl px-8 py-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
							<h2 className='text-3xl md:text-4xl font-black uppercase tracking-wide text-center'>
								FOTO DENGAN 4 LANGKAH MUDAH
							</h2>
						</div>
					</div>

					{/* 4 Options Buttons */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
						<button className='btn-neo bg-yellow-300 text-2xl font-extrabold py-4 hover:scale-105 transition-transform'>
							Top Up!
						</button>
						<button className='btn-neo bg-[#FF90E8] text-2xl font-extrabold py-4 hover:scale-105 transition-transform'>
							Pilih frame
						</button>
						<button className='btn-neo bg-blue-300 text-2xl font-extrabold py-4 hover:scale-105 transition-transform'>
							Cekrek!
						</button>
						<button className='btn-neo bg-green-400 text-2xl font-extrabold py-4 hover:scale-105 transition-transform'>
							Cetak!
						</button>
					</div>

					{/* Process Flow */}
					<div className='mt-12'>
						<div className='flex flex-wrap items-center justify-between gap-1 md:gap-4'>
							{/* Step 1 - Payment */}
							<div className='flex-1 max-w-[150px]'>
								<div className='bg-yellow-300 border-4 border-black rounded-3xl p-6 shadow-[7px_11px_0px_rgba(0,0,0,1)] flex items-center justify-center aspect-square hover:scale-105 transition-transform'>
									<Image
										src='/assets/icons/top-up.png'
										alt='Top Up'
										width={80}
										height={80}
										className='object-contain'
									/>
								</div>
							</div>

							{/* Arrow */}
							<div className='hidden md:flex items-center justify-center flex-shrink-0'>
								<Image
									src='/assets/icons/arrow.png'
									alt='Next step'
									width={48}
									height={48}
									className='object-contain'
								/>
							</div>

							{/* Step 2 - Frames */}
							<div className='flex-1 max-w-[150px]'>
								<div className='bg-[#AB3DDE] border-4 border-black rounded-3xl p-6 shadow-[7px_11px_0px_rgba(0,0,0,1)] flex items-center justify-center aspect-square hover:scale-105 transition-transform'>
									<Image
										src='/assets/icons/frame.png'
										alt='Pilih Frame'
										width={80}
										height={80}
										className='object-contain'
									/>
								</div>
							</div>

							{/* Arrow */}
							<div className='hidden md:flex items-center justify-center flex-shrink-0'>
								<Image
									src='/assets/icons/arrow.png'
									alt='Next step'
									width={48}
									height={48}
									className='object-contain'
								/>
							</div>

							{/* Step 3 - Camera */}
							<div className='flex-1 max-w-[150px]'>
								<div className='bg-[#72ACC7] border-4 border-black rounded-3xl p-6 shadow-[7px_11px_0px_rgba(0,0,0,1)] flex items-center justify-center aspect-square hover:scale-105 transition-transform'>
									<Image
										src='/assets/icons/camera.png'
										alt='Cekrek'
										width={80}
										height={80}
										className='object-contain'
									/>
								</div>
							</div>

							{/* Arrow */}
							<div className='hidden md:flex items-center justify-center flex-shrink-0'>
								<Image
									src='/assets/icons/arrow.png'
									alt='Next step'
									width={48}
									height={48}
									className='object-contain'
								/>
							</div>

							{/* Step 4 - Print */}
							<div className='flex-1 max-w-[150px]'>
								<div className='bg-[#4ADE80] border-4 border-black rounded-3xl p-6 shadow-[7px_11px_0px_rgba(0,0,0,1)] flex items-center justify-center aspect-square hover:scale-105 transition-transform'>
									<Image
										src='/assets/icons/printer.png'
										alt='Cetak'
										width={80}
										height={80}
										className='object-contain'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* GALLERY SHOWCASE SECTION */}
			<div className='px-6 pb-20'>
				{/* Collection Section */}
				<div
					className='bg-green-400 border-4 border-black rounded-3xl px-8 py-12 mb-20 shadow-[7px_11px_0px_rgba(0,0,0,1)] text-center'
					style={{ transform: "matrix(1, 0.01, -0.01, 1, 0, 0)" }}>
					<h3 className='text-3xl md:text-4xl font-black uppercase tracking-wide'>
						Lihat koleksi foto keren ini!
					</h3>
				</div>
				<div className='max-w-7xl mx-auto'>
					<div className='relative'>
						{/* Rainbow decoration - Neo Boohoo */}
						<div className='absolute -top-32 -right-16 md:-right-12 z-20 w-40 h-40 md:w-64 md:h-64'>
							<Image
								src='/assets/decorations/neo-booth.png'
								alt='Neo Boohoo decoration'
								width={280}
								height={280}
								className='object-contain w-full h-full'
							/>
						</div>

						{/* Gallery Container */}
						<div
							className='bg-yellow-400 border-4 border-black rounded-3xl p-8 md:p-12 shadow-[7px_11px_0px_rgba(0,0,0,1)] relative overflow-hidden'
							style={{ transform: "matrix(1, 0.01, -0.01, 1, 0, 0)" }}>
							{/* Decorative stars on the left */}
							<div className='absolute left-6 top-1/2 transform -translate-y-1/2 space-y-6 hidden md:flex flex-col'>
								<Image
									src='/assets/icons/star.png'
									alt='Star decoration'
									width={60}
									height={60}
									className='object-contain'
								/>
								<Image
									src='/assets/icons/star.png'
									alt='Star decoration'
									width={60}
									height={60}
									className='object-contain'
								/>
								<Image
									src='/assets/icons/star.png'
									alt='Star decoration'
									width={60}
									height={60}
									className='object-contain'
								/>
							</div>

							{/* Frame Templates Grid with rotations */}
							<div className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4'>
								{/* Frame 1 - WILD (rotate -9.36deg) */}
								<div
									className='flex-shrink-0 w-40 h-auto'
									style={{ transform: "rotate(-9.36deg)" }}>
									<Image
										src='/assets/frames/wild-frame.png'
										alt='WILD Frame'
										width={178}
										height={534}
										className='object-contain'
									/>
								</div>

								{/* Frame 2 - DISCO (rotate -5.58deg) */}
								<div
									className='flex-shrink-0 w-40 h-auto'
									style={{ transform: "rotate(8.19deg)" }}>
									<Image
										src='/assets/frames/disco-frame.png'
										alt='DISCO Frame'
										width={178}
										height={534}
										className='object-contain'
									/>
								</div>

								{/* Frame 3 - WILD (rotate 4.61deg) */}
								<div
									className='flex-shrink-0 w-40 h-auto'
									style={{ transform: "rotate(-5.58deg)" }}>
									<Image
										src='/assets/frames/disco-frame.png'
										alt='WILD Frame'
										width={178}
										height={534}
										className='object-contain'
									/>
								</div>

								{/* Frame 4 - WILD (rotate 8.19deg) */}
								<div
									className='flex-shrink-0 w-40 h-auto'
									style={{ transform: "rotate(4.61deg)" }}>
									<Image
										src='/assets/frames/wild-frame.png'
										alt='WILD Frame'
										width={178}
										height={534}
										className='object-contain'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
