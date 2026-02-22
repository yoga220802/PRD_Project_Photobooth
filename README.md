# Photobooth Web App

Aplikasi photobooth berbasis web yang memungkinkan pengguna mengambil foto dengan frame eksklusif, melakukan pembayaran digital, dan menerima hasil foto secara instan.

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend/Database**: Supabase (Auth, Database, Storage)
- **Payment**: Midtrans
- **Email**: Resend API
- **Camera**: react-webcam
- **UI Icons**: lucide-react

## Fitur yang Sudah Dibuat

### Autentikasi
- Login dengan email/password
- Register akun baru
- Reset password (dengan verifikasi email)
- OAuth callback handler
- Protected dashboard route

### Dashboard
- Halaman dashboard untuk user yang sudah login
- Akses ke camera studio

### Camera Studio
- Live camera preview dengan react-webcam
- Pilihan 4 frame foto berbeda
- Capture foto dengan frame overlay
- Download hasil foto

### Payment Integration
- API endpoint untuk Midtrans payment
- Snap token generation

### Email Service
- API endpoint untuk mengirim email hasil foto
- Integrasi dengan Resend API

### Notifikasi
- Notifikasi login
- Notifikasi registrasi sukses
- Notifikasi verifikasi email
- Notifikasi error
- Notifikasi verifikasi gagal

## Setup & Installation

1. Clone repository
2. Install dependencies:
```bash
npm install
```

3. Setup environment variables (buat file `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
RESEND_API_KEY=your_resend_api_key
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka browser di `http://localhost:3000`

## Struktur Project

```
src/
├── app/
│   ├── api/
│   │   ├── payment/          # Midtrans payment endpoint
│   │   └── send-email/       # Email sending endpoint
│   ├── auth/
│   │   └── callback/         # OAuth callback handler
│   ├── dashboard/            # Dashboard page
│   ├── login/                # Login page
│   ├── register/             # Register page
│   └── resetpassword/        # Reset password pages
├── components/
│   ├── CameraStudio.tsx      # Camera component
│   └── notifikasi/           # Notification components
└── utils/
    └── supabase/             # Supabase client config
```

## Scripts

- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm start` - Jalankan production server
- `npm run lint` - Jalankan ESLint

## Assets

Frame foto tersedia di `public/images/`:
- frame 1.png
- frame 2.png
- frame 3.png
- frame 4.png
