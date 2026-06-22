import React from 'react';
import { CreditCard, ShieldCheck, CheckCircle2, Gift, ChevronLeft, Award } from 'lucide-react';

export default function Checkout({ cartItems, onBackToBag, onClearCart }) {
  const [orderComplete, setOrderComplete] = React.useState(false);
  const [packaging, setPackaging] = React.useState('velvet'); // velvet (free), wooden (+50)
  const [orderRef, setOrderRef] = React.useState('');
  
  // Card Form State
  const [cardName, setCardName] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardCvv, setCardCvv] = React.useState('');
  
  // Shipping Form State
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [zip, setZip] = React.useState('');

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const packagingPrice = packaging === 'wooden' ? 50 : 0;
  const total = cartSubtotal + packagingPrice;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!email || !address || !cardNumber || !cardName) {
      alert("Please fill in shipping and payment details.");
      return;
    }
    
    // Generate order ID
    const randomRef = 'MM-' + Math.floor(Math.random() * 900000 + 100000);
    setOrderRef(randomRef);
    setOrderComplete(true);
  };

  const handleCompleteClose = () => {
    onClearCart();
    onBackToBag(); // will return to collection page
  };

  // Estimate arrival date (7 days from now)
  const getDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  if (orderComplete) {
    return (
      <section className="py-16 bg-luxury-ivory dark:bg-luxury-onyx-dark transition-colors duration-300 min-h-screen text-center flex items-center justify-center">
        <div className="max-w-2xl w-full mx-4 p-8 sm:p-10 bg-luxury-ivory-dark/20 dark:bg-luxury-onyx/40 border border-luxury-gold rounded-2xl shadow-2xl relative space-y-6 overflow-hidden text-left">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-center mb-4">
            <div className="relative flex items-center justify-center w-16 h-16 border border-luxury-gold rounded-full bg-luxury-gold/10">
              <CheckCircle2 className="w-8 h-8 text-luxury-gold" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-[0.25em] font-sans text-luxury-gold uppercase font-bold">
              Dispatch Commissioned
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-luxury-onyx dark:text-luxury-ivory">
              Order Confirmed
            </h2>
            <div className="w-12 h-[1px] bg-luxury-gold mx-auto mt-2" />
          </div>

          <div className="p-6 bg-luxury-ivory dark:bg-luxury-onyx-dark/80 rounded-xl border border-black/10 dark:border-white/10 space-y-4 text-xs font-sans text-luxury-onyx/80 dark:text-luxury-ivory/80">
            <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <span className="font-bold text-luxury-gold-dark dark:text-luxury-gold-light">Receipt ID:</span>
              <span className="font-bold text-luxury-onyx dark:text-luxury-ivory font-mono">{orderRef}</span>
            </div>
            <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <span className="font-bold text-luxury-gold-dark dark:text-luxury-gold-light">Shipment Address:</span>
              <span className="font-semibold text-luxury-onyx dark:text-luxury-ivory max-w-[240px] text-right truncate">
                {address}, {city}
              </span>
            </div>
            <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <span className="font-bold text-luxury-gold-dark dark:text-luxury-gold-light">Signature Hand-Delivery:</span>
              <span className="font-semibold text-luxury-onyx dark:text-luxury-ivory">
                {getDeliveryDate()}
              </span>
            </div>
            <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <span className="font-bold text-luxury-gold-dark dark:text-luxury-gold-light">Packaging style:</span>
              <span className="font-semibold text-luxury-onyx dark:text-luxury-ivory uppercase tracking-wider">
                {packaging === 'velvet' ? 'Signature Velvet Box' : 'Walnut Wood Chest'}
              </span>
            </div>
            <div className="flex justify-between text-luxury-gold font-bold pt-2 text-sm">
              <span>Total Settled:</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-[10px] text-luxury-onyx/60 dark:text-luxury-ivory/60 bg-luxury-gold/5 p-3 rounded-lg border border-luxury-gold/15 leading-relaxed">
            <Award className="w-4 h-4 text-luxury-gold shrink-0" />
            <span>Your items have been safely packed under camera supervision. GIA diamond verification certificates have been matched with your item tags. Tracking link is forwarded to <strong>{email}</strong>.</span>
          </div>

          <button
            onClick={handleCompleteClose}
            className="gold-gradient-button w-full py-4 rounded-xl text-xs uppercase tracking-widest font-semibold font-cinzel text-center"
          >
            Return to Showroom Catalog
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-luxury-ivory dark:bg-luxury-onyx-dark transition-colors duration-300 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <button
          onClick={onBackToBag}
          className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-luxury-onyx/60 dark:text-luxury-ivory/60 hover:text-luxury-gold font-bold mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back to bag
        </button>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-luxury-onyx dark:text-luxury-ivory mb-10">
          Secure Luxury Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Checkout forms (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Shipping details */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-luxury-gold border-b border-black/5 dark:border-white/5 pb-2">
                1. Delivery Location
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-xs">
                  <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="clara@luxury.com"
                    className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase block">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="12 Via della Spiga"
                    className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-xs">
                  <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase block">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Milan"
                    className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase block">ZIP Code *</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="20121"
                    className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                  />
                </div>
              </div>
            </div>

            {/* Packaging Configuration */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-luxury-gold border-b border-black/5 dark:border-white/5 pb-2">
                2. Presentation & Gift Packaging
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPackaging('velvet')}
                  className={`p-4 border rounded-xl flex items-start gap-3.5 text-left transition-all ${
                    packaging === 'velvet'
                      ? 'border-luxury-gold bg-luxury-gold/5 shadow-sm'
                      : 'border-black/15 dark:border-white/15 hover:border-luxury-gold/50'
                  }`}
                >
                  <Gift className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-luxury-onyx dark:text-luxury-ivory block">Signature Velvet Box</span>
                    <span className="text-[10px] text-luxury-onyx/65 dark:text-luxury-ivory/65 leading-relaxed block">
                      Exquisite deep onyx velvet-lined hard box with gold hot-stamp logo. Elegantly wrapped.
                    </span>
                    <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-wider block pt-2">Included</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPackaging('wooden')}
                  className={`p-4 border rounded-xl flex items-start gap-3.5 text-left transition-all ${
                    packaging === 'wooden'
                      ? 'border-luxury-gold bg-luxury-gold/5 shadow-sm'
                      : 'border-black/15 dark:border-white/15 hover:border-luxury-gold/50'
                  }`}
                >
                  <Gift className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-luxury-onyx dark:text-luxury-ivory block">Walnut Wood Chest</span>
                    <span className="text-[10px] text-luxury-onyx/65 dark:text-luxury-ivory/65 leading-relaxed block">
                      Hand-carved solid Italian walnut chest, mirror lacquer coating, soft leather lining. Laser engraved.
                    </span>
                    <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-wider block pt-2">+$50</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-luxury-gold border-b border-black/5 dark:border-white/5 pb-2">
                3. Payment Authentication
              </h3>
              <div className="p-5 luxury-glass border border-luxury-gold/15 rounded-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                  <CreditCard className="w-4 h-4 text-luxury-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider text-luxury-onyx dark:text-luxury-ivory">Credit Card Details</span>
                </div>
                <div className="space-y-3">
                  <div className="text-xs">
                    <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase block mb-1">Cardholder Name *</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Victoria Belmont"
                      className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                    />
                  </div>
                  <div className="text-xs">
                    <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase block mb-1">Card Number *</label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-xs">
                      <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase block mb-1">Expiry Date *</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory text-center"
                      />
                    </div>
                    <div className="text-xs">
                      <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase block mb-1">Security Code (CVV) *</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Checkout Summary panel (Right 5 Cols) */}
          <div className="lg:col-span-5 p-5 luxury-glass rounded-2xl border border-luxury-gold/15 space-y-6">
            <h3 className="font-cinzel font-bold text-sm tracking-wider uppercase text-luxury-onyx dark:text-luxury-ivory">
              Order Details
            </h3>

            {/* Cart list summary */}
            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start gap-4 text-xs font-sans border-b border-black/5 dark:border-white/5 pb-2">
                  <div className="text-left space-y-0.5">
                    <span className="font-bold text-luxury-onyx dark:text-luxury-ivory">{item.name} <span className="text-[10px] text-luxury-gold font-normal">x{item.quantity}</span></span>
                    <span className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 block">Metal: {item.metal}</span>
                  </div>
                  <span className="font-bold text-luxury-onyx dark:text-luxury-ivory">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Total Math */}
            <div className="space-y-2 text-xs font-sans text-left border-t border-black/10 dark:border-white/10 pt-4">
              <div className="flex justify-between text-luxury-onyx/75 dark:text-luxury-ivory/75">
                <span>Items Subtotal</span>
                <span>${cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-luxury-onyx/75 dark:text-luxury-ivory/75">
                <span>Laser Custom Engraving</span>
                <span className="text-luxury-gold uppercase font-bold">Free</span>
              </div>
              <div className="flex justify-between text-luxury-onyx/75 dark:text-luxury-ivory/75">
                <span>Gift Packaging ({packaging === 'velvet' ? 'Velvet' : 'Walnut Wood'})</span>
                <span>{packagingPrice === 0 ? 'Included' : `+$${packagingPrice}`}</span>
              </div>
              <div className="flex justify-between text-luxury-onyx/75 dark:text-luxury-ivory/75">
                <span>Secured Armored Shipping & Insurance</span>
                <span className="text-luxury-gold uppercase font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-luxury-onyx dark:text-luxury-ivory pt-3 border-t border-black/15 dark:border-white/15">
                <span>Total Amount Due</span>
                <span className="text-luxury-gold text-lg">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                type="submit"
                className="gold-gradient-button w-full py-4 rounded-xl font-cinzel text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transform active:scale-95 transition-all shadow-md"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Authorize & Pay</span>
              </button>

              <div className="flex justify-center items-center gap-1.5 text-[9px] uppercase tracking-wider text-luxury-onyx/50 dark:text-luxury-ivory/50">
                <span>Fully insured via Lloyd's of London</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </section>
  );
}
