'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Grid, List, SlidersHorizontal, Lightbulb, Cable, ToggleRight, Fan, Home, Wrench, LucideIcon } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories, searchProducts, getProductsByCategory } from '@/data/products';

// Map icon names to Lucide components
const categoryIcons: Record<string, LucideIcon> = {
  Lightbulb,
  Cable,
  ToggleRight,
  Fan,
  Home,
  Wrench,
};

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // In stock filter
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, priceRange, sortBy, inStockOnly, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 15000]);
    setSortBy('featured');
    setInStockOnly(false);
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    priceRange[0] > 0 || priceRange[1] < 15000,
    inStockOnly,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-8 lg:py-12 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-2">
              {searchQuery ? (
                <>
                  Search Results for &ldquo;<span className="text-electric-400">{searchQuery}</span>&rdquo;
                </>
              ) : selectedCategory !== 'all' ? (
                <>
                  <span className="text-electric-400 capitalize">{selectedCategory}</span> Products
                </>
              ) : (
                <>
                  All <span className="text-electric-400">Products</span>
                </>
              )}
            </h1>
            <p className="text-carbon-400">
              {filteredProducts.length} products found
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              {/* Categories */}
              <div className="card-electric">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-electric-400" />
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-electric-500/20 text-electric-400'
                        : 'text-carbon-400 hover:bg-carbon-800'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map(category => {
                    const IconComponent = categoryIcons[category.icon];
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                          selectedCategory === category.id
                            ? 'bg-electric-500/20 text-electric-400'
                            : 'text-carbon-400 hover:bg-carbon-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {IconComponent && <IconComponent className="w-4 h-4" />}
                          {category.name}
                        </span>
                        <span className="text-xs text-carbon-500">{category.productCount}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="card-electric">
                <h3 className="font-semibold text-white mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-carbon-500 mb-1 block">Min</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="input-electric text-sm"
                        placeholder="₹0"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-carbon-500 mb-1 block">Max</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 15000])}
                        className="input-electric text-sm"
                        placeholder="₹15000"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-electric-500"
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="card-electric">
                <h3 className="font-semibold text-white mb-4">Availability</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-5 h-5 rounded border-electric-500/30 bg-carbon-800 accent-electric-500"
                  />
                  <span className="text-carbon-300">In Stock Only</span>
                </label>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full py-3 rounded-lg border border-carbon-700 text-carbon-400 hover:border-electric-500 hover:text-electric-400 transition-colors"
                >
                  Clear All Filters ({activeFiltersCount})
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-carbon-800 border border-electric-500/20 text-carbon-300"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-electric-500 text-white text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-4 ml-auto">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 rounded-lg bg-carbon-800 border border-electric-500/20 text-carbon-300 focus:outline-none focus:border-electric-500 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-carbon-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-carbon-800 border border-electric-500/20">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-electric-500 text-white' : 'text-carbon-400'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-electric-500 text-white' : 'text-carbon-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'product-grid' : 'space-y-4'}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-carbon-400 mb-6">Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="btn-electric">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-80 max-w-full bg-carbon-900 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold text-white">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-carbon-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-white mb-4">Categories</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === 'all'
                            ? 'bg-electric-500/20 text-electric-400'
                            : 'text-carbon-400 hover:bg-carbon-800'
                        }`}
                      >
                        All Products
                      </button>
                      {categories.map(category => {
                        const IconComponent = categoryIcons[category.icon];
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                              selectedCategory === category.id
                                ? 'bg-electric-500/20 text-electric-400'
                                : 'text-carbon-400 hover:bg-carbon-800'
                            }`}
                          >
                            {IconComponent && <IconComponent className="w-4 h-4" />}
                            {category.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-white mb-4">Price Range</h3>
                    <input
                      type="range"
                      min="0"
                      max="15000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-electric-500"
                    />
                    <div className="flex justify-between text-sm text-carbon-400 mt-2">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-5 h-5 rounded accent-electric-500"
                      />
                      <span className="text-carbon-300">In Stock Only</span>
                    </label>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full btn-electric"
                  >
                    Apply Filters
                  </button>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full py-3 rounded-lg border border-carbon-700 text-carbon-400"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="spinner-electric" /></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}

