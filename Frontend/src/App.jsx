import React, { useState } from "react";
import Header from './components/Header';
import WeatherDashboard from './components/WeatherDashboard';
import CropRecommender from './components/CropRecommender';
import RiskForecast from './components/RiskForecast';
import FarmingSchedule from './components/FarmingSchedule';
import UserMap from './components/UserMap';
import CropDataAPI from './components/CropDataAPI';
import AgroMonitoring from './components/AgroMonitoring';
import { DndContext } from '@dnd-kit/core';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const fetchAddress = async (lat, lng) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
      const response = await fetch(url);
      const data = await response.json();
      
      setAddress(data.display_name.split(",").slice(0, 3).join(", ")); 
    } catch (err) {
      setAddress("Address not found (Network Error)");
    }
  };

  const getLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        
        fetchAddress(latitude, longitude);
        
        setLoading(false);
      },
      (err) => {
        setError("Location access denied. Allow location to continue.");
        setLoading(false);
      }
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    try {
      const response = await fetch('http://localhost:7777/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem('token', data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');
    
    try {
      const response = await fetch('http://localhost:7777/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem('token', data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleDefaultLocation = () => {
    const defaultLat = 28.6139;
    const defaultLng = 77.2090;
    
    setLocation({ latitude: defaultLat, longitude: defaultLng });
    fetchAddress(defaultLat, defaultLng); 
    setError("");
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pointer-events-none"></div>
        
        {/* Pass the address to Header if needed */}
        <Header location={location} address={address} />

        <DndContext onDragEnd={(e) => console.log('Drag:', e)}>
          <main className="max-w-7xl mx-auto p-6 relative z-10 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                 {/* Pass address here if your dashboard needs it */}
                 {WeatherDashboard ? <WeatherDashboard location={location} cityName={address} /> : <p>Weather Component Here</p>}
              </div>
              <div className="lg:col-span-1 space-y-6">
                <UserMap location={location} />
                {RiskForecast && <RiskForecast />}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                {CropRecommender && <CropRecommender />}
              </div>
              <div className="lg:col-span-2">
                 {FarmingSchedule && <FarmingSchedule />}
              </div>
            </div>
            
            {/* AgroMonitoring and CropDataAPI Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AgroMonitoring location={location} />
              <CropDataAPI />
            </div>
          </main>
        </DndContext>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-400">
          {isRegistering ? 'Farm Register' : 'Farm Login'}
        </h1>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          <input name="username" type="text" placeholder="Username" className="w-full p-3 rounded bg-slate-700 border border-slate-600 focus:border-emerald-500 outline-none" required />
          {isRegistering && <input name="email" type="email" placeholder="Email" className="w-full p-3 rounded bg-slate-700 border border-slate-600 focus:border-emerald-500 outline-none" required />}
          <input name="password" type="password" placeholder="Password" className="w-full p-3 rounded bg-slate-700 border border-slate-600 focus:border-emerald-500 outline-none" required />

          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-emerald-600 hover:bg-emerald-700 p-3 rounded mt-2 transition-colors font-medium"
          >
            {loading ? "Detecting Location..." : "📍 Detect My Location"}
          </button>

          <button
            type="button"
            onClick={handleDefaultLocation}
            className="w-full bg-slate-600 hover:bg-slate-700 p-3 rounded mt-2 text-sm text-slate-300 transition-colors"
          >
            Skip / Use Default Location
          </button>

          {location && (
            <div className="mt-3 text-sm p-3 bg-emerald-900/20 rounded border border-emerald-500/30 text-emerald-200">
              <p className="font-bold text-emerald-400">✓ Location Set</p>
              <p className="text-lg mt-1">{address || "Fetching address..."}</p>
              <p className="text-xs text-slate-400 mt-1">
                (Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)})
              </p>
            </div>
          )}

          {error && <p className="text-red-400 text-sm bg-red-900/20 p-2 rounded border border-red-500/20">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded mt-4 font-bold shadow-lg shadow-blue-900/20">
            {isRegistering ? 'Create Account' : 'Enter Dashboard'}
          </button>
          
          <button 
            type="button" 
            onClick={() => {setIsRegistering(!isRegistering); setError('');}}
            className="w-full text-emerald-400 hover:text-emerald-300 text-sm mt-2"
          >
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </form>
      </div>
    </div>
  );
}