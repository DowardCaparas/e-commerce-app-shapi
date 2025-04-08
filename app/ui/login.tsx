"use client";

import Link from "next/link";
import { useState } from "react";

const LogIn = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="mx-auto bg-white xl:w-[50%] md:w-[70%] w-full flex flex-col items-center gap-6 py-6
    rounded-lg shadow-sm"
    >
      <div className="w-full flex flex-col gap-8 md:p-16 sm:p-14 p-10">
        <span className="md:text-2xl text-xl font-medium">Log In</span>
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
          className="py-2 px-6 text-white text-xl font-medium rounded-lg shadow-md
        cursor-pointer bg-orange-600 hover:bg-orange-500 active:bg-orange-600"
        >
          Log In
        </button>
        <Link
          href="/create-account"
          className="text-blue-700 hover:text-blue-500 active:text-blue-700"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
