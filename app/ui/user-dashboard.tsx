"use client";

import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Users from "./users";

const UserDashboard = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [user, setUser] = useState<User | null>(null); // Type explicitly null for clearer state handling
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "omit",
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        throw error;
      }
    };

    fetchUser();
  }, [router]); // Added router to the dependency array

  // Fetch more information about the user only if user exists
  useEffect(() => {
    if (user) {
      const fetchMoreInfo = async () => {
        try {
          const res = await fetch(`${API_URL}/users/${user?.id}`);

          if (!res.ok)
            throw new Error(`Failed to fetch user info, ${res.status}`);

          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error("Error fetching user info:", error);
          throw error;
        }
      };

      fetchMoreInfo();
    }
  }, [user]); // This will trigger when the user state changes

  if (!user) return <p className="p-4">Loading user data...</p>;

  return (
    <div className="">
      {user.role === "admin" ? (
        <div className="flex border">
          <div className="">

          </div>
          
        </div>
      )
      : (
        <div>
          User
        </div>
      )
    }
    </div>
  );
};

export default UserDashboard;
