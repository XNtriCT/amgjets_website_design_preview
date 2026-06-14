import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Calendar, DollarSign, Settings, HeartHandshake, ChevronRight } from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServicesSectionProps {
  onRequestQuote: () => void;
}

export default function ServicesSection({ onRequestQuote }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<string>('charter');

  const services: ServiceDetail[] = [
    {
      id: 'charter',
      title: 'Aircraft Charter Services',
      tagline: 'Professional private air charter services',
      shortDescription: 'On-demand private air charter services available within the USA, to Canada, and Worldwide. Bypassing TSA and commercial delays.',
      longDescription: 'Aircraft Management Group provides professional, private air charter services with our on demand air charter services available within the USA, to Canada and Worldwide. We hold Canadian Foreign Air Operating Certificate (FAOC) authority from Transport Canada and operating authority from the Canadian Transportation Agency (CTA). All aircraft and crews meet the highest standards of safety, operating under rigorous FAR Part 135 regulations.',
      benefits: [
        'On-demand operations within the USA, Canada, and Worldwide',
        'Crews exceed FAA training requirements',
        'Highest standards of safety and service',
        'Available 24 Hours / 7 Days a week'
      ],
      imageUrl: '/images/Aircraft Charter Services.webp'
    },
    {
      id: 'management',
      title: 'Turnkey Aircraft Management & Crew Staffing',
      tagline: 'Management for co-owned and single-owner aircraft',
      shortDescription: 'Founded in April 2006 with the mandate to provide the best possible aircraft management services for single-owner or co-owned aircraft.',
      longDescription: 'Aircraft Management Group was founded in April 2006 as a Part 91 Operator with the mandate to provide the best possible aircraft management services for our clients and their private aircraft. Our particular expertise is serving clients who share ownership of their aircraft with one or more parties. We make it possible to manage co-owned aircraft seamlessly. Additionally, all crew staff exceed FAA training requirements and maintain our highest standards of safety and service expectations.',
      benefits: [
        'Seamless management of co-owned aircraft',
        'Crew staffing and training exceed FAA requirements',
        'Professional pilot and crew recruitment',
        'Complete regulatory and flight compliance oversight'
      ],
      imageUrl: '/images/Turnkey Aircraft Management & Crew Staffing.webp'
    },
    {
      id: 'maintenance',
      title: 'Certified Jet Maintenance & Accounting',
      tagline: 'On-site oversight of repairs and continuous logs audit',
      shortDescription: 'We ensure that all inspections are made according to regulations and on time under hands-on oversight.',
      longDescription: 'We ensure that all inspections are made according to regulations and on time. Aircraft under our management receives hands-on oversight of maintenance and repairs. Our professionals stay on site with the aircraft to guarantee compliance, structural safety, and minimal operational downtime. Additionally, we track expenditures from fuel to crew accommodations and provide detailed invoices.',
      benefits: [
        'Inspections made according to regulations and strictly on-time',
        'Hands-on, on-site maintenance and repairs oversight',
        'Detailed accounting tracking expenditures from fuel to crew accommodations',
        'Detailed invoicing and financial transparency'
      ],
      imageUrl: '/images/Certified Jet Maintenance & Accounting.webp'
    },
    {
      id: 'consulting',
      title: 'Acquisitions & Consulting',
      tagline: 'Expert guidance for aircraft purchasing and negotiation',
      shortDescription: 'Expert assistance with search, negotiation, pre-inspection, flight demonstration, and financing.',
      longDescription: 'Aircraft Management Group offers its expertise and experience to help you purchase your aircraft by finding the right aircraft that fits your needs. We can assist with the negotiation, pre-inspection, flight demonstration, financing and purchase of your aircraft.',
      benefits: [
        'Finding the right aircraft that fits your exact needs',
        'Negotiation, pre-inspection, and flight demonstrations',
        'Financing and final purchase assistance',
        'Expert brokerage advisory services'
      ],
      imageUrl: '/images/Acquisitions & Consulting.webp'
    },
    {
      id: 'concierge',
      title: 'Concierge, Storage & Flight Scheduling',
      tagline: 'Hangar space, personal concierge, and flight planning',
      shortDescription: 'Sourcing FBO hangar space, hotel/transport bookings, catering, and scheduling.',
      longDescription: 'By leveraging our industry contacts, we find the best FBO (Fixed Base Operator) and hangar space for your aircraft. At your request, we can be your personal concierge. Hotel reservations, ground transportation and in-flight catering are only a few of the services that we offer to our clients. Additionally, we are constantly monitoring weather conditions and can make adjustments to get you where you need to go.',
      benefits: [
        'Sourcing premier FBO hangar space and storage',
        'Personal concierge for hotel, ground transport, and catering',
        'Continuous flight planning and weather monitoring',
        'Available 24 Hours / 7 Days/Week'
      ],
      imageUrl: '/images/Concierge, Storage & Flight Scheduling.webp'
    }
  ];

  const currentService = services.find(s => s.id === selectedService) || services[0];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-navy-dark">
      {/* Decorative vector meshes */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.35em] text-luxury-gold mb-3 font-semibold font-mono"
          >
            Capabilities & Core Pillars
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-main font-light tracking-tight leading-tight"
          >
            Aviation Services, <span className="italic font-normal text-gold-gradient">Mastered</span>
          </motion.h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-luxury-bronze to-luxury-gold mx-auto mt-6" />
        </div>

        {/* Dynamic Dual-Layout Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Quick Pillar Select Rail */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  id={`btn-service-${service.id}`}
                  className={`w-full text-left p-6 rounded-lg transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                    selectedService === service.id
                      ? 'bg-navy-slate/90 border-luxury-gold/50 gold-glow'
                      : 'bg-navy-slate/30 border-text-main/10 hover:bg-navy-slate/60 hover:border-text-main/10'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded transition-colors duration-200 ${
                      selectedService === service.id ? 'bg-luxury-gold/20 text-luxury-gold' : 'bg-text-main/5 text-text-main/40'
                    }`}>
                      {service.id === 'charter' && <Calendar className="w-5 h-5" />}
                      {service.id === 'management' && <ShieldCheck className="w-5 h-5" />}
                      {service.id === 'maintenance' && <Settings className="w-5 h-5" />}
                      {service.id === 'consulting' && <DollarSign className="w-5 h-5" />}
                      {service.id === 'concierge' && <HeartHandshake className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className={`text-base font-medium tracking-wide transition-colors duration-200 ${
                        selectedService === service.id ? 'text-luxury-gold' : 'text-text-main/80'
                      }`}>
                        {service.title}
                      </h4>
                      <p className="text-xs text-text-main/40 mt-0.5 line-clamp-1 font-light">
                        {service.tagline}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                    selectedService === service.id ? 'text-luxury-gold transform translate-x-1' : 'text-text-main/20'
                  }`} />
                </button>
              ))}
            </div>

            {/* Quick trust metrics banner */}
            <div className="hidden lg:block p-6 rounded-lg border border-text-main/10 bg-navy-slate/20">
              <div className="flex items-center space-x-3 text-luxury-gold mb-2">
                <Award className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-mono font-medium">Safety Ratings</span>
              </div>
              <p className="text-xs text-text-main/55 leading-relaxed text-left font-light">
                Operating with direct FAA Part 135 certification, Transport Canada Foreign Air Operating Certificate (FAOC) clearance, and ARG/US safety audited operations.
              </p>
            </div>
          </div>

          {/* Interactive Core Display Details */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-xl border border-text-main/10 p-8 lg:p-10 h-full flex flex-col justify-between relative overflow-hidden group">
              {/* Image with overlay mask */}
              <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden mb-8">
                <img
                  src={currentService.imageUrl}
                  alt={currentService.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span className="px-3 py-1 bg-luxury-gold/20 backdrop-blur text-luxury-gold text-[10px] uppercase font-mono tracking-widest rounded-full font-medium border border-luxury-gold/30">
                    {currentService.tagline}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-text-main mt-2 tracking-wide font-medium">
                    {currentService.title}
                  </h3>
                </div>
              </div>

              {/* Text specifications */}
              <div className="space-y-6 text-left">
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-text-main/40 font-mono mb-2">Operational Scope</h5>
                  <p className="text-text-main/80 text-sm md:text-base leading-relaxed font-light">
                    {currentService.longDescription}
                  </p>
                </div>

                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-text-main/40 font-mono mb-3">Key Highlights</h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                    {currentService.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-xs text-text-main/70 space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 shrink-0" />
                        <span className="leading-relaxed font-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action triggers */}
              <div className="mt-8 pt-6 border-t border-text-main/10 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[10px] text-text-main/40 font-mono uppercase">Need direct support?</p>
                  <a href="tel:+18884498491" className="text-xs text-luxury-gold hover:underline font-mono mt-0.5 block leading-none">
                    Toll-Free: 1 (888) 449-8491
                  </a>
                </div>
                <button
                  onClick={onRequestQuote}
                  className="px-6 py-3 rounded text-xs tracking-widest uppercase font-bold text-navy-dark bg-gradient-to-r from-luxury-gold via-luxury-champagne to-luxury-gold hover:opacity-95 shadow-md shadow-luxury-gold/25 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
