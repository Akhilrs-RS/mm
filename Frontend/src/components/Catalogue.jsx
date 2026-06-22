import { useState } from 'react';
import Footer from './Footer';

// Import assets
import c1Img from '../assets/c1.png';
import ca1Img from '../assets/ca1.png';
import ca2Img from '../assets/ca2.jpg';
import ca3Img from '../assets/ca3.png';
import ca4Img from '../assets/ca4.png';
import ca5Img from '../assets/ca5.png';
import ca6Img from '../assets/ca6.png';
import ca7Img from '../assets/ca7.png';
import ca8Img from '../assets/ca8.png';
import ca9Img from '../assets/ca9.png';
import ca10Img from '../assets/ca10.png';
import ca11Img from '../assets/ca11.png';
import ca12Img from '../assets/ca12.png';
import ca13Img from '../assets/ca13.png';
import ca14Img from '../assets/ca14.png';

// ca15.png does not exist in src/assets, so we set it to null
const ca15Img = null;

// Product Data
const productsData = [
  {
    id: 1,
    title: "Heritage Gold covering Bangles Set",
    category: "BANGLES",
    price: 1440,
    originalPrice: 1600,
    image: ca1Img,
    badgeLeft: "Best Seller",
    badgeRight: "10% OFF"
  },
  {
    id: 2,
    title: "Stone work Necklace",
    category: "BANGLES", // Matches category in screenshot
    price: 1820,
    originalPrice: 2600,
    image: ca2Img,
    badgeLeft: "Best Seller",
    badgeRight: "30% OFF"
  },
  {
    id: 3,
    title: "Bridal Set",
    category: "BANGLES", // Matches category in screenshot
    price: 1440,
    originalPrice: 1600,
    image: ca3Img,
    badgeLeft: "Best Seller",
    badgeRight: "10% OFF"
  },
  {
    id: 4,
    title: "Temple Gold covering Necklace Set",
    category: "BANGLES", // Matches category in screenshot
    price: 5940,
    originalPrice: 6600,
    image: ca4Img,
    badgeLeft: "Best Seller",
    badgeRight: "10% OFF"
  },
  {
    id: 5,
    title: "Celestial Earings",
    category: "Earnings", // Matches category spelling in screenshot
    price: 320,
    originalPrice: 400,
    image: ca5Img,
    badgeLeft: "Best Seller",
    badgeRight: "20% OFF"
  },
  {
    id: 6,
    title: "Palakka Choker",
    category: "BANGLES", // Matches category in screenshot
    price: 792,
    originalPrice: 900,
    image: ca6Img,
    badgeLeft: "Best Seller",
    badgeRight: "12% OFF"
  },
  {
    id: 7,
    title: "Couple Rings",
    category: "Rings",
    price: 599,
    originalPrice: null,
    image: ca7Img,
    badgeLeft: "Hot Deal",
    badgeRight: ""
  },
  {
    id: 8,
    title: "Anklet Set",
    category: "Anklet",
    price: 800,
    originalPrice: null,
    image: ca8Img,
    badgeLeft: "Hot Deal",
    badgeRight: ""
  },
  {
    id: 9,
    title: "Elegant Crystal Pendant Chain",
    category: "Chain",
    price: 800,
    originalPrice: null,
    image: ca9Img,
    badgeLeft: "Hot Deal",
    badgeRight: ""
  },
  {
    id: 10,
    title: "Royal Polki Bridal Complete Set",
    category: "Bridal Sets",
    price: 6575,
    originalPrice: null,
    image: ca10Img,
    badgeLeft: "Hot Deal",
    badgeRight: ""
  },
  {
    id: 11,
    title: "Temple Design Gold Tone Necklace",
    category: "Traditional Jewellery",
    price: 2725,
    originalPrice: null,
    image: ca11Img,
    badgeLeft: "Hot Deal",
    badgeRight: ""
  },
  {
    id: 12,
    title: "Kundan Statement Ring Set",
    category: "Rings",
    price: 2725,
    originalPrice: null,
    image: ca12Img,
    badgeLeft: "Hot Deal",
    badgeRight: ""
  },
  {
    id: 13,
    title: "Traditional Jhumka Earrings",
    category: "Earrings",
    price: 1050,
    originalPrice: null,
    image: ca13Img,
    badgeLeft: "Hot Deal",
    badgeRight: ""
  },
  {
    id: 14,
    title: "Emerald Party Wear Necklace Set",
    category: "Party Wear Jewellery",
    price: 1050,
    originalPrice: null,
    image: ca14Img,
    badgeLeft: "Hot Deal",
    badgeRight: ""
  },
  {
    id: 15,
    title: "Meenakari Gold Tone Bangle Set",
    category: "Bangles",
    price: 1500,
    originalPrice: null,
    image: ca15Img, // Renders blank
    badgeLeft: "Hot Deal",
    badgeRight: ""
  }
];

export default function Catalogue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Filter products based on search term and category
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (categoryFilter === "All") {
      return matchesSearch;
    } else {
      return matchesSearch && product.category.toLowerCase() === categoryFilter.toLowerCase();
    }
  });

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans select-none">
      {/* Navigation Header */}
      <header className="w-full bg-black text-white border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 flex-1 justify-end pr-8 lg:pr-16">
          <a href="/#" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            Collections
          </a>
          <a href="#catalogue" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            Catalogue
          </a>
          <a href="/#offers" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            Offers
          </a>
        </nav>

        {/* Center Logo */}
        <div className="flex flex-col items-center justify-center mx-auto md:mx-0">
          <a href="/#" className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-12 h-12 mb-1 rounded-full border border-gold-400/30 bg-gradient-to-b from-gold-500/10 to-transparent">
              {/* Elegant Monogram Monolith SVG */}
              <svg 
                className="w-8 h-8 text-gold-400" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer delicate gold ring */}
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
                {/* Monogram MM */}
                <path 
                  d="M28 68V36L42 58L50 46L58 58L72 36V68" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M36 68V42L45 56L50 48L55 56L64 42V68" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeOpacity="0.7"
                />
              </svg>
            </div>
            <span className="font-serif text-sm tracking-[0.25em] text-gold-400 font-semibold uppercase whitespace-nowrap">
              MM Jewellery
            </span>
          </a>
        </div>

        {/* Right Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 flex-1 justify-start pl-8 lg:pl-16">
          <a href="/#gallery" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            Gallery
          </a>
          <a href="/#about" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            About
          </a>
          <a href="/#contact" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Icon (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button className="text-white hover:text-gold-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section 
        className="w-full bg-cover bg-center py-20 px-6 md:px-12 lg:px-24 flex items-center relative"
        style={{ 
          backgroundImage: `url(${c1Img})`,
          minHeight: '280px'
        }}
      >
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none"></div>

        <div className="container mx-auto z-10 flex flex-col justify-center max-w-4xl text-center md:text-left">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Jewellery Catalogue
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light font-sans max-w-2xl">
            Browse our complete collection of premium guarantee imitation jewellery
          </p>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="bg-white py-10 px-6 md:px-12 lg:px-24 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-start items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search Jewellery" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-700 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors"
              >
                <option value="All">All Categories</option>
                <option value="BANGLES">Bangles</option>
                <option value="Earnings">Earnings</option>
                <option value="Rings">Rings</option>
                <option value="Anklet">Anklets</option>
                <option value="Chain">Chains</option>
                <option value="Bridal Sets">Bridal Sets</option>
                <option value="Traditional Jewellery">Traditional</option>
                <option value="Party Wear Jewellery">Party Wear</option>
              </select>

              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-700 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors">
                <option>All Collections</option>
                <option>Bridal Collection</option>
                <option>Wedding Collection</option>
                <option>Traditional Collection</option>
                <option>Modern Collection</option>
              </select>

              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-700 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors">
                <option>Select</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Cards Grid */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-24 flex-grow">
        <div className="container mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found matching your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[362/336] w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {/* Absolute Badges */}
                    {product.badgeLeft && (
                      <span className="absolute top-4 left-4 z-10 bg-white text-black font-semibold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase shadow-sm">
                        {product.badgeLeft}
                      </span>
                    )}
                    {product.badgeRight && (
                      <span className="absolute top-4 right-4 z-10 bg-[#ab8d6d]/90 text-white font-medium text-[10px] px-2.5 py-1 rounded tracking-wider">
                        {product.badgeRight}
                      </span>
                    )}

                    {/* Product Image */}
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                      />
                    ) : (
                      /* Blank placeholder if image not found */
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-xs font-light">
                        No Image Available
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[#e28743] text-xs font-semibold uppercase tracking-wider mb-2 block font-sans">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-baseline">
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-xs mr-2 font-sans">
                            ₹ {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-gray-900 font-bold text-base font-serif">
                          ₹ {product.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-colors duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </button>
                        <a 
                          href={`https://wa.me/919876543210?text=Hello,%20I%20am%20interested%20in%20purchasing%20the%20${encodeURIComponent(product.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-300"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.825 14.16 2.8 11.535 2.8c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.88L2.012 21.9l4.635-1.746z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
