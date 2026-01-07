'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RoleGuard } from '@/components/RoleGuard';
import { eventApi } from '@/lib/api';

export default function ResortDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventApi.getAll();
      setEvents(response.data.filter((e: any) => e.status === 'published'));
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={['resort_contact']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Resort Management
                </h1>
                <p className="text-gray-600">Welcome, {user?.name}</p>
              </div>
              <button
                onClick={logout}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors min-h-[44px]"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Upcoming Bookings</h3>
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mt-2">
                {events.length}
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Total Attendees</h3>
              <p className="text-3xl md:text-4xl font-bold text-green-600 mt-2">
                {events.reduce((sum: number, e: any) => sum + (e.max_attendees || 0), 0)}
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Resource Status</h3>
              <p className="text-3xl md:text-4xl font-bold text-orange-600 mt-2">
                85%
              </p>
              <p className="text-xs text-gray-500 mt-1">Capacity Utilization</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {['bookings', 'attendees', 'feedback', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 md:py-3 rounded-lg font-medium transition-colors capitalize min-h-[44px] text-sm md:text-base ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <>
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Upcoming Bookings
                  </h2>
                  <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-sm md:text-base">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">
                            Event
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden sm:table-cell">
                            Dates
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden md:table-cell">
                            Attendees
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {events.map((event: any) => (
                          <tr key={event.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] line-clamp-1">
                              {event.title}
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell text-gray-600 text-sm">
                              {event.start_date} - {event.end_date}
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              {event.max_attendees}
                            </td>
                            <td className="px-4 py-3">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                                Confirmed
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Attendees Tab */}
              {activeTab === 'attendees' && (
                <div className="space-y-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Attendee Lists
                  </h2>
                  <div className="space-y-4">
                    {events.map((event: any) => (
                      <div
                        key={event.id}
                        className="bg-white p-4 md:p-6 rounded-lg shadow"
                      >
                        <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-1">
                          {event.title}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div className="bg-blue-50 p-3 md:p-4 rounded">
                            <p className="text-xs md:text-sm text-gray-600">Expected Attendees</p>
                            <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-1">
                              {event.max_attendees}
                            </p>
                          </div>
                          <div className="bg-green-50 p-3 md:p-4 rounded">
                            <p className="text-xs md:text-sm text-gray-600">Confirmed</p>
                            <p className="text-2xl md:text-3xl font-bold text-green-600 mt-1">
                              {Math.floor(event.max_attendees * 0.85)}
                            </p>
                          </div>
                          <div className="bg-yellow-50 p-3 md:p-4 rounded">
                            <p className="text-xs md:text-sm text-gray-600">Pending</p>
                            <p className="text-2xl md:text-3xl font-bold text-yellow-600 mt-1">
                              {Math.floor(event.max_attendees * 0.15)}
                            </p>
                          </div>
                        </div>
                        <button className="w-full px-4 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm md:text-base min-h-[44px]">
                          Download Attendee List
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Tab */}
              {activeTab === 'feedback' && (
                <div className="space-y-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Guest Feedback & Ratings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Ratings</h3>
                      <div className="space-y-3">
                        {[
                          { title: 'Room Cleanliness', rating: 4.8 },
                          { title: 'Food Quality', rating: 4.6 },
                          { title: 'Staff Service', rating: 4.9 },
                          { title: 'Facilities', rating: 4.7 }
                        ].map((item) => (
                          <div key={item.title} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">{item.title}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-yellow-600">
                                {item.rating}
                              </span>
                              <span className="text-yellow-400">★</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Overall Stats</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Average Rating</p>
                          <p className="text-3xl md:text-4xl font-bold text-yellow-600 mt-1">
                            4.75/5
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Reviews</p>
                          <p className="text-3xl md:text-4xl font-bold text-blue-600 mt-1">
                            847
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resources Tab */}
              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Resource Management
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Room Availability</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Deluxe Rooms</span>
                            <span className="text-sm font-semibold">5/20</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: '75%' }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Standard Rooms</span>
                            <span className="text-sm font-semibold">8/30</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: '73%' }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Economy Rooms</span>
                            <span className="text-sm font-semibold">12/40</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{ width: '70%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Dining Capacity</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Main Hall</span>
                            <span className="text-sm font-semibold">180/200</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: '90%' }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Conference Rooms</span>
                            <span className="text-sm font-semibold">120/150</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: '80%' }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Activities Spaces</span>
                            <span className="text-sm font-semibold">45/60</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{ width: '75%' }}
                            />
                          </div>
                        </div>
                      </div>
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
