"use client";

import Link from "next/link";
import React, { ReactNode, useState } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    // Clear JWT token from local storage or cookies
    localStorage.removeItem("authToken"); // Assuming JWT is stored in local storage
    const myToken = localStorage.getItem("authToken");
    console.log("Token logout", myToken);
    // Redirect to home page after logout
    window.location.href = "/";
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto">
          <ul className="flex gap-10 justify-center text-xl font-bold">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              SignUp
            </Link>

            <button
              onClick={handleLogoutClick}
              className="hover:underline text-white bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
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
