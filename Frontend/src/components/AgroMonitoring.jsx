import React, { useState, useEffect } from 'react';

const AgroMonitoring = ({ location }) => {
  const [agroData, setAgroData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      fetchAgroData();
    }
  }, [location]);

  const fetchAgroData = async () => {
    if (!location) return;
    
    setLoading(true);
    try {
      const [weatherRes, soilRes] = await Promise.all([
        fetch(`http://localhost:7777/api/agro/weather/${location.latitude}/${location.longitude}`),
        fetch(`http://localhost:7777/api/agro/soil/${location.latitude}/${location.longitude}`)
      ]);

      if (weatherRes.ok) {
        const weatherData = await weatherRes.json();
        setAgroData(weatherData);
      }
      
      if (soilRes.ok) {
        const soilData = await soilRes.json();
        setSoilData(soilData);
      }
    } catch (error) {
      console.error('Error fetching agro data:', error);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-4 text-slate-300">Loading agricultural data...</div>;

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-green-200 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-800 font-mono flex items-center gap-2">
        🌿 Agricultural Monitoring
      </h2>
      
      {agroData && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-green-700 flex items-center gap-2">
            🌦️ Weather Conditions
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <span className="text-green-600">🌡️ Temperature:</span>
              <span className="text-green-800 ml-2 font-mono font-bold">{agroData.main?.temp || 'N/A'}°C</span>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <span className="text-green-600">💧 Humidity:</span>
              <span className="text-green-800 ml-2 font-mono font-bold">{agroData.main?.humidity || 'N/A'}%</span>
            </div>
          </div>
        </div>
      )}

      {soilData && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-700 flex items-center gap-2">
            🌍 Soil Analysis
          </h3>
          <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-sm">
            <span className="text-green-600">💧 Moisture:</span>
            <span className="text-green-800 ml-2 font-mono font-bold">{soilData.moisture || 'N/A'}</span>
          </div>
        </div>
      )}

      {!location && (
        <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-green-600">Set location to view agricultural data</p>
        </div>
      )}
    </div>
  );
};

export default AgroMonitoring;