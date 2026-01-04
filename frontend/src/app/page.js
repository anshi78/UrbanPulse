'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Cloud, Wind, Activity, TrendingUp } from 'lucide-react';

export default function Home() {
    // REMOVED: Particles state and useEffect are no longer needed for the clean look

    return (
        // CLEAN BACKGROUND: Subtle gradient from dark slate to black
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white selection:bg-blue-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">
                {/* REMOVED: Animated Background Effects (blobs) and Floating Particles */}

                <div className="relative z-10 max-w-5xl">
                
                    
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
                        Monitor Your{' '}
                        {/* Cleaner text gradient */}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            Urban Environment
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Real-time AI analysis of Air Quality, Traffic Congestion, and Weather patterns for smart cities worldwide.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/login" className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-900/20 hover:scale-105">
                            Get Started
                            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        
                        <Link href="/register" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold text-lg transition border border-slate-700">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-24 px-6 bg-slate-900/30 border-t border-slate-800/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                        Powerful Features for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            Smart Cities
                        </span>
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Wind className="w-12 h-12 text-blue-400" />,
                                title: 'Air Quality Index',
                                description: 'Real-time monitoring of PM2.5, PM10, CO2, and other pollutants with AI predictions',
                            },
                            {
                                icon: <TrendingUp className="w-12 h-12 text-emerald-400" />,
                                title: 'Traffic Analysis',
                                description: 'Advanced congestion detection and route optimization powered by machine learning',
                            },
                            {
                                icon: <Cloud className="w-12 h-12 text-purple-400" />,
                                title: 'Weather Forecasting',
                                description: 'Hyperlocal weather predictions with temperature, humidity, and precipitation data',
                            }
                        ].map((feature, i) => (
                            // Cleaner card style: Removed internal gradients
                            <div
                                key={i}
                                className="group relative p-8 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-slate-600 transition-all hover:scale-105 hover:shadow-xl"
                            >
                                <div className="relative z-10">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-2xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-24 px-6 bg-slate-950 border-t border-slate-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '50+', label: 'Cities Covered' },
                            { value: '99.9%', label: 'Uptime' },
                            { value: '10M+', label: 'Data Points Daily' },
                            { value: '<100ms', label: 'Response Time' }
                        ].map((stat, i) => (
                            <div key={i} className="p-6">
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-500 font-semibold uppercase tracking-wider text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 px-6 border-t border-slate-800/50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative p-12 bg-slate-900 rounded-3xl border border-slate-800">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-4xl font-bold mb-6">
                                Ready to Transform Your City?
                            </h2>
                            <p className="text-xl text-slate-400 mb-8">
                                Join hundreds of cities already using UrbanPulse for smarter urban management
                            </p>
                            <Link href="/register" className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-900/20 hover:scale-105">
                                Start Free Trial
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}