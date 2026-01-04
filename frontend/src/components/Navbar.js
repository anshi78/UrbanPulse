'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login status on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition">
                            Urban<span className="text-white">Pulse</span>
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        {!isLoggedIn ? (
                            <>
                                <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}