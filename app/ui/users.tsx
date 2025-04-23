// Fetching data from database
import { Fragment } from "react";
import { fetchAccounts } from "../lib/data";
import Link from "next/link";

const Users = async ({ query }: { query: string }) => {
  const users = await fetchAccounts(query); // from data file

  const theads = ["Name", "Username", "Email", "Address", "Cart"];

  return (
    <Fragment>
      <table className="min-w-full bg-gray-200 max-xl:hidden">
        <thead className="text-left text-sm">
          <tr>
            {theads.map((head) => (
              <th key={head} className="px-3 py-5 font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {users
            ?.filter((user) => user.role === "user")
            .map((user) => (
              <tr
                key={user.id}
                className="w-full border-b text-sm last-of-type:border-none
                          [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                          [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap px-3 py-4">{user.name}</td>
                <td className="whitespace-nowrap px-3 py-4">{user.username}</td>
                <td className="whitespace-nowrap px-3 py-4">{user.email}</td>
                <td className="whitespace-nowrap px-3 py-4">{user.address}</td>
                <td>
                  <Link
                    href={`/dashboard/cart/${user.id}`}
                    className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white py-2 px-4 
                    rounded-lg font-semibold"
                  >
                    View Cart
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* UI for mobile or small screen sizes */}
      <div className="xl:hidden grid lg:grid-cols-2 sm:max-md:grid-cols-2 grid-cols-1 gap-4">
        {users
          ?.filter((user) => user.role === "user")
          .map((user) => (
            <div key={user.id} className="bg-white rounded-lg px-5 py-8 border">
              <div className="flex justify-between items-center">
                <div className="inline-grid">
                  <span className="md:text-xl text-lg font-medium">
                    {user.name}
                  </span>
                  <span>{user.username}</span>
                  <span>{user.email}</span>
                  <span>{user.address}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Users;
