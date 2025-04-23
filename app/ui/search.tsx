"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams(); //Allows you to access the parameters of the current URL
  const pathname = usePathname(); //Lets you read the current URL's pathname
  const { replace } = useRouter(); //Enables navigation between routes within client components programmatically

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    // set the params string based on the user’s input.
    // If the input is empty, you want to delete it:
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0 my-8">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        placeholder={placeholder}
        className="peer block w-full rounded-md ring-2 ring-orange-500 py-[9px] pl-10 text-sm
        placeholder:text-gray-500"
        onChange={(e) => handleSearch(e.target.value)}
        // Keeping the URL and input in sync
        // To ensure the input field is in sync with the URL and will
        // be populated when sharing you can pass a defaultValue to input by reading from searchParams
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Image
        src="/magnifying-glass.svg"
        alt="search icon"
        width={20}
        height={20}
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
      />
    </div>
  );
};

export default Search;
