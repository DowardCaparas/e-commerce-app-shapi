"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LogIn = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          expiresInMins: 30, // optional, defaults to 60
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Failed to login username or password is incorrect!");
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      router.push("/dashboard");
    } catch (error) {
      console.error("Error to log in the user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="mx-auto bg-white xl:w-[50%] md:w-[70%] w-full flex flex-col items-center gap-6 py-6
    rounded-lg shadow-sm"
    >
      <>
        <span className="md:text-2xl text-xl font-medium">Log In</span>
        <form onSubmit={handleLogIn} className="w-full flex flex-col gap-8 md:p-14 sm:p-12 p-10">
          <div className="inline-grid">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter your username"
              onChange={handleChange}
              className="bg-gray-100 h-10 pl-2 mt-2 shadow-sm"
            />
          </div>
          <div className="inline-grid">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="bg-gray-100 h-10 pl-2 mt-2 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-6 text-white text-xl font-medium rounded-lg shadow-md
        cursor-pointer bg-orange-600 hover:bg-orange-500 active:bg-orange-600"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>

        <Link
          href="/create-account"
          className="text-blue-700 hover:text-blue-500 active:text-blue-700"
        >
          Create an account
        </Link>
      </>
    </div>
  );
};

export default LogIn;
