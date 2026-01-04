'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar'; 
import Link from 'next/link'; // Ensure Link is imported

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
try {
            // Updated to use the environment variable for deployment
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', data.email);
                // Redirect to dashboard
                window.location.href = '/dashboard';
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        // CLEAN BACKGROUND: bg-slate-950
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-300 selection:bg-cyan-500/30">
            <Navbar />

            <div className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 transition-all">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 mb-4 border border-slate-700 shadow-sm">
                            <Activity className="w-6 h-6 text-slate-200" />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                        <p className="text-slate-500 mt-2">Sign in to continue monitoring</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                            <Activity className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input 
                                    type="email" 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    placeholder="name@company.com"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    placeholder="••••••••"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}