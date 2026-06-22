import Footer from './Footer';

// Import assets
import c1Img from '../assets/c1.png';
import co1Img from '../assets/co1.png';
import co2Img from '../assets/co2.png';
import co3Img from '../assets/co3.png';
import co4Img from '../assets/co4.png';
import co5Img from '../assets/co5.png';
import co6Img from '../assets/co6.png';

// Collection Card Data
const collectionsData = [
  {
    id: 1,
    title: "Bridal Collection",
    description: "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan.",
    image: co1Img,
    badge: "Up to 25% off"
  },
  {
    id: 2,
    title: "Wedding Collection",
    description: "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan.",
    image: co2Img,
    badge: "Flat ₹ 500"
  },
  {
    id: 3,
    title: "Traditional Collection",
    description: "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan.",
    image: co3Img,
    badge: "Festival special: 299 off"
  },
  {
    id: 4,
    title: "Modern Collection",
    description: "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan.",
    image: co4Img,
    badge: "Up to 25% off"
  },
  {
    id: 5,
    title: "Party Wear Collection",
    description: "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan.",
    image: co5Img,
    badge: "Up to 25% off"
  },
  {
    id: 6,
    title: "Festival Collections",
    description: "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan.",
    image: co6Img,
    badge: "Up to 25% off"
  }
];

export default function Collections() {
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
          backgroundImage: `url(${c1Img})`,
          minHeight: '280px'
        }}
      >
        <div className="absolute inset-0 bg-black/15 z-0 pointer-events-none"></div>

        <div className="container mx-auto z-10 flex flex-col justify-center max-w-4xl text-center md:text-left">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Our Collections
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light font-sans max-w-2xl">
            Browse our complete collection of premium guarantee imitation jewellery
          </p>
        </div>
      </section>

      {/* Collections Cards Grid */}
      <section className="bg-white py-20 px-6 md:px-12 lg:px-24 flex-grow">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collectionsData.map((col) => (
              <div 
                key={col.id} 
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Image Section */}
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={col.image} 
                    alt={col.title} 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                {/* Dark Bronze Content Section */}
                <div className="bg-gradient-to-b from-[#352219] to-[#1a100b] text-white p-6 flex flex-col flex-grow items-start justify-between min-h-[180px]">
                  <div>
                    <h3 className="font-serif text-lg md:text-xl font-medium text-white mb-2">
                      {col.title}
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm font-light font-sans leading-relaxed mb-4">
                      {col.description}
                    </p>
                  </div>

                  <div className="w-full flex items-center justify-between mt-auto">
                    {/* Red Pill Badge */}
                    <span className="bg-[#e53e3e] text-white text-[10px] md:text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                      {col.badge}
                    </span>

                    {/* View Collection Link */}
                    <a 
                      href={`#collections/${col.id}`} 
                      className="inline-flex items-center text-white hover:text-gold-400 text-xs md:text-sm font-semibold transition-colors duration-300 group"
                    >
                      View Collection
                      <svg 
                        className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth={2}
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
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
