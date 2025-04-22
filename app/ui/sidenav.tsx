"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";

const links = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "/gauge.svg",
    role: "user",
  },
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

const SideNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userId");

      if (!token) {
        router.push("/login");
        return;
      }
    };

    fetchUser();
  }, [router]); // Added router to the dependency array

  return (
    <div className="h-full bg-white">
      <div className="bg-gray-100 w-full h-36 p-5flex flex-col justify-around gap-10">
        <span className="text-xl font-semibold">Shapi</span>
      </div>
      <div className="flex md:flex-col ">
        <Fragment>
          {links
            .map((link) => (
              <Link
                key={link.label}
                href={link.path}
                className={`flex p-5 gap-3 w-full
             ${
               pathname === link.path
                 ? "bg-green-200"
                 : `hover:bg-gray-100 active:bg-gray-200 transition-transform  duration-100 ease-in`
             }
         `}
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={20}
                  height={20}
                  className="object-contain max-md:mx-auto"
                />
                <span className="font-medium max-md:hidden">{link.label}</span>
              </Link>
            ))}
        </Fragment>
      </div>
    </div>
  );
};

export default SideNav;
