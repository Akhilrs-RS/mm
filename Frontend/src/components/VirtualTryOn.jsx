import React from 'react';
import { Camera, RefreshCw, Move, RotateCw, ZoomIn, Info } from 'lucide-react';

const modelCanvases = [
  {
    id: 'hand',
    name: 'Elegant Hand (Rings & Bracelets)',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600&h=600',
    type: 'rings'
  },
  {
    id: 'neck',
    name: 'Elegant Collarbone (Necklaces)',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600&h=600',
    type: 'necklaces'
  },
  {
    id: 'ear',
    name: 'Elegant Ear Profile (Earrings)',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600&h=600',
    type: 'earrings'
  }
];

const jewelryOverlays = [
  { id: 'ring', name: 'Elysian Solitaire', image: '/solitaire_ring.png', type: 'rings' },
  { id: 'necklace', name: 'Aurelia Sapphire', image: '/sapphire_necklace.png', type: 'necklaces' },
  { id: 'earring', name: 'Valkyrie Emerald Drop', image: '/emerald_earrings.png', type: 'earrings' },
  { id: 'bracelet', name: 'Seraphina Tennis', image: '/gold_bracelet.png', type: 'bracelets' }
];

export default function VirtualTryOn() {
  const [selectedModel, setSelectedModel] = React.useState(modelCanvases[0]);
  const [selectedOverlay, setSelectedOverlay] = React.useState(jewelryOverlays[0]);
  const [customImage, setCustomImage] = React.useState(null);
  
  // Overlay Manipulation States
  const [position, setPosition] = React.useState({ x: 120, y: 120 });
  const [scale, setScale] = React.useState(1.0);
  const [rotation, setRotation] = React.useState(0);
  
  // Dragging mechanics
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStart = React.useRef({ x: 0, y: 0 });
  const containerRef = React.useRef(null);

  // Auto-switch model canvas type if user changes jewelry
  const handleSelectJewelry = (overlay) => {
    setSelectedOverlay(overlay);
    const matchingCanvas = modelCanvases.find(c => c.type === overlay.type || (overlay.type === 'bracelets' && c.type === 'rings'));
    if (matchingCanvas) {
      setSelectedModel(matchingCanvas);
    }
    // Center overlay
    setPosition({ x: 140, y: 140 });
    setScale(1.0);
    setRotation(0);
  };

  // Upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag handlers
  const handleStartDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    
    // Support touch and mouse
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    dragStart.current = {
      x: clientX - position.x,
      y: clientY - position.y
    };
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    let newX = clientX - dragStart.current.x;
    let newY = clientY - dragStart.current.y;

    // Boundaries enforcement
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Keep overlay slightly bound inside the container dimensions
      newX = Math.max(0, Math.min(newX, rect.width - 60));
      newY = Math.max(0, Math.min(newY, rect.height - 60));
    }

    setPosition({ x: newX, y: newY });
  };

  const handleEndDrag = () => {
    setIsDragging(false);
  };

  const resetOverlay = () => {
    setPosition({ x: 140, y: 140 });
    setScale(1.0);
    setRotation(0);
  };

  return (
    <section className="py-12 bg-luxury-ivory dark:bg-luxury-onyx-dark transition-colors duration-300 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-black/10 dark:border-white/10 pb-6 mb-10">
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" /> Virtual try-on
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-luxury-onyx dark:text-luxury-ivory mt-2">
            Virtual Try-On Room
          </h1>
          <p className="font-sans text-xs sm:text-sm text-luxury-onyx/60 dark:text-luxury-ivory/60 mt-1 max-w-2xl">
            Simulate our jewelry catalog on your screen. Drag the piece to fit, customize scale and rotate angles, or upload a photo of your own hand or neck!
          </p>
        </div>

        {/* Interactive Try on Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Active Canvas Simulator (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-4">
            <div 
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleEndDrag}
              onMouseLeave={handleEndDrag}
              onTouchMove={handleDrag}
              onTouchEnd={handleEndDrag}
              className="relative w-full aspect-square max-w-[500px] border border-luxury-gold/25 rounded-2xl overflow-hidden bg-[#1E1E1E] shadow-2xl select-none"
            >
              {/* Main Model/User Photo */}
              <img 
                src={customImage || selectedModel.image} 
                alt="Try On Model" 
                className="w-full h-full object-cover pointer-events-none opacity-80"
              />

              {/* Glowing Indicator for Drag Zone */}
              <div className="absolute top-4 left-4 luxury-glass px-2.5 py-1 rounded text-[9px] uppercase tracking-widest text-luxury-gold flex items-center gap-1 pointer-events-none">
                <Move className="w-3 h-3 animate-pulse" /> Drag Piece to Position
              </div>

              {/* Floating draggable overlay image */}
              <div
                onMouseDown={handleStartDrag}
                onTouchStart={handleStartDrag}
                style={{
                  position: 'absolute',
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  transform: `rotate(${rotation}deg) scale(${scale})`,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  width: '120px',
                  height: '120px',
                  touchAction: 'none'
                }}
                className={`transition-shadow ${isDragging ? 'shadow-2xl' : 'hover:shadow-md'}`}
              >
                {/* Background lighting flare behind overlay to make it look embedded */}
                <div className="absolute inset-2 bg-white/20 rounded-full blur-xl mix-blend-overlay pointer-events-none opacity-50" />
                <img
                  src={selectedOverlay.image}
                  alt={selectedOverlay.name}
                  className="w-full h-full object-contain pointer-events-none drop-shadow-xl"
                />
              </div>
            </div>

            {/* Helper Hint */}
            <div className="flex items-center gap-2 max-w-[500px] text-[10.5px] text-luxury-onyx/60 dark:text-luxury-ivory/60 bg-luxury-gold/5 p-3 rounded-lg border border-luxury-gold/15">
              <Info className="w-4 h-4 text-luxury-gold shrink-0" />
              <span>For best visual blending, click/tap and drag the jewelry over the models finger, collarbone, or earlobe, then adjust scale sliders below.</span>
            </div>
          </div>

          {/* Controls Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Choose Jewelry Piece */}
            <div className="space-y-3">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-luxury-gold">
                1. Select Jewelry Item
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {jewelryOverlays.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectJewelry(item)}
                    className={`p-3 border rounded-xl flex items-center gap-3 text-left transition-all ${
                      selectedOverlay.id === item.id
                        ? 'border-luxury-gold bg-luxury-gold/5 shadow-sm'
                        : 'border-black/15 dark:border-white/15 hover:border-luxury-gold/50'
                    }`}
                  >
                    <div className="w-12 h-12 bg-black/10 dark:bg-white/5 rounded-lg overflow-hidden border border-black/5 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-cinzel text-xs font-bold text-luxury-onyx dark:text-luxury-ivory">{item.name}</span>
                      <span className="text-[9px] uppercase tracking-wider text-luxury-gold">{item.type}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Model Canvas or Upload */}
            <div className="space-y-3">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-luxury-gold">
                2. Model or Custom Background
              </h3>
              <div className="space-y-3">
                {modelCanvases.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => { setSelectedModel(model); setCustomImage(null); }}
                    className={`w-full p-2.5 border rounded-xl flex items-center gap-3 text-left transition-all ${
                      selectedModel.id === model.id && !customImage
                        ? 'border-luxury-gold bg-luxury-gold/5'
                        : 'border-black/15 dark:border-white/15 hover:border-luxury-gold/50'
                    }`}
                  >
                    <img src={model.image} alt={model.name} className="w-10 h-10 object-cover rounded-md" />
                    <span className="font-sans text-xs font-medium text-luxury-onyx dark:text-luxury-ivory">{model.name}</span>
                  </button>
                ))}

                {/* Custom upload button */}
                <div className="border-t border-black/10 dark:border-white/10 pt-3">
                  <label className="flex items-center justify-center gap-2 w-full p-3 border border-dashed border-luxury-gold/45 rounded-xl cursor-pointer hover:bg-luxury-gold/5 text-luxury-gold transition-colors font-sans text-xs font-medium">
                    <Camera className="w-4 h-4" />
                    <span>{customImage ? "Change Custom Photo" : "Upload Your Own Photo"}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* 3. Sliders for manipulation */}
            <div className="p-5 luxury-glass rounded-xl border border-luxury-gold/15 space-y-5">
              <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-luxury-onyx dark:text-luxury-ivory">
                  Manipulation Controls
                </h3>
                <button
                  onClick={resetOverlay}
                  className="text-[10px] text-luxury-gold hover:text-luxury-gold-dark flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Fit
                </button>
              </div>

              {/* Scale Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-luxury-onyx/75 dark:text-luxury-ivory/75">
                  <span className="flex items-center gap-1.5"><ZoomIn className="w-3.5 h-3.5" /> Adjust Scale</span>
                  <span className="font-mono">{Math.round(scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="2.0"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Rotation Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-luxury-onyx/75 dark:text-luxury-ivory/75">
                  <span className="flex items-center gap-1.5"><RotateCw className="w-3.5 h-3.5" /> Rotate Angle</span>
                  <span className="font-mono">{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="2"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
