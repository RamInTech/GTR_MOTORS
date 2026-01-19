
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Wrench, Settings, Disc, ShieldCheck, CheckCircle2, Cog } from 'lucide-react';
import engineImg from '@/lib/engine/engine.jpg';

export default function AboutPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0b0f] text-white">
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(20,20,20,0.8)_25%,transparent_25%,transparent_50%,rgba(20,20,20,0.8)_50%,rgba(20,20,20,0.8)_75%,transparent_75%,transparent)] bg-[length:24px_24px] opacity-[0.03]" />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">

                {/* Section 1: Essence of Engineering */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
                        >
                            <Image
                                src={engineImg}
                                alt="High performance car engine with carbon fiber parts"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white/50 text-sm font-light italic">
                                High performance car engine with carbon fiber parts
                            </div>
                        </motion.div>

                        {/* Right: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight">
                                The Essence of <br />
                                <span className="text-white">Engineering,</span> <br />
                                <span className="text-[#ef4444]">Fueled by Passion</span>
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                GTR Motorsports India Private Limited aims to rise to the world leadership in the Aftermarket sector without making any concessions on the environment and human sensitivity throughout the whole procedure starting from the procurement of products to the product delivery for the end customer. We provide quality car spare parts for all the major Japanese, Korean, American and European car brands in India.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Section 2: Parts Classification */}
                <section>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Card 1: Genuine */}
                        <motion.div variants={fadeInUp} className="bg-[#1a1a1a] rounded-2xl p-8 text-center border border-white/5 hover:border-red-500/30 transition-all hover:shadow-2xl hover:shadow-red-900/10 group">
                            <div className="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                                <Wrench className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Genuine Auto Parts</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                A Genuine part is a part that is originally put in your vehicle when it was new and has the car manufacturer's logo on it. This does not mean the product is actually made by the car manufacturer, it is often times made by a different company but the car manufacturer's logo is added.
                            </p>
                        </motion.div>

                        {/* Card 2: OEM */}
                        <motion.div variants={fadeInUp} className="bg-[#1a1a1a] rounded-2xl p-8 text-center border border-white/5 hover:border-red-500/30 transition-all hover:shadow-2xl hover:shadow-red-900/10 group">
                            <div className="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                                <Cog className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">OEM Auto Parts</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                An Original Equipment Manufacturer part is a part built by the same company that built the original product for the car maker. It is the exact same part that is in your car, except it does not have the car maker's logo. These parts are the same as the Genuine part but cheaper as you are not paying for the privilege of having the car maker's logo.
                            </p>
                        </motion.div>

                        {/* Card 3: Aftermarket */}
                        <motion.div variants={fadeInUp} className="bg-[#1a1a1a] rounded-2xl p-8 text-center border border-white/5 hover:border-red-500/30 transition-all hover:shadow-2xl hover:shadow-red-900/10 group">
                            <div className="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                                <Disc className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Aftermarket Auto Parts</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Replacement parts and accessories. Replacement parts are automotive parts built or remanufactured to replace OE parts as they become worn or damaged. Accessories are parts made for comfort, convenience, performance, safety, or customization, and are designed for add-on after the original sale of the motor vehicle.
                            </p>
                        </motion.div>

                    </motion.div>
                </section>

            </div>
        </div>
    );
}
