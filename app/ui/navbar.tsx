"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartBadge = ({ userId }: { userId: string }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const fetchCartQuantity = async () => {
      try {
        const res = await fetch(`/api/cart/quantity?userId=${userId}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setCartQuantity(data.quantity);
      } catch (error) {
        console.error("Failed to fetch cart quantity:", error);
      }
    };

    fetchCartQuantity();
    const interval = setInterval(fetchCartQuantity, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="relative bg-white p-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200">
      <Link href={`/dashboard/cart/${userId}`} className="font-medium" aria-label="Cart">
        <Image
          src="/cart.svg"
          alt="cart icon"
          width={25}
          height={25}
          className="cursor-pointer"
        />
      </Link>
      {cartQuantity > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-600 border-2 border-orange-700 
          p-0.5 rounded-full text-white font-semibold text-xs"
        >
          {cartQuantity}
        </span>
      )}
    </div>
  );
};

const NavBar = () => {
  const [label, setLabel] = useState("Sign in");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedUserId = localStorage.getItem("userId");

    if (storedRole && storedUserId) {
      setRole(storedRole);
      setUserId(storedUserId);
      setLabel("Dashboard");
    }
  }, []);

  return (
    <nav
      className="bg-gradient-to-b from-[#F6402D] to-[#FE6333] text-white flex 
    justify-between items-center lg:px-12 md:px-4 px-2 py-1"
    >
      <Link
        href="/"
        className="font-medium text-3xl my-2 flex items-center"
        aria-label="Home"
      >
        <Image
          src="/shopping-bag.svg"
          alt="shopping bag"
          width={50}
          height={50}
        />
        <span className="ml-2">Shapi</span>
      </Link>

      <div className="flex items-center gap-4">
        {label === "Dashboard" ? (
          <div className="flex items-center gap-4">
            {role === "user" && userId && <CartBadge userId={userId} />}
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
          </div>
        ) : (
          <Link href="/login" className="font-medium" aria-label="Sign in account">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
