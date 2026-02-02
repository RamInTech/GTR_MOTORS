'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { ProductCard } from '@/components/product-card';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!product) return;
    if (!user) {
      router.push('/login');
      return;
    }
    addToCart(product, quantity);
  };

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const fullStars = Math.floor(product.rating);
  const halfStar = product.rating % 1 !== 0;

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-white/10">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-sm shadow-md z-10">
                {product.discount}% OFF
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="font-headline text-3xl lg:text-4xl font-bold">
              {product.name}
            </h1>
            <p className="text-gray-400 mt-2">
              by{' '}
              <span className="text-white font-medium">{product.brand}</span>
            </p>

            <div className="flex items-center mt-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(fullStars)].map((_, i) => (
                  <Star key={`full-${i}`} className="w-5 h-5 fill-current" />
                ))}
                {halfStar && <Star key="half" className="w-5 h-5 fill-current" />}
                {[...Array(5 - Math.ceil(product.rating))].map((_, i) => (
                  <Star key={`empty-${i}`} className="w-5 h-5 text-gray-600" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-400">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold mt-4">${product.price.toFixed(2)}</p>
            <Separator className="my-6 bg-white/10" />
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>
            <Separator className="my-6 bg-white/10" />

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-white/10 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="hover:bg-white/10 text-white"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="hover:bg-white/10 text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-grow bg-red-600 hover:bg-red-700 text-white" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <h2 className="font-headline text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
