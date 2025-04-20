"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LogIn = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogIn = async (username: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in the user:", error);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="mx-auto bg-white xl:w-[50%] md:w-[70%] w-full flex flex-col items-center gap-6 py-10
      rounded-lg shadow-sm my-28"
    >
      <span className="md:text-2xl text-xl font-medium">Log In</span>
      <span>You can sign in using these 2 demo account.</span>
      <div className="flex flex-col w-full p-10 gap-6">
        <button
          disabled={loading}
          onClick={() => handleLogIn("averyp", "averyppass")}
          className="font-medium rounded-lg shadow-md transition-transform duration-150
          ease-in hover:bg-gray-100 active:scale-95 hover:shadow-sm cursor-pointer border-2 border-orange-500
          px-5 py-7"
        >
          {loading ? "Logging in..." : "Continue as shopper"}
        </button>

        <button
          disabled={loading}
          onClick={() => handleLogIn("emilys", "emilyspass")}
          className="font-medium rounded-lg shadow-md transition-transform duration-150
          ease-in hover:bg-gray-100 active:scale-95 hover:shadow-sm cursor-pointer border-2 border-orange-500
          px-5 py-7"
        >
          {loading ? "Logging in..." : "Continue as admin"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default LogIn;
