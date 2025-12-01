import React from 'react';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';

const FarmingSchedule = () => {
    const steps = [
        {
            title: "Sowing",
            date: "Dec 05 - Dec 10",
            status: "upcoming",
            description: "Prepare land and sow seeds at 2-3cm depth."
        },
        {
            title: "First Irrigation",
            date: "Dec 15 - Dec 18",
            status: "pending",
            description: "Apply light irrigation after germination."
        },
        {
            title: "Fertilization",
            date: "Jan 05 - Jan 10",
            status: "pending",
            description: "Apply NPK fertilizer dose 1."
        }
    ];

    return (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm h-full">
            <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-purple-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Dynamic Farming Schedule</h2>
            </div>

            <div className="relative pl-4 border-l-2 border-slate-700 space-y-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative">
                        <div className={`absolute -left-[21px] top-1 p-1 rounded-full border-2 ${step.status === 'completed'
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : step.status === 'upcoming'
                                    ? 'bg-slate-900 border-blue-500 text-blue-500'
                                    : 'bg-slate-900 border-slate-600 text-slate-600'
                            }`}>
                            {step.status === 'completed' ? <CheckCircle2 size={12} /> : <Circle size={12} fill="currentColor" />}
                        </div>

                        <div>
                            <span className="text-xs font-mono text-slate-400 block mb-1">{step.date}</span>
                            <h3 className={`font-medium ${step.status === 'upcoming' ? 'text-blue-400' : 'text-slate-200'}`}>
                                {step.title}
                            </h3>
                            <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-colors">
                View Full Calendar
            </button>
        </div>
    );
};

export default FarmingSchedule;
