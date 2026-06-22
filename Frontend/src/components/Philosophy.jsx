import React from 'react';
import { Shield, Sparkles, Award, Globe, Quote, Star } from 'lucide-react';
import { reviews } from '../data/products';

export default function Philosophy() {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    {
      title: "1. Conceptual Design",
      desc: "Every creation begins as a hand-drawn pencil sketch by our design artists in Milan, mapping proportions and light reflections.",
      detail: "We focus heavily on structural harmony and how different metal shapes naturally catch light."
    },
    {
      title: "2. Precision CAD & Prototyping",
      desc: "Our designs are translated into millimeter-perfect 3D digital renders to analyze durability and stone seating comfort.",
      detail: "This ensures the jewelry is not only visually breathtaking but structurally perfect for lifetime wear."
    },
    {
      title: "3. Alloy Casting & Hand-Carving",
      desc: "Using pure gold or platinum, our master metal-smiths cast and hand-carve the claws, setting beads, and custom contours.",
      detail: "We alloy our own gold in-house to achieve our signature champagne and soft rose hues."
    },
    {
      title: "4. Micro-Pavé Gem Setting",
      desc: "Under microscope guidance, gemologists seat and hand-secure every gemstone using delicate prongs, ending with high-mirror polish.",
      detail: "Each stone is checked by three gemologists before signature sealing."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-luxury-ivory-dark/10 dark:bg-luxury-onyx/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div className="p-6 luxury-glass rounded-xl text-center space-y-3">
            <div className="flex justify-center"><Shield className="w-8 h-8 text-luxury-gold" /></div>
            <h3 className="font-cinzel font-bold text-sm tracking-widest uppercase">GIA Certification</h3>
            <p className="font-sans text-xs text-luxury-onyx/70 dark:text-luxury-ivory/70 leading-relaxed">
              Every diamond over 0.5 carats is accompanied by a unique GIA Grading Certificate guaranteeing grading metrics.
            </p>
          </div>
          <div className="p-6 luxury-glass rounded-xl text-center space-y-3">
            <div className="flex justify-center"><Globe className="w-8 h-8 text-luxury-gold" /></div>
            <h3 className="font-cinzel font-bold text-sm tracking-widest uppercase">Ethical Sourcing</h3>
            <p className="font-sans text-xs text-luxury-onyx/70 dark:text-luxury-ivory/70 leading-relaxed">
              We exclusively utilize Kimberley Process certified diamonds and recycled metals to minimize environmental impact.
            </p>
          </div>
          <div className="p-6 luxury-glass rounded-xl text-center space-y-3">
            <div className="flex justify-center"><Award className="w-8 h-8 text-luxury-gold" /></div>
            <h3 className="font-cinzel font-bold text-sm tracking-widest uppercase">Lifetime Care</h3>
            <p className="font-sans text-xs text-luxury-onyx/70 dark:text-luxury-ivory/70 leading-relaxed">
              Enjoy complimentary lifetime sizing, tightening inspection, and ultrasonic restoration on all MM originals.
            </p>
          </div>
          <div className="p-6 luxury-glass rounded-xl text-center space-y-3">
            <div className="flex justify-center"><Sparkles className="w-8 h-8 text-luxury-gold" /></div>
            <h3 className="font-cinzel font-bold text-sm tracking-widest uppercase">Bespoke Design</h3>
            <p className="font-sans text-xs text-luxury-onyx/70 dark:text-luxury-ivory/70 leading-relaxed">
              Work directly with our Milan gemologists to build unique heirloom jewellery customized exactly to your vision.
            </p>
          </div>
        </div>

        {/* Narrative & Artisan Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">The Artisan Journey</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold leading-tight">
              Honoring centuries of <br />
              <span className="gold-gradient-text">Italian Mastery</span>
            </h2>
            <p className="font-sans text-sm text-luxury-onyx/70 dark:text-luxury-ivory/70 leading-relaxed">
              At MM Jewellery, jewelry design is not a production line; it is a meticulous art. Each claw is shaped to maximize diamond brilliance, and metals are alloyed to stand the test of time. Discover our timeline step-by-step to see how raw minerals transform into timeless expressions.
            </p>
            <div className="flex flex-col space-y-2.5">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-3.5 border-l-2 rounded-r-lg transition-all duration-300 ${
                    activeStep === idx 
                      ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-gold font-semibold' 
                      : 'border-black/10 dark:border-white/10 text-luxury-onyx/70 dark:text-luxury-ivory/70 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="font-cinzel text-xs uppercase tracking-wider">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 luxury-glass p-8 rounded-2xl relative min-h-[300px] flex flex-col justify-between text-left">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-luxury-gold/5 rounded-full blur-xl pointer-events-none" />
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
                <span className="font-cinzel text-lg font-bold text-luxury-gold">
                  {steps[activeStep].title}
                </span>
                <Sparkles className="w-5 h-5 text-luxury-gold animate-pulse" />
              </div>
              <p className="font-sans text-base text-luxury-onyx/80 dark:text-luxury-ivory/80 leading-relaxed">
                {steps[activeStep].desc}
              </p>
              <div className="p-4 bg-luxury-gold/5 rounded-lg border border-luxury-gold/10">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-luxury-gold mb-1">
                  Artisan insight:
                </h4>
                <p className="text-xs text-luxury-onyx/70 dark:text-luxury-ivory/70 italic leading-relaxed">
                  "{steps[activeStep].detail}"
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-8">
              {steps.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-12 h-1 rounded-full transition-all duration-300 ${
                    activeStep === idx ? 'bg-luxury-gold w-16' : 'bg-black/20 dark:bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Client Reviews Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">Bespoke Relations</span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold">Client Appreciations</h2>
            <div className="w-16 h-[2px] bg-luxury-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-6 luxury-glass rounded-xl border border-luxury-gold/15 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-1 text-luxury-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-luxury-gold/20" />
                  <p className="font-sans text-xs text-luxury-onyx/80 dark:text-luxury-ivory/80 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="border-t border-black/10 dark:border-white/10 pt-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                  <span className="text-luxury-onyx/60 dark:text-luxury-ivory/60">{rev.name}</span>
                  <span className="text-luxury-gold">{rev.productName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
