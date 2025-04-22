"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("userId", data.id);  // ✅ Store userId in localStorage
      alert("Login successful!");
      router.push("/dashboard");
    } else {
      setError(data.message || "Login failed");
    }
    
  };

  return (
    <div className="lg:px-16 md:px-8 px-4 py-28">
      <div
        className="mx-auto bg-white xl:w-[50%] md:w-[70%] w-full flex flex-col items-center py-6
          rounded-lg shadow-sm"
      >
        <>
          <span className="md:text-2xl text-xl font-medium">
            Sign in you account
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
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="py-2 px-6 text-white text-xl font-medium rounded-lg shadow-md
    cursor-pointer bg-orange-600 hover:bg-orange-500 active:bg-orange-600"
            >
              Sign in
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default LogIn;
