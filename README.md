# ⚡ Balaji Electricals

A modern, responsive e-commerce website for electrical products built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Balaji Electricals](https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800)

## ✨ Features

- **Modern UI/UX** - Beautiful dark theme with electric blue accents, glowing effects, and smooth animations
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop devices
- **Product Catalog** - Browse products by categories with advanced filtering and sorting
- **Shopping Cart** - Full cart functionality with quantity management and coupon codes
- **Product Details** - Detailed product pages with specifications, reviews, and related products
- **Search** - Quick product search functionality
- **Deals Section** - Special offers and promotional banners
- **Performance Optimized** - Built with Next.js for optimal performance

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** React Context API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder:

```bash
cd "Balaji Electricals"
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── products/          # Products pages
│   │   ├── page.tsx       # Products listing
│   │   └── [id]/          # Product detail
│   ├── cart/              # Shopping cart
│   ├── categories/        # Categories page
│   ├── deals/             # Deals & offers
│   └── about/             # About page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── ProductCard.tsx    # Product card component
├── context/               # React Context
│   └── CartContext.tsx    # Cart state management
└── data/                  # Static data
    └── products.ts        # Product data & helpers
```

## 🎨 Design Features

- **Electric Theme** - Dark background with vibrant electric blue (#0ea5e9) accents
- **Glow Effects** - Subtle neon glow effects on buttons and cards
- **Circuit Patterns** - Decorative circuit board background patterns
- **Custom Fonts** - Orbitron (display) and Rajdhani (body) fonts
- **Smooth Animations** - Page transitions, hover effects, and scroll animations
- **Glass Morphism** - Frosted glass effects on cards and modals

## 🛒 Features Overview

### Home Page
- Hero section with animated elements
- Featured products carousel
- Category showcase
- Promotional banners
- Customer testimonials
- Brand showcase

### Products Page
- Grid/List view toggle
- Category filtering
- Price range filter
- Stock availability filter
- Sorting options (featured, price, rating, newest)
- Mobile-friendly filter drawer

### Product Detail
- Image gallery
- Specifications tab
- Reviews section
- Related products
- Add to cart with quantity selector

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Coupon code support
- Order summary
- Free shipping calculator

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px  
- **Desktop:** > 1024px

## 🔧 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```ts
colors: {
  electric: { /* blue shades */ },
  volt: { /* yellow shades */ },
  spark: { /* orange shades */ },
  carbon: { /* gray shades */ },
}
```

### Products

Edit `src/data/products.ts` to add or modify products:

```ts
export const products: Product[] = [
  {
    id: 1,
    name: 'Product Name',
    price: 999,
    // ...
  }
]
```

## 📄 License

This project is for educational/demonstration purposes.

## 🙏 Credits

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

---

Built with ⚡ by Balaji Electricals Team

