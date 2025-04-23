"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [link, setLink] = useState("/login");
  const [label, setLabel] = useState("Sign in");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    router.push("/login");
    // Refresh the page to reload components using localStorage
    setTimeout(() => {
      window.location.reload();
    }, 20); // slight delay to allow navigation
  };

  return (
    <nav
      className="bg-gradient-to-b from-[#F6402D] to-[#FE6333] text-white flex justify-between items-center 
      lg:px-16 md:px-8 px-4 py-3"
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
            <div className="flex items-center gap-4">
              <Link
                href={link}
                className="font-medium bg-white p-2 rounded-full hover:bg-gray-100 active:scale-95"
                aria-label={label}
              >
                <Image
                  src="/cart.svg"
                  alt="cart icon"
                  width={22}
                  height={22}
                  className="cursor-pointer"
                />
              </Link>
              {/* cart items quantity */}
              {cartQuantity > 0 && (
                <div className="absolute top-0 ml-6 mt-3">
                  <span className="bg-red-600 p-1 rounded-full text-white font-semibold text-sm">
                    {cartQuantity}
                  </span>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="bg-white text-orange-600 px-4 py-1 rounded-md font-medium 
                hover:bg-orange-100 active:scale-95 cursor-pointer"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
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
