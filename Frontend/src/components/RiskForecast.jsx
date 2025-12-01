import React from 'react';
import { AlertTriangle, ThermometerSun, CloudLightning } from 'lucide-react';

const RiskForecast = () => {
    return (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="text-orange-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Risk Forecast</h2>
            </div>

            <div className="space-y-4">
                <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg text-red-400 shrink-0">
                            <ThermometerSun size={20} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-red-200 font-medium">Heatwave Alert</h3>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/20">HIGH</span>
                            </div>
                            <p className="text-red-300/70 text-sm">
                                Temperatures expected to cross 40°C next week. Ensure adequate irrigation.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-900/10 border border-yellow-500/20 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400 shrink-0">
                            <CloudLightning size={20} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-yellow-200 font-medium">Storm Warning</h3>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">MEDIUM</span>
                            </div>
                            <p className="text-yellow-300/70 text-sm">
                                Scattered thunderstorms predicted for the weekend. Delay spraying pesticides.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskForecast;
