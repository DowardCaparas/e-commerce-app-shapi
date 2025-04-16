import Image from "next/image";
import { User } from "../lib/definitions";

const UserDetails = ({
  firstName,
  lastName,
  username,
  email,
  image,
}: User) => {
  return (
    <div className="bg-white px-5 py-10 border rounded-lg">
      <div className="flex gap-4 items-start">
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
            </span>
            <span className="font-medium">@{username}</span>
          </>
          <span className="mt-2">{email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
