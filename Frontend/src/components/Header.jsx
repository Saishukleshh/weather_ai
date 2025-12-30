import React from 'react';
import { Bell, ShieldCheck } from 'lucide-react';

const Header = ({ location, onLogout }) => {
    return (
        <div className="bg-stone-200/90 backdrop-blur-lg border-b border-stone-300/50 p-6 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono border border-blue-500/30">
                            AD010
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck size={12} />
                            Verified
                        </span>
                        {location && (
                            <span className="px-3 py-1 rounded-full bg-stone-300/50 text-stone-700 text-xs font-medium border border-stone-400/50">
                                📍 {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
                        Weather-Based Crop Planning Assistant
                    </h1>
                    <p className="text-stone-600 mt-1 text-sm">
                        Domain: Agriculture • AI-Powered Decision Support
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={onLogout}
                        className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95 text-sm font-bold flex items-center justify-center w-12 h-12"
                        title="Logout"
                    >
                        ⏻
                    </button>
                    <button className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 w-12 h-12 flex items-center justify-center">
                        <Bell size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
