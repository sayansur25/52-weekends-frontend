'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const router = useRouter();
  const { role, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }

      // Redirect based on role
      switch (role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'organizer':
          router.push('/organizer');
          break;
        case 'resort_contact':
          router.push('/resort');
          break;
        case 'participant':
        default:
          router.push('/participant');
          break;
      }
    }
  }, [role, loading, isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Loading Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Redirecting you to your dashboard...</p>
      </div>
    </div>
  );
}
