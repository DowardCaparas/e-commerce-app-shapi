import Image from "next/image";
import { User } from "../lib/definitions";

const UserDetails = ({
  firstName,
  lastName,
  maidenName,
  username,
  email,
  image,
  address,
  age,
  gender,
}: User) => {
  return (
    <>
      <div className="relative w-full">
        <div
          className="bg-linear-to-r from-white to-gray-500 w-full md:rounded-lg p-16 absolute -z-10
        ring-2 ring-gray-200"
        >
          {/* Cover */}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-end px-4 md:pt-28 pt-24">
            <div className="flex max-md:flex-col w-full md:items-end items-center max-md:text-center gap-4">
              <Image
                src={image}
                alt={username}
                width={80}
                height={80}
                className="rounded-full bg-white p-2 ring-2 ring-gray-500"
              />
              <div className="inline-grid">
                <div className="flex items-center gap-2 font-semibold text-xl">
                  <span>{firstName}</span>
                  <span>{lastName}</span>
                  <span className="font-medium text-gray-500 ">({gender})</span>
                </div>
                <span className="text-gray-700 font-medium">@{username}</span>
              </div>
            </div>
          </div>

          <div className="px-4 flex flex-col gap-8">
            <div className="inline-grid space-y-2 font-medium max-md:text-center">
              <span>{email}</span>
              <span>{age} years old</span>
            </div>
              {/* User Info */}
              {/* Name */}
              <div className="flex flex-col gap-4">
                <span className="text-xl mt-5 font-semibold">User Info:</span>
                <div className="inline-grid space-y-2">
                  <span>First name</span>
                  <span className="bg-gray-100 p-2 font-medium">
                    {firstName}
                  </span>
                </div>
                <div className="inline-grid space-y-2">
                  <span>Last name</span>
                  <span className="bg-gray-100 p-2 font-medium">
                    {lastName}
                  </span>
                </div>
                {maidenName && (
                  <div className="inline-grid space-y-2">
                    <span>Maiden name</span>
                    <span className="bg-gray-100 p-2 font-medium">
                      {maidenName}
                    </span>
                  </div>
                )}
                {/*Address  */}
                <div className="inline-grid space-y-2">
                  <span>Address</span>
                  <span className="bg-gray-100 p-2 font-medium">
                    {address.address}
                  </span>
                </div>
                <div className="inline-grid space-y-2">
                  <span>City</span>
                  <span className="bg-gray-100 p-2 font-medium">
                    {address.city}
                  </span>
                </div>
                <div className="inline-grid space-y-2">
                  <span>State</span>
                  <span className="bg-gray-100 p-2 font-medium">
                    {address.state}
                  </span>
                </div>
                <div className="inline-grid space-y-2">
                  <span>State Code</span>
                  <span className="bg-gray-100 p-2 font-medium">
                    {address.stateCode}
                  </span>
                </div>
                <div className="inline-grid space-y-2">
                  <span>Postal Code</span>
                  <span className="bg-gray-100 p-2 font-medium">
                    {address.postalCode}
                  </span>
                </div>
                <div className="inline-grid space-y-2">
                  <span>Country</span>
                  <span className="bg-gray-100 p-2 font-medium">
                    {address.country}
                  </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
