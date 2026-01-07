'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name);
        setUserRole(userData.role);
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'organiser':
        return '/organizer';
      case 'participant':
        return '/participant';
      default:
        return '/';
    }
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <nav style={{ background: '#010079', color: 'white' }} className="shadow-md sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="font-bold text-xl md:text-2xl cursor-pointer hover:opacity-80 transition flex items-center gap-2">
            <span className="text-2xl">🏖️</span>
            <span>52 Weekends</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <ul className="hidden lg:flex space-x-1 text-sm font-medium">
          <li>
            <Link href="/events" className="px-4 py-2 rounded-lg hover:bg-white/10 transition duration-200">
              Retreats
            </Link>
          </li>
          <li>
          <Link href="/gallery" className="px-4 py-2 rounded-lg hover:bg-white/10 transition duration-200">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/contact" className="px-4 py-2 rounded-lg hover:bg-white/10 transition duration-200">
              Contact
            </Link>
          </li>
        </ul>

        {/* Action Buttons - Desktop */}
        <div className="hidden lg:flex gap-3 items-center">
          {isLoggedIn ? (
            <>
              <Link href={getDashboardLink()}>
                <button className="px-5 py-2 rounded-lg text-sm font-bold border-2 border-white text-white hover:bg-white/10 transition duration-200">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg text-sm font-bold border-2 border-white text-white hover:bg-white/10 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <button className="px-5 py-2 rounded-lg text-sm font-bold border-2 border-white text-white hover:bg-white/10 transition duration-200">
                  Login
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="px-5 py-2 rounded-lg text-sm font-bold border-2 border-white text-white hover:bg-white/10 transition duration-200">
                  Sign up
                </button>
              </Link>
              <Link href="/request-proposal">
                <button className="px-6 py-2 rounded-lg text-sm font-bold text-black hover:shadow-lg transition duration-200" style={{ background: '#D5AD36' }}>
                  Request Proposal
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-3xl hover:opacity-80 transition">☰</button>
      </div>
    </nav>
  );
}
