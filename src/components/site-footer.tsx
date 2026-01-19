import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, Phone } from 'lucide-react';
import gtrLogo from '@/lib/logos/gtr-india.png';

export function SiteFooter() {
  return (
    <footer className="relative z-50 bg-[#121212] dev text-gray-300 py-10 border-t border-white/10 shadow-2xl">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={gtrLogo}
                alt="GTR Motorsport India"
                width={100}
                height={32}
                className="object-contain bg-gray-200 p-1 rounded-md" // Adjusted for logo aspect ratio
              />
            </Link>
            <p className="text-xs leading-relaxed text-gray-400">
              High-performance auto parts for enthusiasts. We provide quality car spare parts for all the major Japanese, Korean, American and European car brands in India.
            </p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Company</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link href="/policies" className="hover:text-red-500 transition-colors">Policies</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Contact Us</h3>
            <div className="space-y-2 text-xs text-gray-400">
              <p className="font-medium text-white">GTR Motorsport India private limited</p>
              <p>Sf.No. 28/1, Polichallur Main Road,<br />Pammal, Chennai - 75</p>
              <p>Email: <a href="mailto:infouaegtr@gmail.com" className="hover:text-red-500 transition-colors">infouaegtr@gmail.com</a></p>
              <p>Phone: <span className="text-white">0091 80158 71346, 0091 95666 46777</span></p>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <Link href="#" className="p-1.5 bg-white/5 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 group">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-1.5 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 group">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-1.5 bg-white/5 rounded-full hover:bg-sky-500 hover:text-white transition-all duration-300 group">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-1.5 bg-white/5 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 group">
                <Phone className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-[10px] text-gray-500">
          <p>&copy; {new Date().getFullYear()} GTR Motorsport India Pvt Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
