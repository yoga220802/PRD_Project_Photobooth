'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

interface CoinPackage {
  id: number;
  coins: number;
  price: number;
  badge?: string;
  badgeColor?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  price: number;
  badge?: string;
}

interface ToastState {
  show: boolean;
  message: string;
}

export default function TopUpPage() {
  const router = useRouter();
  const [userCoins] = useState(100);
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const coinPackages: CoinPackage[] = [
    { id: 1, coins: 10, price: 10000, badge: 'POPULER', badgeColor: 'bg-[#C4BFC1]' },
    { id: 2, coins: 30, price: 30000 },
    { id: 3, coins: 50, price: 47500, badge: 'HEMAT 5%', badgeColor: 'bg-[#C4BFC1]' },
    { id: 4, coins: 120, price: 108000 },
  ];

  const recommendedPayments: PaymentMethod[] = [
    { id: 'mandiri', name: 'Mandiri VA', logo: '/gambar/mandiri.png', price: 0 },
    { id: 'qris', name: 'QRIS', logo: '/gambar/QRIS.png', price: 0, badge: 'TERMURAH' },
    { id: 'gopay', name: 'Gopay', logo: '/gambar/GOPAY.png', price: 0 },
    { id: 'shopeepay', name: 'ShopeePay', logo: '/gambar/shoppepay.png', price: 0 },
  ];

  const ewalletPayments: PaymentMethod[] = [
    { id: 'dana', name: 'DANA', logo: '/gambar/DANA.png', price: 0 },
    { id: 'ovo', name: 'OVO', logo: '/gambar/OVO.png', price: 0 },
  ];

  const handlePayment = async () => {
    if (!selectedPackage && !selectedPayment) {
      showToast('Pilih paket koin dan metode pembayaran terlebih dahulu');
      return;
    }
    if (!selectedPackage) {
      showToast('Pilih paket koin terlebih dahulu');
      return;
    }
    if (!selectedPayment) {
      showToast('Pilih metode pembayaran terlebih dahulu');
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(true);
    }, 3000);
  };

  const handleClosePayment = () => {
    setShowPaymentModal(false);
    setSelectedPackage(null);
    setSelectedPayment(null);
  };

  const totalPrice = selectedPackage ? selectedPackage.price + (selectedPayment?.price || 0) : 0;

  return (
    <>
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <div className="bg-[#EF476F] border-4 border-black rounded-2xl px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 min-w-[320px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2.5"/>
              <path d="M12 8V12M12 16H12.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="text-white font-black text-base">{toast.message}</span>
          </div>
        </div>
      )}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black rounded-3xl p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
            <div className="relative">
              <svg 
                className="animate-spin" 
                width="80" 
                height="80" 
                viewBox="0 0 120 120" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  stroke="#E5E5E5" 
                  strokeWidth="8"
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  stroke="#FF9500" 
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset="78.5"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-black mt-6 mb-2">MEMPROSES...</h2>
            <p className="text-lg text-gray-500 font-semibold">Jangan Tutup Halaman Ini ya!</p>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFD166] border-4 border-black rounded-3xl w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <button
              onClick={handleClosePayment}
              className="absolute -top-3 -right-3 bg-white border-4 border-black rounded-xl p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="p-8">
              <h2 className="text-3xl font-black text-center mb-2">Menunggu Pembayaran</h2>
              <p className="text-center text-gray-700 font-semibold mb-6">Selesaikan Pembayaranmu Di Bawah Ini.</p>

              <div className="bg-white border-4 border-black rounded-2xl p-6 mb-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-4 border-4 border-black rounded-xl">
                    <QRCodeSVG 
                      value={`PAYMENT:${selectedPayment?.id}:${totalPrice}:${Date.now()}`}
                      size={200}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>

                <div className="border-t-4 border-dashed border-gray-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-bold text-lg">Total Tagihan :</span>
                    <span className="text-3xl font-black">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClosePayment}
                className="w-full bg-white border-4 border-black rounded-2xl py-4 font-black text-xl uppercase transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]"
              >
                BATALKAN / NANTI SAJA
              </button>
            </div>
          </div>
        </div>
      )}

      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#C8F5D8] border-4 border-black rounded-3xl w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <button
              onClick={() => {
                setShowVerificationModal(false);
                setSelectedPackage(null);
                setSelectedPayment(null);
              }}
              className="absolute top-4 right-4 bg-white border-4 border-black rounded p-2 hover:translate-y-[-2px] transition-all z-10 w-10 h-10 flex items-center justify-center"
              style={{ boxShadow: '2px 4px 4px #000000' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isVerifying ? (
              <div className="p-12 flex flex-col items-center">
                <div className="relative mb-6">
                  <svg 
                    className="animate-spin" 
                    width="120" 
                    height="120" 
                    viewBox="0 0 120 120" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      stroke="#E5E5E5" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      stroke="#06D6A0" 
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="314"
                      strokeDashoffset="78.5"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl font-black mb-3 text-center">VERIFIKASI...</h2>
                <p className="text-xl text-gray-500 font-semibold text-center">Mengecek Pembayaranmu!</p>
              </div>
            ) : (
              <>
                <div className="bg-[#C8F5D8] pt-16 pb-8 px-8 flex flex-col items-center">
                  <div className="mb-6 flex items-center justify-center">
                    <Image
                      src="/icon/icon1.png"
                      alt="Success Icon"
                      width={120}
                      height={120}
                      className="w-[120px] h-[120px] object-contain"
                    />
                  </div>
                  <h2 className="text-4xl font-black mb-3 text-center">Berhasil Dipesan!</h2>
                  <p className="text-lg text-gray-700 font-semibold text-center">
                    Koin Sudah Masuk Ke Dompetmu.
                  </p>
                </div>
                
                <div className="bg-white px-8 py-6">
                  <button
                    onClick={() => {
                      setShowVerificationModal(false);
                      setSelectedPackage(null);
                      setSelectedPayment(null);
                    }}
                    className="w-full bg-[#FF9500] border-4 border-black rounded-2xl py-4 font-black text-xl uppercase transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]"
                  >
                    BATALKAN / NANTI SAJA
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-purple-200 pb-8">
        <header className="bg-white border-b-4 border-black p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="bg-orange-400 hover:bg-orange-500 border-4 border-black rounded-lg px-4 py-2 font-bold text-2xl transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                &lt;
              </button>
              <h1 className="text-2xl font-extrabold uppercase">TOP UP HUB</h1>
            </div>
            <div className="bg-black border-4 border-[#FF9F1C] rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35.0121 5.00751C39.5871 5.00533 44.0244 6.57168 47.5842 9.44532C51.144 12.319 53.611 16.3262 54.5738 20.7987C55.5365 25.2712 54.9369 29.9385 52.8747 34.0224C50.8126 38.1062 47.4127 41.3596 43.2421 43.24C41.909 46.1873 39.8809 48.7672 37.3318 50.7586C34.7826 52.7499 31.7885 54.0933 28.6062 54.6734C25.4239 55.2535 22.1484 55.053 19.0605 54.0892C15.9727 53.1254 13.1647 51.427 10.8774 49.1397C8.59008 46.8524 6.8917 44.0444 5.92791 40.9566C4.96411 37.8688 4.76367 34.5932 5.34377 31.4109C5.92386 28.2286 7.26719 25.2345 9.25855 22.6854C11.2499 20.1362 13.8298 18.1081 16.7771 16.775C18.3617 13.2667 20.9251 10.2902 24.1597 8.20283C27.3943 6.11548 31.1625 5.00598 35.0121 5.00751ZM27.5121 22.5075H22.5121V25.0075C20.8874 25.0036 19.325 25.6324 18.1561 26.7609C16.9872 27.8893 16.3036 29.4286 16.2503 31.0524C16.197 32.6762 16.7781 34.257 17.8705 35.4597C18.9629 36.6624 20.4806 37.3924 22.1021 37.495L22.5121 37.5075H27.5121L27.7371 37.5275C28.0253 37.5797 28.2861 37.7314 28.4738 37.9562C28.6616 38.181 28.7644 38.4646 28.7644 38.7575C28.7644 39.0504 28.6616 39.334 28.4738 39.5588C28.2861 39.7836 28.0253 39.9353 27.7371 39.9875L27.5121 40.0075H17.5121V45.0075H22.5121V47.5075H27.5121V45.0075C29.1368 45.0115 30.6992 44.3826 31.8682 43.2542C33.0371 42.1257 33.7206 40.5865 33.774 38.9626C33.8273 37.3388 33.2462 35.758 32.1538 34.5553C31.0614 33.3527 29.5436 32.6226 27.9221 32.52L27.5121 32.5075H22.5121L22.2871 32.4875C21.9989 32.4353 21.7382 32.2836 21.5504 32.0588C21.3627 31.834 21.2598 31.5504 21.2598 31.2575C21.2598 30.9646 21.3627 30.681 21.5504 30.4562C21.7382 30.2314 21.9989 30.0797 22.2871 30.0275L22.5121 30.0075H32.5121V25.0075H27.5121V22.5075ZM35.0121 10.0075C32.8938 10.0071 30.7994 10.4553 28.8668 11.3227C26.9342 12.1901 25.2072 13.457 23.7996 15.04C26.6253 14.8685 29.4552 15.2987 32.1021 16.3024C34.7491 17.306 37.1529 18.8601 39.1545 20.862C41.1561 22.8638 42.7099 25.2677 43.7132 27.9148C44.7165 30.5619 45.1465 33.3919 44.9746 36.2175C47.2477 34.1966 48.8526 31.5324 49.5767 28.5783C50.3007 25.6242 50.1096 22.5198 49.0287 19.6768C47.9478 16.8338 46.0282 14.3866 43.5245 12.6597C41.0207 10.9328 38.0511 10.0079 35.0096 10.0075" fill="#FF9F1C" />
              </svg>
              <span className="font-black text-white">{userCoins}</span>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto mt-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-extrabold uppercase">PILIH PAKET KOIN</h2>
                </div>
                <div className="border-t-4 border-black mb-6"></div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {coinPackages.map((pkg) => (
                    <div key={pkg.id} className="relative">
                      {pkg.badge && (
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 z-10 ${pkg.badgeColor} border-4 border-black px-4 py-2 text-xs font-bold rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-3 whitespace-nowrap text-white`}>
                          {pkg.badge}
                        </div>
                      )}
                      <div
                        onClick={() => setSelectedPackage(pkg)}
                        className={`relative border-4 border-black rounded-3xl px-4 py-8 cursor-pointer transition-all hover:translate-y-[-4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-[250px] flex flex-col justify-center max-w-[140px] mx-auto ${
                          selectedPackage?.id === pkg.id ? 'bg-[#E0FBFC]' : 'bg-white'
                        }`}
                      >
                        {selectedPackage?.id === pkg.id && (
                          <div className="absolute bottom-3 right-3">
                            <Image
                              src="/icon/icon2.png"
                              alt="Selected"
                              width={28}
                              height={28}
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                        )}
                        <div className="flex flex-col items-center gap-3 mt-2">
                          <svg width="56" height="56" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.0121 5.00751C39.5871 5.00533 44.0244 6.57168 47.5842 9.44532C51.144 12.319 53.611 16.3262 54.5738 20.7987C55.5365 25.2712 54.9369 29.9385 52.8747 34.0224C50.8126 38.1062 47.4127 41.3596 43.2421 43.24C41.909 46.1873 39.8809 48.7672 37.3318 50.7586C34.7826 52.7499 31.7885 54.0933 28.6062 54.6734C25.4239 55.2535 22.1484 55.053 19.0605 54.0892C15.9727 53.1254 13.1647 51.427 10.8774 49.1397C8.59008 46.8524 6.8917 44.0444 5.92791 40.9566C4.96411 37.8688 4.76367 34.5932 5.34377 31.4109C5.92386 28.2286 7.26719 25.2345 9.25855 22.6854C11.2499 20.1362 13.8298 18.1081 16.7771 16.775C18.3617 13.2667 20.9251 10.2902 24.1597 8.20283C27.3943 6.11548 31.1625 5.00598 35.0121 5.00751ZM27.5121 22.5075H22.5121V25.0075C20.8874 25.0036 19.325 25.6324 18.1561 26.7609C16.9872 27.8893 16.3036 29.4286 16.2503 31.0524C16.197 32.6762 16.7781 34.257 17.8705 35.4597C18.9629 36.6624 20.4806 37.3924 22.1021 37.495L22.5121 37.5075H27.5121L27.7371 37.5275C28.0253 37.5797 28.2861 37.7314 28.4738 37.9562C28.6616 38.181 28.7644 38.4646 28.7644 38.7575C28.7644 39.0504 28.6616 39.334 28.4738 39.5588C28.2861 39.7836 28.0253 39.9353 27.7371 39.9875L27.5121 40.0075H17.5121V45.0075H22.5121V47.5075H27.5121V45.0075C29.1368 45.0115 30.6992 44.3826 31.8682 43.2542C33.0371 42.1257 33.7206 40.5865 33.774 38.9626C33.8273 37.3388 33.2462 35.758 32.1538 34.5553C31.0614 33.3527 29.5436 32.6226 27.9221 32.52L27.5121 32.5075H22.5121L22.2871 32.4875C21.9989 32.4353 21.7382 32.2836 21.5504 32.0588C21.3627 31.834 21.2598 31.5504 21.2598 31.2575C21.2598 30.9646 21.3627 30.681 21.5504 30.4562C21.7382 30.2314 21.9989 30.0797 22.2871 30.0275L22.5121 30.0075H32.5121V25.0075H27.5121V22.5075ZM35.0121 10.0075C32.8938 10.0071 30.7994 10.4553 28.8668 11.3227C26.9342 12.1901 25.2072 13.457 23.7996 15.04C26.6253 14.8685 29.4552 15.2987 32.1021 16.3024C34.7491 17.306 37.1529 18.8601 39.1545 20.862C41.1561 22.8638 42.7099 25.2677 43.7132 27.9148C44.7165 30.5619 45.1465 33.3919 44.9746 36.2175C47.2477 34.1966 48.8526 31.5324 49.5767 28.5783C50.3007 25.6242 50.1096 22.5198 49.0287 19.6768C47.9478 16.8338 46.0282 14.3866 43.5245 12.6597C41.0207 10.9328 38.0511 10.0079 35.0096 10.0075" fill="#F4B266" />
                          </svg>
                          <p className="text-3xl font-extrabold">{pkg.coins}</p>
                          <p className="text-sm text-gray-600 font-semibold">Rp {pkg.price.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-extrabold uppercase">METODE PEMBAYARAN</h2>
                </div>
                <div className="border-t-4 border-black mb-6"></div>

                <h3 className="font-bold mb-3">Rekomendasi Metode Bayar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {recommendedPayments.map((payment) => (
                    <div
                      key={payment.id}
                      onClick={() => setSelectedPayment(payment)}
                      className={`relative border-4 border-black rounded-xl p-4 cursor-pointer transition-all hover:translate-y-[-2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        selectedPayment?.id === payment.id ? 'bg-[#E0FBFC]' : 'bg-white'
                      }`}
                    >
                      {payment.badge && (
                        <div className="absolute -top-12 -right-3 bg-[#EF476F] border-4 border-black rounded-2xl px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 transform -rotate-3">
                          <span className="text-white font-extrabold text-sm tracking-wider">{payment.badge}</span>
                        </div>
                      )}
                      {selectedPayment?.id === payment.id && (
                        <div className="absolute -top-3 -left-3 z-20">
                          <img 
                            src="/icon/icon3.png" 
                            alt="Selected" 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 flex items-center justify-center">
                            <Image
                              src={payment.logo}
                              alt={payment.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="font-bold text-[#848484]">{payment.name}</span>
                        </div>
                        <div className="bg-gray-100 border-2 border-black rounded-lg px-4 py-2 min-w-[120px] text-center">
                          <span className="font-bold text-black">
                            {selectedPackage ? `Rp ${(selectedPackage.price + payment.price).toLocaleString('id-ID')}` : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold mb-3">E - Wallet & QRIS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ewalletPayments.map((payment) => (
                    <div
                      key={payment.id}
                      onClick={() => setSelectedPayment(payment)}
                      className={`relative border-4 border-black rounded-xl p-4 cursor-pointer transition-all hover:translate-y-[-2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        selectedPayment?.id === payment.id ? 'bg-[#E0FBFC]' : 'bg-white'
                      }`}
                    >
                      {selectedPayment?.id === payment.id && (
                        <div className="absolute -top-3 -left-3 z-20">
                          <Image
                            src="/icon/icon3.png"
                            alt="Selected"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 flex items-center justify-center">
                            <Image
                              src={payment.logo}
                              alt={payment.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="font-bold text-[#848484]">{payment.name}</span>
                        </div>
                        <div className="bg-gray-100 border-2 border-black rounded-lg px-4 py-2 min-w-[120px] text-center">
                          <span className="font-bold text-black">
                            {selectedPackage ? `Rp ${(selectedPackage.price + payment.price).toLocaleString('id-ID')}` : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#FFD166] border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-4">
                <div className="flex items-center gap-2 mb-4">
                  <Image src="/gambar/icon.png" alt="Icon" width={24} height={24} className="w-6 h-6" />
                  <h2 className="text-xl font-extrabold uppercase">RINCIAN BAYAR</h2>
                </div>

                <div className="bg-gray-100 border-4 border-black rounded-xl p-4 space-y-3 mb-6 pb-8">
                  <div className="flex justify-between items-center pb-3 border-b-4 border-dashed border-gray-400">
                    <span className="font-bold" style={{ color: '#6B6B6B' }}>Paket</span>
                    <span>{selectedPackage ? `${selectedPackage.coins} Koin` : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b-4 border-dashed border-gray-400">
                    <span className="font-bold" style={{ color: '#6B6B6B' }}>Metode Pembayaran</span>
                    <span className="text-sm">{selectedPayment ? selectedPayment.name : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 pb-4">
                    <span className="font-black text-2xl" style={{ color: '#6B6B6B' }}>TOTAL BAYAR</span>
                    <span className="font-black text-3xl whitespace-nowrap">
                      {totalPrice > 0 ? `Rp ${totalPrice.toLocaleString('id-ID')}` : '-'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full border-[6px] border-black rounded-[32px] py-6 font-black text-2xl uppercase transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] cursor-pointer"
                  style={{ 
                    backgroundColor: '#06D6A0', 
                    color: '#000000'
                  }}
                >
                  BAYAR →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
