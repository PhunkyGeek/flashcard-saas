"use client";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-black fixed w-full gap-3 top-0 left-0 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-300">
          SaaS Flash
        </h1>
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav
          className={`hidden lg:flex lg:items-center lg:space-x-6 ${
            isMenuOpen ? "block" : ""
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0">
            <li>
              <a
                href="/"
                className="text-white hover:text-gray-400 transition-colors duration-300 transform hover:scale-105"
              >
                Home
              </a>
            </li>

            {!isSignedIn ? (
              <li>
                <a
                  href="/sign-in"
                  className="text-white hover:text-gray-400 transition-colors duration-300 transform hover:scale-105"
                >
                  Sign In
                </a>
              </li>
            ) : (
              <>
                <li>
                  <a
                    href="/dashboard"
                    className="text-white hover:text-gray-400 transition-colors duration-300 transform hover:scale-105"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <UserButton
                    userProfileMode="navigation"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10",
                      },
                    }}
                  />
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-black text-start bg-opacity-80 text-white py-2 rounded-lg shadow-lg">
          <nav className="flex flex-col items-end space-y-2 px-4">
            <a
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="sm:text-sm md:text-base text-white hover:text-gray-400 transition-colors duration-300 text-lg"
            >
              Home
            </a>
            {!isSignedIn ? (
              <a
                href="/sign-in"
                onClick={() => setIsMenuOpen(false)}
                className="sm:text-sm md:text-base text-white hover:text-gray-400 transition-colors duration-300 text-lg"
              >
                Sign In
              </a>
            ) : (
              <>
                <a
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="sm:text-sm md:text-base text-white hover:text-gray-400 transition-colors duration-300 text-lg"
                >
                  Dashboard
                </a>
                <UserButton
                  userProfileMode="navigation"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8",
                    },
                  }}
                />
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}