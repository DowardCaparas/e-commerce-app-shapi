"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavBar from "../ui/navbar";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if already signed in
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/check-session");
        const data = await res.json();

        if (data.isLoggedIn) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Failed to check session:", error);
      }
    };
    checkLogin();
  }, [router]);

  // Submit the user input to sign in
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setTimeout(() => {
          router.push("/dashboard"); // or wherever you want
        }, 50);
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Failed to login:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="lg:px-16 md:px-8 px-4 pb-28 pt-32">
        <div className="mx-auto bg-white xl:w-[50%] md:w-[70%] w-full flex flex-col 
        items-center py-6 rounded-lg shadow-sm">
          <span className="md:text-2xl text-xl font-medium">
            Sign in your account
          </span>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8 md:p-14 sm:p-12 p-10"
          >
            <div className="inline-grid">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-orange-500 h-10 pl-2 mt-2"
                required
              />
            </div>

            <div className="inline-grid">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-orange-500 h-10 pl-2 mt-2"
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 text-white text-xl font-medium rounded-lg shadow-md cursor-pointer bg-orange-600 hover:bg-orange-500 active:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="flex items-center gap-2">
            <span>Have an account?</span>
            <Link
              href="/create-account"
              className="font-medium text-blue-700 hover:underline active:scale-95"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
