'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RoleGuard } from '@/components/RoleGuard';
import { eventApi } from '@/lib/api';

export default function ParticipantDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await eventApi.getAll();
      const eventsData = response.data.data || response.data || [];
      setAllEvents(eventsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Separate upcoming and attended events
  const upcomingEvents = allEvents.filter(e => e.status === 'published');
  const attendedEvents = allEvents.filter(e => e.status === 'draft').slice(0, 2);

  return (
    <RoleGuard allowedRoles={['participant']}>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        {/* Header */}
        <div className="sticky top-0 z-30 shadow-md" style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                👤 My Events
              </h1>
              <p className="text-blue-100 mt-2">Track your registrations and event history</p>
              <p className="text-blue-100 text-sm mt-1">Welcome, <span className="font-bold">{user?.name}</span></p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#069494' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Upcoming Events</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: '#069494' }}>
                    {upcomingEvents.length}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Events to attend</p>
                </div>
                <div className="text-5xl">📅</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#D5AD36' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Attended Events</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: '#D5AD36' }}>
                    {attendedEvents.length}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Past events completed</p>
                </div>
                <div className="text-5xl">✅</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8 flex flex-wrap gap-2 sm:gap-4">
            {[
              { id: 'upcoming', label: 'Upcoming Events', icon: '📅' },
              { id: 'attended', label: 'Attended Events', icon: '✅' },
              { id: 'preferences', label: 'Preferences', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-lg font-medium transition-all min-h-[44px] text-sm sm:text-base flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
                style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' } : {}}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="text-4xl mb-2">⏳</div>
                <p className="text-gray-600">Loading your events...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Upcoming Events Tab */}
              {activeTab === 'upcoming' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Upcoming Events</h2>
                    <p className="text-gray-600 text-sm mt-1">Events you can register for</p>
                  </div>

                  {upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {upcomingEvents.map((event: any) => (
                        <div
                          key={event.id}
                          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4"
                          style={{ borderColor: '#069494' }}
                        >
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <h3 className="text-lg font-bold text-gray-800 flex-1">
                              {event.title}
                            </h3>
                            <span
                              className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap text-white"
                              style={{ background: '#069494' }}
                            >
                              Available
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                          <div className="space-y-2 text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
                            <p>📅 {event.start_date} to {event.end_date}</p>
                            <p>👥 {event.max_attendees} max attendees</p>
                            <p>💰 ₹{event.cost_per_person.toLocaleString()}/person</p>
                          </div>
                          <button 
                            className="w-full px-4 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]"
                            style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}
                          >
                            Register Now
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl">
                      <div className="text-5xl mb-3">🎉</div>
                      <p className="text-gray-600 text-lg">No upcoming events available</p>
                      <p className="text-gray-500 text-sm mt-2">Check back soon for new events</p>
                    </div>
                  )}
                </div>
              )}

              {/* Attended Events Tab */}
              {activeTab === 'attended' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Attended Events</h2>
                    <p className="text-gray-600 text-sm mt-1">Events you have attended</p>
                  </div>

                  {attendedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {attendedEvents.map((event: any) => (
                        <div
                          key={event.id}
                          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4"
                          style={{ borderColor: '#D5AD36' }}
                        >
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <h3 className="text-lg font-bold text-gray-800 flex-1">
                              {event.title}
                            </h3>
                            <span
                              className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap text-white"
                              style={{ background: '#D5AD36' }}
                            >
                              Attended
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                          <div className="space-y-2 text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
                            <p>📅 {event.start_date} to {event.end_date}</p>
                            <p>💰 Cost: ₹{event.cost_per_person.toLocaleString()}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              className="flex-1 px-4 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]"
                              style={{ background: '#069494' }}
                            >
                              View Details
                            </button>
                            <button 
                              className="flex-1 px-4 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]"
                              style={{ background: '#D5AD36' }}
                            >
                              Certificate
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl">
                      <div className="text-5xl mb-3">📭</div>
                      <p className="text-gray-600 text-lg">No attended events yet</p>
                      <p className="text-gray-500 text-sm mt-2">Register for events to build your attendance history</p>
                    </div>
                  )}
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Preferences</h2>
                    <p className="text-gray-600 text-sm mt-1">Manage your settings</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-bold text-gray-800 mb-3">Notifications</h3>
                      <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700">Email notifications for new events</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700">Reminders for upcoming events</span>
                      </label>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="font-bold text-gray-800 mb-3">Privacy</h3>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700">Show my attendance in company directory</span>
                      </label>
                    </div>
                    <div>
                      <button className="px-6 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]" style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}>
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
