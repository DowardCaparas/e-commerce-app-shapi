"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import SignOut from "./sign-out";

const NavBar = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [link, setLink] = useState("/login");
  const [label, setLabel] = useState("Sign in");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // prevents hydration mismatch on SSR

    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    if (userRole && userId) {
      if (userRole === "user") {
        setLink(`/dashboard/cart/${userId}`);
      } else {
        setLink(`/dashboard`);
      }
      setLabel("Dashboard");
    } else {
      setLink("/login");
      setLabel("Sign in");
    }
  }, []);

  // fetch Cart quantity
  useEffect(() => {
    const getCartQuantity = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await fetch(`/api/cart/quantity?userId=${userId}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setCartQuantity(data.quantity);
      } catch (error) {
        console.error("Failed to fetch cart quantity:", error);
      }
    };

    getCartQuantity();
  }, []);

  return (
    <nav
      className="bg-gradient-to-b from-[#F6402D] to-[#FE6333] text-white flex justify-between
       items-center lg:px-12 md:px-4 px-2 py-1"
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

      {isClient && (
        <div className="flex items-center gap-4">
          {label === "Dashboard" ? (
            <Fragment>
              <Link
                href={link}
                className="font-medium bg-white p-2 rounded-full hover:bg-gray-100 active:scale-95"
                aria-label={label}
              >
                <Image
                  src="/cart.svg"
                  alt="cart icon"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </Link>
              {/* cart items quantity */}
              {cartQuantity > 0 && (
                <div className="absolute top-0 ml-6 mt-3">
                  <span className="bg-red-600 border-2 border-white p-1 rounded-full 
                  text-white font-semibold text-xs">
                    {cartQuantity}
                  </span>
                </div>
              )}

             <div>
             <SignOut/>
             </div>
            </Fragment>
          ) : (
            <Link href={link} className="font-medium" aria-label={label}>
              {label}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
