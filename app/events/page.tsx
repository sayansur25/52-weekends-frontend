'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { eventApi } from '@/lib/api';

interface Event {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  status: string;
  max_attendees: number;
  cost_per_person: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState('All Events');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi.getAll();
        setEvents(response.data.data || response.data || []);
      } catch (error: any) {
        console.error('Failed to fetch events:', error);
        setError(`Error: ${error.message || 'Failed to fetch events'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    if (activeFilter === 'Published') {
      return event.status === 'published';
    }
    if (activeFilter === 'Upcoming') {
      return event.status !== 'published';
    }
    return true; // 'All Events'
  });

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Hero Section */}
      <div className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#010079' }}>
              🎯 Available Retreats
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl">
              Discover the perfect corporate weekend getaway designed to inspire, connect, and rejuvenate your team
            </p>
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
            {['All Events', 'Published', 'Upcoming'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-all min-h-[40px] text-sm sm:text-base border-2"
                style={{
                  background: filter === activeFilter ? 'linear-gradient(135deg, #010079 0%, #069494 100%)' : 'white',
                  borderColor: filter === activeFilter ? '#010079' : '#e5e7eb',
                  color: filter === activeFilter ? 'white' : '#374151'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block">
                <div className="text-4xl mb-2">⏳</div>
                <p className="text-gray-600">Loading retreats...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-xl p-8">
              <div className="text-4xl mb-2">⚠️</div>
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl p-8">
              <div className="text-5xl mb-3">🎉</div>
              <p className="text-gray-600 text-lg">No events available for this filter</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon or try a different filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, idx) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden border-l-4"
                  style={{ borderColor: event.status === 'published' ? '#069494' : '#D5AD36' }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 sm:h-56 bg-gray-200">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        ['1552664730-d307ca884978', '1552664730-d307ca884978', '1552664730-d307ca884978', '1552664730-d307ca884978', '1552664730-d307ca884978'][idx % 5]
                      }?w=600&h=400&fit=crop`}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: event.status === 'published' ? '#069494' : '#D5AD36' }}
                      >
                        {event.status === 'published' ? '✓ Live' : '○ Upcoming'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col">
                    <h2 className="text-xl font-bold mb-2" style={{ color: '#010079' }}>
                      {event.title}
                    </h2>

                    {/* Badge */}
                    <div className="mb-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: '#069494' }}
                      >
                        🏢 Corporate Retreat
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                      {event.description || 'Exceptional corporate retreat experience designed for team building and strategic planning'}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      <p>
                        📅 {new Date(event.start_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(event.end_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      <p>👥 {event.max_attendees} max participants</p>
                      <p className="font-bold" style={{ color: '#069494' }}>
                        💰 ₹{event.cost_per_person.toLocaleString('en-IN')}/person
                      </p>
                    </div>

                    <Link
                      href={`/events/${event.id}`}
                      className="w-full py-3 px-4 rounded-lg font-bold text-white transition-all hover:shadow-lg text-center min-h-[44px] flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="py-12" style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-sm sm:text-base">© 2025 52 Weekends. Creating memorable corporate experiences.</p>
        </div>
      </div>
    </div>
  );
}
