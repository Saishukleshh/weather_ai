import React, { useState } from 'react';
import { Sprout, Search, Leaf } from 'lucide-react';

const CropRecommender = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleAnalyze = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setShowResults(true);
        }, 1500);
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm h-full">
            <div className="flex items-center gap-2 mb-6">
                <Sprout className="text-emerald-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Crop Recommendation Engine</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-slate-400 text-sm mb-2">Soil Type</label>
                    <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                        <option>Alluvial Soil</option>
                        <option>Black Soil</option>
                        <option>Red Soil</option>
                        <option>Laterite Soil</option>
                    </select>
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-2">Season</label>
                    <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                        <option>Kharif (Monsoon)</option>
                        <option>Rabi (Winter)</option>
                        <option>Zaid (Summer)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-2">Location</label>
                    <input
                        type="text"
                        placeholder="Enter region or pincode"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    {analyzing ? (
                        <>Analyzing Data...</>
                    ) : (
                        <>
                            <Search size={18} />
                            Analyze Best Crops
                        </>
                    )}
                </button>
            </div>

            {showResults && (
                <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-4">
                    <h3 className="text-slate-300 text-sm font-medium uppercase tracking-wider">Top Recommendations</h3>

                    <div className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                                <Leaf size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Rice (Paddy)</h4>
                                <p className="text-emerald-400/60 text-xs">98% Match</p>
                            </div>
                        </div>
                        <span className="text-emerald-400 font-bold">#1</span>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-700/50 rounded-lg text-slate-400">
                                <Leaf size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Sugarcane</h4>
                                <p className="text-slate-400/60 text-xs">85% Match</p>
                            </div>
                        </div>
                        <span className="text-slate-500 font-bold">#2</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropRecommender;
