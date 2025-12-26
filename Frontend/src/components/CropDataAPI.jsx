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

  if (loading) return <div className="p-4 text-slate-300">Loading crop data...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-200 font-mono">Government Crop Data</h1>
      
      {/* Crop Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-300 font-mono">Crop Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cropData?.crops.map((crop) => (
            <div key={crop.name || crop.id} className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700">
              <h3 className="text-xl font-semibold text-emerald-400 mb-2 font-mono">{crop.name}</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p><span className="font-medium text-slate-200">Season:</span> {crop.season}</p>
                <p><span className="font-medium text-slate-200">Avg Yield:</span> {crop.avgYield}</p>
                <p><span className="font-medium text-slate-200">Market Price:</span> {crop.marketPrice}</p>
                <p><span className="font-medium text-slate-200">Region:</span> {crop.region}</p>
                <p><span className="font-medium text-slate-200">Soil Type:</span> {crop.soilType}</p>
                <p><span className="font-medium text-slate-200">Rainfall:</span> {crop.rainfall}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Prices */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-300 font-mono">Current Market Prices</h2>
        <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-700">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-slate-200 font-mono">Crop</th>
                <th className="px-4 py-3 text-left text-slate-200 font-mono">Price</th>
                <th className="px-4 py-3 text-left text-slate-200 font-mono">Unit</th>
                <th className="px-4 py-3 text-left text-slate-200 font-mono">Market</th>
              </tr>
            </thead>
            <tbody>
              {marketPrices?.prices.map((price) => (
                <tr key={`${price.crop}-${price.market}`} className="border-t border-slate-700">
                  <td className="px-4 py-3 font-medium text-slate-300">{price.crop}</td>
                  <td className="px-4 py-3 text-emerald-400 font-mono">₹{price.price}</td>
                  <td className="px-4 py-3 text-slate-300">{price.unit}</td>
                  <td className="px-4 py-3 text-slate-300">{price.market}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-slate-500 font-mono">
        Last updated: {cropData?.lastUpdated ? new Date(cropData.lastUpdated).toLocaleString() : 'N/A'}
      </div>
    </div>
  );
};

export default CropDataAPI;