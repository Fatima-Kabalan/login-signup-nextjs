"use client";
import Spinner from "@/public/icons/spinner";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Make sure the response is read only once
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage("Password reset link sent to your email");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during password reset:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  w-full max-w-md border rounded-sm shadow-lg bg-white p-8 gap-4"
      >
        <h1 className="font-bold text-2xl text-center text-gray-800">
          Forgot Password
        </h1>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700 text-sm font-bold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner />
              Sending...
            </div>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
}
