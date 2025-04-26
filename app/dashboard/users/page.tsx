import { fetchAccountsPages } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Users from "@/app/ui/users";
import React from "react";

const UsersPage = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
  }>;
}) => {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await fetchAccountsPages();

  return (
    <div className="mb-28">
      <span className="text-2xl font-semibold text-[#383838]">User list</span>
      <Search placeholder="Search user"/>
      <Users query={query} currentPage={currentPage}/>
      <div className="mt-8 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>  
    </div>
  );
};

export default UsersPage;
