'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  ChevronRight,
  Check,
  Zap,
  Flame,
} from 'lucide-react';
import { getProductById, getProductsByCategory, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = getProductById(productId);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const { addToCart, isInCart } = useCart();

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

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

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="py-4 bg-carbon-950/50 border-b border-electric-500/10">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm text-carbon-400">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-electric-400 transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/products?category=${product.category}`} className="hover:text-electric-400 transition-colors capitalize">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carbon-300 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square product-image-hero glow-border">
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
                </div>

                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-red-500 text-white text-sm font-bold">
                    -{discount}%
                  </div>
                )}

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Gallery (placeholder for future) */}
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all product-thumbnail ${
                      index === 0 ? 'border-electric-500' : 'border-transparent opacity-50'
                    }`}
                  >
                    <Image
                      src={product.image}
                      alt=""
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category */}
              <span className="inline-flex items-center gap-2 text-sm text-electric-400 uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                {product.category}
              </span>

              {/* Title */}
              <h1 className="font-display text-2xl lg:text-4xl font-bold text-white leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-volt-400 fill-volt-400'
                          : 'text-carbon-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-carbon-400">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-volt-400 to-spark-400">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-carbon-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-sm font-semibold">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Short Description */}
              <p className="text-carbon-300 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${
                    product.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}
                />
                <span className={`font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                  {product.inStock ? 'In Stock - Ready to Ship' : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              {product.inStock && (
                <div className="flex items-center gap-4">
                  <span className="text-carbon-400">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity-btn"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="quantity-btn"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    isInCart(product.id)
                      ? 'bg-green-500/20 text-green-400 border-2 border-green-500/30'
                      : product.inStock
                      ? 'btn-electric'
                      : 'bg-carbon-700 text-carbon-500 cursor-not-allowed'
                  }`}
                >
                  {isInCart(product.id) ? (
                    <>
                      <Check className="w-6 h-6" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button className="w-14 h-14 flex items-center justify-center rounded-xl border-2 border-electric-500/30 text-carbon-400 hover:text-red-400 hover:border-red-400 transition-all">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="w-14 h-14 flex items-center justify-center rounded-xl border-2 border-electric-500/30 text-carbon-400 hover:text-electric-400 hover:border-electric-400 transition-all">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Buy Now */}
              {product.inStock && (
                <Link
                  href="/cart"
                  onClick={handleAddToCart}
                  className="block w-full py-4 rounded-xl bg-gradient-to-r from-volt-500 to-spark-500 text-carbon-900 font-bold text-lg text-center hover:shadow-lg hover:shadow-volt-500/30 transition-all"
                >
                  Buy Now
                </Link>
              )}

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-carbon-800">
                {[
                  { icon: Truck, text: 'Free Delivery', sub: 'Orders above ₹999' },
                  { icon: Shield, text: 'Genuine Product', sub: 'Original warranty' },
                  { icon: RotateCcw, text: 'Easy Returns', sub: '7 days return' },
                  { icon: Zap, text: 'Fast Shipping', sub: 'Same day dispatch' },
                ].map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-electric-500/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-electric-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{feature.text}</p>
                      <p className="text-xs text-carbon-500">{feature.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 lg:py-16 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Tab Headers */}
          <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'description', label: 'Description' },
              { id: 'specs', label: 'Specifications' },
              { id: 'reviews', label: `Reviews (${product.reviews})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-electric-500 text-white'
                    : 'bg-carbon-800/50 text-carbon-400 hover:bg-carbon-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="card-electric">
            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-invert max-w-none"
              >
                <p className="text-carbon-300 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>
                <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {[
                    'Premium quality materials for long-lasting durability',
                    'Energy efficient design for reduced power consumption',
                    'Easy installation with comprehensive guide included',
                    'ISI certified for safety and reliability',
                    'Manufacturer warranty included',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-carbon-300">
                      <Check className="w-5 h-5 text-electric-400 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {product.specs ? (
                  <div className="grid gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between py-3 border-b border-carbon-800 last:border-0"
                      >
                        <span className="text-carbon-400">{key}</span>
                        <span className="font-medium text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-carbon-400">No specifications available.</p>
                )}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Rating Summary */}
                <div className="flex flex-col md:flex-row gap-8 pb-6 border-b border-carbon-800">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-2">{product.rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-volt-400 fill-volt-400'
                              : 'text-carbon-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-carbon-400">{product.reviews.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm text-carbon-400 w-8">{stars}★</span>
                        <div className="flex-1 h-2 bg-carbon-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-volt-400 rounded-full"
                            style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                          />
                        </div>
                        <span className="text-sm text-carbon-500 w-10">
                          {stars === 5 ? '70%' : stars === 4 ? '20%' : '10%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                {[
                  { name: 'Rahul S.', rating: 5, date: '2 weeks ago', comment: 'Excellent product! Works exactly as described. Fast delivery and great packaging.' },
                  { name: 'Priya M.', rating: 4, date: '1 month ago', comment: 'Good quality product. Slightly expensive but worth the price for the reliability.' },
                  { name: 'Amit K.', rating: 5, date: '1 month ago', comment: 'Best in class! Have been using it for a month now without any issues.' },
                ].map((review, index) => (
                  <div key={index} className="py-4 border-b border-carbon-800 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-electric-500/20 flex items-center justify-center text-electric-400 font-bold">
                          {review.name[0]}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{review.name}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < review.rating ? 'text-volt-400 fill-volt-400' : 'text-carbon-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-carbon-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-carbon-300 pl-13">{review.comment}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white">
                Related <span className="text-electric-400">Products</span>
              </h2>
              <Link
                href={`/products?category=${product.category}`}
                className="text-electric-400 hover:text-electric-300 transition-colors flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="product-grid">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

