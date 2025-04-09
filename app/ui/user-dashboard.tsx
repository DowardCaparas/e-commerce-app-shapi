"use client";

import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import { useRouter } from "next/navigation";

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
          method: 'GET',  
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include'
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

  if (!user) return <p className="p-4">Loading user data...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user.firstName}!</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDashboard;
