import React, { useState } from 'react';
import { Sprout, Search, Leaf, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CropRecommender = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleAnalyze = () => {
        setAnalyzing(true);
        setShowResults(false);
        setTimeout(() => {
            setAnalyzing(false);
            setShowResults(true);
        }, 1500);
    };

    return (
        <div className="bg-stone-200/80 rounded-2xl p-6 border border-stone-300/50 backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <Sprout className="text-emerald-600" size={24} />
                <h2 className="text-xl font-semibold text-stone-900">Crop Recommendation Engine</h2>
            </div>

            <div className="space-y-4 flex-grow">
                <div>
                    <label className="block text-stone-600 text-sm mb-2">Soil Type</label>
                    <select className="w-full bg-stone-100 border border-stone-300 rounded-lg p-3 text-stone-800 focus:outline-none focus:border-emerald-500 transition-colors">
                        <option>Alluvial Soil</option>
                        <option>Black Soil</option>
                        <option>Red Soil</option>
                        <option>Laterite Soil</option>
                    </select>
                </div>

                <div>
                    <label className="block text-stone-600 text-sm mb-2">Season</label>
                    <select className="w-full bg-stone-100 border border-stone-300 rounded-lg p-3 text-stone-800 focus:outline-none focus:border-emerald-500 transition-colors">
                        <option>Kharif (Monsoon)</option>
                        <option>Rabi (Winter)</option>
                        <option>Zaid (Summer)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-stone-600 text-sm mb-2">Location</label>
                    <input
                        type="text"
                        placeholder="Enter region or pincode"
                        className="w-full bg-stone-100 border border-stone-300 rounded-lg p-3 text-stone-800 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-medium py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    {analyzing ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Analyzing Data...
                        </>
                    ) : (
                        <>
                            <Search size={18} />
                            Analyze Best Crops
                        </>
                    )}
                </button>
            </div>

            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6 space-y-3"
                    >
                        <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wider">Top Recommendations</h3>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-600">
                                    <Leaf size={20} />
                                </div>
                                <div>
                                    <h4 className="text-stone-900 font-medium">Rice (Paddy)</h4>
                                    <p className="text-emerald-700/60 text-xs">98% Match</p>
                                </div>
                            </div>
                            <span className="text-emerald-600 font-bold">#1</span>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-stone-300/30 border border-stone-300/50 p-4 rounded-xl flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-400/30 rounded-lg text-stone-600">
                                    <Leaf size={20} />
                                </div>
                                <div>
                                    <h4 className="text-stone-900 font-medium">Sugarcane</h4>
                                    <p className="text-stone-500/80 text-xs">85% Match</p>
                                </div>
                            </div>
                            <span className="text-stone-500 font-bold">#2</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CropRecommender;
