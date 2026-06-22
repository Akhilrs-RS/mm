import React from 'react';
import { Sparkles, ShoppingBag, ShieldAlert, Award, PenTool } from 'lucide-react';
import { metalOptions, stoneOptions, cutOptions } from '../data/products';

export default function Customizer({ preselectedProduct, onAddToBag }) {
  // Configurator States
  const [settingStyle, setSettingStyle] = React.useState('solitaire'); // solitaire, halo, crown
  const [metal, setMetal] = React.useState('yellow-gold');
  const [gemstone, setGemstone] = React.useState('diamond');
  const [cut, setCut] = React.useState('round');
  const [carats, setCarats] = React.useState(1.5);
  const [engraving, setEngraving] = React.useState('');
  const [engravingFont, setEngravingFont] = React.useState('serif'); // serif, sans, cursive
  
  // Custom success banner state
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Pre-load states if navigated from Collection with a product template
  React.useEffect(() => {
    if (preselectedProduct) {
      if (preselectedProduct.category === 'rings') {
        setSettingStyle('solitaire');
      } else {
        setSettingStyle('halo');
      }
      if (preselectedProduct.metals && preselectedProduct.metals.length > 0) {
        setMetal(preselectedProduct.metals[0]);
      }
      if (preselectedProduct.gemstone && preselectedProduct.gemstone !== 'None') {
        const foundStone = stoneOptions.find(s => s.name.toLowerCase().includes(preselectedProduct.gemstone.toLowerCase()));
        if (foundStone) setGemstone(foundStone.id);
      }
      if (preselectedProduct.carat && parseFloat(preselectedProduct.carat) > 0) {
        setCarats(parseFloat(preselectedProduct.carat));
      }
    }
  }, [preselectedProduct]);

  // Pricing Logic
  const getPricing = () => {
    const basePrices = {
      solitaire: 1200,
      halo: 1800,
      crown: 2200
    };
    
    const base = basePrices[settingStyle];
    const metalOpt = metalOptions.find(m => m.id === metal);
    const metalAdd = metalOpt ? metalOpt.priceModifier : 0;
    
    const stoneOpt = stoneOptions.find(s => s.id === gemstone);
    const stonePricePerCarat = stoneOpt ? stoneOpt.pricePerCarat : 0;
    
    const cutOpt = cutOptions.find(c => c.id === cut);
    const cutMult = cutOpt ? cutOpt.multiplier : 1.0;
    
    const stonePrice = Math.round(carats * stonePricePerCarat * cutMult);
    const total = base + metalAdd + stonePrice;
    
    return {
      base,
      metalAdd,
      stonePrice,
      total
    };
  };

  const prices = getPricing();

  const handleAddCustomToBag = () => {
    const activeMetalObj = metalOptions.find(m => m.id === metal);
    const activeStoneObj = stoneOptions.find(s => s.id === gemstone);
    const activeCutObj = cutOptions.find(c => c.id === cut);
    
    onAddToBag({
      id: `custom-${settingStyle}-${metal}-${gemstone}-${cut}-${carats}`,
      productId: 'custom-jewelry',
      name: `Custom ${activeCutObj?.name} ${activeStoneObj?.name} ${settingStyle === 'solitaire' ? 'Solitaire' : settingStyle === 'halo' ? 'Halo' : 'Crown'} Ring`,
      image: '/solitaire_ring.png', // custom designs fallback to solitaire ring template
      category: 'rings',
      price: prices.total,
      metal: activeMetalObj?.name || 'Gold',
      stone: `${carats}ct ${activeStoneObj?.name} (${activeCutObj?.name})`,
      engraving: engraving ? `"${engraving}" (${engravingFont})` : null,
      isCustom: true,
      specs: {
        Setting: settingStyle.toUpperCase(),
        Metal: activeMetalObj?.name,
        Gemstone: activeStoneObj?.name,
        Carats: `${carats} ct`,
        Cut: activeCutObj?.name,
        Engraving: engraving || 'None'
      },
      quantity: 1
    });

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4000);
  };

  // Metal Color Helper
  const getMetalHex = () => {
    if (metal === 'yellow-gold') return '#E5C158';
    if (metal === 'rose-gold') return '#E0A890';
    if (metal === 'white-gold') return '#E8E8E8';
    return '#D2D5DB'; // platinum
  };

  // Gemstone Color Helper
  const getStoneHex = () => {
    if (gemstone === 'diamond') return '#E3F2FD';
    if (gemstone === 'emerald') return '#10B981';
    if (gemstone === 'sapphire') return '#2563EB';
    return '#EF4444'; // ruby
  };

  // Gemstone Cut Path Helper (for ring mockup SVG)
  const renderStoneSVG = () => {
    const stoneColor = getStoneHex();
    // Scale stone based on carats (1.5 carat = base size 1.0)
    const scale = 0.6 + (carats / 5.0) * 0.8;
    const baseRadius = 24 * scale;

    if (cut === 'round') {
      return (
        <g transform="translate(150, 80)">
          {/* Facet reflections */}
          <circle cx="0" cy="0" r={baseRadius} fill={stoneColor} className="drop-shadow-lg" />
          <path d={`M 0 0 L 0 -${baseRadius} L ${baseRadius/2} -${baseRadius/2} Z`} fill="rgba(255,255,255,0.4)" />
          <path d={`M 0 0 L -${baseRadius/2} -${baseRadius/2} L 0 -${baseRadius} Z`} fill="rgba(255,255,255,0.2)" />
          <path d={`M 0 0 L ${baseRadius} 0 L ${baseRadius/2} ${baseRadius/2} Z`} fill="rgba(255,255,255,0.3)" />
          <path d={`M 0 0 L -${baseRadius} 0 L -${baseRadius/2} -${baseRadius/2} Z`} fill="rgba(0,0,0,0.15)" />
          <path d={`M 0 0 L 0 ${baseRadius} L -${baseRadius/2} ${baseRadius/2} Z`} fill="rgba(0,0,0,0.2)" />
          <circle cx="0" cy="0" r={baseRadius/2} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
        </g>
      );
    }
    
    if (cut === 'oval') {
      return (
        <g transform="translate(150, 80)">
          <ellipse cx="0" cy="0" rx={baseRadius * 1.25} ry={baseRadius * 0.9} fill={stoneColor} className="drop-shadow-lg" />
          <path d={`M 0 0 L 0 -${baseRadius * 0.9} L ${baseRadius*0.6} -${baseRadius*0.5} Z`} fill="rgba(255,255,255,0.4)" />
          <path d={`M 0 0 L -${baseRadius * 1.25} 0 L -${baseRadius*0.7} -${baseRadius*0.5} Z`} fill="rgba(0,0,0,0.15)" />
          <ellipse cx="0" cy="0" rx={baseRadius * 0.6} ry={baseRadius * 0.45} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
        </g>
      );
    }

    if (cut === 'emerald') {
      return (
        <g transform="translate(150, 80)">
          <rect 
            x={-baseRadius * 1.2} 
            y={-baseRadius * 0.9} 
            width={baseRadius * 2.4} 
            height={baseRadius * 1.8} 
            rx="2" 
            fill={stoneColor} 
            className="drop-shadow-lg" 
          />
          {/* Emerald cut internal steps */}
          <rect 
            x={-baseRadius * 0.9} 
            y={-baseRadius * 0.65} 
            width={baseRadius * 1.8} 
            height={baseRadius * 1.3} 
            fill="none" 
            stroke="rgba(255,255,255,0.6)" 
            strokeWidth="1" 
          />
          <line x1={-baseRadius*1.2} y1={-baseRadius*0.9} x2={-baseRadius*0.9} y2={-baseRadius*0.65} stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1={baseRadius*1.2} y1={-baseRadius*0.9} x2={baseRadius*0.9} y2={-baseRadius*0.65} stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1={-baseRadius*1.2} y1={baseRadius*0.9} x2={-baseRadius*0.9} y2={baseRadius*0.65} stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
          <line x1={baseRadius*1.2} y1={baseRadius*0.9} x2={baseRadius*0.9} y2={baseRadius*0.65} stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
        </g>
      );
    }

    // Princess cut
    return (
      <g transform="translate(150, 80) rotate(45)">
        <rect 
          x={-baseRadius * 0.95} 
          y={-baseRadius * 0.95} 
          width={baseRadius * 1.9} 
          height={baseRadius * 1.9} 
          fill={stoneColor} 
          className="drop-shadow-lg" 
        />
        {/* Diamond facets */}
        <line x1={-baseRadius*0.95} y1={-baseRadius*0.95} x2={baseRadius*0.95} y2={baseRadius*0.95} stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <line x1={-baseRadius*0.95} y1={baseRadius*0.95} x2={baseRadius*0.95} y2={-baseRadius*0.95} stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <rect 
          x={-baseRadius * 0.5} 
          y={-baseRadius * 0.5} 
          width={baseRadius} 
          height={baseRadius} 
          fill="none" 
          stroke="rgba(255,255,255,0.5)" 
          strokeWidth="0.5" 
        />
      </g>
    );
  };

  const getFontFamilyClass = () => {
    if (engravingFont === 'sans') return 'font-sans';
    if (engravingFont === 'cursive') return 'italic font-serif tracking-widest';
    return 'font-cinzel tracking-widest';
  };

  return (
    <section className="py-12 bg-luxury-ivory dark:bg-luxury-onyx-dark transition-colors duration-300 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-black/10 dark:border-white/10 pb-6 mb-10">
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5" /> Artisan Workshop
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-luxury-onyx dark:text-luxury-ivory mt-2">
            Design Your Own Ring
          </h1>
          <p className="font-sans text-xs sm:text-sm text-luxury-onyx/60 dark:text-luxury-ivory/60 mt-1 max-w-2xl">
            Choose setting layout, fine metals, conflict-free gemstones, shape, and carat weights. Review pricing breakdown and preview your customized creation in real time.
          </p>
        </div>

        {/* Customization grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Visual Interactive Ring Mockup (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="w-full aspect-square luxury-glass rounded-2xl border border-luxury-gold/15 p-6 flex flex-col justify-between items-center relative overflow-hidden bg-gradient-to-tr from-luxury-onyx-light to-luxury-onyx/90">
              
              {/* Decorative design elements */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-center w-full z-10">
                <span className="text-[10px] tracking-widest uppercase font-bold text-luxury-gold">
                  Live Workshop View
                </span>
                <span className="text-[10px] px-2 py-0.5 border border-luxury-gold/30 rounded bg-luxury-gold/5 font-mono text-luxury-gold font-bold">
                  {carats.toFixed(2)} CT
                </span>
              </div>

              {/* Dynamic SVG Visualizer */}
              <svg 
                viewBox="0 0 300 300" 
                className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-2xl z-10"
              >
                <defs>
                  {/* Metal band gradient depending on chosen metal */}
                  <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={getMetalHex()} stopOpacity="1" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor={getMetalHex()} stopOpacity="1" />
                  </linearGradient>
                  
                  {/* Ring Inner Shadow shadow */}
                  <radialGradient id="innerShad" cx="50%" cy="50%" r="50%">
                    <stop offset="70%" stopColor="transparent" stopOpacity="0" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                  </radialGradient>
                </defs>

                {/* Ring Band Shadow */}
                <ellipse cx="150" cy="245" rx="55" ry="8" fill="rgba(0,0,0,0.3)" filter="blur(4px)" />

                {/* Ring Metal Band Outline */}
                <circle cx="150" cy="180" r="70" fill="none" stroke="url(#metalGrad)" strokeWidth="12" />
                <circle cx="150" cy="180" r="70" fill="url(#innerShad)" />
                <circle cx="150" cy="180" r="64" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

                {/* Halo stones if selected */}
                {settingStyle === 'halo' && (
                  <circle cx="150" cy="80" r="32" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="3, 3" className="animate-spin-slow opacity-80" />
                )}

                {/* Crown prongs if selected */}
                {settingStyle === 'crown' && (
                  <g stroke={getMetalHex()} strokeWidth="3" strokeLinecap="round">
                    <line x1="125" y1="102" x2="120" y2="75" />
                    <line x1="175" y1="102" x2="180" y2="75" />
                    <line x1="150" y1="110" x2="150" y2="92" strokeWidth="2" />
                  </g>
                )}

                {/* Standard prongs for Solitaire */}
                {settingStyle === 'solitaire' && (
                  <g stroke={getMetalHex()} strokeWidth="3" strokeLinecap="round" opacity="0.9">
                    <line x1="134" y1="96" x2="140" y2="82" />
                    <line x1="166" y1="96" x2="160" y2="82" />
                  </g>
                )}

                {/* Render the Gemstone SVG Group */}
                {renderStoneSVG()}

                {/* Close-up Engraving Text overlay (in curve) */}
                {engraving && (
                  <g>
                    <path id="engravePath" d="M 112 185 A 38 38 0 0 0 188 185" fill="none" stroke="transparent" />
                    <text fontStyle="italic" fontSize="7" fill="rgba(255,255,255,0.4)" textAnchor="middle">
                      <textPath href="#engravePath" startOffset="50%" className={getFontFamilyClass()}>
                        {engraving.toUpperCase()}
                      </textPath>
                    </text>
                  </g>
                )}
              </svg>

              {/* Live Engraving Overlay label */}
              {engraving && (
                <div className="z-10 py-1 px-3 luxury-glass text-[9px] uppercase tracking-wider rounded border border-luxury-gold/20 flex gap-2">
                  <span className="font-bold text-luxury-gold">Engraved:</span> 
                  <span className={`${getFontFamilyClass()} text-luxury-onyx/90 dark:text-luxury-ivory/90`}>
                    "{engraving}"
                  </span>
                </div>
              )}

              {/* Warranty and support notes */}
              <div className="flex gap-4 justify-center items-center w-full z-10 pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[10px] text-white/60">
                  <Award className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>Conflict-Free Certification</span>
                </div>
              </div>
            </div>

            {/* Price Detail Summary Card */}
            <div className="luxury-glass p-5 rounded-2xl border border-luxury-gold/15 space-y-4">
              <h3 className="font-cinzel font-bold text-sm tracking-wider uppercase">Price Breakdown</h3>
              <div className="space-y-2 text-xs text-luxury-onyx/75 dark:text-luxury-ivory/75 font-sans">
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 py-1">
                  <span>Setting Structure ({settingStyle})</span>
                  <span>${prices.base}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 py-1">
                  <span>Alloy Material modifier ({metalOptions.find(m => m.id === metal)?.name})</span>
                  <span>+${prices.metalAdd}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 py-1">
                  <span>Gemstone Cost ({carats.toFixed(2)}ct {stoneOptions.find(s => s.id === gemstone)?.name})</span>
                  <span>+${prices.stonePrice}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 py-1 text-luxury-gold font-bold">
                  <span>Custom Laser Engraving</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between border-t border-black/10 dark:border-white/10 pt-3 text-sm font-bold text-luxury-onyx dark:text-luxury-ivory">
                  <span>Estimated Total</span>
                  <span className="text-luxury-gold">${prices.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Options Panel (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {isSuccess && (
              <div className="p-4 bg-luxury-gold/10 border border-luxury-gold text-luxury-gold rounded-lg flex items-center gap-3 animate-fade-in">
                <Sparkles className="w-5 h-5 text-luxury-gold animate-pulse" />
                <div className="text-xs">
                  <span className="font-bold">Design Saved!</span> Your customized ring design has been successfully added to your shopping bag.
                </div>
              </div>
            )}

            {/* 1. Setting Layout */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-luxury-gold block">
                1. Select Setting Style
              </span>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'solitaire', name: 'Classic Solitaire', price: 1200, desc: 'Clean, elegant, four-prong layout focusing focus on the center gem.' },
                  { id: 'halo', name: 'Pavé Halo', price: 1800, desc: 'A micro-diamond circle enveloping the center gem for a large appearance.' },
                  { id: 'crown', name: 'Royal Crown', price: 2200, desc: 'Artistic vintage six-prong castle layout with intricate side filigree.' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSettingStyle(s.id)}
                    className={`p-4 border rounded-xl flex flex-col justify-between text-left transition-all ${
                      settingStyle === s.id
                        ? 'border-luxury-gold bg-luxury-gold/5 shadow-md'
                        : 'border-black/15 dark:border-white/15 hover:border-luxury-gold/50'
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className="font-cinzel text-xs font-bold text-luxury-onyx dark:text-luxury-ivory">
                        {s.name}
                      </h4>
                      <p className="font-sans text-[10px] text-luxury-onyx/60 dark:text-luxury-ivory/60 line-clamp-2">
                        {s.desc}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-luxury-gold mt-4">${s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Metal Alloy */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-luxury-gold block">
                2. Choose Metal Band
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {metalOptions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMetal(m.id)}
                    className={`p-3 border rounded-xl flex items-center gap-3 transition-all ${
                      metal === m.id
                        ? 'border-luxury-gold bg-luxury-gold/5'
                        : 'border-black/15 dark:border-white/15 hover:border-luxury-gold/50'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border border-black/10 dark:border-white/20 ${m.colorClass}`} />
                    <div className="flex flex-col items-start text-[11px] font-sans">
                      <span className="font-bold text-luxury-onyx dark:text-luxury-ivory">{m.name}</span>
                      <span className="text-luxury-onyx/55 dark:text-luxury-ivory/55 text-[9px]">
                        {m.priceModifier === 0 ? 'Included' : `+$${m.priceModifier}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Gemstone Select */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-luxury-gold block">
                3. Gemstone & Cut
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Gemstone Type */}
                <div className="space-y-2">
                  <label className="text-[10px] text-luxury-onyx/60 dark:text-luxury-ivory/60 font-bold uppercase tracking-wider">
                    Select Stone Class
                  </label>
                  <select
                    value={gemstone}
                    onChange={(e) => setGemstone(e.target.value)}
                    className="w-full p-2.5 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg text-xs font-sans focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                  >
                    {stoneOptions.map((s) => (
                      <option key={s.id} value={s.id} className="dark:bg-luxury-onyx bg-luxury-ivory">
                        {s.name} (${s.pricePerCarat}/ct) - {s.rating}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Gemstone Shape/Cut */}
                <div className="space-y-2">
                  <label className="text-[10px] text-luxury-onyx/60 dark:text-luxury-ivory/60 font-bold uppercase tracking-wider">
                    Cut Refinement
                  </label>
                  <select
                    value={cut}
                    onChange={(e) => setCut(e.target.value)}
                    className="w-full p-2.5 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg text-xs font-sans focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                  >
                    {cutOptions.map((c) => (
                      <option key={c.id} value={c.id} className="dark:bg-luxury-onyx bg-luxury-ivory">
                        {c.name} (Modifier x{c.multiplier})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Carats Weight Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-luxury-gold">
                  4. Center Gemstone Carat Size
                </span>
                <span className="font-mono text-xs font-bold text-luxury-gold">{carats.toFixed(2)} Carats</span>
              </div>
              <div className="p-4 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-xl space-y-2">
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.25"
                  value={carats}
                  onChange={(e) => setCarats(parseFloat(e.target.value))}
                  className="w-full cursor-ew-resize"
                />
                <div className="flex justify-between text-[9px] font-mono text-luxury-onyx/40 dark:text-luxury-ivory/40">
                  <span>0.50 ct (Delicate)</span>
                  <span>1.50 ct</span>
                  <span>3.00 ct (Grand)</span>
                  <span>5.00 ct (Magnificent)</span>
                </div>
              </div>
            </div>

            {/* 5. Custom laser engraving text */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-luxury-gold block">
                5. Inner Band Laser Engraving
              </span>
              <div className="p-4 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-xl space-y-4">
                <div>
                  <input
                    type="text"
                    maxLength={24}
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    placeholder="E.g., MY HEART IS YOURS (Max 24 Characters)"
                    className="w-full px-3 py-2 bg-luxury-ivory dark:bg-luxury-onyx border border-black/10 dark:border-white/10 rounded-md text-xs focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory uppercase"
                  />
                </div>
                
                {/* Font Choices */}
                {engraving && (
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-luxury-onyx/60 dark:text-luxury-ivory/60 font-bold uppercase tracking-wider">
                      Laser Typeface:
                    </span>
                    <div className="flex gap-2">
                      {[
                        { id: 'serif', name: 'Roman Serif', font: 'font-cinzel' },
                        { id: 'sans', name: 'Modern Sans', font: 'font-sans' },
                        { id: 'cursive', name: 'Cursive Script', font: 'italic font-serif' }
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setEngravingFont(f.id)}
                          className={`px-3 py-1 border rounded text-[10px] ${f.font} ${
                            engravingFont === f.id
                              ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-gold font-bold'
                              : 'border-black/10 dark:border-white/10 text-luxury-onyx/75 dark:text-luxury-ivory/75'
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Add to shopping bag button */}
            <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-widest text-luxury-onyx/60 dark:text-luxury-ivory/60 font-bold block">
                  Complimentary Shipping & Box
                </span>
                <span className="text-2xl font-bold text-luxury-gold">${prices.total.toLocaleString()}</span>
              </div>
              <button
                onClick={handleAddCustomToBag}
                className="gold-gradient-button px-8 py-4 rounded-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all w-full sm:w-auto"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add Customized Ring to Bag</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
