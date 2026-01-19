'use client';

import { Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FloatingActions() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            {/* WhatsApp Button */}
            <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg transition-transform hover:scale-110"
                aria-label="Contact on WhatsApp"
            >
                <MessageCircle className="h-7 w-7 text-white fill-white" />
            </Button>

            {/* Email Button */}
            <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-[#FF0000] hover:bg-[#CC0000] shadow-lg transition-transform hover:scale-110"
                aria-label="Send Email"
            >
                <Mail className="h-7 w-7 text-white" />
            </Button>
        </div>
    );
}
