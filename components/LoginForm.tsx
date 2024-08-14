"use client";

import Spinner from "@/public/icons/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage("Login successful");
        localStorage.setItem("authToken", data.token); // Store token in localStorage
        router.push("/protected"); // Redirect to protected page
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleFormSubmit}
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        {message && <p className="mb-4 text-red-500 text-center">{message}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-4">
              <div className=" h-5">
                <Spinner />
              </div>
              Logging in...
            </div>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center mt-4">
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  );
}
