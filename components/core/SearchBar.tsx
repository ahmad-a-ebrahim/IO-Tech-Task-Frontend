"use client";

import { useRouter } from "@/i18n/navigation";
import { setSearchQuery } from "@/store/slices/searchSlice";
import { StoreState } from "@/types/store";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const t = useTranslations("header-navigation");
  const router = useRouter();
  const { searchQuery } = useSelector((state: StoreState) => state.search);
  const dispatch = useDispatch();

  return (
    <div
      className="
        relative flex items-center rounded-lg p-1.5
        transition-border duration-300
        border border-transparent
        group
        hover:border-primary-foreground
        focus-within:border-primary-foreground
      "
    >
      <Search
        className="text-primary-foreground cursor-pointer"
        size={20}
        onClick={() => {
          if (!searchQuery) return;
          router.push(`/search?q=${searchQuery}`);
        }}
      />
      <input
        type="text"
        placeholder={t("search")}
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="
            mx-2
            w-28
            opacity-100
            max-md:w-28
            max-md:opacity-100
            md:w-0
            md:opacity-0
            group-hover:w-28
            group-hover:opacity-100
            focus:w-28
            focus:opacity-100
            transition-[width,opacity]
            duration-300
            ease-in-out
            text-primary-foreground
            border-none
            outline-none
            text-sm
        "
      />
    </div>
  );
};

export default SearchBar;
