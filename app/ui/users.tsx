"use client";

import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import { fetchUsersBySearch } from "../lib/data";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <table>
          <thead className="bg-gray-200">
            <tr>
              {["ID", "Name", "Username", "Email", "Cart"].map((val) => (
                <th
                  key={val}
                  className={`py-2 text-left ${val === "ID" && "w-15"}`}
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users
              .filter((user) => user.role === "user")
              .map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-4">{user.id}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      href={`/dashboard/users/${user.id}`}
                      key={user.id}
                      className="bg-white border hover:bg-green-100 active:bg-green-200 
                      font-medium rounded-lg py-2 px-4"
                    >
                      View Cart
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
