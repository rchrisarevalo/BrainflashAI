"use client";
import React, { useState } from "react";
import Link from "next/link";
import mainLogo from "../images/mainLogo.png";
import { useAuth, SignOutButton } from "@clerk/nextjs";
import { FaBars, FaXmark } from "react-icons/fa6";

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link href={href} onClick={onClick} className="relative inline-block group">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1476bc] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
  </Link>
);

const Navigation = () => {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-screen z-20 bg-white px-5 py-4 shadow-lg">
      <div className="flex flex-row justify-between items-center">
        <Link href="/">
          <img
            src={mainLogo.src}
            alt="BrainFlashAI Logo"
            className="h-10 sm:h-12"
          />
        </Link>

        {/* Desktop links */}
        {!auth?.isSignedIn ? (
          <ul className="hidden sm:flex flex-row items-center gap-8">
            <li>
              <NavLink href="/login">Sign In</NavLink>
            </li>
            <li>
              <Link
                href="/signup"
                className="bg-[#1476bc] hover:bg-[#0a3f5d] transition-colors text-white font-semibold px-5 py-2 rounded-lg"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="hidden sm:flex flex-row items-center gap-8">
            <li>
              <NavLink href="/dashboard">My Dashboard</NavLink>
            </li>
            <li>
              <NavLink href="/dashboard/flashcards">Generate New Set</NavLink>
            </li>
            <li>
              <SignOutButton>
                <button className="text-black hover:text-[#1476bc] transition-colors font-medium">
                  Sign Out
                </button>
              </SignOutButton>
            </li>
          </ul>
        )}

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-[#1476bc] text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 pb-2 border-t pt-4">
          {!auth?.isSignedIn ? (
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block font-medium"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-[#1476bc] text-white font-semibold text-center px-5 py-2.5 rounded-lg"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block font-medium"
                >
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/flashcards"
                  onClick={() => setMenuOpen(false)}
                  className="block font-medium"
                >
                  Generate New Set
                </Link>
              </li>
              <li>
                <SignOutButton>
                  <button className="text-left font-medium text-black">
                    Sign Out
                  </button>
                </SignOutButton>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;