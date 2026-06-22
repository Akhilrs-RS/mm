import h1Img from '../assets/h1.png';
import hb1Img from '../assets/hb1.png';
import hb2Img from '../assets/hb2.png';
import ca1Img from '../assets/ca1.png';
import ca2Img from '../assets/ca2.jpg';
import ca3Img from '../assets/ca3.png';
import ca4Img from '../assets/ca4.png';
import ca5Img from '../assets/ca5.png';
import ca6Img from '../assets/ca6.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans select-none">
      {/* Navigation Header */}
      <header className="w-full bg-black border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
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

      {/* Hero Section */}
      <main 
        className="flex-grow w-full relative bg-cover bg-center flex items-center min-h-[calc(100vh-84px)]"
        style={{ 
          backgroundImage: `url(${h1Img})`,
        }}
      >
        {/* Subtle Dark Overlay to balance visibility */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

        {/* Content Container */}
        <div className="container mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-24 z-10 flex flex-col justify-between h-full relative">
          <div className="max-w-2xl mt-8">
            {/* Top Subtitle */}
            <span className="text-gray-300 font-sans tracking-[0.25em] text-xs md:text-sm uppercase font-semibold mb-5 block">
              Guarantee Imitation Jewellery
            </span>

            {/* Main Header */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight mb-6">
              Shine Like <span className="text-gold-400 font-serif">Royalty,</span>
              <br />
              Without the Heavy Price.
            </h1>

            {/* Description */}
            <p className="text-gray-300/90 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light font-sans">
              Premium imitation jewellery crafted with precision – necklaces, bridal sets, bangles and earrings, designed to elevate every occasion.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              {/* Explore Collection Button */}
              <a 
                href="#collections" 
                className="inline-flex items-center justify-center bg-white text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-gold-400 hover:text-black transition-all duration-300 shadow-xl group text-sm md:text-base"
              >
                Explore Collection
                <svg 
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              {/* WhatsApp Enquiry Button */}
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-gold-400/50 bg-black/40 hover:bg-gold-400/10 text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-300 backdrop-blur-sm text-sm md:text-base"
              >
                {/* Custom WhatsApp SVG Icon */}
                <svg 
                  className="w-5 h-5 mr-2 text-[#25D366] fill-current" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.031 2c-5.514 0-9.989 4.478-9.989 9.99 0 1.763.459 3.483 1.332 5.006L2 22l5.143-1.348c1.477.807 3.136 1.233 4.884 1.233 5.514 0 9.99-4.478 9.99-9.99 0-5.514-4.476-9.99-9.988-9.99zm5.736 14.281c-.246.693-1.427 1.353-1.954 1.412-.477.053-.93.245-3.031-.628-2.656-1.104-4.331-3.79-4.464-3.967-.132-.177-1.081-1.441-1.081-2.75 0-1.309.68-1.954.921-2.217.241-.263.528-.329.704-.329.176 0 .352.001.505.009.158.007.371-.059.581.451.216.528.739 1.804.805 1.936.066.132.11.286.022.462-.088.176-.132.286-.264.44-.132.154-.277.344-.396.462-.132.132-.271.277-.116.544.154.264.685 1.134 1.472 1.835.986.88 1.815 1.155 2.079 1.287.264.132.418.11.572-.066.154-.176.66-.77.836-1.034.176-.264.352-.22.594-.132.241.088 1.54.726 1.804.858.264.132.44.198.505.308.067.11.067.638-.179 1.331z"/>
                </svg>
                WhatsApp Enquiry
              </a>
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-auto text-sm tracking-[0.15em] text-white/90">
            <div className="flex items-center gap-2">
              <span className="text-gold-400 font-bold text-lg">★</span>
              <span className="uppercase font-medium">6 Month Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold-400 font-bold text-lg">★</span>
              <span className="uppercase font-medium">6 Premium Polish</span>
            </div>
          </div>
        </div>
      </main>

      {/* Features Bar */}
      <section className="bg-[#ede4da] text-[#2c221e] py-8 border-t border-[#dfd6cc] z-10 relative">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent border border-[#2c221e]/20 mb-2">
                <svg className="w-5 h-5 text-[#2c221e]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-serif text-sm md:text-base font-semibold tracking-wide">Guarantee Quality</h3>
              <p className="text-xs text-[#2c221e]/70 mt-1">Tested premium Finish</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent border border-[#2c221e]/20 mb-2">
                <svg className="w-5 h-5 text-[#2c221e]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-serif text-sm md:text-base font-semibold tracking-wide">Latest Designs</h3>
              <p className="text-xs text-[#2c221e]/70 mt-1">Fresh drops every week</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent border border-[#2c221e]/20 mb-2">
                <svg className="w-5 h-5 text-[#2c221e]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-serif text-sm md:text-base font-semibold tracking-wide">Pan-India Enquiry</h3>
              <p className="text-xs text-[#2c221e]/70 mt-1">WhatsApp delivery support</p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent border border-[#2c221e]/20 mb-2">
                <svg className="w-5 h-5 text-[#2c221e]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-serif text-sm md:text-base font-semibold tracking-wide">Instant Support</h3>
              <p className="text-xs text-[#2c221e]/70 mt-1">Chat on WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Collections Section */}
      <section id="collections" className="bg-white text-black py-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <span className="text-[#aa7c11] font-medium text-sm md:text-base tracking-wider uppercase block mb-3 font-serif">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
              Discover Our Signature Lines
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img 
                  src={hb1Img} 
                  alt="Bridal Collection" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[#e28743] text-xs font-semibold uppercase tracking-wider mb-2 block font-sans">
                  Collection
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-2">
                  Bridal Collection
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow font-light font-sans">
                  Crafted for the moment you say yes.
                </p>
                <div>
                  <a 
                    href="#explore-bridal-1" 
                    className="inline-flex items-center text-gray-900 font-semibold text-sm border-b border-gray-900 pb-0.5 hover:text-[#aa7c11] hover:border-[#aa7c11] transition-all duration-300 group"
                  >
                    Explore 
                    <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img 
                  src={hb2Img} 
                  alt="Bridal Collection" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[#e28743] text-xs font-semibold uppercase tracking-wider mb-2 block font-sans">
                  Collection
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-2">
                  Bridal Collection
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow font-light font-sans">
                  Crafted for the moment you say yes.
                </p>
                <div>
                  <a 
                    href="#explore-bridal-2" 
                    className="inline-flex items-center text-gray-900 font-semibold text-sm border-b border-gray-900 pb-0.5 hover:text-[#aa7c11] hover:border-[#aa7c11] transition-all duration-300 group"
                  >
                    Explore 
                    <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 (Empty placeholder matching the screenshot exactly) */}
            <div className="border border-gray-300 rounded-2xl bg-white min-h-[400px] md:h-auto relative overflow-hidden flex flex-col justify-center items-center">
              {/* Pure blank container matching screenshot */}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pieces Section */}
      <section id="catalogue" className="bg-white text-black pb-24 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-[#aa7c11] font-medium text-sm md:text-base tracking-wider uppercase block mb-3 font-serif">
                Featured
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
                Our Most-Loved Pieces
              </h2>
            </div>
            <div>
              <a 
                href="#all-products" 
                className="inline-flex items-center text-gray-900 font-semibold text-sm hover:text-[#aa7c11] transition-all duration-300 group"
              >
                View All
                <svg 
                  className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="relative aspect-[362/336] w-full overflow-hidden bg-gray-50">
                <span className="absolute top-4 left-4 z-10 bg-white text-black font-semibold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase shadow-sm font-sans">
                  Best Seller
                </span>
                <span className="absolute top-4 right-4 z-10 bg-[#ab8d6d]/90 text-white font-medium text-[10px] px-2.5 py-1 rounded tracking-wider font-sans">
                  10% OFF
                </span>
                <img 
                  src={ca1Img} 
                  alt="Heritage Gold covering Bangles Set" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[#e28743] text-xs font-semibold uppercase tracking-wider mb-2 block font-sans">
                  BANGLES
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 line-clamp-1">
                  Heritage Gold covering Bangles Set
                </h3>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-baseline">
                    <span className="text-gray-400 line-through text-xs mr-2 font-sans">
                      ₹ 1,600
                    </span>
                    <span className="text-gray-900 font-bold text-base font-serif">
                      ₹ 1,440
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
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-300">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.825 14.16 2.8 11.535 2.8c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.88L2.012 21.9l4.635-1.746z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="relative aspect-[362/336] w-full overflow-hidden bg-gray-50">
                <span className="absolute top-4 left-4 z-10 bg-white text-black font-semibold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase shadow-sm font-sans">
                  Best Seller
                </span>
                <span className="absolute top-4 right-4 z-10 bg-[#ab8d6d]/90 text-white font-medium text-[10px] px-2.5 py-1 rounded tracking-wider font-sans">
                  30% OFF
                </span>
                <img 
                  src={ca2Img} 
                  alt="Stone work Necklace" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[#e28743] text-xs font-semibold uppercase tracking-wider mb-2 block font-sans">
                  BANGLES
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 line-clamp-1">
                  Stone work Necklace
                </h3>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-baseline">
                    <span className="text-gray-400 line-through text-xs mr-2 font-sans">
                      ₹ 2,600
                    </span>
                    <span className="text-gray-900 font-bold text-base font-serif">
                      ₹ 1,820
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
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-300">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.825 14.16 2.8 11.535 2.8c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.88L2.012 21.9l4.635-1.746z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="relative aspect-[362/336] w-full overflow-hidden bg-gray-50">
                <span className="absolute top-4 left-4 z-10 bg-white text-black font-semibold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase shadow-sm font-sans">
                  Best Seller
                </span>
                <span className="absolute top-4 right-4 z-10 bg-[#ab8d6d]/90 text-white font-medium text-[10px] px-2.5 py-1 rounded tracking-wider font-sans">
                  10% OFF
                </span>
                <img 
                  src={ca3Img} 
                  alt="Bridal Set" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[#e28743] text-xs font-semibold uppercase tracking-wider mb-2 block font-sans">
                  BANGLES
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 line-clamp-1">
                  Bridal Set
                </h3>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-baseline">
                    <span className="text-gray-400 line-through text-xs mr-2 font-sans">
                      ₹ 1,600
                    </span>
                    <span className="text-gray-900 font-bold text-base font-serif">
                      ₹ 1,440
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
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-300">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.825 14.16 2.8 11.535 2.8c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.88L2.012 21.9l4.635-1.746z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="relative aspect-[362/336] w-full overflow-hidden bg-gray-50">
                <span className="absolute top-4 left-4 z-10 bg-white text-black font-semibold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase shadow-sm font-sans">
                  Best Seller
                </span>
                <span className="absolute top-4 right-4 z-10 bg-[#ab8d6d]/90 text-white font-medium text-[10px] px-2.5 py-1 rounded tracking-wider font-sans">
                  10% OFF
                </span>
                <img 
                  src={ca4Img} 
                  alt="Temple Gold covering Necklace Set" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[#e28743] text-xs font-semibold uppercase tracking-wider mb-2 block font-sans">
                  BANGLES
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 line-clamp-1">
                  Temple Gold covering Necklace Set
                </h3>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-baseline">
                    <span className="text-gray-400 line-through text-xs mr-2 font-sans">
                      ₹ 6,600
                    </span>
                    <span className="text-gray-900 font-bold text-base font-serif">
                      ₹ 5,940
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
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-300">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.825 14.16 2.8 11.535 2.8c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.88L2.012 21.9l4.635-1.746z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="relative aspect-[362/336] w-full overflow-hidden bg-gray-50">
                <span className="absolute top-4 left-4 z-10 bg-white text-black font-semibold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase shadow-sm font-sans">
                  Best Seller
                </span>
                <span className="absolute top-4 right-4 z-10 bg-[#ab8d6d]/90 text-white font-medium text-[10px] px-2.5 py-1 rounded tracking-wider font-sans">
                  20% OFF
                </span>
                <img 
                  src={ca5Img} 
                  alt="Celestial Earings" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[#e28743] text-xs font-semibold uppercase tracking-wider mb-2 block font-sans">
                  Earnings
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 line-clamp-1">
                  Celestial Earings
                </h3>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-baseline">
                    <span className="text-gray-400 line-through text-xs mr-2 font-sans">
                      ₹ 400
                    </span>
                    <span className="text-gray-900 font-bold text-base font-serif">
                      ₹ 320
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
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-300">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.825 14.16 2.8 11.535 2.8c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.88L2.012 21.9l4.635-1.746z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="relative aspect-[362/336] w-full overflow-hidden bg-gray-50">
                <span className="absolute top-4 left-4 z-10 bg-white text-black font-semibold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase shadow-sm font-sans">
                  Best Seller
                </span>
                <span className="absolute top-4 right-4 z-10 bg-[#ab8d6d]/90 text-white font-medium text-[10px] px-2.5 py-1 rounded tracking-wider font-sans">
                  12% OFF
                </span>
                <img 
                  src={ca6Img} 
                  alt="Palakka Choker" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[#e28743] text-xs font-semibold uppercase tracking-wider mb-2 block font-sans">
                  BANGLES
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 line-clamp-1">
                  Palakka Choker
                </h3>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-baseline">
                    <span className="text-gray-400 line-through text-xs mr-2 font-sans">
                      ₹ 900
                    </span>
                    <span className="text-gray-900 font-bold text-base font-serif">
                      ₹ 792
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
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-300">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.825 14.16 2.8 11.535 2.8c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.88L2.012 21.9l4.635-1.746z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

