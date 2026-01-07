'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { eventApi } from '@/lib/api';

interface Event {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
  max_attendees: number;
  cost_per_person: number;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi.getAll();
        setEvents(response.data.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main style={{ background: 'var(--bg)' }}>
      {/* Hero Section - Premium Creative Glassmorphism */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Image with Premium Gradient Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1000&fit=crop"
            alt="Corporate Retreat"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient overlay: Navy→Teal (premium effect) */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(135deg, rgba(1, 0, 121, 0.65) 0%, rgba(1, 0, 121, 0.5) 40%, rgba(6, 148, 148, 0.35) 100%)`
          }}></div>
          
          {/* Subtle topographic contour pattern (low opacity) */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(6, 148, 148, 0.5) 25%, rgba(6, 148, 148, 0.5) 26%, transparent 27%, transparent 74%, rgba(6, 148, 148, 0.5) 75%, rgba(6, 148, 148, 0.5) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(6, 148, 148, 0.5) 25%, rgba(6, 148, 148, 0.5) 26%, transparent 27%, transparent 74%, rgba(6, 148, 148, 0.5) 75%, rgba(6, 148, 148, 0.5) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Content Grid with Premium Spacing */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 lg:px-12 py-24 lg:py-0">
          {/* Left: Premium Glassmorphism Panel */}
          <div className="flex flex-col justify-center space-y-8">
            <div 
              style={{ 
                background: 'rgba(1, 0, 121, 0.68)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                border: '1.5px solid rgba(6, 148, 148, 0.45)',
                boxShadow: '0 8px 40px rgba(1, 0, 121, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
              }} 
              className="p-12 lg:p-14 rounded-3xl"
            >
              {/* Premium Headline with Gradient Accent */}
              <h1 className="text-5xl lg:text-7xl font-black mb-7 leading-tight tracking-tight text-white">
                Plan Stress-<span 
                  style={{ 
                    background: 'linear-gradient(135deg, #069494 0%, #00d9ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                Free
                </span> Corporate Retreats
              </h1>
              
              {/* Premium Subtext */}
              <p className="text-xl lg:text-2xl text-gray-100 mb-12 font-light tracking-wide leading-relaxed">
                Curated multi-day offsites near Kolkata
              </p>
              
              {/* Premium CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/events">
                  <button 
                    className="w-full px-9 py-4 rounded-xl font-bold text-base text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl" 
                    style={{ 
                      background: 'linear-gradient(135deg, #069494, #00d9ff)',
                      boxShadow: '0 6px 20px rgba(6, 148, 148, 0.5)'
                    }}
                  >
                    Browse Retreats
                  </button>
                </Link>
                <button 
                  className="px-9 py-4 rounded-xl font-bold text-base text-white border-2 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm" 
                  style={{ 
                    borderColor: '#D5AD36',
                    boxShadow: '0 4px 15px rgba(213, 173, 54, 0.3)'
                  }}
                >
                  Request Proposal
                </button>
              </div>
            </div>
          </div>

          {/* Right: Premium Quick Finder Card */}
          <div className="flex items-center justify-center lg:justify-end lg:mt-0 mt-8">
            <div 
              style={{ 
                background: 'rgba(255, 255, 255, 0.99)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '2.5px solid #D5AD36',
                boxShadow: '0 25px 70px rgba(1, 0, 121, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
              }} 
              className="w-full max-w-md p-12 rounded-2xl"
            >
              <h3 style={{ color: '#010079' }} className="text-3xl font-black mb-10 tracking-tight">Quick Finder</h3>
              
              <div className="space-y-8">
                {/* Team Size Field */}
                <div>
                  <label className="block text-sm font-bold mb-3 tracking-wider" style={{ color: '#142126' }}>TEAM SIZE</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-xl pointer-events-none">👥</span>
                    <input 
                      type="number" 
                      placeholder="e.g., 50" 
                      className="w-full pl-14 pr-5 py-4 border-2 rounded-xl focus:outline-none transition-all font-semibold" 
                      style={{ 
                        borderColor: '#D5E7EA',
                        color: '#142126'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#069494'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#D5E7EA'}
                    />
                  </div>
                </div>

                {/* Month Field */}
                <div>
                  <label className="block text-sm font-bold mb-3 tracking-wider" style={{ color: '#142126' }}>MONTH</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-xl pointer-events-none">📅</span>
                    <select 
                      className="w-full pl-14 pr-5 py-4 border-2 rounded-xl focus:outline-none transition-all font-semibold appearance-none"
                      style={{ 
                        borderColor: '#D5E7EA',
                        color: '#142126',
                        backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 20 20" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>')`,
                        backgroundPosition: 'right 0.7rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#069494'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#D5E7EA'}
                    >
                      <option>Select month</option>
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                    </select>
                  </div>
                </div>

                {/* Budget Field */}
                <div>
                  <label className="block text-sm font-bold mb-3 tracking-wider" style={{ color: '#142126' }}>BUDGET</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-xl pointer-events-none">₹</span>
                    <input 
                      type="text" 
                      placeholder="per person"
                      className="w-full pl-14 pr-5 py-4 border-2 rounded-xl focus:outline-none transition-all font-semibold"
                      style={{ 
                        borderColor: '#D5E7EA',
                        color: '#142126'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#069494'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#D5E7EA'}
                    />
                  </div>
                </div>

                {/* Location Field */}
                <div>
                  <label className="block text-sm font-bold mb-3 tracking-wider" style={{ color: '#142126' }}>LOCATION</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-xl pointer-events-none">📍</span>
                    <select 
                      className="w-full pl-14 pr-5 py-4 border-2 rounded-xl focus:outline-none transition-all font-semibold appearance-none"
                      style={{ 
                        borderColor: '#D5E7EA',
                        color: '#142126',
                        backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 20 20" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>')`,
                        backgroundPosition: 'right 0.7rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#069494'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#D5E7EA'}
                    >
                      <option>Select location</option>
                      <option>Kolkata</option>
                      <option>Darjeeling</option>
                      <option>Goa</option>
                      <option>Jaipur</option>
                    </select>
                  </div>
                </div>

                {/* Find Button */}
                <button 
                  className="w-full py-5 rounded-xl font-bold text-white text-base transition-all duration-300 hover:scale-105 active:scale-95 mt-6 shadow-lg hover:shadow-xl" 
                  style={{ 
                    background: 'linear-gradient(135deg, #010079, #069494)',
                    boxShadow: '0 6px 20px rgba(1, 0, 121, 0.4)'
                  }}
                >
                  Find Options
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Wave Separator SVG */}
        <svg 
          className="absolute bottom-0 left-0 right-0" 
          viewBox="0 0 1440 200" 
          preserveAspectRatio="none" 
          style={{ height: '150px', width: '100%' }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(1, 0, 121, 0.1)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path 
            d="M0,60 Q360,120 720,60 T1440,60 L1440,200 L0,200 Z" 
            fill="white"
            opacity="1"
          ></path>
          <path 
            d="M0,80 Q360,140 720,80 T1440,80 L1440,200 L0,200 Z" 
            fill="url(#waveGradient)"
            opacity="0.6"
          ></path>
        </svg>
      </section>

      {/* Kolkata Experience Banner Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4" style={{ color: '#010079' }}>
              Corporate Fun Activities
            </h2>
            <p className="text-xl" style={{ color: '#5A6B74' }}>
              Team building & exciting retreat experiences in and around Kolkata
            </p>
          </div>

          {/* Image Grid Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Large featured image - left */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Team Building Activities"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">Team Building</h3>
                <p className="text-sm opacity-90">Exciting group activities & bonding experiences</p>
              </div>
            </div>

            {/* Top right small images */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group h-64">
              <img 
                src="https://images.unsplash.com/photo-1533961817551-f6100104b6ad?w=400&h=300&fit=crop"
                alt="Outdoor Adventures"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <h4 className="font-bold text-sm">Adventure Sports</h4>
              </div>
            </div>

            {/* Bottom right images */}
            <div className="grid grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop"
                  alt="Team Games"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white text-xs">
                  <p className="font-bold">Team Games</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1664888888129-27ae0b36ffc8?w=300&h=300&fit=crop"
                  alt="Workshops"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white text-xs">
                  <p className="font-bold">Workshops</p>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Activity Types Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span style={{ background: '#D5E7EA', color: '#010079', border: '2px solid #D5AD36' }} className="px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2">
              🎯 Team Challenges
            </span>
            <span style={{ background: '#D5E7EA', color: '#010079', border: '2px solid #D5AD36' }} className="px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2">
              🏃 Outdoor Games
            </span>
            <span style={{ background: '#D5E7EA', color: '#010079', border: '2px solid #D5AD36' }} className="px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2">
              🎨 Creative Workshops
            </span>
            <span style={{ background: '#D5E7EA', color: '#010079', border: '2px solid #D5AD36' }} className="px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2">
              🎉 Fun Activities
            </span>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link href="/events">
              <button 
                className="px-10 py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #069494, #00d9ff)',
                  boxShadow: '0 6px 20px rgba(6, 148, 148, 0.5)'
                }}
              >
                Explore All Events →
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section style={{ background: 'white', borderTop: '2px solid #D5AD36' }} className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm md:text-base">
            <div className="flex items-center gap-2" style={{ color: '#010079' }}>
              <span className="text-2xl">🏛️</span> 
              <span className="font-600">GST Invoice</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#010079' }}>
              <span className="text-2xl">🔒</span> 
              <span className="font-600">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#010079' }}>
              <span className="text-2xl">🏨</span> 
              <span className="font-600">Curated Resorts</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#010079' }}>
              <span className="text-2xl">👤</span> 
              <span className="font-600">Dedicated Coordinator</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Retreats + How It Works - Dark Navy Section */}
      <section style={{ background: '#010079', color: 'white' }} className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Featured Retreats - Left/Top */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold mb-12">Featured Retreats</h2>
              
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-80 bg-gray-300/20 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {events.slice(0, 4).map((event, idx) => (
                    <Link key={event.id} href={`/events/${event.id}`}>
                      <div style={{ border: '2px solid #D5AD36' }} className="event-card rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                        {/* Image with rounded mask and gold frame */}
                        <div className="relative h-56 overflow-hidden bg-gray-300">
                          <img 
                            src={`https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop`}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Gold badge - premium accent */}
                          <div style={{ background: '#D5AD36' }} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg">
                            {idx + 1}
                          </div>
                        </div>
                        
                        <div className="p-6 bg-white text-gray-900">
                          {/* Icon chips for quick scanning */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span style={{ background: '#D5E7EA', color: '#010079' }} className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              📅 3D/2N
                            </span>
                            <span style={{ background: '#D5E7EA', color: '#010079' }} className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              👥 50+
                            </span>
                            <span style={{ background: '#D5E7EA', color: '#010079' }} className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              📍 Kolkata
                            </span>
                          </div>

                          <p className="text-sm font-600" style={{ color: '#5A6B74' }}>near Kolkata</p>
                          
                          <div className="flex justify-between items-start mb-4 gap-2 mt-3">
                            <div>
                              <p className="text-xs font-bold text-gray-600">Start Price per person</p>
                              <p className="text-2xl font-bold" style={{ color: '#069494' }}>₹{event.cost_per_person.toLocaleString()}</p>
                            </div>
                          </div>

                          {/* Seat availability progress bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span style={{ color: '#5A6B74' }}>Seats left</span>
                              <span style={{ color: '#069494', fontWeight: 'bold' }}>6/10</span>
                            </div>
                            <div style={{ background: '#D5E7EA' }} className="h-2 rounded-full overflow-hidden">
                              <div style={{ background: '#069494', width: '60%' }} className="h-full rounded-full"></div>
                            </div>
                          </div>
                          
                          <button className="w-full py-2 rounded-lg font-600 text-white text-sm hover:opacity-90 transition-opacity" style={{ background: '#069494' }}>
                            View Details →
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* How It Works + Testimonials - Right/Bottom */}
            <div className="flex flex-col justify-start">
              <h2 className="text-4xl font-bold mb-12">How It Works</h2>
              
              {/* 3-step process */}
              <div className="space-y-8 mb-12">
                {[
                  { icon: '✓', title: 'Choose', desc: 'Select your retreat' },
                  { icon: '→', title: 'Register', desc: 'Book your team' },
                  { icon: '📊', title: 'Manage', desc: 'Track & enjoy' }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div style={{ background: '#D5AD36', color: '#010079' }} className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{step.title}</p>
                      <p className="text-sm text-gray-300">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <h3 className="text-xl font-bold mb-4">What HR Teams Say</h3>
              <div className="space-y-4">
                {[
                  { company: 'TechCorp', role: 'HR Manager', initials: 'TC' },
                  { company: 'StartupXYZ', role: 'People Lead', initials: 'SX' }
                ].map((testimonial, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(213, 173, 54, 0.3)' }} className="p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div style={{ background: '#D5AD36', color: '#010079' }} className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{testimonial.role}</p>
                        <p className="text-xs text-gray-300">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Angled Separator */}
        <div className="mt-24 -mx-4 h-32 bg-gradient-to-b from-transparent via-white/5 to-white transform -skew-y-1"></div>
      </section>
    </main>
  );
}
