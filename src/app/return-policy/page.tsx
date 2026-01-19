
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ReturnPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0b0b0f] text-white flex flex-col items-center py-20 px-4">
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(20,20,20,0.8)_25%,transparent_25%,transparent_50%,rgba(20,20,20,0.8)_50%,rgba(20,20,20,0.8)_75%,transparent_75%,transparent)] bg-[length:24px_24px] opacity-[0.03]" />
            </div>

            <div className="relative z-10 max-w-4xl w-full">
                <Link href="/policies" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Policies
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Return Policy</h1>
                    <p className="text-gray-400">Detailed guidelines on returns, refunds, and exchanges.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-12"
                >
                    {/* General return conditions */}
                    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 hover:border-red-500/20 transition-colors">
                        <h4 className="inline-block bg-[#ef4444] text-white px-4 py-1.5 rounded-md text-lg font-bold mb-6 shadow-lg shadow-red-900/20">General return conditions</h4>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Timeframe:</strong> Return items within a set period, such as 30 days from the delivery or purchase date.</span></li>
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Condition:</strong> Items must be in new, unused condition with all original tags, labels, and packaging.</span></li>
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Approval:</strong> Prior approval from the seller is usually required. You may need to contact customer service to get an authorization number (RMA).</span></li>
                        </ul>
                    </div>

                    {/* Defective or damaged parts */}
                    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 hover:border-red-500/20 transition-colors">
                        <h4 className="inline-block bg-[#ef4444] text-white px-4 py-1.5 rounded-md text-lg font-bold mb-6 shadow-lg shadow-red-900/20">Defective or damaged parts</h4>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Technical report:</strong> For items with manufacturing defects, a technical report from a garage is often a mandatory requirement to validate the return and process a refund.</span></li>
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Proof of defect:</strong> Without a valid technical report, the return may be rejected.</span></li>
                        </ul>
                    </div>

                    {/* Costs and fees */}
                    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 hover:border-red-500/20 transition-colors">
                        <h4 className="inline-block bg-[#ef4444] text-white px-4 py-1.5 rounded-md text-lg font-bold mb-6 shadow-lg shadow-red-900/20">Costs and fees</h4>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Return shipping:</strong> You are typically responsible for return shipping costs.</span></li>
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Restocking fees:</strong> Some sellers may charge a fee, such as a 5% or 21% cancellation or restocking fee, for non-defective returns.</span></li>
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Non-refundable charges:</strong> Shipping and handling charges are often non-refundable.</span></li>
                        </ul>
                    </div>

                    {/* How to initiate a return */}
                    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 hover:border-red-500/20 transition-colors">
                        <h4 className="inline-block bg-[#ef4444] text-white px-4 py-1.5 rounded-md text-lg font-bold mb-6 shadow-lg shadow-red-900/20">How to initiate a return</h4>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Contact the seller:</strong> Reach out to customer service via email or through the website to explain the issue and your return request.</span></li>
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Provide order details:</strong> Include your order number and the reason for the return.</span></li>
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Get authorization:</strong> Follow the seller's instructions to obtain a return authorization number (RMA) if required.</span></li>
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Package the item:</strong> Securely pack the item in its original packaging.</span></li>
                            <li className="flex gap-4 items-start"><span className="text-red-500 font-bold text-xl leading-none">&gt;</span> <span><strong className="text-white">Ship the item:</strong> Send the item to the address provided by the seller.</span></li>
                        </ul>
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <Link href="/products">
                        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 font-bold tracking-wider rounded-md py-6 text-lg shadow-lg shadow-red-900/20">
                            BACK TO SHOP
                        </Button>
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
