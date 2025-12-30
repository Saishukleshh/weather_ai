import React, { useState } from "react";
import Header from './components/Header';
import WeatherDashboard from './components/WeatherDashboard';
import CropRecommender from './components/CropRecommender';

import FarmingSchedule from './components/FarmingSchedule';
import UserMap from './components/UserMap';
import CropDataAPI from './components/CropDataAPI';
import AgroMonitoring from './components/AgroMonitoring';
import Chatbot from './components/Chatbot';
import OnboardingForm from './components/OnboardingForm';
import { DndContext } from '@dnd-kit/core';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token) {
      setIsLoggedIn(true);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        checkOnboardingStatus(parsedUser.username);
      }
    }
  }, []);

  const checkOnboardingStatus = async (username) => {
    try {
      const res = await fetch(`http://localhost:7777/api/farmer/setup/${username}`);
      const data = await res.json();
      if (data.exists) {
        setHasCompletedOnboarding(true);
      } else {
        setHasCompletedOnboarding(false);
      }
    } catch (err) {
      console.error("Error checking onboarding:", err);
      // If error, assume completed to avoid blocking, or false? Let's assume false to force retry or true to let go.
      // Better to assume false if we want them to fill it, but if server down...
      // For demo, assume false so they see the form if server is up but empty.
    }
  };

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

    console.log('Attempting login with:', { username, password });

    try {
      const response = await fetch('http://localhost:7777/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        checkOnboardingStatus(data.user.username);
        setError('');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Check if server is running.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');

    const soilType = formData.get('soilType');
    const fieldSize = formData.get('fieldSize');
    const irrigationType = formData.get('irrigationType');

    setLoading(true);
    try {
      const response = await fetch('http://localhost:7777/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          email,
          soilType,
          fieldSize,
          irrigationType
        })
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
    } finally {
      setLoading(false);
    }
  };

  const handleDefaultLocation = (defaultLat, defaultLng) => {
    setLocation({ latitude: defaultLat, longitude: defaultLng });
    fetchAddress(defaultLat, defaultLng);
    setError("");
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800 font-sans">
        <div className="fixed inset-0 bg-green-50/30 pointer-events-none"></div>

        <Header location={location} address={address} onLogout={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUser(null);
        }} />

        <DndContext onDragEnd={(e) => console.log('Drag:', e)}>
          <main className="max-w-7xl mx-auto p-6 relative z-10 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200 shadow-lg">
                {WeatherDashboard ? <WeatherDashboard location={location} cityName={address} /> : <p>Weather Component Here</p>}
              </div>
              <div className="lg:col-span-1 space-y-6">
                <UserMap location={location} />
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AgroMonitoring location={location} />
              <CropDataAPI />
            </div>
          </main>
        </DndContext>

        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 text-white flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-300/20">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🌾</div>
          <h1 className="text-3xl font-bold text-green-100">
            {isRegistering ? 'Join FarmTech' : 'FarmTech Login'}
          </h1>
          <p className="text-green-200 mt-2">Smart Agriculture Management</p>
        </div>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          <input name="username" type="text" placeholder="👤 Username" className="w-full p-4 rounded-xl bg-white/20 border border-green-300/30 focus:border-green-400 outline-none text-white placeholder-green-200" required />
          {isRegistering && <input name="email" type="email" placeholder="📧 Email" className="w-full p-4 rounded-xl bg-white/20 border border-green-300/30 focus:border-green-400 outline-none text-white placeholder-green-200" required />}
          <input name="password" type="password" placeholder="🔒 Password" className="w-full p-4 rounded-xl bg-white/20 border border-green-300/30 focus:border-green-400 outline-none text-white placeholder-green-200" required />
          {isRegistering && (
            <div className="space-y-4 pt-2">
              <p className="text-green-200 font-bold text-sm">Farm Details</p>
              <select name="soilType" className="w-full p-4 rounded-xl bg-white/20 border border-green-300/30 focus:border-green-400 outline-none text-white font-medium" required>
                <option value="" className="text-gray-800">🌱 Select Soil Type</option>
                <option value="Clay" className="text-gray-800">Clay</option>
                <option value="Sandy" className="text-gray-800">Sandy</option>
                <option value="Loam" className="text-gray-800">Loam</option>
                <option value="Black Cotton" className="text-gray-800">Black Cotton</option>
                <option value="Red Soil" className="text-gray-800">Red Soil</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input name="fieldSize" type="number" placeholder="📏 Size (Acres)" className="w-full p-4 rounded-xl bg-white/20 border border-green-300/30 focus:border-green-400 outline-none text-white placeholder-green-200" required />
                <select name="irrigationType" className="w-full p-4 rounded-xl bg-white/20 border border-green-300/30 focus:border-green-400 outline-none text-white font-medium" required>
                  <option value="Rainfed" className="text-gray-800">💧 Rainfed</option>
                  <option value="Tube Well" className="text-gray-800">Tube Well</option>
                  <option value="Canal" className="text-gray-800">Canal</option>
                  <option value="Drip" className="text-gray-800">Drip/Sprinkler</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl mt-4 transition-all duration-300 font-medium flex items-center justify-center gap-2"
          >
            {loading ? "🔍 Detecting..." : "📍 Detect Farm Location"}
          </button>

          <button
            type="button"
            onClick={() => handleDefaultLocation(28.6139, 77.2090)}
            className="w-full bg-green-700/50 hover:bg-green-700 p-3 rounded-xl text-sm text-green-100 transition-all duration-300"
          >
            🏠 Use Default Location (Delhi)
          </button>

          {location && (
            <div className="mt-4 p-4 bg-green-600/30 rounded-xl border border-green-400/30">
              <p className="font-bold text-green-200 flex items-center gap-2">✅ Farm Location Set</p>
              <p className="text-lg mt-1 text-green-100">{address || "📍 Fetching address..."}</p>
              <p className="text-xs text-green-300 mt-1">
                🗺️ Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
              </p>
            </div>
          )}

          {error && <p className="text-red-300 text-sm bg-red-900/30 p-3 rounded-xl border border-red-500/30">⚠️ {error}</p>}

          <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 p-4 rounded-xl mt-6 font-bold shadow-lg transition-all duration-300">
            {isRegistering ? '🌱 Create Farm Account' : '🚜 Enter Dashboard'}
          </button>

          <button
            type="button"
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            className="w-full text-green-300 hover:text-green-200 text-sm mt-4 transition-colors"
          >
            {isRegistering ? '🔄 Already have an account? Login' : '🆕 Need an account? Register'}
          </button>
        </form>
      </div>
    </div>
  );
}