"use client";

import { UserAccount } from "@/app/lib/definitions";
import Image from "next/image";
import React, { useState } from "react";
import EditProfile from "../edit-profile";

const EditAccountButton = ({ id, name, username, email, address }: UserAccount) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        key={id}
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer flex items-center gap-2 hover:underline"
      >
        Edit
        <Image
          src="/pen.svg"
          alt="pen icon"
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
          <div className="bg-white text-black md:rounded-lg max-md:w-full p-5 py-10">
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

export default EditAccountButton;
