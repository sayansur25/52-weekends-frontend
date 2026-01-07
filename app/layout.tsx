import type { Metadata, Viewport } from 'next';
import Header from './components/Header';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0
};

export const metadata: Metadata = {
  title: '52 Weekends - Corporate Retreat Platform',
  description: 'Manage corporate retreats in Kolkata with ease'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {/* Navigation */}
        <Header />

        {/* Main Content */}
        <main className="w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold mb-4">52 Weekends</h3>
                <p className="text-sm">Corporate retreat management platform for Kolkata.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-white transition">Home</a></li>
                  <li><a href="/events" className="hover:text-white transition">Events</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="mailto:support@52weekends.in" className="hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Follow Us</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-sm">
              <p>&copy; 2025 52 Weekends. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
