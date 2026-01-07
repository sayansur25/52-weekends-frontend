'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RoleGuard } from '@/components/RoleGuard';
import { companyApi, eventApi } from '@/lib/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [companies, setCompanies] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [companiesRes, eventsRes] = await Promise.all([
        companyApi.getAll(),
        eventApi.getAll()
      ]);
      setCompanies(companiesRes.data.data || companiesRes.data || []);
      setEvents(eventsRes.data.data || eventsRes.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        {/* Header */}
        <div className="sticky top-0 z-30 shadow-md" style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                🛡️ Platform Control
              </h1>
              <p className="text-blue-100 mt-2">Manage companies, events, and analytics</p>
              <p className="text-blue-100 text-sm mt-1">Welcome, <span className="font-bold">{user?.name}</span></p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#069494' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Companies</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: '#069494' }}>
                    {companies.length}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Active platforms</p>
                </div>
                <div className="text-5xl">🏢</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#010079' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Events</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: '#010079' }}>
                    {events.length}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">All events</p>
                </div>
                <div className="text-5xl">📅</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#D5AD36' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Events</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: '#D5AD36' }}>
                    {events.filter((e: any) => e.status === 'published').length}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Published</p>
                </div>
                <div className="text-5xl">✅</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#069494' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: '#069494' }}>
                    ₹2.5L
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Platform earnings</p>
                </div>
                <div className="text-5xl">💰</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8 flex flex-wrap gap-2 sm:gap-4">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'companies', label: 'Companies', icon: '🏢' },
              { id: 'events', label: 'Events', icon: '📅' },
              { id: 'analytics', label: 'Analytics', icon: '📈' }
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
                <p className="text-gray-600">Loading platform data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Platform Overview</h2>
                    <p className="text-gray-600 text-sm mt-1">Key metrics and performance indicators</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#069494' }}>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Booking Rate</h3>
                      <p className="text-4xl font-bold" style={{ color: '#069494' }}>85%</p>
                      <p className="text-xs text-gray-500 mt-1">↑ 12% from last month</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#D5AD36' }}>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Rating</h3>
                      <p className="text-4xl font-bold" style={{ color: '#D5AD36' }}>4.8/5</p>
                      <p className="text-xs text-gray-500 mt-1">Based on 120 reviews</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#010079' }}>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Repeat Rate</h3>
                      <p className="text-4xl font-bold" style={{ color: '#010079' }}>62%</p>
                      <p className="text-xs text-gray-500 mt-1">Companies repeat booking</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Companies Tab */}
              {activeTab === 'companies' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Companies Management</h2>
                      <p className="text-gray-600 text-sm mt-1">Manage all registered companies</p>
                    </div>
                    <button 
                      className="w-full sm:w-auto px-6 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]"
                      style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}
                    >
                      + Add Company
                    </button>
                  </div>
                  
                  {companies.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}>
                            <tr>
                              <th className="px-6 py-4 text-left font-bold text-white">Company Name</th>
                              <th className="px-6 py-4 text-left font-bold text-white hidden sm:table-cell">Industry</th>
                              <th className="px-6 py-4 text-left font-bold text-white hidden md:table-cell">Contact</th>
                              <th className="px-6 py-4 text-left font-bold text-white">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {companies.map((company: any) => (
                              <tr key={company.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800">{company.name}</td>
                                <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{company.industry || 'N/A'}</td>
                                <td className="px-6 py-4 text-gray-600 hidden md:table-cell text-sm">{company.contact_email || 'N/A'}</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-2">
                                    <button 
                                      className="px-3 py-2 text-white rounded text-sm font-medium transition-all min-h-[36px]"
                                      style={{ background: '#069494' }}
                                    >
                                      Edit
                                    </button>
                                    <button 
                                      className="px-3 py-2 text-white rounded text-sm font-medium transition-all min-h-[36px]"
                                      style={{ background: '#D5AD36' }}
                                    >
                                      View
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl">
                      <div className="text-5xl mb-3">🏢</div>
                      <p className="text-gray-600 text-lg">No companies yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Events Tab */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>All Events</h2>
                    <p className="text-gray-600 text-sm mt-1">Manage and monitor all platform events</p>
                  </div>

                  {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {events.map((event: any) => (
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
                            <button 
                              className="flex-1 px-4 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]"
                              style={{ background: '#069494' }}
                            >
                              View
                            </button>
                            <button 
                              className="flex-1 px-4 py-3 text-white rounded-lg font-bold transition-all hover:shadow-lg min-h-[44px]"
                              style={{ background: '#D5AD36' }}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl">
                      <div className="text-5xl mb-3">📅</div>
                      <p className="text-gray-600 text-lg">No events yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#010079' }}>Analytics & Reports</h2>
                    <p className="text-gray-600 text-sm mt-1">Platform performance and insights</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#069494' }}>
                      <h3 className="text-sm font-medium text-gray-600 mb-3">User Engagement</h3>
                      <p className="text-4xl font-bold" style={{ color: '#069494' }}>92%</p>
                      <p className="text-xs text-gray-500 mt-1">↑ 15% from last month</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#D5AD36' }}>
                      <h3 className="text-sm font-medium text-gray-600 mb-3">Event Completion</h3>
                      <p className="text-4xl font-bold" style={{ color: '#D5AD36' }}>78%</p>
                      <p className="text-xs text-gray-500 mt-1">Events successfully completed</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#010079' }}>
                      <h3 className="text-sm font-medium text-gray-600 mb-3">Customer Satisfaction</h3>
                      <p className="text-4xl font-bold" style={{ color: '#010079' }}>4.7/5</p>
                      <p className="text-xs text-gray-500 mt-1">Based on 250+ ratings</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#069494' }}>
                      <h3 className="text-sm font-medium text-gray-600 mb-3">Avg Revenue/Event</h3>
                      <p className="text-4xl font-bold" style={{ color: '#069494' }}>₹50K</p>
                      <p className="text-xs text-gray-500 mt-1">Growing monthly</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#D5AD36' }}>
                      <h3 className="text-sm font-medium text-gray-600 mb-3">Total Registrations</h3>
                      <p className="text-4xl font-bold" style={{ color: '#D5AD36' }}>1.2K</p>
                      <p className="text-xs text-gray-500 mt-1">Active registrations</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderColor: '#010079' }}>
                      <h3 className="text-sm font-medium text-gray-600 mb-3">Platform Growth</h3>
                      <p className="text-4xl font-bold" style={{ color: '#010079' }}>+28%</p>
                      <p className="text-xs text-gray-500 mt-1">YoY growth rate</p>
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
