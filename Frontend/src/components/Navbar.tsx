'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // optional, change key if needed
    setIsAuthenticated(!!token);
  }, []);

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/CompanyLogo.png"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold">Industrial CRM</span>
        </div>

        {/* Main nav links */}
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right section: Login/Logout/Register */}
        <div className="relative text-sm font-medium">
          {isAuthenticated ? (
            <Link href="/logout" className="hover:text-gray-300 transition">
              Logout
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDropdown}
                className="hover:text-gray-300 focus:outline-none"
              >
                Account
              </button>
              {isDropdownVisible && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white text-black rounded-md shadow-lg z-10">
                  <Link
                    href="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                  <Link
                    href="/company/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
