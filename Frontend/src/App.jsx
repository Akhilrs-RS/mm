import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Collection from './components/Collection';
import Customizer from './components/Customizer';
import VirtualTryOn from './components/VirtualTryOn';
import Consultation from './components/Consultation';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, collection, customizer, tryon, consultation, checkout
  const [theme, setTheme] = useState('dark'); // dark (default for luxury feel), light
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizerPreselected, setCustomizerPreselected] = useState(null);

  // Synchronize dark theme class with document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Cart Operations
  const handleAddToBag = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId, q) => {
    if (q <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity: q } : i));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateToCustomizer = (product) => {
    setCustomizerPreselected(product);
    setActiveTab('customizer');
  };

  // Quick navigation helpers for Hero
  const navigateToExplore = () => setActiveTab('collection');
  const navigateToCustomize = () => {
    setCustomizerPreselected(null);
    setActiveTab('customizer');
  };

  return (
    <div className="min-h-screen bg-luxury-ivory text-luxury-onyx dark:bg-luxury-onyx dark:text-luxury-ivory transition-colors duration-300 flex flex-col justify-between">
      
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero onExplore={navigateToExplore} onCustomize={navigateToCustomize} />
            <Philosophy />
          </>
        )}

        {activeTab === 'collection' && (
          <Collection 
            onAddToBag={handleAddToBag} 
            onNavigateToCustomizer={handleNavigateToCustomizer} 
          />
        )}

        {activeTab === 'customizer' && (
          <Customizer 
            preselectedProduct={customizerPreselected}
            onAddToBag={handleAddToBag}
          />
        )}

        {activeTab === 'tryon' && (
          <VirtualTryOn />
        )}

        {activeTab === 'consultation' && (
          <Consultation />
        )}

        {activeTab === 'checkout' && (
          <Checkout 
            cartItems={cartItems} 
            onBackToBag={() => setActiveTab('collection')} 
            onClearCart={handleClearCart}
          />
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setActiveTab('checkout');
        }}
      />

      {/* Luxury Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 bg-luxury-ivory-dark/30 dark:bg-luxury-onyx-dark/50 pt-16 pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
            
            {/* Column 1: Brand Identifier */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center w-8 h-8 border border-luxury-gold rounded-full">
                  <Sparkles className="w-4 h-4 text-luxury-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="font-cinzel text-lg font-bold tracking-widest text-luxury-onyx dark:text-luxury-ivory">
                    M M
                  </span>
                  <span className="text-[8px] tracking-[0.25em] font-sans text-luxury-gold uppercase font-semibold">
                    Jewellery
                  </span>
                </div>
              </div>
              <p className="font-sans text-[11px] text-luxury-onyx/65 dark:text-luxury-ivory/65 leading-relaxed font-light">
                Creating luxury customized rings, necklaces, and GIA certified gemstones. Hand-tailored in Milan since 2011.
              </p>
            </div>

            {/* Column 2: Showroom Coordinates */}
            <div className="space-y-3.5">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-luxury-gold">
                Coordinates
              </h4>
              <div className="space-y-2 text-xs font-sans text-luxury-onyx/75 dark:text-luxury-ivory/75 font-light">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>12 Via della Spiga, Quadrilatero d'Oro, Milan, Italy</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                  <span>+39 (02) 876-5432</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                  <span>concierge@mmjewellery.com</span>
                </p>
              </div>
            </div>

            {/* Column 3: Hours & Support */}
            <div className="space-y-3.5">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-luxury-gold">
                Showroom Hours
              </h4>
              <div className="space-y-1.5 text-xs font-sans text-luxury-onyx/75 dark:text-luxury-ivory/75 font-light">
                <p>Monday – Friday: <span className="font-semibold">10:00 AM – 7:30 PM</span></p>
                <p>Saturday: <span className="font-semibold">11:00 AM – 6:00 PM</span></p>
                <p>Sunday: <span className="font-semibold">Private Viewing Only</span></p>
                <p className="text-[10px] text-luxury-gold tracking-wide uppercase font-bold pt-2 cursor-pointer hover:underline" onClick={() => setActiveTab('consultation')}>
                  Request Showroom Access
                </p>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-4">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-luxury-gold">
                Boutique Newsletter
              </h4>
              <p className="font-sans text-[11px] text-luxury-onyx/65 dark:text-luxury-ivory/65 leading-relaxed font-light">
                Receive private sketches, new gemstone alerts, and seasonal couture collections.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-l-md text-xs focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                />
                <button className="gold-gradient-button px-4 rounded-r-md text-xs font-cinzel font-bold">
                  Join
                </button>
              </div>
              <div className="flex gap-4 pt-1">
                <a href="https://instagram.com" className="text-luxury-onyx/60 dark:text-luxury-ivory/60 hover:text-luxury-gold transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" className="text-luxury-onyx/60 dark:text-luxury-ivory/60 hover:text-luxury-gold transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Copyrights and Terms */}
          <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-wider text-luxury-onyx/40 dark:text-luxury-ivory/40">
            <span>© {new Date().getFullYear()} MM Jewellery. All Rights Reserved.</span>
            <div className="flex gap-6 mt-4 md:mt-0 font-sans">
              <a href="#" className="hover:text-luxury-gold">Ethical sourcing statement</a>
              <a href="#" className="hover:text-luxury-gold">Privacy policy</a>
              <a href="#" className="hover:text-luxury-gold">Terms of service</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
