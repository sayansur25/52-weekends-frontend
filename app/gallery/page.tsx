'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const galleryImages = [
  {
    id: 1,
    title: 'TechCorp Annual Retreat 2025',
    category: 'Corporate Retreat',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Team bonding and strategic planning session'
  },
  {
    id: 2,
    title: 'Leadership Summit',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Industry leaders discussing future trends'
  },
  {
    id: 3,
    title: 'Adventure Training',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Team building through outdoor activities'
  },
  {
    id: 4,
    title: 'Workshop & Training',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Professional development and skill enhancement'
  },
  {
    id: 5,
    title: 'Beach Outing',
    category: 'Recreation',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Relaxation and team bonding by the shore'
  },
  {
    id: 6,
    title: 'Cultural Experience',
    category: 'Experience',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Immersive cultural and heritage experiences'
  },
  {
    id: 7,
    title: 'Sports Tournament',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Inter-company sports competitions'
  },
  {
    id: 8,
    title: 'Gala Dinner',
    category: 'Celebration',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Elegant evening celebration and networking'
  },
  {
    id: 9,
    title: 'Wellness Retreat',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Health and wellness focused retreat'
  }
];

const categories = ['All', 'Corporate Retreat', 'Conference', 'Adventure', 'Workshop', 'Recreation', 'Experience', 'Sports', 'Celebration', 'Wellness'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>

      {/* Hero Section */}
      <div className="relative py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#010079' }}>
              🖼️ Event Gallery
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore memorable moments from our corporate retreats, conferences, and team experiences
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-all min-h-[40px] text-sm sm:text-base ${
                    selectedCategory === category
                      ? 'text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400'
                  }`}
                  style={selectedCategory === category ? { background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' } : {}}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer overflow-hidden border-l-4"
                style={{ borderColor: '#069494' }}
              >
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{image.title}</h3>
                      <p className="text-sm text-gray-200">{image.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 line-clamp-1">{image.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: '#069494' }}
                    >
                      {image.category}
                    </span>
                    <button
                      className="px-3 py-1 text-xs font-bold rounded transition-all"
                      style={{ background: '#D5AD36', color: 'white' }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎞️</div>
              <p className="text-gray-600 text-lg">No images found in this category</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="bg-white rounded-xl overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#010079' }}>
                  {selectedImage.title}
                </h2>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-3 items-center">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-bold text-white"
                    style={{ background: '#069494' }}
                  >
                    {selectedImage.category}
                  </span>
                  <button
                    className="px-6 py-2 rounded-lg font-bold text-white transition-all hover:shadow-lg min-h-[44px]"
                    style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}
                  >
                    Learn More
                  </button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="px-6 py-2 rounded-lg font-bold border-2 transition-all hover:shadow-lg min-h-[44px]"
                    style={{ borderColor: '#D5AD36', color: '#D5AD36' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 py-12" style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-sm sm:text-base">© 2025 52 Weekends. All rights reserved. Creating memorable corporate experiences.</p>
        </div>
      </div>
    </div>
  );
}
