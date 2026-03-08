# Photobooth Web App

Aplikasi photobooth berbasis web modern dengan gaya **Neobrutalism UI**. Memungkinkan pengguna mengambil foto dengan frame eksklusif, melakukan pembayaran digital via Midtrans, dan menerima hasil foto secara instan melalui email.

---



## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend/Database**: Supabase (Auth, Database, Storage)
- **Payment**: Midtrans Snap
- **Email**: Resend API
- **Camera**: `react-webcam`
- **UI Components**: Lucide React & Custom Neobrutalism Components

---

## Fitur Unggulan

### 1. Autentikasi & Keamanan
- Login, Register, & OAuth Callback.
- Reset password dengan verifikasi email.
- **Update:** Logic ubah kata sandi baru (`/resetpassword/changepassword`) dengan notifikasi sukses dan auto-redirect ke login.
- *Protected Dashboard Routes*.

### 2. Camera Studio & Core Engine
- Live camera preview menggunakan `react-webcam`.
- Pilihan 4 frame foto eksklusif dengan sistem overlay.
- Capture & Download hasil foto secara instan.

### 3. Sistem UI/UX & Feedback (Neobrutalism Style)
- **Global Loading Skeleton (`loading.tsx`)**: Animasi spinner Neobrutalism saat perpindahan rute.
- **Loading Screen Component**: Komponen `LoadingScreen.tsx` untuk proses asinkronus (misal: saat memproses foto).
- **Toast & Alert System**: Provider global untuk notifikasi *Success, Info, Error,* dan *Warning*.
- **Custom Error Handling**: Halaman 404 (Not Found) dan Global Error Boundary dengan desain estetik.

### 4. Integrasi Layanan Eksternal
- **Payment**: Integrasi Midtrans untuk generate Snap token.
- **Email Service**: Kirim hasil foto otomatis via Resend API.

---

## Setup & Instalasi

1. **Clone Repository**
   ```bash
   git clone [https://github.com/yoga220802/PRD_Project_Photobooth.git](https://github.com/yoga220802/PRD_Project_Photobooth.git)
   cd PRD_Project_Photobooth

```

2. **Install Dependencies**
```bash
npm install

```


3. **Konfigurasi Environment Variables**
Buat file `.env.local` di root folder:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
RESEND_API_KEY=your_resend_api_key

```


4. **Running Application**
```bash
npm run dev

```


Akses di: `http://localhost:3000`

---

## Struktur Proyek

```text
src/
├── app/
│   ├── api/                # API Endpoints (Payment & Email)
│   ├── auth/               # Auth Handlers
│   ├── dashboard/          # User Dashboard
│   ├── test-loading/       # Dev Preview Page (Untuk testing UI components)
│   ├── error.tsx           # Global Error Boundary
│   ├── loading.tsx         # Global Loading Skeleton
│   └── not-found.tsx       # Custom 404 Page
├── components/
│   ├── CameraStudio.tsx    # Core Camera Logic
│   ├── LoadingScreen.tsx   # Manual Loading Component
│   ├── Toast.tsx           # Toast Provider & Hooks
│   └── notifikasi/         # UI Notifikasi lainnya
├── utils/
│   └── supabase/           # Supabase Client Config
└── public/
    └── images/             # Frame assets (1.png s/d 4.png)

```

---

## Panduan Pengembang (Docs)

### Menggunakan Toast Notifikasi

```tsx
import { useToast } from '@/components/Toast';

const { showToast } = useToast();
showToast('Foto berhasil dikirim!', 'success');

```

### Menggunakan Loading Screen

```tsx
import LoadingScreen from '@/components/LoadingScreen';

{ isLoading && <LoadingScreen /> }

```

### Halaman Testing

Gunakan route `/test-loading` untuk melihat preview semua komponen UI (Error, Loading, Toast) dalam satu tempat sebelum diimplementasikan ke fitur baru.



## 🚀 Update Terkini (28 Februari) - (Fajrin)

### Dashboard Refinements
- **Mekanisme Navigasi Profil:** Menautkan tombol *"Profil Kamu"* untuk *routing* langsung menuju halaman `/editprofile`.
- **Header & Antarmuka Gaya Baru:** Penyesuaian skema pewarnaan Neo-brutalist untuk tombol utama (*profil, koin, top-up, & logout*), serta perbaikan komposisi tata letak header ("Hai, Iswara!") berikut aksen miring yang mencolok.
- **Sistem Frame Diperluas:** 
  - Penambahan menu interaktif filter tab berdasarkan kategori (Semua, Clasico, Cute, Estetik).
  - Peningkatan proporsi layout pratinjau "Frame pilihan kamu" agar selaras dengan gambar poster foto yang vertikal memanjang.
  - Tampilan daftar frame yang mendukung *custom scrollbar*.
- **Sistem Pembelian Cerdas:** Implementasi pop-up *(modal dialog buy frame)* bergaya Neo-brutalist untuk meminta konfirmasi sebelum koin berkurang.
- **Riwayat Saldo Interaktif:** Menghadirkan miniatur *tooltip dropdown* yang muncul saat jumlah *"coins"* ditekan, menunjukkan riwayat *"Terakhir top up"*.

### Edit Profil & Bug Fixes
- **TypeScript Integration:** Pembenahan properti *types interface* (`NeoFolderInputProps`) untuk menghilangkan galat merah (implicitly `any`) pada *props* input komponen.
- **Konfirmasi Log-out Pintar:** Logika khusus ditambahkan pada tombol *Keluar* melalui konfirmasi modal bertuliskan *"Yakin mau cabut?"* yang menyinkronkan rute kembali ke `/login`.
- **Navigasi Fleksibel:** Tombol *back* berhasil diarahkan secara fungsional ke dalam `dashboard`.