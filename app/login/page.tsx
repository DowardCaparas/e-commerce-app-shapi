"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../ui/navbar";
import Image from "next/image";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);
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
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [username, password, router]
  );

  return (
    <>
      <NavBar />
      <div className="lg:px-16 md:px-8 px-4 pb-28 pt-32">
        <div
          className="mx-auto bg-white w-full flex flex-col 
        items-center py-6 rounded-lg shadow-sm relative max-w-xl"
        >
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
                type={isPasswordHidden ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-orange-500 h-10 pl-2 mt-2"
                required
              />

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="showpass"
                  id="showpass"
                  checked={isPasswordHidden}
                  onChange={() => setIsPasswordHidden((prev) => !prev)}
                />
                <label htmlFor="showpass">Show password</label>
              </div>
            </div>

            <div className="h-2">
              {error && <p className="text-red-500">{error}</p>}

            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 text-white text-xl font-medium rounded-lg shadow-md 
              cursor-pointer bg-green-400 hover:bg-green-500 active:bg-green-400
              disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Image
                    src="/loader.svg"
                    alt="check icon"
                    width={25}
                    height={25}
                    className="animate-spin"
                  />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="flex items-center gap-2 -mt-7">
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
