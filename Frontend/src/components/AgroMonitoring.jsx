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
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400 font-mono">Agricultural Monitoring</h2>
      
      {agroData && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-slate-200">Weather Conditions</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-700 p-3 rounded">
              <span className="text-slate-400">Temperature:</span>
              <span className="text-emerald-400 ml-2 font-mono">{agroData.main?.temp || 'N/A'}°C</span>
            </div>
            <div className="bg-slate-700 p-3 rounded">
              <span className="text-slate-400">Humidity:</span>
              <span className="text-emerald-400 ml-2 font-mono">{agroData.main?.humidity || 'N/A'}%</span>
            </div>
          </div>
        </div>
      )}

      {soilData && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-slate-200">Soil Analysis</h3>
          <div className="bg-slate-700 p-3 rounded text-sm">
            <span className="text-slate-400">Moisture:</span>
            <span className="text-emerald-400 ml-2 font-mono">{soilData.moisture || 'N/A'}</span>
          </div>
        </div>
      )}

      {!location && (
        <p className="text-slate-400 text-center">Set location to view agricultural data</p>
      )}
    </div>
  );
};

export default AgroMonitoring;