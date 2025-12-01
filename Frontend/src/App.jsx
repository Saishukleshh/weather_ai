import React from 'react';
import Header from './components/Header';
import WeatherDashboard from './components/WeatherDashboard';
import CropRecommender from './components/CropRecommender';
import RiskForecast from './components/RiskForecast';
import FarmingSchedule from './components/FarmingSchedule';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950 pointer-events-none"></div>

      <Header />

      <main className="max-w-7xl mx-auto p-6 relative z-10 space-y-6">
        {/* Top Row: Weather & Risks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeatherDashboard />
          </div>
          <div className="lg:col-span-1">
            <RiskForecast />
          </div>
        </div>

        {/* Bottom Row: Crop Recommender & Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CropRecommender />
          </div>
          <div className="lg:col-span-2">
            <FarmingSchedule />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
