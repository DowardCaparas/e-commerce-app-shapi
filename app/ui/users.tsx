// Fetching data from database
import { Fragment } from "react";
import { fetchAccounts } from "../lib/data";

const Users = async ({ query }: { query: string }) => {
  const users = await fetchAccounts(query); // from data file

  const theads = ["Name", "Username", "Email", "Address"];

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
                className="w-full border-b py-3 text-sm last-of-type:border-none 
                          [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                          [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap p-3">{user.name}</td>
                <td className="whitespace-nowrap p-3">{user.username}</td>
                <td className="whitespace-nowrap p-3">{user.email}</td>
                <td className="whitespace-nowrap p-3">{user.address}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* UI for mobile or small screen sizes */}
      <div className="xl:hidden grid lg:grid-cols-2 sm:max-md:grid-cols-2 grid-cols-1 gap-4">
        {users?.map((user) => (
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
