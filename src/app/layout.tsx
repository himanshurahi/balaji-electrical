import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { UserProvider } from '@/context/UserContext';

export const metadata: Metadata = {
  title: 'Balaji Electricals | Premium Electrical Products',
  description: 'Your trusted destination for quality electrical products - LED lights, fans, wires, switches, and home appliances at best prices.',
  keywords: 'electrical, LED lights, fans, wires, switches, home appliances, electrical shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <UserProvider>
          <CartProvider>
            {/* Animated Background */}
            <div className="animated-bg" />
            
            {/* Main Content */}
            <div className="relative min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 pt-24 lg:pt-32">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}

