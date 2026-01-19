'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ExclusiveDeals() {
    // Set the target date to 2 days, 23 hours from now to match the "02 23" approximate look initially
    // In a real app, this would come from a backend or config
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 23,
        minutes: 59,
        seconds: 9
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                } else {
                    clearInterval(timer);
                    return prev;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeBlocks = [
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HOURS', value: timeLeft.hours },
        { label: 'MINUTES', value: timeLeft.minutes },
        { label: 'SECONDS', value: timeLeft.seconds }
    ];

    return (
        <section className="py-10 bg-[#1a1a1a] flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-[#ea580c] mb-2 tracking-tight uppercase">
                    Exclusive Deals
                </h2>

                <p className="text-gray-300 text-base md:text-lg mb-6 font-light">
                    Don't miss out on these limited-time offers!
                </p>

                <div className="flex gap-4 md:gap-8 justify-center">
                    {timeBlocks.map((block, index) => (
                        <div key={block.label} className="flex flex-col items-center">
                            <div className="text-4xl md:text-6xl font-bold text-[#ea580c] tabular-nums tracking-wider">
                                {String(block.value).padStart(2, '0')}
                            </div>
                            <div className="text-[10px] md:text-xs text-gray-400 mt-1 font-medium tracking-widest uppercase">
                                {block.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
