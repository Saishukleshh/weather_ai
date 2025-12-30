import React, { useState, useEffect } from 'react';

const CropDataAPI = () => {
  const [cropData, setCropData] = useState(null);
  const [marketPrices, setMarketPrices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCropData();
    fetchMarketPrices();
  }, []);

  const fetchCropData = async () => {
    try {
      const response = await fetch('http://localhost:7777/api/crop-data');
      const data = await response.json();
      setCropData(data);
    } catch (error) {
      console.error('Error fetching crop data:', error);
    }
  };

  const fetchMarketPrices = async () => {
    try {
      const response = await fetch('http://localhost:7777/api/market-prices');
      const data = await response.json();
      setMarketPrices(data);
      setLoading(false);  
    } catch (error) {
      console.error('Error fetching market prices:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-green-700 bg-green-50 rounded-xl border border-green-200">🌱 Loading crop data...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-800 font-mono flex items-center gap-3">
        🏛️ Government Crop Data
      </h1>
      
      {/* Crop Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-700 font-mono flex items-center gap-2">
          🌾 Crop Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cropData?.crops.map((crop) => (
            <div key={crop.name || crop.id} className="bg-white p-6 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-green-600 mb-3 font-mono flex items-center gap-2">
                🌱 {crop.name}
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p><span className="font-medium text-green-700">🗓️ Season:</span> {crop.season}</p>
                <p><span className="font-medium text-green-700">📊 Avg Yield:</span> {crop.avgYield}</p>
                <p><span className="font-medium text-green-700">💰 Market Price:</span> {crop.marketPrice}</p>
                <p><span className="font-medium text-green-700">🗺️ Region:</span> {crop.region}</p>
                <p><span className="font-medium text-green-700">🌍 Soil Type:</span> {crop.soilType}</p>
                <p><span className="font-medium text-green-700">🌧️ Rainfall:</span> {crop.rainfall}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Prices */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-700 font-mono flex items-center gap-2">
          💹 Current Market Prices
        </h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-200">
          <table className="w-full">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-4 text-left text-green-800 font-mono">🌾 Crop</th>
                <th className="px-6 py-4 text-left text-green-800 font-mono">💰 Price</th>
                <th className="px-6 py-4 text-left text-green-800 font-mono">⚖️ Unit</th>
                <th className="px-6 py-4 text-left text-green-800 font-mono">🏪 Market</th>
              </tr>
            </thead>
            <tbody>
              {marketPrices?.prices.map((price) => (
                <tr key={`${price.crop}-${price.market}`} className="border-t border-green-100 hover:bg-green-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{price.crop}</td>
                  <td className="px-6 py-4 text-green-600 font-mono font-bold">₹{price.price}</td>
                  <td className="px-6 py-4 text-gray-700">{price.unit}</td>
                  <td className="px-6 py-4 text-gray-700">{price.market}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-green-600 font-mono bg-green-50 p-3 rounded-xl border border-green-200">
        🕒 Last updated: {cropData?.lastUpdated ? new Date(cropData.lastUpdated).toLocaleString() : 'N/A'}
      </div>
    </div>
  );
};

export default CropDataAPI;