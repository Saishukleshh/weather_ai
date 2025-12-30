import React from 'react';
import { AlertTriangle, ThermometerSun, CloudLightning, Bell } from 'lucide-react';

const RiskForecast = () => {
    const risks = [
        {
            type: "High",
            title: "Heatwave Alert",
            description: "Temperatures expected to cross 40°C next week. Ensure adequate irrigation.",
            icon: ThermometerSun,
            bgClass: "bg-red-900/10",
            borderClass: "border-red-500/20",
            iconBgClass: "bg-red-500/10",
            iconColorClass: "text-red-400",
            titleClass: "text-red-200",
            badgeClass: "bg-red-500/20 text-red-400 border-red-500/20",
            descClass: "text-red-300/70"
        },
        {
            type: "Medium",
            title: "Storm Warning",
            description: "Scattered thunderstorms predicted for the weekend. Delay spraying pesticides.",
            icon: CloudLightning,
            bgClass: "bg-yellow-900/10",
            borderClass: "border-yellow-500/20",
            iconBgClass: "bg-yellow-500/10",
            iconColorClass: "text-yellow-400",
            titleClass: "text-yellow-200",
            badgeClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
            descClass: "text-yellow-300/70"
        }
    ];

    const handleReminder = (risk) => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            new Notification(`Risk Alert: ${risk.title}`, {
                body: risk.description,
                icon: "/vite.svg"
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(`Reminder set for ${risk.title}`);
                }
            });
        }
    };

    return (
        <div className="bg-stone-200/80 rounded-2xl p-6 border border-stone-300/50 backdrop-blur-sm h-full">
            <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="text-orange-500" size={24} />
                <h2 className="text-xl font-semibold text-stone-900">Risk Forecast</h2>
            </div>

            <div className="space-y-4">
                {risks.map((risk, index) => (
                    <div
                        key={index}
                        className={`${risk.bgClass} border ${risk.borderClass} p-4 rounded-xl transition-colors cursor-default relative group hover:bg-opacity-20`}
                    >
                        <div className="flex justify-between items-start gap-3">
                            <div className="flex items-start gap-3 flex-1">
                                <div className={`p-2 ${risk.iconBgClass} rounded-lg ${risk.iconColorClass} shrink-0`}>
                                    <risk.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center flex-wrap gap-2 mb-1 pr-6">
                                        <h3 className={`${risk.titleClass} font-medium tracking-wide`}>{risk.title}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${risk.badgeClass}`}>
                                            {risk.type.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className={`${risk.descClass} text-sm leading-relaxed`}>
                                        {risk.description}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleReminder(risk)}
                                className="text-stone-500 hover:text-stone-800 transition-colors p-1"
                                title="Set Alert Reminder"
                            >
                                <Bell size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiskForecast;
