"use client";

import { useEffect, useState } from "react";
import { ProductsOnCartTypes, User } from "../lib/definitions";
import { useRouter } from "next/navigation";
import UserDetails from "./user-details";
import UserCarts from "./user-carts";
import { fetchUserCart } from "../lib/data";

const UserDashboard = () => {
  const [user, setUser] = useState<User | null>(null); // Type explicitly null for clearer state handling
  const [cart, setCart] = useState<ProductsOnCartTypes[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "omit",
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("accountID");
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
        const carts = await fetchUserCart(Number(user.id));
        setCart(carts);

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.id}`
          );

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
          <div className=""></div>
        </div>
      ) : (
        <div className="">
          <UserDetails
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            maidenName={user.maidenName}
            username={user.username}
            email={user.email}
            image={user.image}
            address={user.address}
            age={user.age}
            gender={user.gender}
          />
          <div className="mt-10 mb-2">
            <span className="text-xl font-semibold">Cart:</span>
          </div>
          {cart.map((cart: ProductsOnCartTypes) => (
            <UserCarts
              key={cart.id}
              products={cart.products}
              total={cart.total}
              discountedTotal={cart.discountedTotal}
              totalProducts={cart.totalProducts}
              totalQuantity={cart.totalQuantity}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
