'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, Lightbulb, Cable, ToggleRight, Fan, Home, Wrench, LucideIcon } from 'lucide-react';
import { categories } from '@/data/products';

// Map icon names to Lucide components
const categoryIcons: Record<string, LucideIcon> = {
  Lightbulb,
  Cable,
  ToggleRight,
  Fan,
  Home,
  Wrench,
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-8 lg:py-12 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm text-carbon-400 mb-4">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carbon-300">Categories</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-2">
              Shop by <span className="text-electric-400">Category</span>
            </h1>
            <p className="text-carbon-400">
              Explore our comprehensive range of electrical products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => {
              const IconComponent = categoryIcons[category.icon];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/products?category=${category.id}`}
                    className="group relative block overflow-hidden rounded-2xl h-80"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="w-14 h-14 rounded-xl bg-electric-500/20 backdrop-blur flex items-center justify-center mb-4">
                        {IconComponent && <IconComponent className="w-7 h-7 text-electric-400" />}
                      </div>
                      <h2 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-electric-400 transition-colors">
                        {category.name}
                      </h2>
                      <p className="text-carbon-300 mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-electric-400">
                          {category.productCount} Products
                        </span>
                        <span className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          Shop Now
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-electric-500/50 rounded-2xl transition-colors" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-12 lg:py-20 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
              Featured <span className="text-electric-400">Brands</span>
            </h2>
            <p className="text-carbon-400">We stock products from India&apos;s most trusted electrical brands</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {['Philips', 'Havells', 'Crompton', 'Anchor', 'Finolex', 'Legrand', 'Wipro', 'Orient'].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-center p-6 rounded-xl bg-carbon-800/30 border border-electric-500/10 hover:border-electric-500/30 transition-colors"
              >
                <span className="font-display font-bold text-carbon-400 hover:text-electric-400 transition-colors">
                  {brand}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-electric-600/20 to-volt-500/20 border border-electric-500/20 p-8 lg:p-16 text-center"
          >
            <div className="absolute inset-0 circuit-bg opacity-50" />
            <div className="relative">
              <Sparkles className="w-12 h-12 text-volt-400 mx-auto mb-6" />
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-white mb-4">
                Can&apos;t Find What You&apos;re Looking For?
              </h2>
              <p className="text-carbon-300 mb-8 max-w-2xl mx-auto">
                Contact our team for custom orders, bulk purchases, or special requirements. 
                We&apos;re here to help you find the perfect electrical solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="btn-electric inline-flex items-center justify-center gap-2">
                  Browse All Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-outline-electric inline-flex items-center justify-center gap-2">
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

