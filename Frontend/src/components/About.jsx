import Footer from './Footer';

// Import assets
import aboutHeroImg from '../assets/os.png';
import storyImg from '../assets/ca11.png'; // Using the traditional gemstone necklace matching the layout

// Features Data
const featuresData = [
  {
    id: 1,
    title: "Premium Quality",
    description: "Every piece is crafted with the finest materials, ensuring lasting beauty and durability for generations."
  },
  {
    id: 2,
    title: "Certified Jewellery",
    description: "All our gold and diamonds come with proper hallmark and certification from accredited laboratories."
  },
  {
    id: 3,
    title: "Latest Designs",
    description: "Our in-house designers create contemporary collections inspired by both tradition and modern trends."
  },
  {
    id: 4,
    title: "Customer Satisfaction",
    description: "Your happiness is our priority. We offer personalized consultations and lifetime after-sale support."
  },
  {
    id: 5,
    title: "Competitive Pricing",
    description: "Transparent pricing with no hidden charges. We offer the best value for premium jewellery in the market."
  }
];

export default function About() {
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
          backgroundImage: `url(${aboutHeroImg})`,
          minHeight: '280px'
        }}
      >
        <div className="absolute inset-0 bg-black/15 z-0 pointer-events-none"></div>

        <div className="container mx-auto z-10 flex flex-col justify-center items-center text-center max-w-4xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Our Story
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light font-sans max-w-2xl">
            About MM Jewellery
          </p>
        </div>
      </section>

      {/* Legacy / Story Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Image Column */}
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] w-full">
              <img 
                src={storyImg} 
                alt="Jewellery Craftsmanship" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right Text Column */}
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                A Legacy of Craftsmanship
              </h2>
              <div className="space-y-5 text-gray-600 text-xs md:text-sm font-light font-sans leading-relaxed">
                <p>
                  Founded in 2018, MM Jewellery has grown from a small family workshop into one of the most trusted names in fine jewellery. Our journey began with a simple belief: that every person deserves to own jewellery that is as unique and precious as the moments it celebrates.
                </p>
                <p>
                  Every piece in our collection is a testament to the skill of our master artisans, who combine centuries-old techniques with contemporary design sensibilities. From the sourcing of ethically mined gemstones to the final polish, we oversee every step of the creation process.
                </p>
                <p>
                  Today, we serve thousands of happy customers across India, helping them find the perfect piece for weddings, anniversaries, festivals, and everyday elegance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="pb-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Mission Box */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-start">
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600 text-xs md:text-sm font-light font-sans leading-relaxed">
                To provide exceptional quality jewellery with trusted service, transparent pricing, and a personal touch that makes every customer feel valued. We aim to make luxury accessible without compromising on craftsmanship.
              </p>
            </div>

            {/* Our Vision Box */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-start">
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600 text-xs md:text-sm font-light font-sans leading-relaxed">
                To become India's most beloved and trusted jewellery brand – a name synonymous with quality, elegance, and integrity. We envision a future where every home has a cherished MM Jewellery piece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="pb-24 px-6 md:px-12 lg:px-24 bg-white border-t border-gray-100 pt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[#aa7c11] font-medium text-xs md:text-sm tracking-wider uppercase block mb-2 font-serif">
              The MM Difference
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {featuresData.map((feature) => (
              <div key={feature.id} className="text-center flex flex-col items-center">
                <h4 className="font-serif text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed font-light font-sans">
                  {feature.description}
                </p>
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
