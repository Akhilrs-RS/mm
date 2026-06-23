import { useState } from 'react';
import Footer from './Footer';

// Import assets
import galleryHeroImg from '../assets/0.png';
import ca11Img from '../assets/ca11.png';
import ca8Img from '../assets/ca8.png';
import ca13Img from '../assets/ca13.png';
import ca9Img from '../assets/ca9.png';
import ca10Img from '../assets/ca10.png';
import ca4Img from '../assets/ca4.png';
import ca12Img from '../assets/ca12.png';
import ca3Img from '../assets/ca3.png';
import ca6Img from '../assets/ca6.png';

// Gallery Data
const galleryData = [
  {
    id: 1,
    title: "Temple Design Gold Tone Necklace",
    category: "JEWELLERY",
    image: ca11Img
  },
  {
    id: 2,
    title: "Anklet Set",
    category: "COLLECTIONS",
    image: ca8Img
  },
  {
    id: 3,
    title: "Traditional Jhumka Earrings",
    category: "JEWELLERY",
    image: ca13Img
  },
  {
    id: 4,
    title: "Elegant Crystal Pendant Chain",
    category: "COLLECTIONS",
    image: ca9Img
  },
  {
    id: 5,
    title: "Royal Polki Bridal Complete Set",
    category: "JEWELLERY",
    image: ca10Img
  },
  {
    id: 6,
    title: "Temple Gold covering Necklace Set",
    category: "COLLECTIONS",
    image: ca4Img
  },
  {
    id: 7,
    title: "Kundan Statement Ring Set",
    category: "JEWELLERY",
    image: ca12Img
  },
  {
    id: 8,
    title: "Bridal Set",
    category: "STORE",
    image: ca3Img
  },
  {
    id: 9,
    title: "Palakka Choker",
    category: "EVENTS",
    image: ca6Img
  }
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Filter gallery items
  const filteredItems = galleryData.filter(item => {
    if (activeFilter === "ALL") return true;
    return item.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans select-none">
      {/* Navigation Header */}
      <header className="w-full bg-black text-white border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 flex-1 justify-end pr-8 lg:pr-16">
          <a href="#collections" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            Collections
          </a>
          <a href="#catalogue" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            Catalogue
          </a>
          <a href="#offers" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            Offers
          </a>
        </nav>

        {/* Center Logo */}
        <div className="flex flex-col items-center justify-center mx-auto md:mx-0">
          <a href="#" className="flex flex-col items-center justify-center">
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
          <a href="#gallery" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            Gallery
          </a>
          <a href="#about" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
            About
          </a>
          <a href="#contact" className="text-white hover:text-gold-400 font-medium text-sm tracking-wide transition-colors duration-300">
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
          backgroundImage: `url(${galleryHeroImg})`,
          minHeight: '280px'
        }}
      >
        <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none"></div>

        <div className="container mx-auto z-10 flex flex-col justify-center items-center text-center max-w-4xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Gallery
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light font-sans max-w-2xl">
            A visual journey through our jewellery collections and styling inspirations
          </p>
        </div>
      </section>

      {/* Filters Area */}
      <section className="bg-white pt-12 pb-6 px-6 md:px-12 lg:px-24 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {["ALL", "JEWELLERY", "COLLECTIONS", "STORE", "EVENTS"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-1.5 border rounded-sm text-[10px] md:text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                activeFilter === category
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Cards Grid */}
      <section className="bg-white pb-20 pt-6 px-6 md:px-12 lg:px-24 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="overflow-hidden rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 flex flex-col group"
              >
                {/* Image Section */}
                <div className="aspect-square w-full overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* Subtle hover overlay with title */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs md:text-sm font-sans tracking-wide truncate w-full">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
