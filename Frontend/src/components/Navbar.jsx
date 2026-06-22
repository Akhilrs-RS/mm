import React from 'react';
import { ShoppingBag, Sun, Moon, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  theme, 
  toggleTheme, 
  cartItemsCount, 
  setIsCartOpen 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 'home', label: 'Boutique Home' },
    { id: 'collection', label: 'The Showroom' },
    { id: 'customizer', label: 'Jewellery Customizer' },
    { id: 'tryon', label: 'Virtual Try-On' },
    { id: 'consultation', label: 'Private Booking' }
  ];

  return (
    <nav className="sticky top-0 z-50 transition-colors duration-300 luxury-glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
          >
            <div className="relative flex items-center justify-center w-10 h-10 border border-luxury-gold rounded-full transition-transform group-hover:rotate-45 duration-700">
              <Sparkles className="w-5 h-5 text-luxury-gold group-hover:scale-115 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-luxury-onyx dark:text-luxury-ivory transition-colors">
                M M
              </span>
              <span className="text-[9px] tracking-[0.3em] font-sans text-luxury-gold uppercase font-medium">
                Jewellery
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`font-cinzel text-sm tracking-wider uppercase font-medium transition-all duration-300 relative py-2 ${
                  activeTab === item.id 
                    ? 'text-luxury-gold' 
                    : 'text-luxury-onyx/75 dark:text-luxury-ivory/75 hover:text-luxury-gold'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-luxury-gold animate-fade-in" />
                )}
              </button>
            ))}
          </div>

          {/* Right Utilities (Theme, Cart, Mobile Menu Button) */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-luxury-onyx/85 dark:text-luxury-ivory/85 hover:text-luxury-gold transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-luxury-gold-light animate-pulse-subtle" />
              ) : (
                <Moon className="w-5 h-5 text-luxury-onyx" />
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-luxury-onyx/85 dark:text-luxury-ivory/85 hover:text-luxury-gold transition-all duration-300 group"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-sans font-bold text-luxury-onyx animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-luxury-onyx dark:text-luxury-ivory"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-black/10 dark:border-white/10 luxury-glass transition-all duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 font-cinzel text-sm uppercase tracking-wider font-medium rounded-md transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'text-luxury-gold bg-luxury-gold/5' 
                    : 'text-luxury-onyx dark:text-luxury-ivory hover:text-luxury-gold hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
