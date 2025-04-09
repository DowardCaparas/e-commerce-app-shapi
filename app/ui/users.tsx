"use client";

import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import { fetchUsersBySearch } from "../lib/data";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  // Debounced callback
  const debouncedSearch = useDebouncedCallback(async (value: string) => {
    try {
      const data = await fetchUsersBySearch(value);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, 1000);

  // Trigger debounce on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value); // call the debounced function
  };

  // Optional: initial load
  useEffect(() => {
    const loadInitialUsers = async () => {
      try {
        const data = await fetchUsersBySearch("");
        setUsers(data);
      } catch (error) {
        console.error("Error loading initial users:", error);
      }
    };
    loadInitialUsers();
  }, []);

  return (
    <div className="flex flex-col gap-6 mt-16">
      <h3 className="text-2xl text-gray-500 font-medium">Users</h3>

      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {users
            .filter((user) => user.role === "user")
            .map((user) => (
              <Link
                href={`/user/${user.id}`}
                key={user.id}
                className="bg-white p-5 flex flex-col gap-4 items-center shadow-sm hover:shadow-md rounded-sm"
              >
                <Image
                  src={user.image}
                  alt={user.username}
                  width={100}
                  height={100}
                  className="rounded-full p-2 bg-gray-100"
                />
                <div className="flex items-center gap-2 font-medium">
                  <span>{user.firstName}</span>
                  <span>{user.lastName}</span>
                </div>
                <span className="text-gray-500">{user.username}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Users;
