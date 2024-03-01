"use client";

import React, {useEffect, useState} from "react";
import {MdSearch} from "react-icons/md";
import {Input} from "../ui/input";
import {formUrlQuery, removeKeysFromQuery} from "@/lib/utils";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

type Props = {
  placeholder?: string;
};

const Search = ({placeholder}: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      let newUrl = "";
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }
      router.push(newUrl, {scroll: false});
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, searchParams, router]);

  return (
    <div className="flex-center min-h-[50px] w-full overflow-hidden rounded-md bg-grey-50 px-3">
      <span className="text-primary-500">
        <MdSearch size={20} />
      </span>
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
