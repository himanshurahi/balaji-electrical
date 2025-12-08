'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Zap, Flame, Percent, Gift } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function DealsPage() {
  const saleProducts = products.filter(p => p.badge === 'sale' || p.originalPrice);
  const hotProducts = products.filter(p => p.badge === 'hot');

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-spark-600/20 via-volt-500/20 to-electric-500/20" />
        <div className="absolute inset-0 circuit-bg" />
        
        <div className="container mx-auto px-4 lg:px-6 relative">
          <nav className="flex items-center gap-2 text-sm text-carbon-400 mb-8">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carbon-300">Deals & Offers</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-spark-500/20 border border-spark-500/30 mb-6">
              <Flame className="w-5 h-5 text-spark-400" />
              <span className="text-spark-300 font-medium">Limited Time Offers</span>
            </div>

            <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6">
              Diwali <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-400 to-spark-400">Mega Sale</span>
            </h1>
            
            <p className="text-lg text-carbon-300 mb-8">
              Up to 40% off on premium electrical products. Limited stock available!
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { value: '03', label: 'Days' },
                { value: '12', label: 'Hours' },
                { value: '45', label: 'Minutes' },
                { value: '30', label: 'Seconds' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-carbon-800/80 border border-electric-500/30 flex items-center justify-center mb-2">
                    <span className="font-display text-2xl lg:text-3xl font-bold text-electric-400">
                      {item.value}
                    </span>
                  </div>
                  <span className="text-xs text-carbon-500">{item.label}</span>
                </div>
              ))}
            </div>

            <Link href="/products" className="btn-electric inline-flex items-center gap-2 text-lg">
              Shop All Deals
              <Zap className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Deal Categories */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Percent, title: 'Up to 40% Off', desc: 'On Lighting', color: 'from-electric-500 to-electric-600', link: '/products?category=lighting' },
              { icon: Zap, title: 'Flash Deals', desc: '24 Hour Only', color: 'from-volt-500 to-volt-600', link: '/products' },
              { icon: Gift, title: 'Bundle Offers', desc: 'Save More', color: 'from-spark-500 to-spark-600', link: '/products' },
              { icon: Flame, title: 'Hot Sellers', desc: 'Best Picks', color: 'from-red-500 to-red-600', link: '/products' },
            ].map((deal, index) => (
              <motion.div
                key={deal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={deal.link}
                  className={`block p-6 rounded-xl bg-gradient-to-br ${deal.color} hover:scale-105 transition-transform`}
                >
                  <deal.icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="font-display text-xl font-bold text-white">{deal.title}</h3>
                  <p className="text-white/80">{deal.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-12 lg:py-16 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                <span className="text-spark-400">Sale</span> Products
              </h2>
              <p className="text-carbon-400">Grab these deals before they&apos;re gone!</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors"
            >
              View All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="product-grid">
            {saleProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-volt-400 flex items-center gap-1"><Flame className="w-6 h-6" /> Hot</span> Sellers
              </h2>
              <p className="text-carbon-400">Top picks that customers love</p>
            </div>
          </motion.div>

          <div className="product-grid">
            {hotProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Coupon Banner */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-electric-600 to-volt-500 p-8 lg:p-12"
          >
            <div className="absolute inset-0 circuit-bg opacity-20" />
            <div className="relative text-center">
              <Gift className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                Exclusive Coupon Code
              </h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Use code below at checkout to get an extra 20% off on your order!
              </p>
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-xl bg-white/20 backdrop-blur mb-6">
                <span className="font-display text-2xl lg:text-3xl font-bold text-white tracking-widest">
                  DIWALI20
                </span>
                <button className="px-4 py-2 rounded-lg bg-white text-electric-600 font-semibold text-sm hover:bg-carbon-100 transition-colors">
                  Copy
                </button>
              </div>
              <p className="text-sm text-white/60">
                Valid till 31st October 2024. Minimum order ₹999.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Sale Products */}
      <section className="py-12 lg:py-16 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
              All <span className="text-electric-400">Deals</span>
            </h2>
            <p className="text-carbon-400">Browse our complete collection of discounted products</p>
          </motion.div>

          <div className="product-grid">
            {products.slice(0, 12).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products" className="btn-outline-electric inline-flex items-center gap-2">
              View All Products
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

