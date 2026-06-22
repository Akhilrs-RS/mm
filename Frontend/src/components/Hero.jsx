import React from 'react';
import { ArrowRight, Sparkles, Shield, Compass } from 'lucide-react';

export default function Hero({ onExplore, onCustomize }) {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-gradient-to-b from-luxury-ivory to-luxury-ivory-dark/10 dark:from-luxury-onyx-dark dark:to-luxury-onyx/40 transition-colors duration-300">
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Content (Left) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 md:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-luxury-gold/30 bg-luxury-gold/5 rounded-full">
              <Sparkles className="w-4 h-4 text-luxury-gold" />
              <span className="text-[11px] uppercase tracking-widest font-sans font-semibold text-luxury-gold-dark dark:text-luxury-gold-light">
                Exquisite Craftsmanship
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide leading-tight text-luxury-onyx dark:text-luxury-ivory">
                Crafted for the <br />
                <span className="gold-gradient-text">Exceptional</span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-luxury-onyx/75 dark:text-luxury-ivory/75 max-w-xl leading-relaxed font-light">
                Discover MM Jewellery, where master artisans shape platinum, gold, and rare conflict-free gemstones into expressions of eternal luxury. Each piece is custom-breathed with heritage, brilliance, and precision.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={onExplore}
                className="gold-gradient-button px-8 py-4 rounded-md flex items-center justify-center gap-2 group transform active:scale-95 transition-all"
              >
                <span>Browse the Showroom</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={onCustomize}
                className="border border-luxury-gold text-luxury-onyx dark:text-luxury-ivory hover:bg-luxury-gold/10 px-8 py-4 rounded-md font-medium tracking-wide transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Design Custom Piece</span>
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/10 dark:border-white/10 w-full">
              <div className="flex flex-col">
                <span className="font-cinzel text-lg sm:text-xl font-bold text-luxury-gold">100%</span>
                <span className="text-[10px] sm:text-xs text-luxury-onyx/60 dark:text-luxury-ivory/60 tracking-wider uppercase font-medium">
                  Conflict-Free
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg sm:text-xl font-bold text-luxury-gold">18K / Pt</span>
                <span className="text-[10px] sm:text-xs text-luxury-onyx/60 dark:text-luxury-ivory/60 tracking-wider uppercase font-medium">
                  Certified Metals
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg sm:text-xl font-bold text-luxury-gold">Lifetime</span>
                <span className="text-[10px] sm:text-xs text-luxury-onyx/60 dark:text-luxury-ivory/60 tracking-wider uppercase font-medium">
                  Warranty
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual Asset (Right) */}
          <div className="lg:col-span-6 flex justify-center relative select-none animate-fade-in">
            {/* Soft gold backdrop glow under the ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-luxury-gold/10 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />
            
            {/* Visual Frame */}
            <div className="relative w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-2xl overflow-hidden border border-luxury-gold/20 shadow-2xl p-2 bg-gradient-to-tr from-luxury-onyx-light to-luxury-onyx/90">
              <img 
                src="/hero_jewelry.png" 
                alt="MM Luxury Ring Showpiece" 
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
              />
              {/* Overlay Glassmorphic Badge */}
              <div className="absolute bottom-6 left-6 luxury-glass px-4 py-2 rounded-lg flex items-center gap-3">
                <div className="flex flex-col text-left">
                  <span className="text-[9px] tracking-widest text-luxury-onyx/60 dark:text-luxury-ivory/60 uppercase font-bold">
                    Featured Heirlooms
                  </span>
                  <span className="font-cinzel text-xs font-semibold text-luxury-gold-dark dark:text-luxury-gold-light">
                    The Elysian Solitaire
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
