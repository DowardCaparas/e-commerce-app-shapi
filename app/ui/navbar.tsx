"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "omit",
        });

        if (res.status === 401) {
          console.warn("Token expired or invalid, logging out");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setImage(data.image);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [API_URL]);

  return (
    <nav
      className="bg-gradient-to-b from-[#F6402D] to-[#FE6333] text-white flex justify-between items-center 
    lg:px-16 md:px-8 px-4 py-2"
    >
      <Link href="/" className="font-medium text-3xl my-2 flex items-center">
        <Image
          src="/shopping-bag.svg"
          alt="shopping bag"
          width={50}
          height={50}
        />
        Shapi
      </Link>

      {!isLoggedIn ? (
        <Link href="/login">
          <span className="text-white font-medium hover:text-gray-200 active:text-white">
            Log In
          </span>
        </Link>
      ) : (
        <Link href="/dashboard">
          {image ? (
            <Image
              src={image}
              alt="User profile image"
              width={40}
              height={40}
              className="rounded-full ring-2 ring-white"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
          )}
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
