import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowUpRight, Compass, Clock, Sun, Star, Search, ChevronDown, ChevronUp, X } from 'lucide-react';
import { AircraftCategory } from '../types';
import destinationsData from '../data/destinationsData.json';

interface Destination {
  id: string;
  name: string;
  airportCode: string;
  airportName: string;
  region: string;
  distanceNm: number;
  flightTimeHrs: string;
  recommendedCategory: AircraftCategory;
  description: string;
  imageUrl: string;
  weatherTemp: string;
  highlights: string[];
}

interface DestinationsSectionProps {
  onRequestQuote: () => void;
}

export default function DestinationsSection({ onRequestQuote }: DestinationsSectionProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Coastal' | 'Mountain' | 'Metropolitan'>('All');
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(true);
  const [directorySearch, setDirectorySearch] = useState('');
  const [selectedDestDetail, setSelectedDestDetail] = useState<{
    name: string;
    image: string;
    description: string;
  } | null>(null);

  const handleSelectDestination = (name: string) => {
    let lookupName = name;
    if (name === 'New York Metro') lookupName = 'New York City';
    else if (name === 'Aspen Highlands') lookupName = 'Aspen';
    else if (name === 'Las Vegas Strip') lookupName = 'Las Vegas';
    else if (name === 'Miami Executive') lookupName = 'Miami';
    else if (name === 'Chicago Executive') lookupName = 'Chicago';

    const detail = destinationsData.find(d => d.name.toLowerCase() === lookupName.toLowerCase()) || 
                   destinationsData.find(d => d.name.toLowerCase().includes(lookupName.toLowerCase()));

    if (detail) {
      setSelectedDestDetail(detail);
    } else {
      setSelectedDestDetail({
        name,
        image: '/images/charter.png',
        description: `Book private jet charter flights to ${name} with Aircraft Management Group. Direct corporate charter operations on Light, Midsize, and Super Midsize jets.`
      });
    }
  };

  const destinations: Destination[] = [
    {
      id: 'dest-1',
      name: 'West Palm Beach',
      airportCode: 'KPBI',
      airportName: 'Palm Beach International',
      region: 'Coastal',
      distanceNm: 860,
      flightTimeHrs: '2h 00m',
      recommendedCategory: 'Midsize',
      description: "West Palm Beach is a city in South Florida. It's separated from neighboring Palm Beach by the Lake Worth Lagoon. Downtown's Clematis Street and CityPlace districts are filled with restaurants, shops, bars and clubs. The Norton Museum of Art displays American, European and Chinese art, including Impressionist paintings.",
      imageUrl: '/manage/product_photo_stock/photo_178652.jpg',
      weatherTemp: '84°F • Sunny',
      highlights: ['Exclusive FBO handling', 'Clubhouse shuttle connections', 'Direct Citation access']
    },
    {
      id: 'dest-2',
      name: 'Miami Executive',
      airportCode: 'KOPF',
      airportName: 'Opa-Locka Executive Airport',
      region: 'Coastal',
      distanceNm: 915,
      flightTimeHrs: '2h 15m',
      recommendedCategory: 'Super Midsize',
      description: "Miami is an international city at Florida's southeastern tip. Its Cuban influence is reflected in the cafes and cigar shops that line Calle Ocho in Little Havana. On barrier islands across the turquoise waters of Biscayne Bay is Miami Beach, home to South Beach. This glamorous neighborhood is famed for its colorful art deco buildings.",
      imageUrl: '/manage/product_photo_stock/photo_81940.jpg',
      weatherTemp: '86°F • Breezy',
      highlights: ['Helicopter transfer options', 'VIP catering ready', 'Discreet executive FBOs']
    },
    {
      id: 'dest-3',
      name: 'New York Metro',
      airportCode: 'KTEB',
      airportName: 'Teterboro Airport',
      region: 'Metropolitan',
      distanceNm: 280,
      flightTimeHrs: '1h 00m',
      recommendedCategory: 'Light',
      description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park.",
      imageUrl: '/manage/product_photo_stock/photo_195378.jpg',
      weatherTemp: '72°F • Clear',
      highlights: ['15-min Midtown shuttle', 'Pre-cleared slots', '24/7 dedicated handling']
    },
    {
      id: 'dest-4',
      name: 'Chicago Executive',
      airportCode: 'KMDW',
      airportName: 'Chicago Midway',
      region: 'Metropolitan',
      distanceNm: 365,
      flightTimeHrs: '1h 10m',
      recommendedCategory: 'Light',
      description: "Chicago, on Lake Michigan in Illinois, is among the largest cities in the U.S. Famed for its bold architecture, it has a skyline punctuated by skyscrapers such as the John Hancock Center, Willis Tower, and the neo-Gothic Tribune Tower. Renowned for its museums including the Art Institute.",
      imageUrl: '/manage/product_photo_stock/photo_91102.jpg',
      weatherTemp: '68°F • Wind',
      highlights: ['Bypass commercial traffic', 'Dedicated conference halls', 'Express car arrivals']
    },
    {
      id: 'dest-5',
      name: 'Aspen Highlands',
      airportCode: 'KASE',
      airportName: 'Aspen-Pitkin County Airport',
      region: 'Mountain',
      distanceNm: 1180,
      flightTimeHrs: '2h 50m',
      recommendedCategory: 'Super Midsize',
      description: "Aspen, in Colorado's Rocky Mountains, is a ski resort town and year-round destination for outdoor recreation. It's also known for high-end restaurants and boutiques, and landmarks like the Wheeler Opera House, built in 1889 during the area's silver mining boom.",
      imageUrl: '/manage/product_photo_stock/photo_241790.jpg',
      weatherTemp: '54°F • Alpine Clear',
      highlights: ['Crew mountain certification', 'Ski locker stowage', 'Heated hangar bays']
    },
    {
      id: 'dest-6',
      name: 'Las Vegas Strip',
      airportCode: 'KHND',
      airportName: 'Henderson Executive Airport',
      region: 'Metropolitan',
      distanceNm: 1630,
      flightTimeHrs: '3h 45m',
      recommendedCategory: 'Super Midsize',
      description: "Las Vegas, in Nevada's Mojave Desert, is a resort city famed for its vibrant nightlife, centered around casinos and entertainment. Its main street and focal point is the Strip, just over 4 miles long, home to themed hotels with elaborate fountain displays.",
      imageUrl: '/manage/product_photo_stock/photo_237880.jpg',
      weatherTemp: '92°F • Arid',
      highlights: ['Limousine tarmac escort', 'Express departure gates', 'Discreet handling']
    }
  ];

  const allCities = [
    'Albany', 'Albuquerque', 'Anchorage', 'Aspen', 'Atlanta', 'Atlantic City', 'Austin', 'Baltimore', 'Bedford', 'Beverly', 
    'Birmingham', 'Boca Raton', 'Boise', 'Boston', 'Bradenton', 'Buffalo', 'Burbank', 'Carlsbad', 'Charleston, SC', 'Charlotte', 
    'Chicago', 'Cincinnati', 'Cleveland', 'Colorado Springs', 'Columbia', 'Columbus', 'Dallas', 'Dayton', 'Denver', 'Detroit', 
    'El Paso', 'Farmingdale (Long Island)', 'Fort Lauderdale', 'Fort Myers', 'Grand Rapids', 'Greensboro', 'Greer', 'Hawthorne', 
    'Henderson', 'Homestead', 'Honolulu', 'Houston', 'Indianapolis', 'Islip (Long Island)', 'Jackson', 'Jacksonville', 'Kahului', 
    'Kansas City', 'Kauai', 'Las Vegas', 'Lawrence', 'Los Angeles', 'Madison', 'Manchester', 'Martha\'s Vineyard', 'Maui', 
    'Memphis', 'Miami', 'Milwaukee', 'Minneapolis-St. Paul', 'Monterrey', 'Myrtle Beach', 'Nantucket', 'Naples', 'Nashville', 
    'New Orleans', 'New York City', 'Newark', 'Norfolk', 'Oakland', 'Oklahoma City', 'Orlando', 'Pensacola', 'Philadelphia', 
    'Phoenix', 'Piedmont', 'Pittsburgh', 'Portland', 'Raleigh-Durham', 'Reno', 'Rochester', 'Sacramento', 'San Antonio', 
    'San Diego', 'San Francisco', 'San Jose', 'Sanford', 'Santa Ana', 'Sarasota', 'Savannah', 'Scottsdale, AZ', 'Seattle', 
    'Spokane', 'St. Louis', 'Sun Valley', 'Syracuse', 'Tampa', 'The Hamptons', 'Tucson', 'Tulsa', 'Vail', 'Washington DC', 
    'West Palm Beach', 'Westchester County', 'White Plains', 'Wilmington, DE'
  ];

  const allEvents = [
    'Aloha Festivals - September', 'America\'s Cup - July to October', 'Art Basel Miami - December', 'Bumbershoot - September', 
    'Burning Man - September', 'College Football', 'Daytona 500 - February', 'Daytona Bike Week - March', 'Fashion Week NYC - September', 
    'Final Four - March', 'Food and Wine Classic', 'Independence Day July 4th Celebrations', 'Indianapolis 500 - May', 
    'International Balloon Festival - October', 'Iowa State Fair - August', 'Ironman Triathalons - Worldwide All Year Long', 
    'Kentucky Derby - May', 'Macy\'s Thanksgiving Day Parade - November', 'Mardi Gras New Orleans - February', 
    'Masters Tournament Golf - April', 'MLB All Star Game - July', 'NBA All Star Game - February', 'NBA Playoffs', 
    'New Orleans Jazz - April / May', 'New Years in Times Square - December', 'NFL Pro Bowl - January', 'NHL All Star Game - January', 
    'NYC Marathon - November', 'PGA Tour - Worldwide All Year Long', 'RAGBRAI- July', 'Rose Parade - January 1st', 
    'Stanley Cup Playoffs', 'Sturgis Motorcycle Raley- August', 'Summer Olympics Private Jet Charter', 'Sundance Film Festival - January', 
    'Super Bowl - February', 'Taste of Chicago- July', 'US Open Tennis - August', 'US Polo Championship- April', 'X-Games Winter - January'
  ];

  const filteredCities = allCities.filter(c => c.toLowerCase().includes(directorySearch.toLowerCase()));
  const filteredEvents = allEvents.filter(e => e.toLowerCase().includes(directorySearch.toLowerCase()));

  const filteredDestinations = destinations.filter(dest => {
    if (activeTab === 'All') return true;
    return dest.region === activeTab;
  });

  return (
    <section id="destinations" className="py-24 bg-navy-dark border-b border-luxury-gold/10 relative">
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-luxury-gold/10 via-luxury-gold/2 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-luxury-gold mb-3 font-semibold font-mono">
            Sovereign Travel Guide
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl text-text-main font-light tracking-tight">
            Curated Private <span className="italic font-normal text-luxury-gold">Destinations</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-luxury-gold via-luxury-champagne to-luxury-gold mx-auto mt-6" />
          <p className="text-text-muted/70 text-sm mt-4 font-light text-center">
            Sovereign schedules customized to your exact timeline. Serving regional FBO private aviation operations throughout North America and international hubs 24/7/365.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All', 'Coastal', 'Mountain', 'Metropolitan'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-luxury-gold text-[#001633] border-luxury-gold font-bold'
                  : 'bg-navy-slate text-text-muted/70 border-text-main/10 hover:border-luxury-gold/30'
              }`}
            >
              {tab} Locations
            </button>
          ))}
        </div>

        {/* Destinations Grid Card Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-navy-slate rounded-xl border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300 overflow-hidden flex flex-col justify-between group text-left"
            >
              {/* Image Header wrapper */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-slate via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-luxury-gold block">
                      {dest.airportCode} Terminal
                    </span>
                    <h3 className="font-serif text-2xl text-text-main font-medium">
                      {dest.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-navy-dark/80 border border-luxury-gold/20 px-2 py-1 rounded text-[9px] font-mono font-medium text-luxury-gold">
                    <Sun className="w-3.5 h-3.5" />
                    <span>{dest.weatherTemp}</span>
                  </div>
                </div>
              </div>

              {/* Text Body and Highlights */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-text-muted/70 leading-relaxed font-light text-left mb-6 font-sans">
                    {dest.description}
                  </p>

                  <div className="space-y-2 border-y border-luxury-gold/10 py-4 mb-6">
                    {dest.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs font-light text-text-muted/80 text-left">
                        <Star className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Flight Parameters row */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono text-text-muted/70 bg-navy-dark p-3 rounded border border-text-main/10 mb-6 text-left">
                    <div>
                      <span className="text-[8px] text-text-muted/40 block uppercase">FBO Hangar Dist</span>
                      <span className="text-text-main font-semibold flex items-center space-x-1 mt-0.5">
                        <Compass className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                        <span>{dest.distanceNm} NM Direct</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] text-text-muted/40 block uppercase">Ferry Flight Dur</span>
                      <span className="text-text-main font-semibold flex items-center space-x-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                        <span>{dest.flightTimeHrs}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleSelectDestination(dest.name)}
                    className="w-full py-3 rounded text-[11px] tracking-widest uppercase font-bold text-navy-dark bg-gradient-to-r from-luxury-gold via-luxury-champagne to-luxury-gold hover:opacity-95 shadow-md shadow-luxury-gold/25 transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer transform hover:scale-105 active:scale-95"
                  >
                    <span>View Destination Details</span>
                    <ArrowUpRight className="w-4 h-4 text-navy-dark" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Destinations Alphabetical Directory Expander */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setIsDirectoryOpen(!isDirectoryOpen)}
            className="inline-flex items-center space-x-2 px-6 py-3.5 border border-luxury-gold/20 hover:border-luxury-gold text-xs font-mono font-bold tracking-widest uppercase text-luxury-gold hover:bg-luxury-gold/5 rounded transition-all cursor-pointer shadow-lg shadow-black/10"
          >
            <span>{isDirectoryOpen ? 'Hide' : 'Browse'} All Destination Cities & Events</span>
            {isDirectoryOpen ? <ChevronUp className="w-4 h-4 text-luxury-gold" /> : <ChevronDown className="w-4 h-4 text-luxury-gold" />}
          </button>

          <AnimatePresence>
            {isDirectoryOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="mt-8 bg-navy-slate/40 border border-text-main/10 rounded-2xl p-6 md:p-10 text-left overflow-hidden shadow-2xl"
              >
                {/* Search query input */}
                <div className="relative w-full max-w-md mb-8">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-main/40" />
                  <input
                    type="text"
                    placeholder="Search destination cities or events..."
                    value={directorySearch}
                    onChange={(e) => setDirectorySearch(e.target.value)}
                    className="w-full bg-navy-dark border border-text-main/15 hover:border-luxury-gold/30 rounded-lg pl-11 pr-4 py-3 text-xs text-text-main placeholder-[#E2E8F0]/30 focus:border-luxury-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Cities column */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-text-main font-semibold border-b border-text-main/10 pb-2">
                      Popular Cities we service
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs font-light text-text-main/70">
                      {filteredCities.length > 0 ? (
                        filteredCities.map((city) => (
                          <button
                            key={city}
                            onClick={() => handleSelectDestination(city)}
                            className="text-left hover:text-luxury-gold transition-colors font-sans hover:underline truncate cursor-pointer py-1 block"
                            title={`Book private flight to ${city}`}
                          >
                            • {city}
                          </button>
                        ))
                      ) : (
                        <span className="text-text-main/30 text-xs">No cities match search.</span>
                      )}
                    </div>
                  </div>

                  {/* Events column */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-text-main font-semibold border-b border-text-main/10 pb-2">
                      Fly Private to Popular Events
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs font-light text-text-main/70">
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map((evt) => (
                          <button
                            key={evt}
                            onClick={() => handleSelectDestination(evt)}
                            className="text-left hover:text-luxury-gold transition-colors font-sans hover:underline truncate cursor-pointer py-1 block"
                            title={`Book private flight to ${evt}`}
                          >
                            • {evt}
                          </button>
                        ))
                      ) : (
                        <span className="text-text-main/30 text-xs">No events match search.</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Destination Detail Modal */}
      <AnimatePresence>
        {selectedDestDetail && (
          <div 
            onClick={() => setSelectedDestDetail(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/92 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              layout
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-slate border border-luxury-gold/20 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left cursor-default"
            >
              <button
                onClick={() => setSelectedDestDetail(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-navy-dark hover:bg-white/5 text-text-muted/60 hover:text-luxury-gold border border-text-main/10 hover:border-luxury-gold/30 transition-all cursor-pointer z-10"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedDestDetail.image}
                  alt={selectedDestDetail.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-slate via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold block">
                    Featured Destination
                  </span>
                  <h3 className="font-serif text-3xl text-text-main font-semibold mt-1 tracking-wide">
                    {selectedDestDetail.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <p className="text-text-main/80 text-sm md:text-base leading-relaxed font-light font-sans">
                  {selectedDestDetail.description}
                </p>

                <div className="pt-6 border-t border-text-main/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left w-full sm:w-auto">
                    <p className="text-[10px] text-text-main/40 font-mono uppercase">Operational Coordinator</p>
                    <a href="tel:+18884498491" className="text-xs text-luxury-gold hover:underline font-mono mt-0.5 block">
                      Toll-Free: 1 (888) 449-8491
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDestDetail(null);
                      onRequestQuote();
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded text-xs font-bold font-mono tracking-widest uppercase text-navy-dark bg-gradient-to-r from-luxury-gold to-luxury-champagne hover:opacity-95 shadow-md shadow-luxury-gold/25 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Request Flight Quote</span>
                    <ArrowUpRight className="w-4 h-4 text-navy-dark" />
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
