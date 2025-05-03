"use client";

import { UserAccount } from "@/app/lib/definitions";
import Image from "next/image";
import React, { useState } from "react";
import EditProfile from "../edit-profile";

const ShopperInfo = ({ id, name, username, email, address }: UserAccount) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        key={id}
        onClick={() => setIsModalOpen(true)}
        className="p-4 border bg-white md:rounded-lg md:w-[50%] w-full cursor-pointer
        flex justify-between items-center hover:bg-gray-50 active:bg-gray-100"
      >
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{name}</span>
            <span>{email}</span>
          </div>
          <span>{address}</span>
        </div>
        <Image
          src="/chevron-right.svg"
          alt="chevron right"
          width={20}
          height={20}
        />
      </button>
      {/* modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50
      "
        >
          <div className="bg-white md:rounded-lg max-md:w-full p-5 py-10">
            <EditProfile
              key={id}
              id={id}
              name={name}
              username={username}
              email={email}
              address={address}
            />
            {/* Cancel button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-4 py-2 mt-2
                            rounded-lg font-medium cursor-pointer transition-colors duration-75 ease-in"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopperInfo;
