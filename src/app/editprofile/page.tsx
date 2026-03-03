'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, Pencil, Coins, Sparkles, Star, Camera, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// --- Komponen Custom: Input berbentuk Tab Folder ---
interface NeoFolderInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    bgColor?: string;
    disabled?: boolean;
}

const NeoFolderInput: React.FC<NeoFolderInputProps> = ({ label, value, onChange, type = "text", bgColor = "bg-white", disabled = false }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="relative pt-8 mb-6 drop-shadow-[8px_8px_0_rgba(0,0,0,1)] group hover:drop-shadow-[2px_2px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 w-full z-10">
            <div className={`absolute top-0 left-0 px-5 py-2 border-4 border-black border-b-0 rounded-t-2xl font-black text-sm sm:text-base uppercase ${bgColor} z-20 h-10 flex items-center`}>
                {label}
                <div className={`absolute -bottom-[4px] left-[2px] right-[2px] h-[6px] ${bgColor}`}></div>
            </div>

            <div className="relative z-10">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled || !isEditing}
                    className={`w-full ${bgColor} text-black border-4 border-black rounded-b-2xl rounded-tr-2xl px-5 py-4 sm:py-5 font-black text-lg sm:text-xl focus:outline-none ${disabled || !isEditing ? 'cursor-not-allowed opacity-70' : ''}`}
                />
                {!disabled && (
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 border-4 border-black p-2 rounded-xl transition-all active:scale-90 ${isEditing ? 'bg-[#23D73A] text-black' : 'bg-white hover:bg-black hover:text-white'}`}
                    >
                        <Pencil size={20} strokeWidth={3} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default function App() {
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: 'Iswara',
        email: 'Iswara@gmail.com',
        birthdate: '02-05-2005'
    });

    const confirmLogout = () => {
        router.push('/login');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        setShowSaveModal(true);
        console.log('Saving profile:', formData);
    };

    return (
        <div className="min-h-screen bg-[#F4A261] font-sans flex items-center justify-center p-4 sm:p-8 relative overflow-hidden"
            style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 2px, transparent 2px)',
                backgroundSize: '30px 30px'
            }}>

            <Sparkles className="absolute top-12 left-12 text-white animate-pulse" size={48} strokeWidth={2} />
            <Star className="absolute bottom-16 right-16 text-[#FFD166] animate-[spin_6s_linear_infinite]" size={64} strokeWidth={3} fill="#FFD166" />
            <div className="absolute top-1/3 right-10 w-4 h-4 bg-[#EF476F] rounded-full animate-bounce delay-150 border-2 border-black"></div>
            <div className="absolute bottom-1/3 left-10 w-6 h-6 bg-[#4CC9F0] rounded-full animate-bounce border-2 border-black"></div>

            <div className="bg-[#81D4FA] w-full max-w-5xl border-4 border-black drop-shadow-[16px_16px_0_rgba(0,0,0,1)] rounded-3xl p-6 sm:p-10 relative z-10 flex flex-col">

                <div className="flex items-center gap-4 sm:gap-6 mb-10">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-white border-4 border-black rounded-2xl p-3 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-y-1 hover:drop-shadow-none transition-all active:scale-95">
                        <ChevronLeft size={32} strokeWidth={4} />
                    </button>
                    <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-widest drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
                        style={{ WebkitTextStroke: '2px black' }}>
                        Edit Profil
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

                    <div className="flex flex-col items-center lg:items-stretch gap-6 w-full lg:w-56 shrink-0 z-20">
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white border-4 border-black rounded-3xl w-48 h-48 lg:w-full lg:h-auto lg:aspect-square flex items-center justify-center p-4 drop-shadow-[8px_8px_0_rgba(0,0,0,1)] relative group cursor-pointer hover:-translate-y-2 transition-transform duration-300 overflow-hidden"
                        >
                            {profileImage ? (
                                <div className="relative w-full h-full">
                                    <Image 
                                        src={profileImage}
                                        alt="Profile"
                                        fill
                                        className="object-cover rounded-2xl"
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className="w-24 h-24 bg-[#81D4FA] rounded-full border-4 border-black flex items-center justify-center">
                                        <Camera size={48} className="text-black stroke-[2.5]" />
                                    </div>
                                    <p className="text-sm font-black text-gray-600 text-center">Belum ada foto</p>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-black/60 rounded-[1.3rem] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity gap-2">
                                <Upload className="text-white" size={40} strokeWidth={2.5} />
                                <span className="text-white font-black text-sm">Upload Foto</span>
                            </div>
                        </div>

                        <input 
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                        <button
                            onClick={handleSaveProfile}
                            className="bg-[#23D73A] text-black w-48 lg:w-full font-black text-xl py-4 border-4 border-black rounded-2xl drop-shadow-[6px_6px_0_rgba(0,0,0,1)] hover:bg-[#1DB82F] hover:text-white hover:translate-x-1 hover:translate-y-1 hover:drop-shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all uppercase tracking-widest active:scale-95">
                            Simpan
                        </button>

                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="bg-[#EF476F] text-black w-48 lg:w-full font-black text-xl py-4 border-4 border-black rounded-2xl drop-shadow-[6px_6px_0_rgba(0,0,0,1)] hover:bg-[#D90429] hover:text-white hover:translate-x-1 hover:translate-y-1 hover:drop-shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all uppercase tracking-widest active:scale-95">
                            Keluar
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-start">
                        <NeoFolderInput 
                            label="Nama Kamu" 
                            value={formData.name}
                            onChange={(value) => setFormData({...formData, name: value})}
                            bgColor="bg-white" 
                        />
                        <NeoFolderInput 
                            label="Email Kamu" 
                            value={formData.email}
                            onChange={(value) => setFormData({...formData, email: value})}
                            bgColor="bg-[#E0FBFC]"
                            type="email"
                        />
                        <NeoFolderInput 
                            label="Ultah Kamu" 
                            value={formData.birthdate}
                            onChange={(value) => setFormData({...formData, birthdate: value})}
                            bgColor="bg-[#FFC8DD]"
                            type="date"
                        />
                    </div>

                    <div className="w-full lg:w-[320px] shrink-0 relative mt-8 lg:mt-0 lg:ml-4 z-20">
                        <div className="bg-[#F4D03F] w-full border-4 border-black rounded-3xl p-8 flex flex-col items-center justify-center drop-shadow-[12px_12px_0_rgba(0,0,0,1)] transform lg:rotate-3 hover:rotate-0 transition-transform duration-300 h-full">

                            <div className="absolute -top-6 -right-2 sm:-right-6 bg-white border-4 border-black rounded-full px-4 py-2 font-black flex items-center gap-2 drop-shadow-[6px_6px_0_rgba(0,0,0,1)] transform rotate-6 hover:rotate-12 transition-transform z-30 cursor-default">
                                <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35.0121 5.00751C39.5871 5.00533 44.0244 6.57168 47.5842 9.44532C51.144 12.319 53.611 16.3262 54.5738 20.7987C55.5365 25.2712 54.9369 29.9385 52.8747 34.0224C50.8126 38.1062 47.4127 41.3596 43.2421 43.24C41.909 46.1873 39.8809 48.7672 37.3318 50.7586C34.7826 52.7499 31.7885 54.0933 28.6062 54.6734C25.4239 55.2535 22.1484 55.053 19.0605 54.0892C15.9727 53.1254 13.1647 51.427 10.8774 49.1397C8.59008 46.8524 6.8917 44.0444 5.92791 40.9566C4.96411 37.8688 4.76367 34.5932 5.34377 31.4109C5.92386 28.2286 7.26719 25.2345 9.25855 22.6854C11.2499 20.1362 13.8298 18.1081 16.7771 16.775C18.3617 13.2667 20.9251 10.2902 24.1597 8.20283C27.3943 6.11548 31.1625 5.00598 35.0121 5.00751ZM27.5121 22.5075H22.5121V25.0075C20.8874 25.0036 19.325 25.6324 18.1561 26.7609C16.9872 27.8893 16.3036 29.4286 16.2503 31.0524C16.197 32.6762 16.7781 34.257 17.8705 35.4597C18.9629 36.6624 20.4806 37.3924 22.1021 37.495L22.5121 37.5075H27.5121L27.7371 37.5275C28.0253 37.5797 28.2861 37.7314 28.4738 37.9562C28.6616 38.181 28.7644 38.4646 28.7644 38.7575C28.7644 39.0504 28.6616 39.334 28.4738 39.5588C28.2861 39.7836 28.0253 39.9353 27.7371 39.9875L27.5121 40.0075H17.5121V45.0075H22.5121V47.5075H27.5121V45.0075C29.1368 45.0115 30.6992 44.3826 31.8682 43.2542C33.0371 42.1257 33.7206 40.5865 33.774 38.9626C33.8273 37.3388 33.2462 35.758 32.1538 34.5553C31.0614 33.3527 29.5436 32.6226 27.9221 32.52L27.5121 32.5075H22.5121L22.2871 32.4875C21.9989 32.4353 21.7382 32.2836 21.5504 32.0588C21.3627 31.834 21.2598 31.5504 21.2598 31.2575C21.2598 30.9646 21.3627 30.681 21.5504 30.4562C21.7382 30.2314 21.9989 30.0797 22.2871 30.0275L22.5121 30.0075H32.5121V25.0075H27.5121V22.5075ZM35.0121 10.0075C32.8938 10.0071 30.7994 10.4553 28.8668 11.3227C26.9342 12.1901 25.2072 13.457 23.7996 15.04C26.6253 14.8685 29.4552 15.2987 32.1021 16.3024C34.7491 17.306 37.1529 18.8601 39.1545 20.862C41.1561 22.8638 42.7099 25.2677 43.7132 27.9148C44.7165 30.5619 45.1465 33.3919 44.9746 36.2175C47.2477 34.1966 48.8526 31.5324 49.5767 28.5783C50.3007 25.6242 50.1096 22.5198 49.0287 19.6768C47.9478 16.8338 46.0282 14.3866 43.5245 12.6597C41.0207 10.9328 38.0511 10.0079 35.0096 10.0075" fill="black" />
                                </svg>
                                <span className="text-lg">20 Coins</span>
                            </div>

                            <div className="relative w-40 h-40 mb-10 mt-4">
                                <div className="absolute inset-0 bg-[#FF9F1C] rounded-full border-4 border-black translate-x-4 -translate-y-2"></div>
                                <div className="absolute inset-0 bg-[#FFE66D] rounded-full border-4 border-black flex items-center justify-center z-10 shadow-inner">
                                    <span className="text-7xl font-black text-black">$</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#0277BD] text-white font-black text-2xl py-4 border-4 border-black rounded-2xl drop-shadow-[6px_6px_0_rgba(0,0,0,1)] flex items-center justify-center gap-3 hover:bg-[#01579B] hover:translate-x-1 hover:translate-y-1 hover:drop-shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all active:scale-95 uppercase tracking-widest mt-auto">
                                <Coins size={28} strokeWidth={3} /> Top Up
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-white border-[6px] border-black rounded-[2rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full text-center animate-in fade-in zoom-in duration-200">
                        <h2 className="text-3xl md:text-4xl font-black text-black mb-8">Yakin mau cabut?</h2>

                        <div className="flex justify-center mb-10">
                            <div className="bg-[#FF85EA] border-[6px] border-black rounded-full p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <Camera size={64} className="text-black stroke-[2.5]" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 bg-[#23D73A] border-[4px] border-black py-3 px-6 font-black text-xl text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                                Enggak
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="flex-1 bg-[#D72323] border-[4px] border-black py-3 px-6 font-black text-xl text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                                Iya
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSaveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-white border-[6px] border-black rounded-[2rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full text-center animate-in fade-in zoom-in duration-200">
                        <h2 className="text-3xl md:text-4xl font-black text-black mb-8">Profil berhasil disimpan!</h2>

                        <div className="flex justify-center mb-10">
                            <div className="bg-[#23D73A] border-[6px] border-black rounded-full p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowSaveModal(false)}
                            className="w-full bg-[#23D73A] border-[4px] border-black py-3 px-6 font-black text-xl text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
