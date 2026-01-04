import React from 'react';

const WeatherCard = ({ data }) => {
    if (!data) return <div className="p-6 bg-slate-800 rounded-lg shadow-lg">Loading Weather...</div>;

    return (
        <div className="p-6 bg-slate-800 rounded-lg shadow-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-2 text-gray-200">Live Weather</h2>
            
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-5xl font-bold text-white">{data.temp}°C</span>
                    <p className="text-lg text-blue-300 capitalize mt-1">{data.description}</p>
                </div>
                {/* Weather Icon from OpenWeatherMap */}
                <img 
                    src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} 
                    alt={data.condition}
                    className="w-20 h-20 bg-slate-700 rounded-full"
                />
            </div>

            <div className="mt-4 bg-slate-700 p-3 rounded flex justify-between items-center">
                <span className="text-gray-400 text-sm">Humidity</span>
                <span className="font-bold text-blue-200">{data.humidity}%</span>
            </div>
        </div>
    );
};

export default WeatherCard;