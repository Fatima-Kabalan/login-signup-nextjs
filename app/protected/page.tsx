"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("No token found");
          return;
        }

        const res = await fetch("/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        console.log("data", data);
        setEmail(data.email);
        setUsername(data.username);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Sorry! You are logged out</h1>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Protected Page</h1>
      {email ? (
        <>
          <p>User email: {email}</p>
          {username && <p>USername : {username}</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
