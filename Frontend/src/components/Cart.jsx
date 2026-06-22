import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck } from 'lucide-react';

export default function Cart({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-luxury-ivory dark:bg-luxury-onyx-dark border-l border-luxury-gold/20 shadow-2xl flex flex-col justify-between transition-colors duration-300">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-luxury-gold" />
              <h2 className="font-cinzel text-lg font-bold tracking-wider text-luxury-onyx dark:text-luxury-ivory">
                Shopping Bag
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-luxury-onyx/70 dark:text-luxury-ivory/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-20">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-dashed border-luxury-gold/45 text-luxury-gold">
                  <ShoppingBag className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold">Your Bag is Empty</h3>
                  <p className="text-xs text-luxury-onyx/55 dark:text-luxury-ivory/55 max-w-[240px] mt-1">
                    Browse our collections and customize jewelry pieces to fill your bag.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex gap-4 p-3 bg-luxury-ivory-dark/15 dark:bg-luxury-onyx/30 border border-black/5 dark:border-white/5 rounded-xl transition-all hover:border-luxury-gold/20"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 bg-black/10 dark:bg-white/5 rounded-lg border border-black/5 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                    </div>

                    {/* Item Metadata */}
                    <div className="flex-1 flex flex-col justify-between text-xs font-sans">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-cinzel text-[11px] font-bold text-luxury-onyx dark:text-luxury-ivory line-clamp-1 leading-snug">
                            {item.name}
                          </h4>
                          <span className="font-bold text-luxury-gold shrink-0 pl-2">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[10px] text-luxury-onyx/65 dark:text-luxury-ivory/65 space-y-0.5">
                          <p>Band: <span className="font-semibold text-luxury-onyx dark:text-luxury-ivory">{item.metal}</span></p>
                          {item.stone && <p>Stone: <span className="font-semibold text-luxury-onyx dark:text-luxury-ivory">{item.stone}</span></p>}
                          
                          {/* Engraving Tag */}
                          {item.engraving && (
                            <div className="inline-block mt-1 py-0.5 px-2 bg-luxury-gold/5 border border-luxury-gold/15 rounded text-[9px] font-serif italic text-luxury-gold-dark dark:text-luxury-gold-light">
                              Laser: {item.engraving}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls and Trash */}
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2 border border-black/10 dark:border-white/10 rounded">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/5 text-luxury-onyx dark:text-luxury-ivory"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold px-1 text-[11px] text-luxury-onyx dark:text-luxury-ivory">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/5 text-luxury-onyx dark:text-luxury-ivory"
                            title="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-luxury-onyx/40 dark:text-luxury-ivory/40 hover:text-luxury-ruby transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-6 border-t border-black/10 dark:border-white/10 space-y-4">
            <div className="space-y-2 text-xs font-sans text-left">
              <div className="flex justify-between text-luxury-onyx/70 dark:text-luxury-ivory/70">
                <span>Shipping & Insurance</span>
                <span className="text-luxury-gold font-bold uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-luxury-onyx dark:text-luxury-ivory pt-2 border-t border-black/5 dark:border-white/5">
                <span>Subtotal</span>
                <span className="text-luxury-gold">${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onCheckout}
                disabled={cartItems.length === 0}
                className={`w-full py-4 rounded-xl font-cinzel text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transform transition-all ${
                  cartItems.length === 0
                    ? 'bg-black/10 dark:bg-white/10 text-luxury-onyx/30 dark:text-luxury-ivory/30 cursor-not-allowed'
                    : 'gold-gradient-button active:scale-98 shadow-md'
                }`}
              >
                Proceed to Checkout
              </button>
              
              <div className="flex justify-center items-center gap-1.5 text-[9px] uppercase tracking-wider text-luxury-onyx/50 dark:text-luxury-ivory/50">
                <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Secure SSL Checkout & GIA Certified Shipping</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
