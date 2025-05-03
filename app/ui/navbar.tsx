"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [label, setLabel] = useState("Sign in");
  const [storedUserId, setstoredUserId] = useState("");

  useEffect(() => {
    const checkAccount = async () => {
      try {
        const res = await fetch("/api/check-account");
        const data = await res.json();

        if (data.userId) {
          setstoredUserId(data.userId);
          setLabel("Dashboard");
        } else {
          setLabel("Sign in");
        }
      } catch (error) {
        console.error("Failed to check the role:", error);
      }
    };
    checkAccount();
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

      <Link
        href={storedUserId ? "/dashboard" : "/login"}
        className="font-medium"
        aria-label="Sign in account"
      >
        {label}
      </Link>
    </nav>
  );
};

export default NavBar;
