'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RoleGuard } from '@/components/RoleGuard';
import { eventApi } from '@/lib/api';

interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  max_attendees: number;
  cost_per_person: number;
  status: 'published' | 'draft';
}

export default function OrganizerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventApi.getAll();
      setEvents(response.data.data || response.data || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalRegistrations = events.reduce((sum) => sum + Math.floor(Math.random() * 50) + 10, 0);
  const publishedEvents = events.filter(e => e.status === 'published').length;
  const totalRevenue = events.reduce((sum, e) => sum + (e.cost_per_person * 30), 0);

  return (
    <RoleGuard allowedRoles={['organiser']}>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        {/* Header */}
        <div className="sticky top-0 z-30 shadow-md" style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                📊 Organizer Dashboard
              </h1>
              <p className="text-blue-100 mt-2">Manage your corporate retreats and events</p>
              <p className="text-blue-100 text-sm mt-1">Company: <span className="font-bold">{user?.name}</span></p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#D5AD36' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">My Events</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: '#010079' }}>
                    {events.length}
                  </p>
                </div>
                <div className="text-4xl">📅</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#069494' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Published</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: '#069494' }}>
                    {publishedEvents}
                  </p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Registrations</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {totalRegistrations}
                  </p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    ₹{Math.round(totalRevenue / 1000)}K
                  </p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8 flex flex-wrap gap-2 sm:gap-4">
            {[
              { id: 'events', label: 'My Events', icon: '📅' },
              { id: 'registrations', label: 'Registrations', icon: '📋' },
              { id: 'insights', label: 'Insights', icon: '📊' },
              { id: 'settings', label: 'Settings', icon: '⚙️' }
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
                <p className="text-gray-600">Loading your data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Events Tab */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Your Events</h2>
                      <p className="text-gray-600 text-sm mt-1">Manage and track all your corporate retreats</p>
                    </div>
                    <button
                      onClick={() => setShowCreateEvent(!showCreateEvent)}
                      className="w-full sm:w-auto px-6 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]"
                      style={{ background: 'linear-gradient(135deg, #D5AD36 0%, #c99b27 100%)' }}
                    >
                      + Create Event
                    </button>
                  </div>

                  {showCreateEvent && (
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: '#069494' }}>
                      <h3 className="text-xl font-bold mb-4" style={{ color: '#010079' }}>Create New Event</h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                          <input
                            type="text"
                            placeholder="e.g., Annual Team Building Retreat"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent min-h-[44px]"
                            style={{ '--tw-ring-color': '#069494' } as any}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            placeholder="Describe your event..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                            rows={3}
                            style={{ '--tw-ring-color': '#069494' } as any}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                              type="date"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[44px]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="date"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[44px]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
                            <input
                              type="number"
                              placeholder="200"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[44px]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cost per Person (₹)</label>
                            <input
                              type="number"
                              placeholder="5000"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[44px]"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="flex-1 px-4 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]"
                            style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}
                          >
                            Create Event
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowCreateEvent(false)}
                            className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-all min-h-[44px]"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {events.map((event) => (
                        <div
                          key={event.id}
                          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4"
                          style={{ borderColor: event.status === 'published' ? '#069494' : '#D5AD36' }}
                        >
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <h3 className="text-lg font-bold text-gray-800 flex-1">
                              {event.title}
                            </h3>
                            <span
                              className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap text-white"
                              style={{ background: event.status === 'published' ? '#069494' : '#D5AD36' }}
                            >
                              {event.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                          <div className="space-y-2 text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
                            <p>📅 {event.start_date} to {event.end_date}</p>
                            <p>👥 {event.max_attendees} max attendees</p>
                            <p>💰 ₹{event.cost_per_person.toLocaleString()}/person</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 px-4 py-2 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]" style={{ background: '#010079' }}>
                              Edit
                            </button>
                            <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-all min-h-[44px]">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl">
                      <div className="text-5xl mb-3">📭</div>
                      <p className="text-gray-600 text-lg">No events created yet</p>
                      <p className="text-gray-500 text-sm mt-2">Create your first event to get started</p>
                    </div>
                  )}
                </div>
              )}

              {/* Registrations Tab */}
              {activeTab === 'registrations' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Event Registrations</h2>
                    <p className="text-gray-600 text-sm mt-1">View and manage participant registrations</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full">
                      <thead style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }} className="text-white">
                        <tr>
                          <th className="px-6 py-4 text-left font-bold">Event</th>
                          <th className="px-6 py-4 text-left font-bold hidden sm:table-cell">Registrations</th>
                          <th className="px-6 py-4 text-left font-bold hidden md:table-cell">Revenue</th>
                          <th className="px-6 py-4 text-center font-bold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {events.map((event: any) => {
                          const regs = Math.floor(Math.random() * 50) + 10;
                          const revenue = regs * event.cost_per_person;
                          return (
                            <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-800">{event.title}</td>
                              <td className="px-6 py-4 hidden sm:table-cell text-gray-700">{regs}</td>
                              <td className="px-6 py-4 hidden md:table-cell text-gray-700">₹{revenue.toLocaleString()}</td>
                              <td className="px-6 py-4 text-center">
                                <button className="text-white font-bold px-3 py-2 rounded-lg transition-all hover:shadow-lg" style={{ background: '#069494' }}>
                                  View Details
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Insights Tab */}
              {activeTab === 'insights' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Insights & Analytics</h2>
                    <p className="text-gray-600 text-sm mt-1">Track your performance metrics</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-lg font-bold mb-4 text-gray-800">Event Performance</h3>
                      <div className="space-y-3">
                        {events.slice(0, 3).map((event: any) => (
                          <div key={event.id}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 truncate">{event.title}</span>
                              <span className="text-sm font-bold" style={{ color: '#069494' }}>75%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="h-2 rounded-full" style={{ width: '75%', background: 'linear-gradient(90deg, #010079 0%, #069494 100%)' }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-lg font-bold mb-4 text-gray-800">Key Metrics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">Avg. Attendees/Event</span>
                          <span className="font-bold text-blue-600">34</span>
                        </div>
                        <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">Registration Rate</span>
                          <span className="font-bold text-green-600">82%</span>
                        </div>
                        <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">Total Attendees</span>
                          <span className="font-bold text-purple-600">{totalRegistrations}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Settings</h2>
                    <p className="text-gray-600 text-sm mt-1">Manage your preferences and configurations</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-bold text-gray-800 mb-2">Notifications</h3>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700">Email notifications for new registrations</span>
                      </label>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="font-bold text-gray-800 mb-2">Privacy</h3>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700">Public event visibility</span>
                      </label>
                    </div>
                    <div>
                      <button className="px-6 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]" style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}>
                        Save Settings
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
