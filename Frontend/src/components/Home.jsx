import h1Img from '../assets/h1.png';

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
    </div>
  );
}
