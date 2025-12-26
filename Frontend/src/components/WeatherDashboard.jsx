import React from 'react';
import { CloudRain, Wind, Droplets, Thermometer, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherDashboard = ({ location }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm h-full"
        >
            <div className="flex items-center gap-2 mb-6">
                <Sun className="text-yellow-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Live Weather Conditions</h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                    className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30 flex items-center gap-4 transition-colors cursor-default"
                >
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                        <Thermometer size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Temperature</p>
                        <p className="text-2xl font-bold text-white">28°C</p>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                    className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30 flex items-center gap-4 transition-colors cursor-default"
                >
                    <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                        <Droplets size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Humidity</p>
                        <p className="text-2xl font-bold text-white">65%</p>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                    className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30 flex items-center gap-4 transition-colors cursor-default"
                >
                    <div className="p-3 bg-slate-500/10 rounded-lg text-slate-400">
                        <Wind size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Wind Speed</p>
                        <p className="text-2xl font-bold text-white">12 km/h</p>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl"
            >
                <div className="flex items-start gap-3">
                    <CloudRain className="text-blue-400 mt-1" size={20} />
                    <div>
                        <h3 className="text-blue-200 font-medium">Forecast Summary</h3>
                        <p className="text-blue-300/80 text-sm mt-1">
                            Light rain expected in the evening. Ideal conditions for sowing rice in the next 48 hours.
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default WeatherDashboard;
