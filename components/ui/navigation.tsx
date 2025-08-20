'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { categories } from '@/lib/models';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center py-4">
          <div className="flex items-center space-x-8">
            <Link 
              href="/"
              className={`font-medium transition-colors hover:text-purple-600 ${
                pathname === '/' ? 'text-purple-600 border-b-2 border-purple-600 pb-1' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            {categories.map(category => (
              <Link 
                key={category}
                href={`/section/${category.toLowerCase()}`}
                className={`font-medium transition-colors hover:text-purple-600 ${
                  pathname === `/section/${category.toLowerCase()}` 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between py-4">
            <Link 
              href="/"
              className="text-lg font-bold text-purple-600"
              onClick={closeMenu}
            >
              The Daily Chuckle
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-sm border-b border-purple-100 shadow-lg">
              <div className="px-4 py-6 space-y-4 bg-white">
                <Link 
                  href="/"
                  onClick={closeMenu}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                    pathname === '/' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  Home
                </Link>
                {categories.map(category => (
                  <Link 
                    key={category}
                    href={`/section/${category.toLowerCase()}`}
                    onClick={closeMenu}
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      pathname === `/section/${category.toLowerCase()}` 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}