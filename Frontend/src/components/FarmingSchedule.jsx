import React from 'react';
import { Calendar, CheckCircle2, Circle, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';

const DraggableTask = ({ step, index }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `task-${index}`, // Unique ID for drag
        data: step, // Pass step data
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
    } : undefined;

    const handleReminder = () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            new Notification(`Reminder: ${step.title}`, {
                body: `It's time for ${step.title}! ${step.description}`,
                icon: "/vite.svg"
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(`Reminder set for ${step.title}`);
                }
            });
        }
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + (index * 0.1) }}
            className="relative group bg-slate-800/80 p-4 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all cursor-grab active:cursor-grabbing"
        >
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-slate-400 bg-slate-900/50 px-2 py-1 rounded">{step.date}</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent drag start when clicking button
                        handleReminder();
                    }}
                    className="text-slate-500 hover:text-yellow-400 transition-colors"
                    title="Set Live Reminder"
                >
                    <Bell size={16} />
                </button>
            </div>

            <div className="flex items-start gap-3">
                <div className={`mt-1 p-1 rounded-full border-2 ${step.status === 'completed'
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : step.status === 'upcoming'
                        ? 'bg-slate-900 border-blue-500 text-blue-500'
                        : 'bg-slate-900 border-slate-600 text-slate-600'
                    }`}>
                    {step.status === 'completed' ? <CheckCircle2 size={12} /> : <Circle size={12} fill="currentColor" />}
                </div>

                <div>
                    <h3 className={`font-medium transition-colors ${step.status === 'upcoming' ? 'text-blue-400 group-hover:text-blue-300' : 'text-slate-200'}`}>
                        {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                        {step.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm h-full"
        >
            <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-purple-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Dynamic Farming Schedule</h2>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => (
                    <DraggableTask key={index} step={step} index={index} />
                ))}
            </div>

            <button className="w-full mt-8 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-all hover:bg-slate-800">
                View Full Calendar
            </button>
        </motion.div>
    );
};

export default FarmingSchedule;
