import Footer from './Footer';

// Import assets
import offersHeroImg from '../assets/0.png';

// Offers Data
const offersData = [
  {
    id: 1,
    title: "Bridal Season Sale",
    badge: "25% OFF",
    description: "Flat 25% off on all bridal sets. Make your dream wedding look affordable.",
    date: "01 Jan - 31 Dec 2026",
    category: "Bridal Set"
  },
  {
    id: 2,
    title: "Festive Diwali Offer",
    badge: "15% OFF",
    description: "Celebrate Diwali with dazzling jewellery. Special discounts on traditional and party wear collections.",
    date: "01 Oct - 15 Nov 2026",
    category: "Traditional Jewellery, Party Wear Jewellery"
  },
  {
    id: 3,
    title: "New Arrival Flash Sale",
    badge: "20% OFF",
    description: "Get 15% off on all new arrivals this month. Grab the latest designs before they sell out.",
    date: "01 Jul - 31 Jul 2026",
    category: "Traditional Jewellery, Party Wear Jewellery"
  },
  {
    id: 4,
    title: "Combo Offer – Buy 3 Save More",
    badge: "10% OFF",
    description: "Purchase any 3 jewellery pieces and get flat ₹1,000 off on your total. Mix and match from any collection.",
    date: "01 Jan - 31 Dec 2026",
    category: "Traditional Jewellery, Party Wear Jewellery"
  }
];

export default function Offers() {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-black flex flex-col font-sans select-none">
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
          backgroundImage: `url(${offersHeroImg})`,
          minHeight: '280px'
        }}
      >
        <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none"></div>

        <div className="container mx-auto z-10 flex flex-col justify-center items-center text-center max-w-4xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Special Offers
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light font-sans max-w-2xl">
            Exclusive deals on our premium guarantee imitation jewellery
          </p>
        </div>
      </section>

      {/* Offers Cards Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-24 flex-grow bg-[#fcfbf9]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offersData.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Title & Badge Row */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 leading-tight">
                      {offer.title}
                    </h3>
                    <span className="bg-[#e53e3e] text-white text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shrink-0">
                      {offer.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-xs md:text-sm font-light font-sans leading-relaxed mb-6">
                    {offer.description}
                  </p>
                </div>

                <div>
                  {/* Meta items: Date and Category */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5 mb-6 text-xs text-gray-500 font-sans">
                    {/* Date Info */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span>{offer.date}</span>
                    </div>

                    {/* Category Info */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.16 3.659A2.25 2.25 0 009.568 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
                      </svg>
                      <span className="text-right max-w-[200px] truncate" title={offer.category}>
                        {offer.category}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <div>
                    <a 
                      href={`https://wa.me/919876543210?text=Hello,%20I%20am%20interested%20in%20inquiring%20about%20the%20${encodeURIComponent(offer.title)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#25D366] hover:bg-[#1fba55] text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-lg transition-colors duration-300 gap-2 shadow-sm font-sans"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.825 14.16 2.8 11.535 2.8c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.88L2.012 21.9l4.635-1.746z"/>
                      </svg>
                      Inquire on WhatsApp
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
