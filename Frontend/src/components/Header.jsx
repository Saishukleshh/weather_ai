import React from 'react';
import { Bell, ShieldCheck } from 'lucide-react';

const Header = () => {
    return (
        <div className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50 p-6 sticky top-0 z-50">
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
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Weather-Based Crop Planning Assistant
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        Domain: Agriculture • AI-Powered Decision Support
                    </p>
                </div>
                <button className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95">
                    <Bell size={24} />
                </button>
            </div>
        </div>
    );
};

export default Header;
