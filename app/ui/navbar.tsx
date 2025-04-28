"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [label, setLabel] = useState("Sign in");


  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedUserId = localStorage.getItem("userId");

    if (storedRole && storedUserId) {
      setLabel("Dashboard");
    }
  }, []);

  return (
    <nav
      className="bg-gradient-to-b from-[#F6402D] to-[#FE6333] text-white flex 
    justify-between items-center lg:px-20 md:px-12 px-4 py-1 fixed top-0 right-0 left-0 z-20"
    >
      <Link
        href="/"
        className="text-3xl my-2 flex items-center"
        aria-label="Home"
      >
        <Image
          src="/shopping-bag.svg"
          alt="shopping bag"
          width={50}
          height={50}
        />
        <span className="ml-1">Shapi</span>
      </Link>

      {label === "Dashboard" ? (
        <Link
          href="/dashboard"
          className="font-medium bg-white p-1.5 rounded-full hover:bg-gray-100 active:scale-95"
          aria-label="Dashboard"
        >
          <Image
            src="/user.svg"
            alt="user icon"
            width={25}
            height={25}
            className="cursor-pointer"
          />
        </Link>
      ) : (
        <Link
          href="/login"
          className="font-medium"
          aria-label="Sign in account"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
