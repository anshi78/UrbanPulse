'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AQICard from '@/components/AQICard';
import TrafficCard from '@/components/TrafficCard';
import WeatherCard from '@/components/WeatherCard';
import TrendChart from '@/components/TrendChart';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/urban-data`;

// Extended Global City List
const CITIES = [
    {
        region: "Asia",
        cities: [
            { name: "New Delhi, India", lat: 28.6139, lon: 77.2090 },
            { name: "Mumbai, India", lat: 19.0760, lon: 72.8777 },
            { name: "Bangalore, India", lat: 12.9716, lon: 77.5946 },
            { name: "Tokyo, Japan", lat: 35.6762, lon: 139.6503 },
            { name: "Beijing, China", lat: 39.9042, lon: 116.4074 },
            { name: "Seoul, South Korea", lat: 37.5665, lon: 126.9780 },
            { name: "Singapore", lat: 1.3521, lon: 103.8198 },
            { name: "Dubai, UAE", lat: 25.276987, lon: 55.296249 },
            { name: "Bangkok, Thailand", lat: 13.7563, lon: 100.5018 },
        ]
    },
    {
        region: "North America",
        cities: [
            { name: "New York, USA", lat: 40.7128, lon: -74.0060 },
            { name: "Los Angeles, USA", lat: 34.0522, lon: -118.2437 },
            { name: "Chicago, USA", lat: 41.8781, lon: -87.6298 },
            { name: "San Francisco, USA", lat: 37.7749, lon: -122.4194 },
            { name: "Toronto, Canada", lat: 43.65107, lon: -79.347015 },
            { name: "Vancouver, Canada", lat: 49.2827, lon: -123.1207 },
            { name: "Mexico City, Mexico", lat: 19.4326, lon: -99.1332 },
        ]
    },
    {
        region: "South America",
        cities: [
            { name: "Sao Paulo, Brazil", lat: -23.5505, lon: -46.6333 },
            { name: "Buenos Aires, Argentina", lat: -34.6037, lon: -58.3816 },
            { name: "Bogota, Colombia", lat: 4.7110, lon: -74.0721 },
            { name: "Lima, Peru", lat: -12.0464, lon: -77.0428 },
        ]
    },
    {
        region: "Europe",
        cities: [
            { name: "London, UK", lat: 51.5074, lon: -0.1278 },
            { name: "Paris, France", lat: 48.8566, lon: 2.3522 },
            { name: "Berlin, Germany", lat: 52.5200, lon: 13.4050 },
            { name: "Madrid, Spain", lat: 40.4168, lon: -3.7038 },
            { name: "Rome, Italy", lat: 41.9028, lon: 12.4964 },
            { name: "Amsterdam, Netherlands", lat: 52.3676, lon: 4.9041 },
            { name: "Moscow, Russia", lat: 55.7558, lon: 37.6173 },
            { name: "Istanbul, Turkey", lat: 41.0082, lon: 28.9784 },
        ]
    },
    {
        region: "Africa",
        cities: [
            { name: "Cairo, Egypt", lat: 30.0444, lon: 31.2357 },
            { name: "Lagos, Nigeria", lat: 6.5244, lon: 3.3792 },
            { name: "Johannesburg, South Africa", lat: -26.2041, lon: 28.0473 },
            { name: "Nairobi, Kenya", lat: -1.2921, lon: 36.8219 },
        ]
    },
    {
        region: "Oceania",
        cities: [
            { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
            { name: "Melbourne, Australia", lat: -37.8136, lon: 144.9631 },
            { name: "Auckland, New Zealand", lat: -36.8485, lon: 174.7633 },
        ]
    }
];

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(CITIES[0].cities[0]); 
    const router = useRouter();

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token'); 

        if (!token) {
            router.push('/login'); 
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ lat: location.lat, lon: location.lon })
            });

            if (response.status === 401) {
                router.push('/login');
                return;
            }
            
            const result = await response.json();
            if (result.status === 'success') setData(result);
        } catch (e) {
            console.error(e);
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (e) => {
        const selectedName = e.target.value;
        for (const group of CITIES) {
            const city = group.cities.find(c => c.name === selectedName);
            if (city) {
                setData(null);
                setLocation(city);
                break;
            }
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); 
        return () => clearInterval(interval);
    }, [location]); 

    return (
        <main className="min-h-screen bg-slate-950 text-white pb-20">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-6 pt-24">
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                            Live Dashboard
                        </h1>
                        <p className="text-slate-400 mt-2">Real-Time Environmental & Traffic Monitoring</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                        <label className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Select Location</label>
                        
                        {/* --- FIXED SELECT DROPDOWN --- */}
                        <div className="relative">
                            <select 
                                value={location.name} 
                                onChange={handleCityChange}
                                // Added bg-slate-900 to ensure the background is solid dark, not transparent
                                className="appearance-none bg-slate-900 text-white border border-slate-700 rounded-xl px-5 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl cursor-pointer min-w-[240px] font-medium"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: `right 0.5rem center`,
                                    backgroundSize: `1.5em 1.5em`,
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                {CITIES.map((group) => (
                                    // Added bg-slate-900 to options to ensure the dropdown list is visible
                                    <optgroup key={group.region} label={group.region} className="bg-slate-900 text-slate-400 font-bold">
                                        {group.cities.map((city) => (
                                            <option key={city.name} value={city.name} className="bg-slate-900 text-white py-2">
                                                {city.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>

                        <p className="text-xs text-slate-500 font-mono mt-1">
                            {location.lat.toFixed(4)}°N, {location.lon.toFixed(4)}°E
                        </p>
                    </div>
                </header>

                {/* Loading / Error States */}
                {loading && !data && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-200 text-center mb-8">
                        ⚠️ Error: {error}
                    </div>
                )}
                
                {/* MAIN DASHBOARD GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <WeatherCard data={data?.weather} />
                    <AQICard data={data?.aqi} />
                    <TrafficCard data={data?.traffic} />
                </div>
{/* --- NEW SECTION: DATA VISUALIZATION --- */}
                {data && (
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                        {/* AQI Chart */}
                        <TrendChart type="aqi" currentValue={data.aqi?.overall_aqi || 50} />
                        
                        {/* Traffic Chart */}
                        <TrendChart type="traffic" currentValue={data.traffic?.flow?.currentSpeed || 60} />
                    </div>
                )}
            
            </div>
        </main>
    );
}