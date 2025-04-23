"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const links = [
  { label: "Dashboard", path: "/dashboard", icon: "/gauge.svg", role: "admin" },
  { label: "Cart", path: "/dashboard/cart", icon: "/cart.svg", role: "user" },
  {
    label: "Users",
    path: "/dashboard/users",
    icon: "/users.svg",
    role: "admin",
  },
  {
    label: "Products",
    path: "/dashboard/products",
    icon: "/package.svg",
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
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showLinks, setShowLinks] = useState(false); // new state for delay
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("userRole");
    console.log(storedToken);
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      setRole(storedRole);

      // delay link rendering
      const timeout = setTimeout(() => {
        setShowLinks(true);
      }, 20); // 300ms delay, tweak as needed

      return () => clearTimeout(timeout); // cleanup
    }
  }, [router]);

  const renderLinks = (filteredLinks: LinksTypes[]) =>
    filteredLinks.map((link) => (
      <Link
        key={link.label}
        href={link.label === "Cart" ? `${link.path}/${token}` : link.path}
        className={`flex p-5 gap-3 w-full ${
          pathname === link.path ||
          pathname === `${link.path}/${token}`
            ? "bg-green-200"
            : "hover:bg-gray-100 active:bg-gray-200 transition-transform duration-100 ease-in"
        }`}
      >
        <Image src={link.icon} alt={link.label} width={20} height={20} />
        <span className="font-medium max-md:hidden">{link.label}</span>
      </Link>
    ));

  return (
    <div className="h-full bg-white">
      <div className="bg-orange-50 w-full h-40 p-2 overflow-hidden">
        <Image
          src="/images/heroBG.webp"
          alt="Big Cart image illustration"
          width={300}
          height={300}
          className="md:w-[70%] sm:w-[25%] w-[40%] mx-auto"
        />
      </div>
      <div className="flex md:flex-col">
        {showLinks && (
          <Fragment>
            {/* Filter the side nav links based on the user type */}
            {renderLinks(
              role === "user"
                ? links.filter((link) => link.role === "user")
                : links.filter(
                    (link) => link.role === "admin" || link.label === "Products"
                  )
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default SideNav;
