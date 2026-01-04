
import React from 'react';

const TrafficCard = ({ data }) => {
    if (!data) return <div className="p-6 bg-slate-800 rounded-lg shadow-lg">Loading Traffic...</div>;

    const getColor = (level) => {
        if (level < 20) return "text-green-400 border-green-500";
        if (level < 50) return "text-yellow-400 border-yellow-500";
        return "text-red-500 border-red-500";
    };

    return (
        <div className={`p-6 bg-slate-800 rounded-lg shadow-xl border-l-4 ${getColor(data.congestion_level)} transition duration-300`}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Traffic Congestion</h2>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <span className={`text-6xl font-extrabold ${getColor(data.congestion_level)}`} id="traffic-level">{data.congestion_level}%</span>
                    <p className="text-lg text-gray-400" id="traffic-status">{data.status}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-sm mt-4">
                <div className="bg-slate-700 p-3 rounded">
                    <p className="text-xs text-gray-400">Current Speed</p>
                    <p className="font-medium">{data.current_speed} km/h</p>
                </div>
                <div className="bg-slate-700 p-3 rounded">
                    <p className="text-xs text-gray-400">Free Flow</p>
                    <p className="font-medium">{data.free_flow_speed} km/h</p>
                </div>
            </div>
        </div>
    );
};

export default TrafficCard;