'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function CompatibilityPage() {
    return (
        <div className="relative min-h-screen text-white flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Local background removed to show global AnimatedBackground */}

            <motion.div
                className="relative w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <motion.div
                        className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl shadow-xl shadow-red-500/20 rotate-3"
                        initial={{ rotate: -10, y: -20, opacity: 0 }}
                        animate={{ rotate: 3, y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                </div>

                <div className="text-center mb-10 mt-6">

                    <motion.h1
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Compatibility Checker
                    </motion.h1>
                    <motion.p
                        className="text-gray-400 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Enter your vehicle details to verify perfect fitment instantly.
                    </motion.p>
                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { id: 'year', label: 'Year', placeholder: '2024' },
                            { id: 'make', label: 'Make', placeholder: 'Nissan' },
                            { id: 'model', label: 'Model', placeholder: 'GT-R R35' }
                        ].map((field, i) => (
                            <motion.div
                                key={field.id}
                                className="space-y-2 group"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + (i * 0.1) }}
                            >
                                <label htmlFor={field.id} className="text-sm font-medium text-gray-400 group-focus-within:text-red-400 transition-colors">{field.label}</label>
                                <div className="relative">
                                    <Input
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        className="bg-black/20 border-white/5 text-white placeholder:text-white/20 focus-visible:ring-red-500/50 focus-visible:border-red-500 transition-all duration-300 h-12"
                                    />
                                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="space-y-2 group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <label htmlFor="description" className="text-sm font-medium text-gray-400 group-focus-within:text-red-400 transition-colors">Part Name or Description</label>
                        <Textarea
                            id="description"
                            placeholder="Describe the part you're looking for (e.g., 'Carbon fiber front lip for 2024 NISMO')..."
                            className="min-h-[140px] bg-black/20 border-white/5 text-white placeholder:text-white/20 focus-visible:ring-red-500/50 focus-visible:border-red-500 transition-all duration-300 resize-none p-4"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <Button className="relative w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-7 text-lg rounded-xl shadow-lg shadow-red-900/20 transition-all duration-300 group overflow-hidden">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Check Compatibility <CheckCircle2 className="w-5 h-5" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
