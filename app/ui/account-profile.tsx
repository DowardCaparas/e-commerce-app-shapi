"use client";

import EditProfile from "@/app/ui/edit-profile";
import Image from "next/image";
import { UserAccount } from "../lib/definitions";

interface AccountSettingsClientProps {
    account: UserAccount[];
  }

const AccountProfile = ({account}: AccountSettingsClientProps) => {
  return (
    <div className="bg-gray-100 p-2 md:p-5 border rounded-lg mb-28">
      <div className="flex items-center gap-4">
        <Image
          src="/user.svg"
          alt="user icon"
          width={100}
          height={100}
          className="rounded-full bg-white p-3"
        />
        <div>
          {account.map((acc) => (
            <div key={acc.id} className="inline-grid ">
              <span className="font-semibold text-xl">{acc.name}</span>
              <span className="font-medium text-xl text-gray-600">
                {acc.email}
              </span>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4" />
        {account.map((acc) => (
          <EditProfile
            key={acc.id}
            id={acc.id}
            name={acc.name}
            username={acc.username}
            email={acc.email}
            address={acc.address}
          />
        ))}
    </div>
  );
};

export default AccountProfile;
