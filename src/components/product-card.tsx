'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const fullStars = Math.floor(product.rating);
  const halfStar = product.rating % 1 !== 0;

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-red-500/50 hover:shadow-red-500/10 border-white/10 bg-[#222]">
        <Link href={`/products/${product.id}`} className="block">
          <CardHeader className="p-0">
            <div className="relative aspect-square w-full bg-[#222]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={product.imageHint}
              />
              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-md z-10">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </CardHeader>
        </Link>
        <CardContent className="p-4 flex-grow bg-[#222]">
          <CardTitle className="text-lg font-headline mb-2 leading-tight">
            <Link href={`/products/${product.id}`} className="hover:text-red-500 transition-colors text-white">
              {product.name}
            </Link>
          </CardTitle>
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-400">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
              ))}
              {halfStar && <Star key="half" className="w-4 h-4 fill-current" />}
              {[...Array(5 - Math.ceil(product.rating))].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-600" />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-red-500">
              Rs {product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            {product.discount && product.discount > 0 && (
              <p className="text-sm text-gray-400 line-through decoration-gray-500">
                Rs {((product.price) / (1 - (product.discount / 100))).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 bg-[#222]">
          <Button className="w-full bg-gray-300 text-black hover:bg-red-600 hover:text-white transition-colors" onClick={() => addToCart(product, 1)}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
