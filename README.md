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
   ```

---

## Log Pembaruan & Dokumentasi Khusus (by Fajrin)

Berikut adalah catatan *update* fungsional dari penyesuaian terbaru (Fajrin):

### 1. Komponen Layar Loading (`LoadingScreen.tsx`)
Komponen visual *loading* baru bergaya *Neobrutalism UI* yang menampilkan indikator progres. Ideal digunakan menutupi layar ketika foto sedang diproses atau saat integrasi sistem.
- **Lokasi File:** `src/components/LoadingScreen.tsx`
- **Cara Penggunaan Komponen:**
  ```tsx
  import LoadingScreen from '@/components/LoadingScreen';

  export default function MyPage() {
      // Gunakan saat state "isLoading" bernilai true
      return <LoadingScreen />;
  }
  ```

### 2. Logic Ubah Kata Sandi (`/resetpassword/changepassword`)
Penambahan alur sistem di form *ubah password*:
- Ditambahkan *state* respons: Apabila password berhasil diperbarui, sistem tidak lagi diam.
- **Notifikasi Baru:** Memunculkan secara otomatis komponen desain notifikasi *pop-up* (`UbahPasswordNotification`).
- **Redirect Mulus:** Setelah *user* menekan klik "OK" pada *pop-up* peringatan sukses tersebut, ia akan digiring (di-*redirect*) langsung ke rute `/login`.

### 3. Error State / Not Found Page (`not-found.tsx`)
Halaman gawat darurat berskala *global root* untuk menangani URL/direktori hilang (*404 Not Found*). Dilengkapi tata letak, ornamen jejak kaki, dan bingkai gambar bertema *Neobrutalism* khas Photobooth.
- **Lokasi File:** `src/app/not-found.tsx`
- **Otomatis Aktif:** Hal ini tidak perlu diimpor, karena sistem Next.js App Router akan mengalihkan *user* ke sini tiap kali mereka mengakses tautan yang tak tersedia.

### 4. Global Error Boundary (`error.tsx`)
Halaman error bawaan (App Router) berskala global dengan desain Neobrutalism. Tampil secara otomatis jika ada aplikasi yang crash. Dilengkapi tombol untuk *reset* dan mencobanya kembali.
- **Lokasi File:** `src/app/error.tsx`

### 5. Global Loading Skeleton (`loading.tsx`)
Layar kerangka pemuatan global (*Loading Skeleton*) yang mencegah layar aplikasi terasa kosong melompong putih ketika sistem tengah berpindah memuat rute dan modul berat. Dilengkapi dengan animasi *spinner spinning* desain pinggiran tabel Neobrutalism.
- **Lokasi File:** `src/app/loading.tsx`

### 6. Toast & Alert Component System (`Toast.tsx`)
Komponen pop-up Alert dinamis untuk status *Success / Info / Error / Warning* dengan balutan Neobrutalism. Provider ini membungkus struktur paling dasar (`layout.tsx`), sehingga bebas dipanggil di komponen anak manapun via *custom hooks*.
- **Lokasi Provider:** `src/components/Toast.tsx`
- **Cara Penggunaan Komponen:**
  ```tsx
  import { useToast } from '@/components/Toast';

  export default function AnakKomponen() {
      const { showToast } = useToast();

      const panggilToast = () => {
          showToast('Waduh, koneksimu terputus!', 'error'); // Tipe: error, success, info, warning
      }
      return <button onClick={panggilToast}>Klik disini</button>;
  }
  ```

### 7. Halaman Pusat Preview (Tester)
Sebuah halaman rute simulatif yang dibuat secara khusus untuk membantu Developer lain atau tim tester PM/QA mengetes dan melihat (*preview*) secara langsung bentuk komponen Error, Loading, dan Toast di dalam satu sentral kontrol Neobrutalism UI sebelum dipakai ke proyek utama.
- **Lokasi File Utama:** `src/app/test-loading/page.tsx`
- **Cara Akses Tes:** Cukup buka `http://localhost:3000/test-loading` saat *development server* berjalan.
