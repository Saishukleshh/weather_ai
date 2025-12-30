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
            className="bg-stone-200/80 rounded-2xl p-6 border border-stone-300/50 backdrop-blur-sm h-full"
        >
            <div className="flex items-center gap-2 mb-6">
                <Sun className="text-yellow-500" size={24} />
                <h2 className="text-xl font-semibold text-stone-900">Live Weather Conditions</h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(231, 229, 228, 0.9)" }}
                    className="bg-stone-300/50 p-4 rounded-xl border border-stone-400/30 flex items-center gap-4 transition-colors cursor-default"
                >
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                        <Thermometer size={24} />
                    </div>
                    <div>
                        <p className="text-stone-600 text-sm">Temperature</p>
                        <p className="text-2xl font-bold text-stone-900">28°C</p>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(231, 229, 228, 0.9)" }}
                    className="bg-stone-300/50 p-4 rounded-xl border border-stone-400/30 flex items-center gap-4 transition-colors cursor-default"
                >
                    <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                        <Droplets size={24} />
                    </div>
                    <div>
                        <p className="text-stone-600 text-sm">Humidity</p>
                        <p className="text-2xl font-bold text-stone-900">65%</p>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(231, 229, 228, 0.9)" }}
                    className="bg-stone-300/50 p-4 rounded-xl border border-stone-400/30 flex items-center gap-4 transition-colors cursor-default"
                >
                    <div className="p-3 bg-stone-500/10 rounded-lg text-stone-600">
                        <Wind size={24} />
                    </div>
                    <div>
                        <p className="text-stone-600 text-sm">Wind Speed</p>
                        <p className="text-2xl font-bold text-stone-900">12 km/h</p>
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
