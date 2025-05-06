"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const links = [
  { label: "Home", path: "/", icon: "/home.svg", role: "admin" },
  { label: "Mall", path: "/dashboard", icon: "/store.svg", role: "user" },
  {
    label: "Users",
    path: "/dashboard/users",
    icon: "/users.svg",
    role: "admin",
  },
  {
    label: "Me",
    path: "/dashboard/account",
    icon: "/user.svg",
    role: "user",
  },
];

type LinksTypes = {
  label: string;
  path: string;
  icon: string;
  role: string;
};

const SideNav = () => {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [showLinks, setShowLinks] = useState(false); // new state for delay
  const pathname = usePathname();
  const router = useRouter();

  // Check if already signed in
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/check-session");
        const data = await res.json();

        if (!data.isLoggedIn) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to check session:", error);
      }
    };
    checkLogin();
  }, [router]);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch("/api/check-account");
        const data = await res.json();

        if (data.role) {
          setRole(data.role);
          setUserId(data.userId);

          // delay link rendering
          const timeout = setTimeout(() => {
            setShowLinks(true);
          }, 20); // 300ms delay, tweak as needed

          return () => clearTimeout(timeout); // cleanup
        }
      } catch (error) {
        console.error("Failed to check the role:", error);
      }
    };
    checkRole();
  }, []);

  const renderLinks = (filteredLinks: LinksTypes[]) =>
    filteredLinks.map((link) => {
      const linkWithUserId =
        link.label === "Cart" || link.label === "Me";
      return (
        <Link
          key={link.label}
          href={linkWithUserId ? `${link.path}/${userId}` : link.path}
          className={`flex max-lg:flex-col max-lg:items-center lg:gap-3 lg:p-3 py-1 w-full 
            max-lg:justify-center 
            ${
              pathname === link.path || pathname === `${link.path}/${userId}`
                ? "bg-orange-200"
                : "hover:bg-gray-100 active:bg-gray-200 transition-transform duration-100 ease-in"
            }`}
        >
          <Image src={link.icon} alt={link.label} width={25} height={25} />
          <span className="font-medium max-lg:text-xs">{link.label}</span>
        </Link>
      );
    });

  return (
    <div className={`lg:h-full max-lg:w-full bg-white max-lg:border-t max-lg:fixed max-lg:bottom-0 z-20
      ${pathname === `/dashboard/cart/${userId}` || pathname === `/dashboard/checkout/${userId}` 
        ? "max-lg:hidden" : ""
      }
    `}>
      <div className="bg-orange-50 w-full h-40 p-2 overflow-hidden max-lg:hidden">
        <Image
          src="/images/heroBG.webp"
          alt="Big Cart image illustration"
          width={300}
          height={300}
          className="lg:w-[70%] sm:w-[25%] w-[40%] mx-auto "
        />
      </div>
      <div className="flex lg:flex-col">
            {showLinks && (
              <>
                {/* Filter the side nav links based on the user type */}
                {renderLinks(
                  role === "user"
                    ? links.filter(
                        (link) => link.role === "user" || link.label === "Home"
                      )
                    : links.filter(
                        (link) => link.role === "admin"
                      )
                )}
              </>
            )}
          </div>
    </div>
  );
};

export default SideNav;
