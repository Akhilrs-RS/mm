import React from 'react';
import { Search, SlidersHorizontal, Sparkles, X, Star, Eye, PenTool } from 'lucide-react';
import { products, metalOptions } from '../data/products';

export default function Collection({ onAddToBag, onNavigateToCustomizer }) {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedMetal, setSelectedMetal] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('featured');
  const [quickViewProduct, setQuickViewProduct] = React.useState(null);
  
  // Selected metals for individual cards (default is first metal option)
  const [cardMetals, setCardMetals] = React.useState({});
  
  // Quick View customization states
  const [engravingText, setEngravingText] = React.useState('');
  const [quickViewMetal, setQuickViewMetal] = React.useState('');

  const categories = ['all', 'rings', 'necklaces', 'earrings', 'bracelets'];

  const handleCardMetalChange = (productId, metalId) => {
    setCardMetals(prev => ({
      ...prev,
      [productId]: metalId
    }));
  };

  const getPrice = (product, metalId) => {
    const activeMetal = metalId || product.metals[0];
    const metalOpt = metalOptions.find(m => m.id === activeMetal);
    const mod = metalOpt ? metalOpt.priceModifier : 0;
    return product.basePrice + mod;
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          (p.gemstone && p.gemstone.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesMetal = selectedMetal === 'all' || p.metals.includes(selectedMetal);
    return matchesSearch && matchesCategory && matchesMetal;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.basePrice - b.basePrice;
    if (sortBy === 'price-high') return b.basePrice - a.basePrice;
    return 0; // Featured (default index order)
  });

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewMetal(product.metals[0]);
    setEngravingText('');
  };

  const handleAddToBag = () => {
    if (!quickViewProduct) return;
    const selectedMetalOpt = metalOptions.find(m => m.id === quickViewMetal);
    const finalPrice = getPrice(quickViewProduct, quickViewMetal);

    onAddToBag({
      id: `${quickViewProduct.id}-${quickViewMetal}`,
      productId: quickViewProduct.id,
      name: quickViewProduct.name,
      image: quickViewProduct.image,
      category: quickViewProduct.category,
      price: finalPrice,
      metal: selectedMetalOpt?.name || 'Standard',
      stone: quickViewProduct.gemstone,
      engraving: engravingText || null,
      quantity: 1
    });

    setQuickViewProduct(null);
  };

  return (
    <section className="py-12 bg-luxury-ivory dark:bg-luxury-onyx-dark transition-colors duration-300 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="border-b border-black/10 dark:border-white/10 pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">The Showroom</span>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-luxury-onyx dark:text-luxury-ivory">
              Curated Collections
            </h1>
          </div>
          <p className="font-sans text-sm text-luxury-onyx/60 dark:text-luxury-ivory/60 max-w-md">
            Browse our iconic handcrafted designs. Select options, view detailed certificates, or send a piece straight to our Customizer to adjust gemstones.
          </p>
        </div>

        {/* Filter controls panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-onyx/40 dark:text-luxury-ivory/45" />
            <input
              type="text"
              placeholder="Search gems, rings, collections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-sm text-luxury-onyx dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors"
            />
          </div>

          {/* Category Pill Filters */}
          <div className="lg:col-span-5 flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md font-cinzel text-xs uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-luxury-gold border-luxury-gold text-luxury-onyx font-semibold shadow-sm'
                    : 'border-black/10 dark:border-white/10 text-luxury-onyx/70 dark:text-luxury-ivory/70 hover:border-luxury-gold/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting / Metal Select */}
          <div className="lg:col-span-3 flex gap-3">
            <select
              value={selectedMetal}
              onChange={(e) => setSelectedMetal(e.target.value)}
              className="w-1/2 px-3 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-xs font-sans focus:outline-none focus:border-luxury-gold transition-colors text-luxury-onyx dark:text-luxury-ivory"
            >
              <option value="all">All Metals</option>
              {metalOptions.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-1/2 px-3 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-xs font-sans focus:outline-none focus:border-luxury-gold transition-colors text-luxury-onyx dark:text-luxury-ivory"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 luxury-glass rounded-2xl border border-dashed border-luxury-gold/20">
            <SlidersHorizontal className="w-10 h-10 text-luxury-gold/40 mx-auto mb-4" />
            <h3 className="font-cinzel text-lg font-bold">No Pieces Match Filter</h3>
            <p className="text-sm text-luxury-onyx/60 dark:text-luxury-ivory/60 mt-1">
              Try adjusting your search queries or clearing metal filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const activeMetal = cardMetals[product.id] || product.metals[0];
              const price = getPrice(product, activeMetal);
              const metalObj = metalOptions.find(m => m.id === activeMetal);

              return (
                <div 
                  key={product.id}
                  className="group relative flex flex-col justify-between p-4 bg-luxury-ivory-dark/20 dark:bg-luxury-onyx/40 border border-black/10 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-300"
                >
                  {/* Rating indicator */}
                  <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5 px-2 py-1 luxury-glass rounded-md">
                    <Star className="w-3.5 h-3.5 text-luxury-gold fill-current" />
                    <span className="text-[10px] font-sans font-bold text-luxury-onyx/85 dark:text-luxury-ivory/85">
                      {product.rating}
                    </span>
                  </div>

                  {/* Image Display */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-tr from-luxury-onyx-light to-luxury-onyx/90 border border-black/5 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Dark/Gold Overlays on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button 
                        onClick={() => openQuickView(product)}
                        className="p-3 bg-luxury-ivory text-luxury-onyx hover:bg-luxury-gold hover:text-luxury-onyx rounded-full transition-colors shadow-md"
                        title="Quick View & Buy"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onNavigateToCustomizer(product)}
                        className="p-3 bg-luxury-ivory text-luxury-onyx hover:bg-luxury-gold hover:text-luxury-onyx rounded-full transition-colors shadow-md"
                        title="Customize Gems & Metal"
                      >
                        <PenTool className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-3 px-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold">
                          {product.category}
                        </span>
                        <h3 className="font-cinzel text-base font-bold text-luxury-onyx dark:text-luxury-ivory mt-0.5 group-hover:text-luxury-gold transition-colors duration-300">
                          {product.name}
                        </h3>
                      </div>
                      <span className="font-sans text-sm font-bold text-luxury-gold">
                        ${price.toLocaleString()}
                      </span>
                    </div>

                    <p className="font-sans text-[11px] text-luxury-onyx/65 dark:text-luxury-ivory/65 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Metal Selector Dots */}
                    <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-3 mt-1">
                      <span className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50">
                        Metal: <span className="font-medium text-luxury-onyx dark:text-luxury-ivory">{metalObj?.name}</span>
                      </span>
                      <div className="flex gap-2">
                        {product.metals.map((mId) => {
                          const mOpt = metalOptions.find(o => o.id === mId);
                          return (
                            <button
                              key={mId}
                              onClick={() => handleCardMetalChange(product.id, mId)}
                              className={`w-4 h-4 rounded-full border transition-all ${mOpt?.colorClass} ${
                                activeMetal === mId 
                                  ? 'ring-2 ring-luxury-gold border-white dark:border-luxury-onyx scale-110' 
                                  : 'border-black/10 dark:border-white/20'
                              }`}
                              title={mOpt?.name}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-luxury-ivory dark:bg-luxury-onyx-dark max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-luxury-gold/20 flex flex-col md:flex-row max-h-[90vh]">
              {/* Close Button */}
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/20 hover:bg-black/45 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Image Side */}
              <div className="md:w-1/2 aspect-square md:h-auto bg-gradient-to-tr from-luxury-onyx-light to-luxury-onyx/90 relative flex items-center justify-center p-6">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Product Info Side */}
              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                      {quickViewProduct.category}
                    </span>
                    <h2 className="font-cinzel text-2xl font-bold text-luxury-onyx dark:text-luxury-ivory mt-1">
                      {quickViewProduct.name}
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xl font-bold text-luxury-gold">
                        ${getPrice(quickViewProduct, quickViewMetal).toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-luxury-onyx/60 dark:text-luxury-ivory/60">
                        <Star className="w-4 h-4 text-luxury-gold fill-current" />
                        <span className="font-bold">{quickViewProduct.rating}</span>
                        <span>({quickViewProduct.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-luxury-onyx/75 dark:text-luxury-ivory/75 leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  {/* Metal Options Selection */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-luxury-gold block">
                      Choose Metal Setting
                    </span>
                    <div className="flex gap-3">
                      {quickViewProduct.metals.map((mId) => {
                        const mOpt = metalOptions.find(o => o.id === mId);
                        return (
                          <button
                            key={mId}
                            onClick={() => setQuickViewMetal(mId)}
                            className={`px-3 py-2 border rounded-md text-xs font-medium font-sans flex items-center gap-2 transition-all ${
                              quickViewMetal === mId
                                ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-gold'
                                : 'border-black/15 dark:border-white/15 text-luxury-onyx/80 dark:text-luxury-ivory/80'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full border ${mOpt?.colorClass}`} />
                            {mOpt?.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Free Engraving text area */}
                  <div className="space-y-2">
                    <label htmlFor="engraving" className="text-xs font-semibold uppercase tracking-wider text-luxury-gold block">
                      Add Custom Engraving (Complimentary)
                    </label>
                    <input
                      id="engraving"
                      type="text"
                      maxLength={24}
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      placeholder="E.g., Forever Yours (Max 24 chars)"
                      className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-md text-xs focus:outline-none focus:border-luxury-gold transition-colors text-luxury-onyx dark:text-luxury-ivory"
                    />
                  </div>

                  {/* Specs Detail */}
                  <div className="border-t border-black/10 dark:border-white/10 pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-luxury-onyx dark:text-luxury-ivory mb-2">
                      Product Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[10.5px] text-luxury-onyx/75 dark:text-luxury-ivory/75">
                      {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                        <div key={key} className="flex justify-between border-b border-black/5 dark:border-white/5 py-1">
                          <span className="font-semibold text-luxury-gold-dark dark:text-luxury-gold-light">{key}</span>
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8 border-t border-black/10 dark:border-white/10 pt-6">
                  <button
                    onClick={handleAddToBag}
                    className="gold-gradient-button w-full py-3.5 rounded-lg flex items-center justify-center gap-2 transform active:scale-98 transition-all"
                  >
                    Add to Shopping Bag
                  </button>
                  <button
                    onClick={() => {
                      onNavigateToCustomizer(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="border border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 px-5 rounded-lg text-xs font-medium transition-all"
                  >
                    Open Customizer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
