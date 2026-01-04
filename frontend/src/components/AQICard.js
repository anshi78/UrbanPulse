import React from 'react';

const AQICard = ({ data }) => {
    if (!data) return <div className="p-6 bg-slate-800 rounded-lg shadow-lg">Loading AQI...</div>;

    const getColor = (aqi) => {
        if (aqi <= 2) return "text-green-400 border-green-500";
        if (aqi <= 3) return "text-yellow-400 border-yellow-500";
        return "text-red-500 border-red-500";
    };

    return (
        <div className={`p-6 bg-slate-800 rounded-lg shadow-xl border-l-4 ${getColor(data.aqi)} transition duration-300`}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Air Quality Index</h2>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <span className={`text-6xl font-extrabold ${getColor(data.aqi)}`} id="aqi-val">{data.aqi}</span>
                    <p className="text-lg text-gray-400" id="aqi-status">{data.status}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center text-sm mt-4">
                <div className="bg-slate-700 p-3 rounded">
                    <p className="text-xs text-gray-400">PM2.5</p>
                    <p className="font-medium">{data.details.pm2_5}</p>
                </div>
                <div className="bg-slate-700 p-3 rounded">
                    <p className="text-xs text-gray-400">PM10</p>
                    <p className="font-medium">{data.details.pm10}</p>
                </div>
                <div className="bg-slate-700 p-3 rounded">
                    <p className="text-xs text-gray-400">CO</p>
                    <p className="font-medium">{data.details.co}</p>
                </div>
            </div>
        </div>
    );
};

export default AQICard;