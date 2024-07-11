"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2.5 px-[18px] py-[10px] w-[302px] rounded-full mx-auto shadow-light items-center bg-background">
      <SearchRoundedIcon fontSize="small" />
      <input
        className="w-full outline-none placeholder-grey-3"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
