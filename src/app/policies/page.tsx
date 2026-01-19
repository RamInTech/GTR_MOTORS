
'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PoliciesPage() {
    const [openItem, setOpenItem] = useState<string | null>('return-policy');

    const toggleItem = (id: string) => {
        setOpenItem(openItem === id ? null : id);
    };

    const policies = [
        {
            id: 'return-policy',
            title: 'Return Policy',
            subtitle: 'View our conditions and process for returning items.',
            content: (
                <div className="space-y-4 text-gray-200">
                    <p>
                        We have a comprehensive return policy to ensure your satisfaction.
                    </p>
                    <Link href="/return-policy">
                        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white mt-2">
                            View Full Return Policy
                        </Button>
                    </Link>
                </div>
            )
        },
        {
            id: 'shipping-policy',
            title: 'Shipping & Delivery',
            subtitle: 'Details about our shipping methods and delivery times.',
            content: (
                <div className="space-y-4 text-gray-300">
                    <p>
                        We ship to all locations across India. Orders are typically processed within 1-2 business days.
                    </p>
                    <p>
                        Standard delivery takes 3-7 business days depending on your location. Expedited shipping options are available at checkout.
                    </p>
                </div>
            )
        },
        {
            id: 'warranty-policy',
            title: 'Warranty Information',
            subtitle: 'Coverage details for your purchased parts.',
            content: (
                <div className="space-y-4 text-gray-300">
                    <p>
                        Most parts come with a standard manufacturer's warranty. The duration and coverage depend on the specific brand and part type.
                    </p>
                    <p>
                        Warranty claims must be processed through us. Please retain your invoice for warranty service.
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen text-white flex flex-col items-center py-20 px-4">
            <div className="relative z-10 max-w-3xl w-full text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="text-4xl md:text-6xl font-headline font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                >
                    Our Policies
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-gray-400 mb-12 text-lg"
                >
                    Everything you need to know about our terms and conditions.
                </motion.p>

                <div className="space-y-6 text-left">
                    {policies.map((policy, index) => (
                        <motion.div
                            key={policy.id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 50 }}
                            whileHover={{ scale: 1.02 }}
                            className={`rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 ${openItem === policy.id
                                ? 'bg-red-950/40 border border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.2)]'
                                : 'bg-black/40 border border-white/5 hover:border-red-500/30 hover:bg-black/60'
                                }`}
                        >
                            <button
                                onClick={() => toggleItem(policy.id)}
                                className="w-full p-6 flex items-start justify-between text-left transition-colors"
                            >
                                <div>
                                    <h3 className={`text-xl font-bold mb-1 transition-colors ${openItem === policy.id ? 'text-red-400' : 'text-white'}`}>
                                        {policy.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {policy.subtitle}
                                    </p>
                                </div>
                                <motion.div
                                    animate={{ rotate: openItem === policy.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className={`w-6 h-6 ${openItem === policy.id ? 'text-red-500' : 'text-gray-500'}`} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openItem === policy.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 pt-2 border-t border-white/5">
                                            {policy.content}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                    className="mt-16"
                >
                    <Link href="/products">
                        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-10 font-bold tracking-wider rounded-full py-6 text-lg shadow-lg shadow-red-900/20 hover:shadow-red-600/40 transition-all duration-300">
                            <ArrowLeft className="mr-2 h-5 w-5" /> BACK TO SHOP
                        </Button>
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
