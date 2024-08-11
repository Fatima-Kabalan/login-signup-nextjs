"use client";

import Menu from "@/public/icons/menu";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import LogoutButton from "./LogoutButton";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 relative">
        <nav className="container mx-auto flex justify-between items-center p-2">
          <div className="text-2xl font-bold">Brand</div>
          <div className="md:hidden relative">
            <button className="text-white h-8" onClick={toggleMenu}>
              <Menu />
            </button>
            {isMenuOpen && (
              <ul
                ref={menuRef}
                className="absolute top-full -left-9 mt-2 bg-gray-800 rounded shadow-lg z-10 w-48"
              >
                <MenuItem href="/" onClick={toggleMenu}>
                  Home
                </MenuItem>
                <MenuItem href="/login" onClick={toggleMenu}>
                  Login
                </MenuItem>
                <MenuItem href="/signup" onClick={toggleMenu}>
                  SignUp
                </MenuItem>
                <LogoutButton onClick={handleLogoutClick} />
              </ul>
            )}
          </div>
          <ul className="hidden md:flex flex-row gap-4 md:gap-10 justify-center text-lg md:text-xl font-bold">
            <MenuItem href="/">Home</MenuItem>
            <MenuItem href="/login">Login</MenuItem>
            <MenuItem href="/signup">SignUp</MenuItem>
            <LogoutButton onClick={handleLogoutClick} />
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Form Project By Fatima
      </footer>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleCancelLogout}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
