import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to the Home Page!
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          This is a sample home page built with Next.js, Tailwind CSS, and
          TypeScript. Explore the features and get started by logging in or
          signing up.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
