export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: 'Engine' | 'Brakes' | 'Suspension' | 'Exhaust' | 'Interior' | 'Exterior';
  imageUrl: string;
  imageHint: string;
  rating: number;
  reviewCount: number;
  discount?: number;
};

export type Brand = {
  id: string;
  name: string;
  logoUrl: string;
  logoHint: string;
};

export type Order = {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};
