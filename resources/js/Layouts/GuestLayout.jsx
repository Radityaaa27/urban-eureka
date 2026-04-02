import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100 pt-6 sm:pt-0">
            {/* Delicate Clean Blue Background Orbs */}
            <div className="absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full bg-blue-400 opacity-20 mix-blend-multiply blur-[100px]"></div>
            <div className="absolute bottom-0 -right-10 h-[35rem] w-[35rem] rounded-full bg-cyan-300 opacity-20 mix-blend-multiply blur-[100px]"></div>

            <div className="relative z-10 w-full flex flex-col items-center px-4">
                <div className="w-full overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl sm:max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
