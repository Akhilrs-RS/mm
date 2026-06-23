import Footer from './Footer';

// Import assets
import contactHeroImg from '../assets/cii.png';

export default function Contact() {
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
          backgroundImage: `url(${contactHeroImg})`,
          minHeight: '280px'
        }}
      >
        <div className="absolute inset-0 bg-black/15 z-0 pointer-events-none"></div>

        <div className="container mx-auto z-10 flex flex-col justify-center items-center text-center max-w-4xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Visit Our Showroom
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light font-sans max-w-2xl">
            We would love to help you find the perfect piece
          </p>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white flex-grow">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
              {/* Address Card */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center shrink-0 border border-gold-100">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#aa7c11] uppercase tracking-wider mb-1">
                    Store Address
                  </h4>
                  <p className="text-gray-600 text-xs md:text-sm font-light font-sans leading-relaxed">
                    123 Jewellery Lane, Gold Market, Mumbai, Maharashtra 400001, India
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center shrink-0 border border-gold-100">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.017 12.017 0 01-4.708-4.708c-.154-.44.01-1.21.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v1.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#aa7c11] uppercase tracking-wider mb-1">
                    Phone
                  </h4>
                  <div className="text-gray-600 text-xs md:text-sm font-light font-sans leading-relaxed">
                    <p>+91 98765 43210</p>
                    <p>+91 98765 43211</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center shrink-0 border border-gold-100">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#aa7c11] uppercase tracking-wider mb-1">
                    Email
                  </h4>
                  <p className="text-gray-600 text-xs md:text-sm font-light font-sans leading-relaxed">
                    info@mmjewellery.com
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center shrink-0 border border-gold-100">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#aa7c11] uppercase tracking-wider mb-1">
                    Working Hours
                  </h4>
                  <div className="text-gray-600 text-xs md:text-sm font-light font-sans leading-relaxed">
                    <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                    <p>Sunday: 11:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-2">
                <a 
                  href="https://wa.me/919876543210"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#1fba55] text-white text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.825 14.16 2.8 11.535 2.8c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.88L2.012 21.9l4.635-1.746z"/>
                  </svg>
                  WhatsApp Us
                </a>
                <a 
                  href="tel:+919876543210"
                  className="flex-1 py-3 px-4 bg-[#dfb074] hover:bg-[#d09e5f] text-black text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.017 12.017 0 01-4.708-4.708c-.154-.44.01-1.21.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v1.25z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>

            {/* Right Column: Google Maps Iframe */}
            <div className="lg:col-span-7">
              <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <iframe 
                  title="MM Jewellery Showroom Map"
                  src="https://maps.google.com/maps?q=Kalbadevi,%20Mumbai,%20India&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full min-h-[400px] border-0"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
