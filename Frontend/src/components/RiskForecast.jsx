import React from 'react';
import { AlertTriangle, ThermometerSun, CloudLightning } from 'lucide-react';
import { motion } from 'framer-motion';

const RiskForecast = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm h-full"
        >
            <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="text-orange-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Risk Forecast</h2>
            </div>

            <div className="space-y-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl hover:bg-red-900/20 transition-colors cursor-default"
                >
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
                </motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-yellow-900/10 border border-yellow-500/20 p-4 rounded-xl hover:bg-yellow-900/20 transition-colors cursor-default"
                >
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
                </motion.div>
            </div>
        </motion.div>
    );
};

export default RiskForecast;
