'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import carBg from '@/lib/bg/image4.jpeg';

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {/* Car Image Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Image
                    src={carBg}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    quality={50} // Optimized for background
                />
            </div>

            {/* Smoke/Fog Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800/40 via-[#0b0b0f]/80 to-[#0b0b0f]" />

            {/* Animated Fog Clouds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ x: '-20%', opacity: 0 }}
                    animate={{ x: '120%', opacity: [0, 0.6, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    initial={{ x: '120%', opacity: 0 }}
                    animate={{ x: '-20%', opacity: [0, 0.5, 0] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute bottom-1/3 right-0 w-[700px] h-[500px] bg-slate-500/20 rounded-full blur-[140px] mix-blend-screen"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,38,38,0.15),transparent_70%)] blur-[80px]"
                />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(100,100,100,0.1),transparent_50%)]" />

            {/* Abstract Tire Tread Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(20,20,20,0.8)_25%,transparent_25%,transparent_50%,rgba(20,20,20,0.8)_50%,rgba(20,20,20,0.8)_75%,transparent_75%,transparent)] bg-[length:24px_24px] opacity-[0.05]" />

            {/* Subtle Grid - Blueprint feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100px_100px] opacity-10" />

            {/* Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-red-600/5 rounded-full blur-[120px] mix-blend-screen" />
        </div>
    );
}
