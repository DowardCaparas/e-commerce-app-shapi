"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/auth-context";

const NavBar = () => {
  const { user } = useAuth();

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

      {!user ? (
        <Link href="/login">Log In</Link>
      ) : (
        <Link href="/dashboard">
          {user.image ? (
            <Image src={user.image} alt="User profile" width={40} height={40} />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
          )}
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
