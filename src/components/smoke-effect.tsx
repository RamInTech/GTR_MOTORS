'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SmokeParticle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export function SmokeEffect() {
    const [smoke, setSmoke] = useState<SmokeParticle[]>([]);
    const lastSmokeTime = useRef(0);
    const lastPos = useRef<{ x: number; y: number } | null>(null);
    const particleId = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const prev = lastPos.current;
            lastPos.current = { x: e.clientX, y: e.clientY };

            const speed = prev ? Math.min(60, Math.hypot(e.clientX - prev.x, e.clientY - prev.y)) : 0;

            // Faster movement tightens cadence for a hypercar-like jet trail
            const interval = Math.max(6, 26 - speed * 0.6); // shorter interval -> denser trail
            const now = Date.now();
            if (now - lastSmokeTime.current > interval) {
                lastSmokeTime.current = now;
                const newParticle = {
                    id: particleId.current++,
                    x: e.clientX,
                    y: e.clientY + 8, // Slightly below cursor/pointer
                    vx: (Math.random() - 0.5) * 8 + speed * 0.08,
                    vy: (Math.random() - 0.2) * 6 + speed * 0.05
                };
                setSmoke(prev => [...prev.slice(-70), newParticle]); // Allow a thicker plume

                // Remove particle after animation
                setTimeout(() => {
                    setSmoke(prev => prev.filter(p => p.id !== newParticle.id));
                }, 1400);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
            <AnimatePresence>
                {smoke.map(particle => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 0.82, scale: 0.58, x: particle.x, y: particle.y, rotate: 0 }}
                        animate={{
                            opacity: 0,
                            scale: 2.9,
                            y: particle.y + 78 + particle.vy,
                            x: particle.x + particle.vx * 6,
                            rotate: (particle.vx + particle.vy) * 4
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute w-7 h-7 rounded-full"
                        style={{
                            left: -14,
                            top: -14,
                            background:
                                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 55%),' +
                                'radial-gradient(circle at 70% 70%, rgba(239,68,68,0.14), transparent 70%),' +
                                'radial-gradient(circle, rgba(15,15,15,0.35) 0%, rgba(15,15,15,0) 70%)',
                            filter: 'blur(2px)',
                            mixBlendMode: 'screen'
                        }} // Offset to center on cursor
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
