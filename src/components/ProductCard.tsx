'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, Star, Eye, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group card-electric relative"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.badge === 'new' && (
          <span className="badge-electric">NEW</span>
        )}
        {product.badge === 'sale' && (
          <span className="badge-spark">SALE</span>
        )}
        {product.badge === 'hot' && (
          <span className="badge-volt flex items-center gap-1">
            <Flame className="w-3 h-3" /> HOT
          </span>
        )}
        {discount > 0 && (
          <span className="px-2 py-1 text-xs font-bold rounded bg-red-500/90 text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-carbon-900/80 border border-carbon-700 text-carbon-400 hover:text-red-400 hover:border-red-400 transition-all opacity-0 group-hover:opacity-100">
        <Heart className="w-4 h-4" />
      </button>

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="product-image-container aspect-square mb-4 bg-carbon-800/50 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Quick View Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button className="px-4 py-2 flex items-center gap-2 rounded-full bg-white/90 text-carbon-900 font-medium text-sm hover:bg-white transition-colors">
              <Eye className="w-4 h-4" />
              Quick View
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Category */}
        <span className="text-xs font-medium text-electric-400 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-white line-clamp-2 group-hover:text-electric-400 transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-volt-400 fill-volt-400'
                    : 'text-carbon-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-carbon-400">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="price-tag">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-carbon-500 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              product.inStock ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className={`text-xs ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`w-full mt-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            isInCart(product.id)
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : product.inStock
              ? 'btn-electric'
              : 'bg-carbon-700 text-carbon-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isInCart(product.id) ? 'Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </motion.div>
  );
}

