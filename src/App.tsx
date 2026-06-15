import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Plane, Users, Star, Award, ChevronDown, CheckCircle, Navigation, LayoutList, CheckSquare } from 'lucide-react';
import Header from './components/Header';
import ServicesSection from './components/ServicesSection';
import FleetSection from './components/FleetSection';
import DestinationsSection from './components/DestinationsSection';
import EmptyLegsSection from './components/EmptyLegsSection';
import CareersSection from './components/CareersSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import ScrollVideoCanvas from './components/ScrollVideoCanvas';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // 3D Passenger Window Interactive Pull-Down Blind State
  const [blindHeight, setBlindHeight] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const windowRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const percentage = Math.min(Math.max((relativeY / rect.height) * 100, 0), 100);
      setBlindHeight(percentage);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setBlindHeight(0); // Automatically spring back up
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!windowRef.current || e.touches.length === 0) return;
      const rect = windowRef.current.getBoundingClientRect();
      const relativeY = e.touches[0].clientY - rect.top;
      const percentage = Math.min(Math.max((relativeY / rect.height) * 100, 0), 100);
      setBlindHeight(percentage);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setBlindHeight(0); // Automatically spring back up
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Set up passive scroll observer to highlight modern navigation anchors
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['hero', 'about', 'services', 'fleet', 'destinations', 'emptylegs', 'careers', 'blog', 'contact'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Premium Magnetic Button Proximity Effect
  useEffect(() => {
    let elements: HTMLElement[] = [];
    
    // Periodically update the list of interactive elements (in case of dynamic renders)
    const updateElementsList = () => {
      elements = Array.from(document.querySelectorAll('button, a.bg-gradient-to-r, [data-magnetic]')) as HTMLElement[];
    };
    updateElementsList();
    
    // Run update on DOM changes
    const observer = new MutationObserver(updateElementsList);
    observer.observe(document.body, { childList: true, subtree: true });

    const handleMouseMove = (e: MouseEvent) => {
      // Skip on touch devices
      if (window.matchMedia('(pointer: coarse)').matches) return;

      const cursorX = e.clientX;
      const cursorY = e.clientY;

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const rect = el.getBoundingClientRect();
        
        // Skip elements not in the viewport or not visible
        if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) {
          el.style.transform = '';
          continue;
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = cursorX - centerX;
        const dy = cursorY - centerY;
        const distance = Math.hypot(dx, dy);
        
        const maxDistance = 75; // Proximity threshold
        const pullForce = 0.15; // Delicate pull factor

        if (distance < maxDistance) {
          const ratio = (maxDistance - distance) / maxDistance;
          const pullX = dx * pullForce * ratio;
          const pullY = dy * pullForce * ratio;
          
          el.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
          el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        } else if (el.style.transform && el.style.transform !== 'translate3d(0px, 0px, 0px)') {
          el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
          el.style.transform = 'translate3d(0, 0, 0)';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Parallax calculations for the visual hero header
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="bg-navy-dark text-text-main font-sans antialiased overflow-x-hidden selection:bg-luxury-gold/35 selection:text-text-main relative">
      {/* Scroll Video Canvas Backdrop */}
      <ScrollVideoCanvas />

      {/* Flight path line beams running behind background */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none" />

      {/* Main navigation header */}
      <Header activeSection={activeSection} onNavigate={navigateToSection} onRequestQuote={() => setIsQuoteModalOpen(true)} />

      {/* Hero Canvas Visual Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden select-none bg-transparent text-left">
        {/* Parallax hero background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* High-end vector vignette masking - class-based visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#090b0e] hero-vignette" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090b0e]/90 via-transparent to-[#090b0e]/90 hero-vignette" />
          {/* Light Mode Asymmetrical Editorial Gradient Mask */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,251,250,0.92)_0%,rgba(251,251,250,0.92)_25%,rgba(251,251,250,0)_60%)] dark:hidden pointer-events-none z-10" />
        </motion.div>

        {/* High Tech Grid Mesh Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#c5a45f_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-15 pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-20 text-left w-full">
          <div className="max-w-4xl pt-16 md:pt-24 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center space-x-3 px-4 py-2 rounded bg-navy-slate/60 border border-text-main/10 backdrop-blur-sm shadow-xl shadow-black/30"
            >
              <Award className="w-4 h-4 text-luxury-gold" />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-luxury-champagne leading-none mt-0.5">
                FAA Certified Part 135 Carrier • Pittsburgh, PA
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-silver-gradient font-light leading-[1.05] tracking-tight">
                Beyond Luxury.<br />
                <span className="italic font-normal text-gold-gradient">Sovereign Flight</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-text-main/80 max-w-2xl font-light leading-relaxed pt-2">
                Aircraft Management Group provides end-to-end global charter operations, uncompromising turnkey jet management offsets, and broker advisory services based out of Pittsburgh International Airport.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
            >
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-8 py-4 rounded text-sm tracking-widest uppercase font-bold text-navy-dark bg-gradient-to-r from-luxury-gold via-luxury-champagne to-luxury-gold hover:opacity-95 shadow-lg shadow-luxury-gold/25 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Request a Flight Quote</span>
              </button>
              <button
                onClick={() => navigateToSection('fleet')}
                className="px-8 py-4 rounded border border-white/20 hover:border-luxury-gold text-xs font-semibold tracking-widest uppercase text-white hover:text-luxury-gold bg-transparent hover:bg-luxury-gold/5 transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <span>Active Registry</span>
                <Plane className="w-4 h-4 text-luxury-gold -rotate-45" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll helper indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.3em] text-text-main/30 font-mono">operational details</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-luxury-gold/54" />
          </motion.div>
        </div>
      </section>

      {/* Operational Stats Center */}
      <section className="bg-transparent py-16 border-y border-text-main/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: 'Uncompromised Records', val: 'ARGUS Rated', desc: 'Wyvern registered compliance safety audits' },
              { label: 'Airframe Competence', val: '240,000+', desc: 'Direct safe operation hours logged bases' },
              { label: 'Destinations Worldwide', val: '12,000+', desc: 'Global airstrips accessed anytime' },
              { label: 'PIT Hangar Base', val: 'Pittsburgh, PA', desc: 'Direct corporate maintenance & hangar assets' },
            ].map((stat, i) => (
              <div key={i} className="text-left space-y-1">
                <p className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold font-semibold">{stat.label}</p>
                <h3 className="font-serif text-3xl md:text-4xl text-text-main font-light tracking-tight">{stat.val}</h3>
                <p className="text-xs text-text-main/43 font-light leading-snug pt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-transparent relative text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Column 1: Immersive 3D Circular Aircraft Cabin Window */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-6 select-none">
              <div className="cabin-window-outer gold-glow">
                <div className="cabin-window-bezel">
                  <div 
                    ref={windowRef}
                    className="cabin-window-inner"
                  >
                    <img
                      src="/images/about-us.webp"
                      alt="Aircraft Management Group Team on the tarmac"
                      className="w-full h-full object-cover brightness-[0.85]"
                      draggable="false"
                    />
                    <div className="cabin-window-glass" />
                    <div className="cabin-window-sheen" />
                    
                    {/* Subtle V-shaped pull-down pointer */}
                    <div 
                      className="cabin-window-pull-indicator"
                      style={{ 
                        opacity: blindHeight > 0 ? 0 : undefined,
                        visibility: blindHeight > 0 ? 'hidden' : 'visible',
                        transition: 'opacity 0.3s ease, visibility 0.3s ease'
                      }}
                    >
                      <ChevronDown className="w-6 h-6 text-luxury-gold dark:text-luxury-champagne" strokeWidth={1.5} />
                    </div>
                    
                    {/* Interactive Pull-Down Window Blind */}
                    <div 
                      style={{ 
                        height: `${blindHeight}%`,
                        minHeight: '40px',
                        transition: isDragging ? 'none' : 'height 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.1)' 
                      }}
                      className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#EAE9E1] to-[#C0BEB4] dark:from-[#222933] dark:to-[#111419] border-b-[8px] border-[#a5a399] dark:border-[#080a0d] z-30 shadow-2xl flex flex-col justify-end items-center"
                    >
                      {/* Pull Down Trigger Zone (covers the entire visible bottom edge of the blind) */}
                      <div 
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        className="w-full cursor-ns-resize flex flex-col items-center justify-end pb-3 pt-2 select-none"
                        title="Drag down to close shade"
                      >
                        {/* Pull Down Handle */}
                        <div 
                          className="w-20 h-5 rounded-full bg-[#bcbab0] dark:bg-[#1C222B] border border-[#a2a095] dark:border-[#2a2e38] shadow-md flex items-center justify-center active:scale-95 transition-transform"
                        >
                          <div className="w-10 h-1 rounded-full bg-white/30 dark:bg-white/10" />
                        </div>
                      </div>
                    </div>


                    {/* Left/Right Shade Tracks */}
                    <div className="absolute inset-y-0 left-0 w-0.5 bg-black/15 z-25 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-0.5 bg-black/15 z-25 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Floating FAA badge overlay overlapping the window corner */}
              <div className="absolute -bottom-2 right-4 md:right-8 lg:-right-4 p-4 rounded-xl bg-navy-slate/95 backdrop-blur-md border border-text-main/10 shadow-2xl max-w-[280px] z-30 gold-glow">
                <div className="flex items-center space-x-2 text-luxury-gold mb-1.5">
                  <Star className="w-4 h-4 fill-luxury-gold" />
                  <span className="text-[10px] uppercase tracking-[0.15em] font-mono font-bold">FAA Certified Carrier</span>
                </div>
                <p className="text-[11px] text-text-main/70 font-light leading-relaxed">Part 135 on-demand flight operations between the US, Canada, and Worldwide.</p>
              </div>
            </div>


            {/* Column 2: text and credentials */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-luxury-gold font-semibold font-mono">Established April 2006</p>
              <h2 className="font-serif text-4xl md:text-5xl text-text-main font-light tracking-tight leading-tight">
                About <span className="italic font-normal text-gold-gradient">Aircraft Management Group</span>
              </h2>
              <div className="w-12 h-[1px] bg-luxury-gold my-4" />
              
              <div className="space-y-4 text-text-main/70 text-sm md:text-base font-light leading-relaxed">
                <p>
                  Aircraft Management Group, Inc. provides aircraft management and private aircraft charter services from the Pittsburgh International Airport and throughout the US, Canada, Mexico and the Caribbean.
                </p>
                <p>
                  Aircraft Management Group was founded in April 2006 as a Part 91 Operator with the mandate to provide the best possible aircraft management services for our clients and their private aircraft. Our particular expertise is serving clients who share ownership of their aircraft with one or more parties. We make it possible to manage co-owned aircraft seamlessly.
                </p>
                <p>
                  Since March 2009, Aircraft Management Group is the recipient of a Federal Aviation Regulation (FAR) Part 135 Certificate from the Federal Aviation Administration (FAA) allowing the company to operate on-demand charter in the US. Additionally, Aircraft Management Group was granted a Canadian Foreign Air Operating Certificate (FAOC) from Transport Canada as well as operating authority from the Canadian Transportation Agency (CTA) allowing the company to operate Part 135 on-demand aircraft charters between the US and Canada and vice-versa.
                </p>
                <p>
                  We continuously strive to maintain the highest standards of safety and service by providing experienced aircrew, exceeding FAA training requirements and maintaining our clients’ aircraft with the industry’s best professionals. We are proud to be Aircraft Management Group.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  'Double-Captain redundant crew setups on all Part 135 operations',
                  'Rigid bi-annual aircraft simulator training sessions',
                  'FAA compliant dispatch systems operational 24/7/365',
                  'Turnkey co-owned aircraft management & scheduling systems',
                ].map((item, id) => (
                  <div key={id} className="flex items-start space-x-3 text-xs text-text-main/80 font-light">
                    <CheckCircle className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigateToSection('services')}
                  className="px-6 py-3 border border-text-main/10 hover:border-luxury-gold text-xs font-semibold tracking-wider uppercase text-luxury-gold hover:bg-luxury-gold/5 rounded transition-all cursor-pointer"
                >
                  Inspect Our Capabilities
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Block */}
      <ServicesSection onRequestQuote={() => setIsQuoteModalOpen(true)} />

      {/* Fleet Section Block */}
      <FleetSection onSelectAircraftForQuote={() => setIsQuoteModalOpen(true)} onRequestQuote={() => setIsQuoteModalOpen(true)} />

      {/* Destinations Guide Block */}
      <DestinationsSection onRequestQuote={() => setIsQuoteModalOpen(true)} />

      {/* Empty Legs Live API Board Block */}
      <EmptyLegsSection />

      {/* Crew and Careers Registry Block */}
      <CareersSection />

      {/* Aviation Blog Articles */}
      <BlogSection />

      {/* Contact & Careers Block */}
      <ContactSection />

      {/* Corporate Footer Block */}
      <Footer onNavigate={navigateToSection} onRequestQuote={() => setIsQuoteModalOpen(true)} />

      {/* JetInsight Global Quote Request Modal Embed */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
