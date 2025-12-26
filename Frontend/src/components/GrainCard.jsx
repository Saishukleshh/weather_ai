import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const Graincard = ({ grain }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: grain.name,
        data: grain,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="p-4 bg-slate-800 border border-slate-700/50 shadow-lg shadow-black/20 rounded-xl cursor-grab hover:shadow-xl hover:border-emerald-500/30 hover:bg-slate-800/80 transition-all active:cursor-grabbing touch-none group"
        >
            <h3 className="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{grain.name}</h3>
            <p className="text-sm text-slate-400">{grain.season}</p>
        </div>
    );
};

export default Graincard;