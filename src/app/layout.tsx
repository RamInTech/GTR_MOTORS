import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/AuthContext';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { FloatingActions } from '@/components/floating-actions';
import { SmokeEffect } from '@/components/smoke-effect';
import { AnimatedBackground } from '@/components/animated-background';
import './globals.css';

export const metadata: Metadata = {
  title: 'GTR MOTORS',
  description: 'High-performance auto parts for enthusiasts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <AnimatedBackground />
            <SmokeEffect />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <FloatingActions />
          </CartProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
