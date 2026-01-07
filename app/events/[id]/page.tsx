'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { eventApi } from '@/lib/api';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  max_attendees: number;
  cost_per_person: number;
  company_id?: number;
  resort_id?: number;
  image_url?: string;
}

export default function EventDetails() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventApi.getById(parseInt(eventId));
        setEvent(response.data.data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded-lg w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-2xl font-bold" style={{ color: '#010079' }}>
            {error || 'Event not found'}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-8 px-8 py-3 rounded-lg font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #010079, #069494)' }}
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  // Parse dates
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const formattedStart = startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedEnd = endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  const seatsAvailable = event.max_attendees - Math.floor(Math.random() * event.max_attendees * 0.4);

  return (
    <main style={{ background: 'var(--bg)' }}>
      {/* Hero Section with Image */}
      <section className="relative pt-24 pb-16">
        <div className="h-96 w-full overflow-hidden">
          <img
            src={event.image_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=600&fit=crop'}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(1, 0, 121, 0.6), rgba(6, 148, 148, 0.3))'
          }}></div>
        </div>

        {/* Content Grid */}
        <div className="max-w-6xl mx-auto px-6 lg:px-12 -mt-32 relative z-10">
          {/* Main Content Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Details Panel */}
            <div className="lg:col-span-2">
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid #D5AD36',
                  boxShadow: '0 25px 70px rgba(1, 0, 121, 0.2)'
                }}
                className="p-10 lg:p-12 rounded-2xl"
              >
                {/* Badge */}
                <div className="inline-block mb-6">
                  <span
                    style={{
                      background: '#D5E7EA',
                      color: '#010079',
                      border: '1px solid #D5AD36'
                    }}
                    className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide"
                  >
                    {event.status}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: '#010079' }}>
                  {event.title}
                </h1>

                {/* Quick Info Chips */}
                <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b-2" style={{ borderColor: '#D5E7EA' }}>
                  <div style={{ background: '#D5E7EA', color: '#010079' }} className="px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                    📅 {duration}D / {Math.ceil(duration / 2)}N
                  </div>
                  <div style={{ background: '#D5E7EA', color: '#010079' }} className="px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                    👥 Up to {event.max_attendees} people
                  </div>
                  <div style={{ background: '#D5E7EA', color: '#010079' }} className="px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                    📍 {event.location}
                  </div>
                  <div style={{ background: '#D5E7EA', color: '#010079' }} className="px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                    💰 ₹{event.cost_per_person.toLocaleString()} per person
                  </div>
                </div>

                {/* Description */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#010079' }}>About This Retreat</h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#5A6B74' }}>
                    {event.description || 'Experience a premium corporate retreat designed to strengthen team bonds, foster innovation, and create lasting memories. Our curated multi-day program includes carefully selected venues, expert facilitators, and engaging team-building activities.'}
                  </p>
                </div>

                {/* What's Included */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#010079' }}>What's Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      '🏨 Premium accommodation',
                      '🍽️ All meals & beverages',
                      '🎯 Team-building activities',
                      '🎤 Expert facilitators',
                      '📊 HR coordination',
                      '🚌 Ground transportation'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 rounded-lg" style={{ background: '#D5E7EA' }}>
                        <span className="text-2xl">{item.split(' ')[0]}</span>
                        <span className="font-semibold" style={{ color: '#010079' }}>{item.substring(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#010079' }}>Sample Itinerary</h2>
                  <div className="space-y-4">
                    {[
                      { day: 'Day 1', time: 'Arrival & Welcome', description: 'Team members arrive, settle in, and participate in welcome dinner with icebreaker activities.' },
                      { day: 'Day 2', time: 'Team Building', description: 'Structured team-building exercises, outdoor activities, and collaborative problem-solving sessions.' },
                      { day: 'Day 3', time: 'Workshops & Reflection', description: 'Leadership workshops, open forums for discussions, and team reflections on learnings.' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 pb-4 border-b-2" style={{ borderColor: '#D5E7EA' }}>
                        <div
                          style={{ background: '#D5AD36', color: '#010079' }}
                          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                        >
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1" style={{ color: '#010079' }}>{item.day} - {item.time}</h4>
                          <p style={{ color: '#5A6B74' }}>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Card */}
            <div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid #D5AD36',
                  boxShadow: '0 25px 70px rgba(1, 0, 121, 0.2)',
                  position: 'sticky',
                  top: '120px'
                }}
                className="p-8 rounded-2xl"
              >
                {/* Price */}
                <div className="mb-8 pb-8 border-b-2" style={{ borderColor: '#D5E7EA' }}>
                  <p style={{ color: '#5A6B74' }} className="text-sm font-semibold mb-2 uppercase tracking-wide">PRICE PER PERSON</p>
                  <h3 className="text-4xl font-black" style={{ color: '#010079' }}>
                    ₹{event.cost_per_person.toLocaleString()}
                  </h3>
                </div>

                {/* Availability */}
                <div className="mb-8">
                  <p style={{ color: '#5A6B74' }} className="text-sm font-semibold mb-3 uppercase tracking-wide">SEATS AVAILABLE</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold" style={{ color: '#010079' }}>{seatsAvailable} of {event.max_attendees}</span>
                    <span className="text-xs font-semibold" style={{ color: '#069494' }}>
                      {Math.round((seatsAvailable / event.max_attendees) * 100)}%
                    </span>
                  </div>
                  <div style={{ background: '#D5E7EA' }} className="h-3 rounded-full overflow-hidden">
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #069494, #00d9ff)',
                        width: `${(seatsAvailable / event.max_attendees) * 100}%`
                      }}
                      className="h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>

                {/* Dates */}
                <div className="mb-8 pb-8 border-b-2" style={{ borderColor: '#D5E7EA' }}>
                  <p style={{ color: '#5A6B74' }} className="text-sm font-semibold mb-2 uppercase tracking-wide">EVENT DATES</p>
                  <p className="font-bold text-lg" style={{ color: '#010079' }}>
                    {formattedStart} - {formattedEnd}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-4">
                  <button
                    className="w-full px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #069494, #00d9ff)',
                      boxShadow: '0 6px 20px rgba(6, 148, 148, 0.5)'
                    }}
                  >
                    Register Now
                  </button>
                  <button
                    className="w-full px-6 py-4 rounded-xl font-bold border-2 transition-all duration-300 hover:bg-opacity-10"
                    style={{
                      borderColor: '#D5AD36',
                      color: '#010079',
                      boxShadow: '0 4px 15px rgba(213, 173, 54, 0.3)'
                    }}
                  >
                    Request Proposal
                  </button>
                </div>

                {/* Info Text */}
                <p className="text-xs text-center font-semibold" style={{ color: '#5A6B74' }}>
                  🔒 Secure booking • 💰 Flexible payments • 🎯 Dedicated coordinator
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section style={{ background: 'white', borderTop: '2px solid #D5AD36' }} className="px-4 py-12 mt-16">
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
    </main>
  );
}
