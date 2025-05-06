import { fetchAccountById } from "@/app/lib/data";
import EditAccountButton from "@/app/ui/account/edit-button";
import CartBadge from "@/app/ui/cart-badge";
import SignOut from "@/app/ui/sign-out";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AccountSettingsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;
  const account = await fetchAccountById(id);
  return (
    <div className="md:m-4">
      <header
        className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] 
        fixed top-0 right-0 left-0 lg:left-64 text-white flex flex-col"
      >
        <div className="flex items-center gap-4 justify-end h-10 mt-2">
          <CartBadge />
          <SignOut />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="/user.svg"
            alt="user icon"
            width={50}
            height={50}
            className="rounded-full bg-white p-1"
          />
          {account.map((acc) => (
            <div key={acc.id}>
              <div className="inline-grid mb-2">
                <span className="font-bold text-xl">{acc.username}</span>
                <span>{acc.email}</span>
                
              </div>
              <EditAccountButton
                  id={acc.id}
                  name={acc.name}
                  username={acc.username}
                  email={acc.email}
                  address={acc.address}
                />
            </div>
          ))}
        </div>
      </header>

      <div className="mt-44">
        <div className="p-4 bg-white md:rounded-lg border">
          <span>My Purchases</span>
          <div className="my-6 flex gap-4">
            <Link
              href={`/dashboard/orders/${id}`}
              className="border-2 border-black rounded-lg p-3 font-medium
              hover:bg-gray-100 active:bg-gray-200 shadow-md"
            >
              Orders
            </Link>
            <Link
              href={`/dashboard/checkout/${id}`}
              className="border-2 border-black rounded-lg p-3 font-medium
              hover:bg-gray-100 active:bg-gray-200 shadow-md"
            >
              Pending Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
