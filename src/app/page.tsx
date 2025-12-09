'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Truck, Shield, Headphones, ChevronRight, Star, Sparkles, Lightbulb, Cable, ToggleRight, Fan, Home, Wrench, LucideIcon } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories, getFeaturedProducts } from '@/data/products';

// Map icon names to Lucide components
const categoryIcons: Record<string, LucideIcon> = {
  Lightbulb,
  Cable,
  ToggleRight,
  Fan,
  Home,
  Wrench,
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'On orders above ₹999',
      color: 'text-electric-400',
    },
    {
      icon: Shield,
      title: 'Genuine Products',
      description: '100% authentic warranty',
      color: 'text-green-400',
    },
    {
      icon: Zap,
      title: 'Quick Service',
      description: 'Same day dispatch',
      color: 'text-volt-400',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Expert assistance',
      color: 'text-spark-400',
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/20 rounded-full blur-[128px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-volt-500/15 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 circuit-bg" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-500/10 border border-electric-500/30 mb-6"
              >
                <Sparkles className="w-4 h-4 text-volt-400" />
                <span className="text-sm text-electric-300">Diwali Sale: Up to 40% Off</span>
              </motion.div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                <span className="text-white">Power Your</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 via-electric-300 to-volt-400">
                  World
                </span>
                <span className="text-white"> with</span>
                <br />
                <span className="text-white">Quality</span>
              </h1>

              <p className="text-lg lg:text-xl text-carbon-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Discover premium electrical products from top brands at unbeatable prices. 
                LED lights, fans, wires, switches & more.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products" className="btn-electric inline-flex items-center justify-center gap-2 text-lg">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/categories" className="btn-outline-electric inline-flex items-center justify-center gap-2 text-lg">
                  Browse Categories
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-8 mt-12 justify-center lg:justify-start"
              >
                {[
                  { value: '10K+', label: 'Products' },
                  { value: '50K+', label: 'Happy Customers' },
                  { value: '25+', label: 'Years Experience' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-2xl lg:text-3xl font-bold text-electric-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-carbon-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image/Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square">
                {/* Glowing Circle Background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-500/20 to-transparent blur-3xl animate-pulse-slow" />
                
                {/* Main Product Display */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="relative">
                    {/* Central Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full bg-electric-500/30 blur-[64px] animate-glow" />
                    </div>
                    
                    {/* Product Images - Floating */}
                    <div className="relative w-80 h-80">
                      {[
                        { img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=200', pos: 'top-0 left-1/2 -translate-x-1/2', delay: '0s' },
                        { img: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=200', pos: 'bottom-0 left-0', delay: '0.5s' },
                        { img: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200', pos: 'bottom-0 right-0', delay: '1s' },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className={`absolute ${item.pos} w-28 h-28 rounded-xl overflow-hidden border-2 border-electric-500/50 shadow-lg shadow-electric-500/20 product-thumbnail`}
                          animate={{ y: [0, -15, 0] }}
                          transition={{ duration: 3, delay: parseFloat(item.delay), repeat: Infinity }}
                        >
                          <Image
                            src={item.img}
                            alt="Product"
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ))}
                      
                      {/* Center Icon */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                          className="w-24 h-24 rounded-full border-2 border-dashed border-electric-500/50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Zap className="w-12 h-12 text-electric-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-3 h-3 bg-volt-400 rounded-full animate-ping" />
                <div className="absolute bottom-20 left-10 w-2 h-2 bg-electric-400 rounded-full animate-pulse" />
                <div className="absolute top-1/2 right-0 w-4 h-4 bg-spark-400 rounded-full animate-bounce" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-electric-500/50 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-electric-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-carbon-900/50 border-y border-electric-500/10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-lg bg-carbon-800 flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm lg:text-base">{feature.title}</h3>
                  <p className="text-carbon-400 text-xs lg:text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Shop by <span className="text-electric-400">Category</span>
            </h2>
            <p className="text-carbon-400 max-w-2xl mx-auto">
              Explore our wide range of electrical products across different categories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {categories.map((category, index) => {
              const IconComponent = categoryIcons[category.icon];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/products?category=${category.id}`}
                    className="category-card block text-center group h-full"
                  >
                    <div className="flex flex-col items-center justify-center h-44">
                      <div className="w-14 h-14 rounded-xl bg-electric-500/10 flex items-center justify-center mb-4 group-hover:bg-electric-500/20 transition-colors">
                        {IconComponent && <IconComponent className="w-7 h-7 text-electric-400" />}
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-electric-400 transition-colors mb-1 line-clamp-2 min-h-[2.5rem] flex items-center text-center">
                        {category.name}
                      </h3>
                      <p className="text-sm text-carbon-500">{category.productCount} Products</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
          >
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-2">
                Featured <span className="text-electric-400">Products</span>
              </h2>
              <p className="text-carbon-400">Handpicked bestsellers just for you</p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors font-medium"
            >
              View All Products
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="product-grid">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-electric-600 via-electric-500 to-volt-500"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 circuit-bg" />
            </div>

            <div className="relative px-6 py-12 lg:px-16 lg:py-20">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                    ⚡ Limited Time Offer
                  </span>
                  <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
                    Diwali Mega Sale
                  </h2>
                  <p className="text-lg text-white/80 mb-8 max-w-lg">
                    Get up to 40% off on all LED lighting products. Light up your home this festive season!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/products?category=lighting"
                      className="px-8 py-4 bg-white text-electric-600 font-bold rounded-lg hover:bg-carbon-100 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      Shop Lighting
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/deals"
                      className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                    >
                      View All Deals
                    </Link>
                  </div>
                </div>

                {/* Countdown/Stats */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
                  {[
                    { value: '40%', label: 'Max Discount' },
                    { value: '500+', label: 'Products on Sale' },
                    { value: '3', label: 'Days Left' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="w-28 h-28 lg:w-32 lg:h-32 rounded-2xl bg-white/10 backdrop-blur flex flex-col items-center justify-center"
                    >
                      <div className="font-display text-2xl lg:text-3xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs lg:text-sm text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Products Preview */}
      <section className="py-16 lg:py-24 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
          >
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-2">
                Latest <span className="text-electric-400">Arrivals</span>
              </h2>
              <p className="text-carbon-400">Fresh stock, fresh deals</p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors font-medium"
            >
              Browse All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="product-grid">
            {products.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products" className="btn-electric inline-flex items-center gap-2">
              Explore All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              What Our <span className="text-electric-400">Customers</span> Say
            </h2>
            <p className="text-carbon-400 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Balaji Electricals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Rajesh Kumar',
                location: 'Mumbai',
                rating: 5,
                comment: 'Excellent quality products and fast delivery. The LED bulbs I ordered are working perfectly. Best electrical shop online!',
              },
              {
                name: 'Priya Sharma',
                location: 'Delhi',
                rating: 5,
                comment: 'Great experience! The customer service team helped me choose the right wiring for my new house. Highly recommended.',
              },
              {
                name: 'Amit Patel',
                location: 'Bangalore',
                rating: 5,
                comment: 'Been buying from Balaji Electricals for 3 years now. Always genuine products with proper warranty. Never disappointed!',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-electric"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-volt-400 fill-volt-400" />
                  ))}
                </div>
                <p className="text-carbon-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-electric-500/20 flex items-center justify-center text-electric-400 font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-carbon-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 lg:py-24 bg-carbon-900/30">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
              Trusted <span className="text-electric-400">Brands</span>
            </h2>
            <p className="text-carbon-400">We partner with the best electrical brands in India</p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {['Philips', 'Havells', 'Crompton', 'Anchor', 'Finolex', 'Legrand', 'Wipro', 'Orient'].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-xl lg:text-2xl font-display font-bold text-carbon-500 hover:text-electric-400 transition-colors cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

