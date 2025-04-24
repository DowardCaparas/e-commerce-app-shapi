import Search from "@/app/ui/search";
import Users from "@/app/ui/users";

const UsersPage = async (props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) => {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">User list</span>
      <Search placeholder="Search user"/>
      <Users query={query}/>
    </div>
  );
};

export default UsersPage;
