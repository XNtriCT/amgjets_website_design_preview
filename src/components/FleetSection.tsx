import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Fuel, Users, Eye, ArrowRight, Gauge, Briefcase } from 'lucide-react';
import { Aircraft, AircraftCategory } from '../types';

interface FleetSectionProps {
  onSelectAircraftForQuote: (category: AircraftCategory) => void;
  onRequestQuote: () => void;
}

export default function FleetSection({ onSelectAircraftForQuote, onRequestQuote }: FleetSectionProps) {
  const [activeTab, setActiveTab] = useState<AircraftCategory>('Super Midsize');
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);

  const fleet: Aircraft[] = [
    // Super Midsize
    {
      id: 'n275bs',
      name: 'Citation Latitude (N275BS)',
      category: 'Super Midsize',
      speed: '513 mph',
      range: '2,700 nm',
      passengers: 9,
      cabinHeight: "6' 0\"",
      cabinWidth: "6' 5\"",
      baggageCapacity: '127 cu ft',
      image: '/manage/product_photo_stock/photo_68101.jpg',
      description: 'The Cessna Citation Latitude features a wide, flat-floor stand-up cabin, offering exceptional comfort, low cabin altitude, and transcontinental range.',
      detailedSpecs: [
        { label: 'Registration', value: 'N275BS' },
        { label: 'Model', value: 'Citation Latitude' },
        { label: 'Normal Cruise Speed', value: 'Mach 0.80 (446 kts)' },
        { label: 'Max Range (Reserve fuel)', value: '2,700 nautical miles' },
        { label: 'Avionics Suite', value: 'Garmin G5000' }
      ]
    },
    {
      id: 'n686tw',
      name: 'Citation Latitude (N686TW)',
      category: 'Super Midsize',
      speed: '513 mph',
      range: '2,700 nm',
      passengers: 9,
      cabinHeight: "6' 0\"",
      cabinWidth: "6' 5\"",
      baggageCapacity: '127 cu ft',
      image: '/manage/product_photo_stock/001_CitationN686TW4.jpg',
      description: 'The Cessna Citation Latitude features a wide, flat-floor stand-up cabin, offering exceptional comfort, low cabin altitude, and transcontinental range.',
      detailedSpecs: [
        { label: 'Registration', value: 'N686TW' },
        { label: 'Model', value: 'Citation Latitude' },
        { label: 'Normal Cruise Speed', value: 'Mach 0.80 (446 kts)' },
        { label: 'Max Range (Reserve fuel)', value: '2,700 nautical miles' },
        { label: 'Avionics Suite', value: 'Garmin G5000' }
      ]
    },
    {
      id: 'n824dm',
      name: 'Citation Sovereign (N824DM)',
      category: 'Super Midsize',
      speed: '527 mph',
      range: '3,200 nm',
      passengers: 9,
      cabinHeight: "5' 8\"",
      cabinWidth: "5' 6\"",
      baggageCapacity: '135 cu ft',
      image: '/manage/product_photo_stock/photo_198251.jpg',
      description: 'The Citation Sovereign combines remarkable short-field landing capabilities with transcontinental performance and an expansive baggage compartment, making it highly versatile.',
      detailedSpecs: [
        { label: 'Registration', value: 'N824DM' },
        { label: 'Model', value: 'Citation Sovereign' },
        { label: 'Normal Cruise Speed', value: '458 ktas' },
        { label: 'Max Range', value: '3,200 nautical miles' },
        { label: 'Baggage Access', value: 'External Heated Compartment' }
      ]
    },
    // Midsize
    {
      id: 'n1980r',
      name: 'Hawker 900XP (N1980R)',
      category: 'Midsize',
      speed: '514 mph',
      range: '2,700 nm',
      passengers: 8,
      cabinHeight: "5' 9\"",
      cabinWidth: "6' 0\"",
      baggageCapacity: '49 cu ft',
      image: '/manage/product_photo_stock/photo_98120.jpg',
      description: 'The Hawker 900XP is the gold standard for midsize corporate travel, offering the largest cabin in its class, double-club seating, and exceptional climb rates.',
      detailedSpecs: [
        { label: 'Registration', value: 'N1980R' },
        { label: 'Model', value: 'Hawker 900XP' },
        { label: 'Normal Cruise Speed', value: '446 ktas' },
        { label: 'Engines', value: 'Honeywell TFE731' },
        { label: 'Cabin Type', value: 'Double-Club Seating' }
      ]
    },
    {
      id: 'n850ec',
      name: 'Hawker 850XP (N850EC)',
      category: 'Midsize',
      speed: '514 mph',
      range: '2,640 nm',
      passengers: 8,
      cabinHeight: "5' 9\"",
      cabinWidth: "6' 0\"",
      baggageCapacity: '49 cu ft',
      image: '/manage/product_photo_stock/photo_74904.jpg',
      description: 'The Hawker 850XP delivers exceptional midsize comfort and range, featuring advanced avionics and climb speeds optimized for corporate schedules.',
      detailedSpecs: [
        { label: 'Registration', value: 'N850EC' },
        { label: 'Model', value: 'Hawker 850XP' },
        { label: 'Normal Cruise Speed', value: '446 ktas' },
        { label: 'Engines', value: 'Honeywell TFE731' }
      ]
    },
    {
      id: 'n524dm',
      name: 'Citation XLS+ (N524DM)',
      category: 'Midsize',
      speed: '507 mph',
      range: '2,100 nm',
      passengers: 9,
      cabinHeight: "5' 8\"",
      cabinWidth: "5' 6\"",
      baggageCapacity: '90 cu ft',
      image: '/manage/product_photo_stock/photo_134337.jpg',
      description: 'The Citation XLS+ provides high-efficiency operations, blending midsize cabin comfort (including a fully enclosed lavatory) with the short-field capabilities of a light jet.',
      detailedSpecs: [
        { label: 'Registration', value: 'N524DM' },
        { label: 'Model', value: 'Citation XLS+' },
        { label: 'Engine Control', value: 'FADEC Pratt & Whitney' },
        { label: 'Baggage Access', value: 'Heated Exterior Door' }
      ]
    },
    {
      id: 'n933mr',
      name: 'Citation XLS+ (N933MR)',
      category: 'Midsize',
      speed: '507 mph',
      range: '2,100 nm',
      passengers: 9,
      cabinHeight: "5' 8\"",
      cabinWidth: "5' 6\"",
      baggageCapacity: '90 cu ft',
      image: '/manage/product_photo_stock/N933MRExterior.jpg',
      description: 'The Citation XLS+ provides high-efficiency operations, blending midsize cabin comfort (including a fully enclosed lavatory) with the short-field capabilities of a light jet.',
      detailedSpecs: [
        { label: 'Registration', value: 'N933MR' },
        { label: 'Model', value: 'Citation XLS+' },
        { label: 'Engine Control', value: 'FADEC Pratt & Whitney' },
        { label: 'Baggage Access', value: 'Heated Exterior Door' }
      ]
    },
    // Light
    {
      id: 'n100fn',
      name: 'Hawker 400XP (N100FN)',
      category: 'Light',
      speed: '468 mph',
      range: '1,500 nm',
      passengers: 7,
      cabinHeight: "4' 9\"",
      cabinWidth: "4' 11\"",
      baggageCapacity: '53 cu ft',
      image: '/manage/product_photo_stock/photo_179733.jpg',
      description: 'The Hawker 400XP features a unique oval cross-section cabin, maximizing shoulder and headroom for up to 7 passengers. Ideal for rapid regional travel with a flat floor design.',
      detailedSpecs: [
        { label: 'Registration', value: 'N100FN' },
        { label: 'Model', value: 'Hawker 400XP' },
        { label: 'Avionics Suite', value: 'Collins ProLine System' },
        { label: 'Cabin Floor', value: '100% Flat configuration' }
      ]
    },
    {
      id: 'n1980e',
      name: 'Hawker 400XP (N1980E)',
      category: 'Light',
      speed: '468 mph',
      range: '1,500 nm',
      passengers: 7,
      cabinHeight: "4' 9\"",
      cabinWidth: "4' 11\"",
      baggageCapacity: '53 cu ft',
      image: '/manage/product_photo_stock/photo_293467.jpg',
      description: 'The Hawker 400XP features a unique oval cross-section cabin, maximizing shoulder and headroom for up to 7 passengers. Ideal for rapid regional travel with a flat floor design.',
      detailedSpecs: [
        { label: 'Registration', value: 'N1980E' },
        { label: 'Model', value: 'Hawker 400XP' },
        { label: 'Avionics Suite', value: 'Collins ProLine System' },
        { label: 'Cabin Floor', value: '100% Flat configuration' }
      ]
    },
    {
      id: 'n400mx',
      name: 'Hawker 400XP (N400MX)',
      category: 'Light',
      speed: '468 mph',
      range: '1,500 nm',
      passengers: 7,
      cabinHeight: "4' 9\"",
      cabinWidth: "4' 11\"",
      baggageCapacity: '53 cu ft',
      image: '/manage/product_photo_stock/photo_278143.jpg',
      description: 'The Hawker 400XP features a unique oval cross-section cabin, maximizing shoulder and headroom for up to 7 passengers. Ideal for rapid regional travel with a flat floor design.',
      detailedSpecs: [
        { label: 'Registration', value: 'N400MX' },
        { label: 'Model', value: 'Hawker 400XP' },
        { label: 'Avionics Suite', value: 'Collins ProLine System' },
        { label: 'Cabin Floor', value: '100% Flat configuration' }
      ]
    },
    {
      id: 'n412ts',
      name: 'Hawker 400XP (N412TS)',
      category: 'Light',
      speed: '468 mph',
      range: '1,500 nm',
      passengers: 7,
      cabinHeight: "4' 9\"",
      cabinWidth: "4' 11\"",
      baggageCapacity: '53 cu ft',
      image: '/manage/product_photo_stock/photo_15986.jpg',
      description: 'The Hawker 400XP features a unique oval cross-section cabin, maximizing shoulder and headroom for up to 7 passengers. Ideal for rapid regional travel with a flat floor design.',
      detailedSpecs: [
        { label: 'Registration', value: 'N412TS' },
        { label: 'Model', value: 'Hawker 400XP' },
        { label: 'Avionics Suite', value: 'Collins ProLine System' },
        { label: 'Cabin Floor', value: '100% Flat configuration' }
      ]
    },
    {
      id: 'n448sc',
      name: 'Hawker 400XP (N448SC)',
      category: 'Light',
      speed: '468 mph',
      range: '1,500 nm',
      passengers: 7,
      cabinHeight: "4' 9\"",
      cabinWidth: "4' 11\"",
      baggageCapacity: '53 cu ft',
      image: '/manage/product_photo_stock/N448SCExt.jpg',
      description: 'The Hawker 400XP features a unique oval cross-section cabin, maximizing shoulder and headroom for up to 7 passengers. Ideal for rapid regional travel with a flat floor design.',
      detailedSpecs: [
        { label: 'Registration', value: 'N448SC' },
        { label: 'Model', value: 'Hawker 400XP' },
        { label: 'Avionics Suite', value: 'Collins ProLine System' },
        { label: 'Cabin Floor', value: '100% Flat configuration' }
      ]
    },
    {
      id: 'n507wm',
      name: 'Hawker 400XP (N507WM)',
      category: 'Light',
      speed: '468 mph',
      range: '1,500 nm',
      passengers: 7,
      cabinHeight: "4' 9\"",
      cabinWidth: "4' 11\"",
      baggageCapacity: '53 cu ft',
      image: '/manage/product_photo_stock/photo_247630.jpg',
      description: 'The Hawker 400XP features a unique oval cross-section cabin, maximizing shoulder and headroom for up to 7 passengers. Ideal for rapid regional travel with a flat floor design.',
      detailedSpecs: [
        { label: 'Registration', value: 'N507WM' },
        { label: 'Model', value: 'Hawker 400XP' },
        { label: 'Avionics Suite', value: 'Collins ProLine System' },
        { label: 'Cabin Floor', value: '100% Flat configuration' }
      ]
    },
    {
      id: 'n802le',
      name: 'Citation CJ3 (N802LE)',
      category: 'Light',
      speed: '480 mph',
      range: '1,870 nm',
      passengers: 7,
      cabinHeight: "4' 9\"",
      cabinWidth: "4' 10\"",
      baggageCapacity: '65 cu ft',
      image: '/manage/product_photo_stock/N802LEExterior.jpg',
      description: 'The Citation CJ3 is renowned for its reliability, exceptionally quiet cabin, and advanced avionics. Ideal for short-to-mid range hops with a spacious and bright interior layout.',
      detailedSpecs: [
        { label: 'Registration', value: 'N802LE' },
        { label: 'Model', value: 'Citation CJ3' },
        { label: 'Max Cruising Altitude', value: '45,000 ft' },
        { label: 'Avionics', value: 'Collins Pro Line 21' }
      ]
    }
  ];

  const categories: { id: AircraftCategory; label: string; desc: string }[] = [
    { id: 'Super Midsize', label: 'Super Midsize Jets', desc: 'Transcontinental efficiency and spaciousness' },
    { id: 'Midsize', label: 'Midsize Jets', desc: 'Optimal spacing and regional capability' },
    { id: 'Light', label: 'Light Jets', desc: 'Fast, cost-efficient business hops' }
  ];

  const filteredFleet = fleet.filter(jet => jet.category === activeTab);

  return (
    <section id="fleet" className="py-24 bg-navy-slate/30 border-y border-text-main/10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#c5a45f_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.02]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-luxury-gold mb-3 font-semibold font-mono">
              The AMG Fleet
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-main font-light tracking-tight">
              Elite Registry & <span className="italic font-normal text-gold-gradient">Specifications</span>
            </h2>
          </div>
          <p className="text-sm text-text-main/55 max-w-sm mt-4 md:mt-0 leading-relaxed text-left md:text-right">
            All primary aircraft meticulously maintained to uncompromising specifications and registered on FAA Part 135 operations.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              id={`tab-category-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
              className={`text-left p-5 rounded-lg transition-all duration-300 border cursor-pointer relative overflow-hidden group ${
                activeTab === cat.id
                  ? 'bg-navy-slate border-luxury-gold/40 shadow-lg shadow-luxury-gold/5'
                  : 'bg-navy-dark/40 border-text-main/10 hover:bg-navy-slate/40'
              }`}
            >
              <h4 className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                activeTab === cat.id ? 'text-luxury-gold' : 'text-text-main/70'
              }`}>
                {cat.label}
              </h4>
              <p className="text-xs text-text-main/40 mt-1 line-clamp-1 font-light">
                {cat.desc}
              </p>
              {activeTab === cat.id && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-luxury-gold rounded-bl-lg animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Display Grid for selected category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFleet.map((jet, index) => (
              <motion.div
                key={jet.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                id={`fleet-card-${jet.id}`}
                className="glass-panel rounded-xl border border-text-main/10 overflow-hidden flex flex-col justify-between group hover:border-luxury-gold/30 transition-all duration-500"
              >
                {/* Visual Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={jet.image}
                    alt={jet.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-navy-dark/80 backdrop-blur rounded text-[10px] uppercase font-mono tracking-widest border border-text-main/10 text-text-main">
                      {jet.category} Jet
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-left">
                    <h3 className="font-serif text-2xl text-text-main font-medium tracking-wide">
                      {jet.name}
                    </h3>
                  </div>
                </div>

                {/* Fleet Specs Panel */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="text-left">
                    <p className="text-text-main/70 text-xs leading-relaxed line-clamp-3 mb-6">
                      {jet.description}
                    </p>

                    {/* Numeric Grid Specs */}
                    <div className="grid grid-cols-3 gap-4 border-y border-text-main/10 py-4 mb-6">
                      <div className="text-center">
                        <Users className="w-4 h-4 text-luxury-gold mx-auto mb-1" />
                        <span className="text-[10px] text-text-main/40 font-mono uppercase block">Seats</span>
                        <span className="font-mono text-sm text-text-main font-semibold">{jet.passengers} Max</span>
                      </div>
                      <div className="text-center border-x border-text-main/10">
                        <Fuel className="w-4 h-4 text-luxury-gold mx-auto mb-1" />
                        <span className="text-[10px] text-text-main/40 font-mono uppercase block">Range</span>
                        <span className="font-mono text-sm text-text-main font-semibold">{jet.range}</span>
                      </div>
                      <div className="text-center">
                        <Gauge className="w-4 h-4 text-luxury-gold mx-auto mb-1" />
                        <span className="text-[10px] text-text-main/40 font-mono uppercase block">Speed</span>
                        <span className="font-mono text-sm text-text-main font-semibold">{jet.speed}</span>
                      </div>
                    </div>

                    {/* Standard Cabinet Heights */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-6 bg-navy-dark/40 rounded p-3 text-left">
                      <div className="flex justify-between">
                        <span className="text-text-main/40">Cabin Height:</span>
                        <span className="font-mono text-text-main">{jet.cabinHeight}</span>
                      </div>
                      <div className="flex justify-between border-l border-text-main/10 pl-2">
                        <span className="text-text-main/40">Cabin Width:</span>
                        <span className="font-mono text-text-main">{jet.cabinWidth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Action triggers */}
                  <div className="flex flex-col space-y-3 pt-4 border-t border-text-main/10">
                    <button
                      onClick={onRequestQuote}
                      className="w-full py-3 rounded tracking-widest uppercase font-bold text-navy-dark bg-gradient-to-r from-luxury-gold via-luxury-champagne to-luxury-gold hover:opacity-95 shadow-md shadow-luxury-gold/25 transition-all duration-300 flex items-center justify-center space-x-2 text-[11px] cursor-pointer"
                    >
                      <span>Request Quote</span>
                    </button>
                    <button
                      onClick={() => setSelectedAircraft(jet)}
                      className="w-full py-2.5 rounded border border-text-main/10 hover:border-luxury-gold text-xs font-semibold tracking-wider uppercase text-text-main/80 hover:text-luxury-gold bg-transparent hover:bg-luxury-gold/5 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Specs</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Spec Sheets */}
      <AnimatePresence>
        {selectedAircraft && (
          <div 
            onClick={() => setSelectedAircraft(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/92 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              layout
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-slate max-w-2xl w-full rounded-2xl overflow-hidden border border-luxury-gold/20 shadow-2xl relative cursor-default"
            >
              {/* Close command */}
              <button
                onClick={() => setSelectedAircraft(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-navy-dark/80 text-text-main/60 hover:text-luxury-gold border border-text-main/10 hover:border-luxury-gold/30 cursor-pointer"
              >
                ✕
              </button>

              <div className="relative h-64">
                <img
                  src={selectedAircraft.image}
                  alt={selectedAircraft.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-slate to-transparent" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-xs uppercase font-mono tracking-widest text-text-main/60 block">{selectedAircraft.category} Category</span>
                  <h3 className="font-serif text-3xl md:text-4xl text-text-main font-semibold mt-1 tracking-wide">{selectedAircraft.name}</h3>
                </div>
              </div>

              <div className="p-8 text-left">
                <p className="text-sm text-text-main/80 leading-relaxed mb-6 font-light">
                  {selectedAircraft.description}
                </p>

                <h5 className="text-[10px] uppercase tracking-widest font-mono text-text-main/40 mb-3 border-b border-text-main/10 pb-2">Technical Registry parameters</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {selectedAircraft.detailedSpecs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center text-xs py-1.5 border-b border-text-main/10">
                      <span className="text-text-main/40 font-light text-left">{spec.label}</span>
                      <span className="font-mono text-text-main font-medium text-right">{spec.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-xs py-1.5 border-b border-text-main/10">
                    <span className="text-text-main/40 font-light">Baggage capacity</span>
                    <span className="font-mono text-text-main font-medium">{selectedAircraft.baggageCapacity}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-1.5 border-b border-text-main/10">
                    <span className="text-text-main/40 font-light">Seating Cabin Layout</span>
                    <span className="font-mono text-text-main font-medium">Club Seats & Divans</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      onSelectAircraftForQuote(selectedAircraft.category);
                      setSelectedAircraft(null);
                      onRequestQuote();
                    }}
                    className="flex-1 py-3 text-xs tracking-widest font-semibold uppercase rounded text-navy-dark bg-gradient-to-r from-luxury-gold to-luxury-champagne hover:opacity-95 shadow-lg shadow-luxury-gold/10 cursor-pointer"
                  >
                    Select this Class
                  </button>
                  <button
                    onClick={() => setSelectedAircraft(null)}
                    className="px-6 py-3 border border-text-main/10 rounded hover:border-[#f1f3f5]/50 text-xs font-semibold tracking-wider uppercase text-text-main/70 hover:text-text-main cursor-pointer"
                  >
                    Back to Registry
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
