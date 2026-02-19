'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Camera } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (error) {
            console.error('Error login:', error.message)
            alert('Gagal login, coba lagi bre!')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FF90E8] p-4">
            <div className="card-neo max-w-md w-full flex flex-col items-center text-center space-y-8 bg-white">

                {/* Logo Icon */}
                <div className="w-24 h-24 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center rotate-3">
                    <Camera size={48} className="text-black" />
                </div>

                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight mb-2">SNAP! BOOTH</h1>
                    <p className="text-gray-700 font-medium border-b-4 border-black pb-4 inline-block">
                        Abadikan momen tanpa ribet.
                    </p>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="btn-neo bg-white w-full flex items-center justify-center gap-3 text-lg"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-6 h-6"
                    />
                    Masuk dengan Google
                </button>

                <p className="text-sm font-bold text-gray-500 mt-4">
                    *Dapatkan 10 Koin Gratis untuk pendaftar pertama!
                </p>
            </div>
        </div>
    )
}