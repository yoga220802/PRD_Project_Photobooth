# 📸 SNAP! BOOTH - Web Photobooth App

Aplikasi Web Photobooth modern dengan antarmuka **Neobrutalism**, dibangun untuk memberikan pengalaman photobooth profesional langsung dari browser. Pengguna dapat mengambil foto, menerapkan filter, melakukan pembayaran untuk *frame* premium, dan menerima hasil cetak/digital.

## Tech Stack

- **Frontend:** Next.js 14.2.35 (App Router), React, Tailwind CSS, Lucide React
- **Backend/BaaS:** Supabase (PostgreSQL, Auth, Storage)
- **Payment Gateway:** Midtrans (Snap API)
- **Email Service:** Resend API
- **Kamera:** React Webcam & HTML5 Canvas API

## Fitur yang Sudah Selesai (Fase 1)

- [x] Inisialisasi proyek Next.js & konfigurasi Tailwind CSS (Neobrutalism UI).
- [x] Landing Page interaktif dan responsif.
- [x] Konfigurasi Supabase Client (`@supabase/ssr`).
- [x] Skema Database (Tabel `profiles`, `frames`) beserta fungsi Trigger otomatis untuk user baru (Bonus 10 Koin).
- [x] Autentikasi Wajib via **Google OAuth**.
- [x] API Routes dasar untuk Midtrans (Top-up) dan Resend (Email pengiriman hasil foto).
- [x] *Drafting* komponen Studio Kamera dengan fitur integrasi *Webcam* dan *Canvas Merging* (Filter Retro/Sepia).

## Cara Menjalankan di Lokal (Development)

1. Clone repository ini:
   ```bash
   git clone [https://github.com/yoga220802/PRD_Project_Photobooth.git](https://github.com/yoga220802/PRD_Project_Photobooth.git)