'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function TrendChart({ type, currentValue }) {
  // Generate mock historical data based on the current real value
  // In a production app, this would come from your database history
  const generateHistory = (baseValue) => {
    return Array.from({ length: 7 }, (_, i) => {
      const fluctuation = Math.random() * 10 - 5; // Random +/- 5 variance
      return Math.round(baseValue + fluctuation);
    });
  };

  const historyData = generateHistory(currentValue || 50);
  const labels = ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago', 'Now'];

  // Configuration for AQI (Green/Blue) vs Traffic (Orange/Red)
  const isTraffic = type === 'traffic';
  const color = isTraffic ? 'rgb(249, 115, 22)' : 'rgb(16, 185, 129)'; // Orange vs Emerald
  const bgGradient = isTraffic ? 'rgba(249, 115, 22, 0.2)' : 'rgba(16, 185, 129, 0.2)';

  const data = {
    labels,
    datasets: [
      {
        label: isTraffic ? 'Congestion Level' : 'AQI Trend',
        data: historyData,
        borderColor: color,
        backgroundColor: bgGradient,
        tension: 0.4, // Smooth curves
        fill: true,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: color,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#64748b' },
      },
      y: {
        grid: { color: '#334155', drawBorder: false },
        ticks: { color: '#64748b', stepSize: 20 },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-64 bg-slate-900/50 rounded-xl border border-slate-800 p-4 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-slate-300 font-semibold flex items-center gap-2">
            {isTraffic ? 'Traffic Trend' : ' Air Quality Trend'}
            <span className="text-xs font-normal text-slate-500">(Last 6 Hours)</span>
        </h3>
        <div className={`px-2 py-1 rounded text-xs font-bold ${isTraffic ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
            Live Analysis
        </div>
      </div>
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}