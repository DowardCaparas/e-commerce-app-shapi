import { fetchAccountById } from "@/app/lib/data";
import EditProfile from "@/app/ui/edit-profile";
import SignOut from "@/app/ui/sign-out";
import Image from "next/image";
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
    <div className="bg-gray-100 p-2 md:p-5 mt-16">
      <div className="flex max-md:flex-col max-md:text-center items-center gap-4">
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
      <hr className="my-4" />
      <div className="mb-28 mt-10">
        <SignOut />
      </div>
    </div>
  );
};

export default AccountSettingsPage;
