import Image from "next/image";
import { User } from "../lib/definitions";

const UserDetails = ({
  firstName,
  lastName,
  username,
  email,
  image,
  address,
  gender,
  age,
}: User) => {
  return (
    <div className="bg-white px-5 py-10 border rounded-lg">
      <div className="flex gap-4 items-start max-md:flex-col max-md:items-center max-md:text-center">
        <Image
          src={image}
          alt={username}
          width={100}
          height={100}
          className="rounded-full p-2 bg-gray-100"
        />
        <div className="inline-grid">
          <>
            <span className="font-bold text-xl">
              {firstName} {lastName}
              <span className="ml-2 font-normal">({gender})</span>
            </span>
            <span className="font-medium">@{username}</span>
          </>
          <span className="mt-2">{email}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col max-md:items-center max-md:text-center">
        <span className="text-wrap font-semibold">
          {address.address}, {address.city}, {address.stateCode} {address.state}{" "}
          {address.country}
        </span>
        <span>
          Postal code:{" "}
          <span className="font-semibold">{address.postalCode}</span>
        </span>
        <span>
          Age: <span className="font-semibold">{age}</span>
        </span>
      </div>
    </div>
  );
};

export default UserDetails;
