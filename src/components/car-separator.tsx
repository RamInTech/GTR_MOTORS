'use client';

import { motion } from 'framer-motion';

export function CarSeparator() {
    return (
        <div className="w-full bg-[#1a1a1a] py-8 flex items-center justify-center relative overflow-hidden">

            {/* Left Tire Track / Road Line - Extended to meet center */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-700 to-gray-700 max-w-[48%] mx-1" />

            {/* Right Tire Track / Road Line - Extended to meet center */}
            <div className="w-full h-[2px] bg-gradient-to-l from-transparent via-gray-700 to-gray-700 max-w-[48%] mx-1" />

            {/* Passing car silhouette with trailing light to hint motion */}
            <motion.div
                className="absolute left-[-15%] top-1/2 -translate-y-1/2 w-14 h-7 rounded-full bg-gradient-to-r from-gray-200 via-white to-amber-200 shadow-[0_0_20px_rgba(255,255,255,0.55)]"
                animate={{ x: ['-15%', '110%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
            />
            <motion.div
                className="absolute left-[-25%] top-1/2 -translate-y-1/2 h-[2px] w-24 bg-gradient-to-r from-transparent via-red-500/60 to-transparent blur-sm"
                animate={{ x: ['-25%', '120%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
            />

            {/* Optional: Moving road dash effect under/behind? */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-20" />
        </div>
    );
}
