"use client";

import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import { fetchUsersBySearch } from "../lib/data";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";

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
    <div className="flex flex-col w-full">
      <h3 className="text-2xl text-gray-500 font-medium">Users</h3>

      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
        className="bg-white text-start p-4 w-full cursor-text text-gray-500 
              border-2 border-orange-500 my-5"
      />

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 sm:max-md:grid-cols-3 gap-2">
          {users
            .filter((user) => user.role === "user")
            .map((user) => (
              <div key={user.id} className="hover:bg-gray-100 flex flex-col gap-4 
              items-center border rounded-xl p-5">
                <Image
                  src={user.image}
                  alt={user.username}
                  width={80}
                  height={80}
                  className="rounded-full p-1 bg-gray-100 border"
                />
                <span className="text-lg font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <span>@{user.username}</span>
               
                <Link
                    href={`/dashboard/users/${user.id}`}
                    key={user.id}
                    className="bg-white border hover:bg-green-200 active:bg-green-300 
                      font-medium rounded-lg py-2 px-4"
                  >
                    View Cart
                  </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Users;
