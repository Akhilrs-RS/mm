export const products = [
  {
    id: 'p1',
    name: 'Elysian Solitaire Ring',
    category: 'rings',
    basePrice: 2500,
    image: '/solitaire_ring.png',
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    gemstone: 'Diamond',
    carat: '1.5',
    cut: 'Round Brilliant',
    rating: 4.9,
    reviewsCount: 38,
    description: 'A timeless masterpiece featuring a hand-selected round brilliant diamond set on a polished 18k yellow gold band. The classic four-prong setting maximizes the diamond\'s brilliance, offering an unparalleled sparkle that commands attention.',
    specs: {
      Metal: '18K Yellow Gold (configurable)',
      Gemstone: 'Conflict-Free Diamond',
      Clarity: 'VS1',
      Color: 'G-H',
      Width: '2.0mm',
    }
  },
  {
    id: 'p2',
    name: 'Aurelia Sapphire Necklace',
    category: 'necklaces',
    basePrice: 8900,
    image: '/sapphire_necklace.png',
    metals: ['platinum', 'white-gold'],
    gemstone: 'Blue Sapphire',
    carat: '4.2',
    cut: 'Pear Shape',
    rating: 5.0,
    reviewsCount: 24,
    description: 'An exquisite arrangement of royal blue sapphire droplets enveloped in sparkling pavé diamonds, handcrafted in platinum. Perfect for galas and momentous celebrations, this piece sits elegantly on the collarbone.',
    specs: {
      Metal: 'Platinum 950',
      Gemstone: 'Natural Ceylon Sapphire & Diamonds',
      TotalWeight: '4.2 Carats Sapphire, 1.8 Carats Diamond',
      Length: '18 Inches',
      Clarity: 'Eye Clean',
    }
  },
  {
    id: 'p3',
    name: 'Valkyrie Emerald Drops',
    category: 'earrings',
    basePrice: 4200,
    image: '/emerald_earrings.png',
    metals: ['white-gold', 'platinum', 'yellow-gold'],
    gemstone: 'Emerald',
    carat: '2.8',
    cut: 'Emerald Cut',
    rating: 4.8,
    reviewsCount: 19,
    description: 'A breathtaking pair of drop earrings featuring deep green emerald-cut emeralds, suspended from elegant diamond floral clusters. Designed to catch light with every movement, bringing a touch of regal refinement to any look.',
    specs: {
      Metal: '18K White Gold',
      Gemstone: 'Colombian Emerald & Round Cut Diamonds',
      EmeraldWeight: '2.8 Carats Total',
      DiamondWeight: '0.9 Carats Total',
      Backing: 'Push Back',
    }
  },
  {
    id: 'p4',
    name: 'Seraphina Tennis Bracelet',
    category: 'bracelets',
    basePrice: 6800,
    image: '/gold_bracelet.png',
    metals: ['rose-gold', 'yellow-gold', 'white-gold', 'platinum'],
    gemstone: 'Diamond',
    carat: '5.5',
    cut: 'Round Brilliant',
    rating: 4.9,
    reviewsCount: 42,
    description: 'A continuous line of hand-matched brilliant-cut diamonds, set in warm 18k rose gold. This tennis bracelet combines sleek fluid movement with maximum brilliance, representing a staple of high-end luxury fashion.',
    specs: {
      Metal: '18K Rose Gold',
      Gemstone: 'Round Cut Diamonds',
      TotalWeight: '5.5 Carats',
      Length: '7 Inches',
      Clarity: 'VS2-SI1',
    }
  },
  {
    id: 'p5',
    name: 'Elysian Diamond Hoop Earrings',
    category: 'earrings',
    basePrice: 3400,
    image: '/emerald_earrings.png', // Re-used beautifully cropped
    metals: ['yellow-gold', 'white-gold'],
    gemstone: 'Diamond',
    carat: '1.8',
    cut: 'Round Cut',
    rating: 4.7,
    reviewsCount: 15,
    description: 'Classic gold hoops adorned with inside-out handset diamonds, reflecting brilliant light from every angle. A modern essential that effortlessly transitions from daytime chic to evening glamour.',
    specs: {
      Metal: '18K Yellow Gold',
      Gemstone: 'Brilliant Round Diamonds',
      Weight: '1.8 Carats Total',
      Diameter: '25mm',
      Locking: 'Hinge Lock',
    }
  },
  {
    id: 'p6',
    name: 'Helios Band',
    category: 'rings',
    basePrice: 1950,
    image: '/solitaire_ring.png', // Re-used beautifully
    metals: ['yellow-gold', 'rose-gold', 'platinum'],
    gemstone: 'None',
    carat: '0.0',
    cut: 'Plain / Pavé Border',
    rating: 4.9,
    reviewsCount: 31,
    description: 'A sculptural, bold band highlighting clean geometric gold lines. Elegant alone or as a modern stacked addition to your engagement ring, representing eternal binding and warmth.',
    specs: {
      Metal: '18K Yellow Gold',
      Width: '4.5mm',
      Style: 'High-polish faceted band',
      Thickness: '1.8mm',
    }
  }
];

export const consultants = [
  {
    id: 'c1',
    name: 'Alessandro Rossi',
    role: 'Master GIA Gemologist',
    specialty: 'Bespoke Engagement Rings',
    bio: 'With over 15 years in Antwerp and Milan, Alessandro specializes in helping couples design heirloom rings with rare diamonds.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'c2',
    name: 'Genevieve Dupont',
    role: 'High Jewellery Specialist',
    specialty: 'Bridal & Statement Necklaces',
    bio: 'Genevieve curation focuses on red-carpet layouts, historic sapphires, and finding the perfect necklace for grand entrances.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'c3',
    name: 'Marcus Vance',
    role: 'Heritage Art Director',
    specialty: 'Custom Metalwork & Engravings',
    bio: 'Marcus has 20 years of experience translating personal stories into engraved metal details, filigree, and custom seals.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export const reviews = [
  {
    id: 'r1',
    name: 'Victoria Belmont',
    rating: 5,
    date: 'May 14, 2026',
    comment: 'The Elysian Solitaire ring is absolutely breathtaking! The sparkle in natural sunlight is incomparable. Alessandro helped me choose the perfect stone. The luxury box and certification felt so premium.',
    productName: 'Elysian Solitaire Ring'
  },
  {
    id: 'r2',
    name: 'Julian Carter',
    rating: 5,
    date: 'April 28, 2026',
    comment: 'I designed a custom anniversary ring using the customizer. The interactive 3D tool made it so easy to visualize rose gold vs yellow gold. The final piece exceeded our expectations. The engraving is gorgeous.',
    productName: 'Custom Jewellery Design'
  },
  {
    id: 'r3',
    name: 'Sophia Lindqvist',
    rating: 5,
    date: 'June 02, 2026',
    comment: 'Exceptional service and exquisite craft. The Virtual Try-On simulator was a game changer for choosing my wedding earrings. Prompt delivery and gorgeous velvet presentation case.',
    productName: 'Valkyrie Emerald Drops'
  }
];

export const metalOptions = [
  { id: 'yellow-gold', name: '18K Yellow Gold', colorClass: 'bg-[#E5C158]', hex: '#E5C158', priceModifier: 0 },
  { id: 'white-gold', name: '18K White Gold', colorClass: 'bg-[#E8E8E8]', hex: '#E8E8E8', priceModifier: 150 },
  { id: 'rose-gold', name: '18K Rose Gold', colorClass: 'bg-[#E0A890]', hex: '#E0A890', priceModifier: 100 },
  { id: 'platinum', name: 'Platinum 950', colorClass: 'bg-[#D2D5DB]', hex: '#D2D5DB', priceModifier: 400 }
];

export const stoneOptions = [
  { id: 'diamond', name: 'Diamond', pricePerCarat: 2000, color: '#E8F5E9', rating: 'VVS1, Color D' },
  { id: 'emerald', name: 'Emerald', pricePerCarat: 1400, color: '#043927', rating: 'Colombian, Vivid Green' },
  { id: 'sapphire', name: 'Sapphire', pricePerCarat: 1600, color: '#0F2C59', rating: 'Ceylon Royal Blue' },
  { id: 'ruby', name: 'Ruby', pricePerCarat: 1800, color: '#721C24', rating: 'Burmese Pigeon Blood' }
];

export const cutOptions = [
  { id: 'round', name: 'Round Brilliant', multiplier: 1.0 },
  { id: 'oval', name: 'Oval Cut', multiplier: 0.95 },
  { id: 'emerald', name: 'Emerald Cut', multiplier: 0.90 },
  { id: 'princess', name: 'Princess Cut', multiplier: 0.92 }
];
