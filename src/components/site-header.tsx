'use client';

import Link from 'next/link';
import Image from 'next/image';
import gtrIndiaLogo from '@/lib/logos/gtr-india.png';
import {
  Wrench,
  ShoppingCart,
  User,
  Search,
  Menu,
  Globe,
  Heart,
  Mic,
  Camera,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/#brands', label: 'Brands' },
  { href: '/compatibility', label: 'Compatibility' },
  { href: '/about', label: 'About Us' },
];

export function SiteHeader() {
  const { totalItems } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0b0f]/95 backdrop-blur-sm text-white border-b border-white/10">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="mr-8 flex items-center space-x-2">
            <Image
              src={gtrIndiaLogo}
              alt="IND GTR"
              width={160}
              height={60}
              className="h-12 w-auto object-contain bg-gray-200 p-1 rounded-md"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#0b0b0f] text-white border-r border-white/10">
              <Link
                href="/"
                className="mr-6 flex items-center space-x-2 mb-6"
              >
                <Image
                  src={gtrIndiaLogo}
                  alt="IND GTR"
                  width={150}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-red-400 text-lg text-gray-200"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search parts, e.g. 'brake pads'..."
              className="w-full pl-10 pr-20 bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-white/30"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-gray-400">
              <Mic className="h-4 w-4 cursor-pointer hover:text-white" />
              <Camera className="h-4 w-4 cursor-pointer hover:text-white" />
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="text-gray-200 hover:text-white hover:bg-white/10 hidden sm:flex">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-200 hover:text-white hover:bg-white/10 hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-gray-200 hover:text-white hover:bg-white/10">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-200 hover:text-white hover:bg-white/10">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#0b0b0f] border-white/10 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" asChild>
                    <Link href="/account">Profile</Link>
                  </DropdownMenuItem>
                  {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                    <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" asChild>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-red-400 focus:bg-white/10 focus:text-red-400 cursor-pointer"
                    onClick={() => signOut(auth)}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-200 hover:text-white hover:bg-white/10">
                    <span className="font-medium">Sign In</span>
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700 text-white border-0 hidden sm:flex">
                    <span className="font-medium">Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
