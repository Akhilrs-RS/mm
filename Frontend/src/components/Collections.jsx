import Footer from './Footer';
import Nav from './Nav';

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
    badge: "Festival special 299 off"
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
      <Nav />

      {/* Hero Banner Section */}
      <section 
        className="w-full bg-cover bg-center py-20 px-6 md:px-12 lg:px-24 flex items-center relative"
        style={{ 
          backgroundImage: `url(${c1Img})`,
          minHeight: '280px'
        }}
      >
        <div className="absolute inset-0 bg-black/15 z-0 pointer-events-none"></div>

        <div className="container mx-auto z-10 flex flex-col justify-center items-center text-center max-w-4xl">
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
                <div className="aspect-square w-full overflow-hidden">
                  <img 
                    src={col.image} 
                    alt={col.title} 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                {/* Dark Bronze Content Section */}
                <div className="bg-gradient-to-b from-[#8c624c] to-[#4c3222] text-white p-6 flex flex-col flex-grow items-start justify-start min-h-[220px]">
                  <h3 className="font-serif text-lg md:text-xl font-medium text-white mb-2">
                    {col.title}
                  </h3>
                  <p className="text-white/85 text-xs md:text-sm font-light font-sans leading-relaxed mb-4">
                    {col.description}
                  </p>

                  {/* Red Pill Badge */}
                  <div className="mb-4">
                    <span className="bg-[#e53e3e] text-white text-[10px] md:text-xs font-medium px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                      {col.badge}
                    </span>
                  </div>

                  {/* View Collection Link */}
                  <div className="mt-auto">
                    <a 
                      href={`#collections/${col.id}`} 
                      className="inline-flex items-center text-white hover:text-gold-400 text-xs md:text-sm font-semibold transition-colors duration-300 group"
                    >
                      View Collection
                      <svg 
                        className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth={2}
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
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
